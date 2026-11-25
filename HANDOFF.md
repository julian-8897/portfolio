# Portfolio handoff

## Last session (2026-11-25)

- Added an ASCII treatment to the “AI” in the headline. The character sweep plays once and the static glyphs remain under reduced motion. The accessible heading is still “AI for Science Research Engineer”.
- `npm --prefix client run build` and `cd client && npm run artifact -- /private/tmp/portfolio-ascii-final` passed. Checked desktop and mobile layouts and the sweep in the live Orca preview at `http://127.0.0.1:4180/`. The preview is running in the “Portfolio preview” terminal.
- Review the headline in Orca before deciding whether to publish the redesign.

## Research media provenance

- The workflow image is from `figures/method_overview.pdf` in [arXiv:2610.12325](https://arxiv.org/abs/2610.12325), rasterised with `pdftoppm -r 300 -png -singlefile`. The galaxy-bulge image is from `figs/surface_density_maps/surface_density_1e8_initial.pdf` in [arXiv:2607.12708](https://arxiv.org/abs/2607.12708), rasterised at 210 dpi and resized to 960 pixels wide.
- The new closure animation replays validation seed 10000 from the existing selected checkpoint. Its chart shows mean squared error over the spatial grid at each step, while the portfolio text reports the published aggregate over a separate set of 32 test trajectories. The Burgers media match the previous commit byte for byte.
- Regenerate the closure assets on CPU with the locked environment in the sibling `tesseract-hybrid-closure-viz` checkout at `2cd1e33`. Pass an existing checkpoint checkout and a fresh output directory.

  ```sh
  uv run --project ../tesseract-hybrid-closure-viz --no-sync \
    python client/scripts/render-closure.py \
    ../tesseract-hybrid-closure-viz ../tesseract-hybrid-closure-agent \
    /private/tmp/portfolio-closure-render
  ```

- Both closure videos decoded with FFmpeg and Ruff passed for the renderer in `2afc8e1`.
