# v0.2.0

### Required actions for updating

Replace or add the following files:

1. `universal-cards-core.js` — updated core script.
2. `universal-cards-lang-core.js` — This file has been renamed. Delete the old version and add the new one.
3. `universal-cards-lang-user.js` (optional) — A new file for adding your own localization.
4. `[CARDS]A_universal-dataview-cards-core.css` — This file has been renamed. Delete the old version and add the new one.
5. `[CARDS]Z_universal-dataview-cards-user.css` (optional) — A new file for custom styles or using preset themes.

### New

- Introduced a clear separation between system and user files.  
  This allows you to update the core and system styles without risking your custom changes.

### Documentation updates

The following sections have been updated:

- 00 Start  
- 01 Roadmap  
- 00 Config examples  
- 10 SCRIPT INTEGRATION  
- 05 Image presets  
- 06 Section styling  
- 03 How to Translate the Script into Another Language  
- 07 How to Update the Script

### Fixes

- Minor bug fixes and improvements.

### ❗ Important to read ❗

Please pay special attention to the following documentation sections:

- **10 SCRIPT INTEGRATION**  
  Explains how to work with two localization files. The final part of the config file has also been updated — the one responsible for loading language files and the core script.

- **00 Config examples**  
  Demonstrates how the support for custom text is implemented.

- **00 Start (STEP 9)**  
  Provides details about the new CSS files, including the custom styles file `[CARDS]Z_universal-dataview-cards-user.css`.

---

# v0.1.0
- Added the ability to clear the search bar.
- Updated localization
- Styles updated
- Edited documentation

❗Please update all three files to avoid conflicts and problems.

❗If you have already changed localization or styles to suit your needs, please save your changes and transfer them to the new files.

---

# v0.0.2
- Fixed minor bugs

---

# v0.0.1
- Test version v0.0.1 added