# Portfolio handoff

## Last session (2026-11-25)

- Reworked the candidate branch around AI for Science research engineering. The NeurIPS workshop paper leads with Figure 1, the two simulation projects have separate entries, and an astrophysics section connects galaxy-merger simulations to the neural ODE paper. Open problems gave way to research interests and a contact link.
- The workflow image is from `figures/method_overview.pdf` in [arXiv:2610.12325](https://arxiv.org/abs/2610.12325), rasterised with `pdftoppm -r 300 -png -singlefile`. The galaxy-bulge image is from `figs/surface_density_maps/surface_density_1e8_initial.pdf` in [arXiv:2607.12708](https://arxiv.org/abs/2607.12708), rasterised at 210 dpi and resized to 960 pixels wide.
- The new closure animation replays validation seed 10000 from the existing selected checkpoint. Its chart shows mean squared error over the spatial grid at each step, while the portfolio text reports the published aggregate over a separate set of 32 test trajectories. The Burgers media match the previous commit byte for byte.
- Regenerate the closure assets on CPU with the locked environment in the sibling `tesseract-hybrid-closure-viz` checkout at `2cd1e33`. Pass an existing checkpoint checkout and a fresh output directory.

  ```sh
  uv run --project ../tesseract-hybrid-closure-viz --no-sync \
    python client/scripts/render-closure.py \
    ../tesseract-hybrid-closure-viz ../tesseract-hybrid-closure-agent \
    /private/tmp/portfolio-closure-render
  ```

- `npm --prefix client run build` and `cd client && npm run artifact -- /private/tmp/portfolio-narrative/artifact-final` passed. Checked the production preview in Orca at 1440 and 390 pixels, both videos decoded with FFmpeg, Ruff passed for the renderer, and the generated artifact's reduced-motion script passed with a mocked preference.
- The redesign is ready for review on `redesign/ai4science-candidates`. No jobs are in flight. The next decision is whether to publish the redesign after review.
