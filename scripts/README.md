# Maintenance scripts

One-off tooling kept for posterity, not part of the deployed site.

## download_imweb_assets.py

Re-fetches the 55 imweb.me images that were originally referenced by the
English homepage before §6.5 self-hosting (commit `f5aeb69`). Run from the
project root if you ever need to repopulate `images/` from scratch:

```
python scripts/download_imweb_assets.py
```

The script targets `./images/` relative to the repo root. It is idempotent:
already-downloaded files are skipped. Note that filenames in this script
predate the deduplication step — running it now will re-create some files
under product-specific banner names (banner-machines.jpg etc.) that were
later consolidated into `banner-product.jpg`. Re-run the dedup logic from
commit `f5aeb69` if you need a clean state.
