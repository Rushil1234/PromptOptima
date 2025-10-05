# Icon Files

The extension requires PNG format icons. The SVG files are provided as templates.

To convert SVG to PNG, you can use:

1. **Online converter**: https://cloudconvert.com/svg-to-png
2. **ImageMagick** (if installed):
   ```bash
   convert icon128.svg icon128.png
   convert icon48.svg icon48.png
   convert icon16.svg icon16.png
   ```
3. **Inkscape** (if installed):
   ```bash
   inkscape icon128.svg --export-filename=icon128.png
   ```

Or simply open each SVG in a browser, take a screenshot, and save as PNG with the correct dimensions:
- icon16.png: 16x16 pixels
- icon48.png: 48x48 pixels
- icon128.png: 128x128 pixels

For quick testing, you can temporarily use the SVG files in manifest.json by changing the extensions from .png to .svg.
