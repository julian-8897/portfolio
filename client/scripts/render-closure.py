"""Render validation seed 10000 with the original closure code and checkpoint."""

import argparse
import json
import subprocess
from pathlib import Path

import jax
import jax.numpy as jnp
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.colors import LinearSegmentedColormap
from tesseract_hybrid_closure.configs import DNSConfig, SolverConfig
from tesseract_hybrid_closure.data import generate_reference_trajectory
from tesseract_hybrid_closure.final_eval import load_candidate_params
from tesseract_hybrid_closure.losses import (
    closure_rollout,
    no_closure_rollout,
    vorticity_mse,
)
from tesseract_hybrid_closure.solver import CoarseVorticityStepper

SEED = 10000
HORIZON = 500
FPS = 30
WIDTH, HEIGHT, DPI = 1200, 760, 100
BACKGROUND = "#101c2a"
INK = "#ebf3fa"
MUTED = "#a8b9c9"
COARSE = "#ffad8c"
HYBRID = "#77ceff"


def load_rollouts(source: Path, checkpoints: Path) -> tuple[np.ndarray, np.ndarray]:
    jax.config.update("jax_platforms", "cpu")
    manifest = json.loads((source / "docs/results/final-metrics.json").read_text())
    records = manifest["source_evidence"]["files"]
    selected = next(
        r for r in records if r["role"] == "selected_aposteriori_checkpoint"
    )
    record = next(
        r
        for r in records
        if r["role"] == "aposteriori_candidate_checkpoint"
        and r["path"] == selected["path"]
        and r["candidate"] == selected["candidate"]
    )
    checkpoint, params = load_candidate_params(
        checkpoints / record["path"], expected_sha256=record["sha256"]
    )
    reference = generate_reference_trajectory(
        SEED, HORIZON, split="validation", config=DNSConfig(**checkpoint["dns_config"])
    )
    initial, dns = reference.initial_coarse, reference.targets
    stepper = CoarseVorticityStepper(SolverConfig(**checkpoint["solver_config"]))
    coarse = no_closure_rollout(stepper, initial, HORIZON)
    hybrid = closure_rollout(stepper, params, initial, HORIZON)
    errors = np.asarray(
        [jax.vmap(vorticity_mse)(data, dns) for data in (coarse, hybrid)]
    )
    fields = np.asarray(
        [jnp.concatenate((initial[None], data))[:, 0] for data in (dns, coarse, hybrid)]
    )
    if fields.shape[:2] != (3, HORIZON + 1) or not np.isfinite(fields).all():
        raise ValueError("The three rollouts must cover every step and be finite")
    if errors.shape != (2, HORIZON) or not np.isfinite(errors).all():
        raise ValueError("The two error curves must cover every step and be finite")
    print(f"Verified checkpoint {record['sha256']}, validation seed {SEED}", flush=True)
    return fields, np.pad(errors, ((0, 0), (1, 0)))


def render(output: Path, fields: np.ndarray, errors: np.ndarray) -> None:
    plt.switch_backend("Agg")
    fig = plt.figure(figsize=(WIDTH / DPI, HEIGHT / DPI), dpi=DPI, facecolor=BACKGROUND)
    fig.text(0.035, 0.955, "Decaying turbulence", fontsize=24, color=INK, weight="bold")
    counter = fig.text(
        0.965, 0.955, "", ha="right", family="monospace", fontsize=17, color=INK
    )
    cmap = LinearSegmentedColormap.from_list(
        "vorticity", ["#66c9ff", "#325d87", BACKGROUND, "#94534d", "#ffb392"]
    )
    limit = float(np.ceil(np.percentile(np.abs(fields), 99)))
    images = []
    for index, (name, colour) in enumerate(
        [
            ("Filtered DNS", INK),
            ("Coarse solver", COARSE),
            ("Solver + learned closure", HYBRID),
        ]
    ):
        ax = fig.add_axes([0.035 + index * 0.315, 0.403, 0.29, 0.458])
        ax.set_title(name, loc="left", color=colour, fontsize=15, pad=10)
        ax.set_axis_off()
        images.append(
            ax.imshow(
                fields[index, 0],
                cmap=cmap,
                vmin=-limit,
                vmax=limit,
                interpolation="bilinear",
            )
        )
    fig.text(
        0.035, 0.35, "Spatial mean squared vorticity error", fontsize=15, color=INK
    )
    fig.text(
        0.965,
        0.35,
        f"Vorticity scale: −{limit:g} to +{limit:g}",
        fontsize=11,
        color=MUTED,
        ha="right",
    )
    chart = fig.add_axes([0.083, 0.10, 0.871, 0.216], facecolor=BACKGROUND)
    chart.set(xlim=(0, HORIZON), ylim=(0, errors.max() * 1.12), xlabel="Solver step")
    chart.xaxis.label.set_color(MUTED)
    chart.tick_params(colors=MUTED, labelsize=11, length=0)
    chart.spines[:].set_visible(False)
    chart.grid(axis="y", color="#304354", linewidth=0.7)
    tracks = [
        chart.plot([], [], color=colour, linewidth=2.75)[0]
        for colour in (COARSE, HYBRID)
    ]
    dots = [
        chart.plot([], [], "o", color=colour, markersize=5)[0]
        for colour in (COARSE, HYBRID)
    ]
    chart.legend(
        tracks,
        ["Coarse solver", "Solver + learned closure"],
        loc="upper left",
        labelcolor=INK,
        frameon=False,
        fontsize=11,
    )
    cursor = chart.axvline(0, color=MUTED, linewidth=0.8, alpha=0.55)
    steps = np.arange(HORIZON + 1)

    def draw(step: int) -> None:
        for image, series in zip(images, fields, strict=True):
            image.set_data(series[step])
        for track, dot, series in zip(tracks, dots, errors, strict=True):
            track.set_data(steps[: step + 1], series[: step + 1])
            dot.set_data([step], [series[step]])
        counter.set_text(f"{step:03d} / {HORIZON} steps")
        cursor.set_xdata([step, step])
        fig.canvas.draw()

    draw(300)
    fig.savefig(output / "closure-rollout-poster.jpg", pil_kwargs={"quality": 91})
    command = [
        "ffmpeg",
        "-hide_banner",
        "-loglevel",
        "error",
        "-nostdin",
        "-f",
        "rawvideo",
        "-pixel_format",
        "rgb24",
        "-video_size",
        f"{WIDTH}x{HEIGHT}",
        "-framerate",
        str(FPS),
        "-i",
        "pipe:0",
        "-filter_complex_threads",
        "2",
        "-filter_complex",
        "format=yuv420p,split=2[mp4][webm]",
        "-map",
        "[mp4]",
        "-an",
        "-c:v",
        "libx264",
        "-crf",
        "22",
        "-threads",
        "4",
        "-movflags",
        "+faststart",
        str(output / "closure-rollout.mp4"),
        "-map",
        "[webm]",
        "-an",
        "-c:v",
        "libvpx-vp9",
        "-crf",
        "30",
        "-b:v",
        "0",
        "-cpu-used",
        "4",
        "-threads",
        "4",
        str(output / "closure-rollout.webm"),
    ]
    timeline = np.linspace(0, HORIZON, 211).round().astype(int)
    with subprocess.Popen(command, stdin=subprocess.PIPE) as encoder:
        with encoder.stdin as stream:
            for step in np.concatenate((timeline, np.repeat(HORIZON, 24))):
                draw(step)
                stream.write(np.asarray(fig.canvas.buffer_rgba())[:, :, :3].tobytes())
        if encoder.wait():
            raise subprocess.CalledProcessError(encoder.returncode, command)
    plt.close(fig)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path)
    parser.add_argument("checkpoints", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    args.output.mkdir()
    fields, errors = load_rollouts(args.source, args.checkpoints)
    print("Rendering three synchronised rollouts and per-step errors", flush=True)
    render(args.output, fields, errors)


if __name__ == "__main__":
    main()
