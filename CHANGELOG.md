# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]
### Add
- Implement persistent saving of colors

## [1.4.1] - 2019-02-20
### Changed
- Removed old files.
- Updated swatch/color input spacing.
- Removed stars.

## [1.4.0] - 2019-02-12
### Changed
- Printing feature update.

## [1.4.0-b] - 2019-02-02
### Changed
- Print feature ported.
- Rewrite using RSCSS practices complete.
- All sections are now components.

## [1.4.0-a6] - 2019-02-02
### Changed
- Mobile color wheel cutoff.
- Spacing between color controls and saved colors section.

### Added
- Border between color controls and saved colors section.
- Min-height for saved colors section on mobile devices.

## [1.4.0-a5] - 2019-02-02
### Changed
- Headings content and location tweaked.
- Updated HTML headings in `_base` for updated font sizing.
- Markup and CSS specificity in `_range_slider`, `_custom-colors`, `_saved-color` components updated to reflect RSCSS practices.
- Extra helper components created in `_helpers`.
- Helper class `_title` styling updated.
- Updated app UI CSS Grid for future 3rd column when going beyond ~1100px in screen width.
- Secondary pages now reflect RSCSS practices.

## [1.4.0-a4] - 2019-01-31
### Changed
- UI restructure complete (for real).
- Converted  buttons (all), saved colors, custom colors, ranged sliders, color values to components. 
- Need to fix a few markup and specificity on a few components.

## [1.4.0-a2] - 2019-01-30
### Changed
- UI restructure complete.
- Convert remaining components and JS elements for rewrite.

## [1.4.0-a1] - 2019-01-30
### Changed
- RSCSS rewrite includes UI restructure, CSS grid, sass -> scss, style tweaks.

## [1.3.0] - 2019-01-28
### Changed
- `iro.js` updated to version 3.5.5, hotfix for HSL strings. Pasting an HSL string into the color input no longer results in an error.

## [1.2.9] - 2019-01-27
### Changed
- Few rem optimizations - h2, inputs.

## [1.2.9] - 2019-01-19
### Changed
- `app.js` rewrite.
- Homepage heading How to use page
- How to use page
- Heights of `swatch`, `.color-value`
- Color Wheel in center @ 736px width or more

### Added
- CSS grid to `.color` @ 736px width or more
- Print feature to How to use page

## [1.2.8] - 2019-01-19
### Changed
- HSL range slider values now update immediately.

## [1.2.7] - 2019-01-19
### Changed
- Print styling is now left aligned, consolidated header.
- User colors heading sub text

## [1.2.6] - 2019-01-18
### Changed
- Removed `article` designation from html, changed to `<div class="inner">`
- Updated logo

### Added
- **New print style.** Removes entire page except saved colors and logo. Saved color names and hex values are printed above and below each color respectively.

## [1.2.5] - 2019-01-11
### Changed
- Readme and about page updates.

### Added
- Added a thanks section on the about page

## [1.2.4] - 2019-01-11
### Changed
- Footer altered css snafu.
- Updated links to reflect new domain.

## [1.2.3] - 2019-01-11
### Changed
- Fixed the remove (single) color event listener and function. Causing bugs in Chrome.
- Font to Open Sans. It is just so damn easy to read especially with a mix of letters, numbers, & symbols.

### Added
- Created About and How to use pages with descriptions and instructions.
- Fluid typography on `html, body`
  - `
      @media (max-width: 960px)
        font-size: calc(14px + .4vw);
    `

## [1.2.2] - 2019-01-10
### Changed
- Cleaned up and restructured (README)[README.md]

### Added
- Created How to use section (README)[README.md]
- This file. New CHANGELOG.md added to project
- Created a smaller secondary color swatch pill with save color button further down the fold
  - This is beneficial for using the lower half the app only (e.g. HSL sliders and save color buttons to create a palette)
- New clear colors button to remove all saved colors
- New individual remove color buttons for each saved color

## [1.2.1] - 2019-01-10
### Changed
- Cleaned up heading, footer, & color sections

### Added
- New page header with logo, name, github logo, & stars.

## [1.2.0] - 2019-01-09
### Changed
- Name adjustment

### Added
- Implemented color temp save and UI update (not persistent, yet)

## [1.1.9] - 2019-01-08
### Added
- Click to copy tooltips
- Color input from any format implemented
- Initial saved color function implemented

## [1.1.8] - 2019-01-07
### Changed
- Restructed HTML

### Added
- Began implementing saving component

## [1.1.7] - 2019-01-07
### Changed
- Rewrote a few methods

### Added
- Implemented click to copy buttons for each color value

## [1.1.6] - 2019-01-06
### Added
- Began rewrite of methods

## [1.1.5] - 2019-01-06
### Added
- Whole inputs implemented

## [1.1.4] - 2019-01-05
### Changed
- HSL inputs finished!

## [1.1.3] - 2019-01-05
### Changed
- HSL sliders finished
- Random start color, thanks [stackoverflow](https://stackoverflow.com/questions/1484506/random-color-generator)

## [1.1.3] - 2019-01-05
### Added
- Color value (HSL) sliders implemented

## [1.1.2] - 2019-01-05
### Added
- Color value (HSL) sliders implemented

## [1.1.1] - 2019-01-05
### Added
- Basic color values added to UI
- Saturation slider implemented!

## [1.1.0] - 2019-01-04
### Added
- Workbox PWA implemented (installable)
- Manifest created
- favicon/app icon
- font cached

## [1.0.1] - 2019-01-04
### Added
- Basic project files (html, sass, css, js)
- Color wheel implemented
- Readme created
- Goals created