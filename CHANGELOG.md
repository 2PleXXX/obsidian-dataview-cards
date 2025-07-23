# Changelog

_All notable changes to this project will be documented in this file._

## [v1.0.0] - 2025-07-23

---

### 💥 Major milestone: First stable release!

After a period of beta testing, the script has officially reached **version 1.0.0**.  
This marks the beginning of the stable release cycle.

---

### Added

- 🎉 **Initial stable release (v1.0.0)**
- Minor improvements to the README.

### Documentation

- Added section: 09 How to Report an Issue or Suggest a Feature

### Fixed

- Minor bug fixes and improvements.

---

## [v0.3.0] - 2025-07-12

### Added

- Ability to change page width.

### Documentation

- Added section: 07 How to Change Card Size

### Fixed

- Minor bug fixes and improvements.

---

## [v0.2.0] - 2025-07-09

⚠️ **Warning:** This version introduces breaking changes.  
If you update without adjusting your file structure, errors may occur.  
Make sure to carefully read the [Migration Notes](#migration-notes) section below.

### Added

- Clear separation between system and user files.  
  Now it's safe to update the core and styles without losing customizations.

### Changed

- Renamed and restructured core/system/user files:
  - `universal-cards-lang-core.js` (renamed)
  - `[CARDS]A_universal-dataview-cards-core.css` (renamed)
  - `universal-cards-lang-user.js` (new)
  - `[CARDS]Z_universal-dataview-cards-user.css` (new)

### Documentation

- Updated: Start, Roadmap, Config examples, Script Integration, Image presets, Section styling, Translation, Update instructions.

### Fixed

- Minor bug fixes and improvements.

### Migration Notes

- Please refer to:
  - **“10 Script Integration”** — loading two language files and new config endings.
  - **“00 Config Examples”** — how custom texts work.
  - **“00 Start (Step 9)”** — new CSS structure and custom style file `[CARDS]Z_universal-dataview-cards-user.css`.

---

## [v0.1.0] - 2025-07-05

### Added

- Ability to clear search bar.

### Changed

- Localization and styles updated.

### Documentation

- General improvements.

### Migration Notes

- Update all three files to avoid conflicts.
- If you’ve customized localization/styles, manually migrate them to the new files.

---

## [v0.0.2] - 2025-07-03

### Fixed

- Minor bug fixes.

---

## [v0.0.1] - 2025-07-01

### Added

- Initial test pre-release.

---

[v1.0.0]: https://github.com/2PleXXX/obsidian-dataview-cards/compare/v0.3.0...v1.0.0
[v0.3.0]: https://github.com/2PleXXX/obsidian-dataview-cards/compare/v0.2.0...v0.3.0
[v0.2.0]: https://github.com/2PleXXX/obsidian-dataview-cards/compare/v0.1.0...v0.2.0
[v0.1.0]: https://github.com/2PleXXX/obsidian-dataview-cards/compare/v0.0.2...v0.1.0
[v0.0.2]: https://github.com/2PleXXX/obsidian-dataview-cards/compare/v0.0.1...v0.0.2
[v0.0.1]: https://github.com/2PleXXX/obsidian-dataview-cards/releases/tag/v0.0.1
