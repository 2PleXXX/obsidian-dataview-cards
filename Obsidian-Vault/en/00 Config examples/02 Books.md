---
cssclasses:
  - cards
  - cards-cols-6
  - table-max
  - cards-align-bottom
  - cards-2-3
obsidianUIMode: preview
---

```dataviewjs
//▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
// 01 📁 DATA SOURCE
//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
const config = {
  language: "en",
  checkVersion: true,

  typeFilteringEnabled: true,
  folderKeyword: "assets/YAML folder/",
  typeField: "Type",
  typeValue: ["Book", "Manga",],

  //▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  // 02 🪟 MODAL WINDOW SETUP
  //▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  modalBehavior: "hold",

  //▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  // 03 🔢 CARD COUNTER
  //▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  cardCounter: {
    enabled: true,
    textBefore: "Total cards:",
  },

  //▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  // 04 🔍 SEARCH
  //▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  searchField: "Title",
  searchBox: {
    placeholderText: "🔍 Search by title...",
  },

  //▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  // 05 🧱 SECTIONS (behavior)
  //▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  sectionBehavior: {
    collapsible: true,
    rememberState: true,
    defaultOpen: false,
    lazyLoading: true,
    lazyChunkSize: 18,
    lazyPreloadChunks: 2,
  },

  //▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  // 06 🧮 SORTING
  //▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  sortButtons: [
    { label: "By title", field: "Title", emoji: "🔤" },
    { label: "By author", field: "Author", emoji: "🏷️" },
    { label: "By date", field: "DateBook", emoji: "🗓️" },
    { label: "By genre", field: "Genre", emoji: "🔢" },
    { label: "By pages", field: "Pages", emoji: "🔢" },
    { label: "By progress", field: "MyProgress", emoji: "📈" },
    { label: "Random", special: "random", emoji: "♾️" },
  ],

  randomSortFields: ["Title", "Genre", "DateBook", "Author", "MyProgress",],
  rememberSort: true,

  //▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  // 07 🔐 FILTERING
  //▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  filtering: {
    clearTagsWarning: true,
    mode: "byTypes",
    allowedTypes: ["text", "badge", "date", "pageLink", "number", "rating", "progressBar",],
    allowedFields: ["Title", "Genre", "DateBook", "Pages",],
  },

  //▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  // 08 🖼 FIELD CREATION
  //▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  fields: {
    Poster: {
      type: "image",
      label: "Poster",
      slider: true,
      maxSliderItems: 3,
    },
    Title: {
      type: "pageLink",
      label: "Title",
      emoji: "🎯",
    },
    Author: {
      type: "text",
      label: "Author",
      emoji: "⭐",
    },
    DateBook: {
      type: "date",
      label: "Date",
      emoji: "📅",
      dateFormat: "en",
    },
    Genre: {
      type: "badge",
      label: "Genre",
      maxItems: 3,
      suffix: "",
    },
    Pages: {
      type: "number",
      label: "Pages",
      emoji: "🔢",
      suffix: " p.",
    },
    MyProgress: {
      type: "progressBar",
      label: "Progress",
      config: {
        currentField: "Progress1",
        maxField: "Progress2",
        thresholds: [
          { min: 100, class: "progress-complete" },
          { min: 90,  class: "progress-high" },
          { min: 75,  class: "progress-good" },
          { min: 50,  class: "progress-medium" },
          { min: 25,  class: "progress-low" },
          { min: 1,   class: "progress-bad" },
          { min: 0,   class: "progress-empty" },
        ],
      },
    },
    ReadingStatus: {
      type: "text",
      label: "Section",
      emoji: "📁",
    },
    Type: {
      type: "badge",
      label: "Type",
      cssClass: "",
      emoji: "🧲",
    },
  },

  //▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  // 09 📦 CARD SECTIONS
  //▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  sections: [
    {
      id: "section0",
      title: "Reading",
      matchFactory: "matchBySectionValue",
      matchArgs: { field: "ReadingStatus", values: ["Reading"] },
      fields: [
        "Poster",
        "Title",
        "Author",
        "DateBook",
        "Genre",
        "Pages",
        "MyProgress",
        "Type",
      ],
    },
    {
      id: "section2",
      title: "Dropped",
      matchFactory: "matchBySectionValue",
      matchArgs: { field: "ReadingStatus", values: ["Dropped"] },
      fields: [
        "Poster",
        "Title",
        "Author",
        "DateBook",
        "Genre",
        "Pages",
        "MyProgress",
        "Type",
      ],
    },
    {
      id: "favourite",
      title: "⭐ Favourite",
      styleClass: "universal-favourite",
      allowDuplicates: true,
      matchFactory: "matchBySectionValue",
      matchArgs: { field: "Favourite", values: ["Yes"] },
      fields: [
        "Poster",
        "Title",
        "Author",
        "DateBook",
        "Genre",
        "Pages",
        "MyProgress",
        "Type",
      ],
    },
    {
      id: "unsorted",
      title: "🗂 Unsorted",
      styleClass: "universal-unsorted",
      fields: [
        "Poster",
        "Title",
        "Author",
        "DateBook",
        "Genre",
        "Pages",
        "MyProgress",
        "ReadingStatus",
        "Type",
      ],
    },
  ],
};

//▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
// 10 🛠️ SCRIPT INTEGRATION
//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
const langCorePath = "scripts/universal-cards-lang-core.js";
const langUserPath = "scripts/universal-cards-lang-user.js";

const scriptPath = "scripts/universal-cards-core.js";

//▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
// No need to change anything below
//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

const langCoreFile = app.vault.getAbstractFileByPath(langCorePath);
if (!langCoreFile) {
  dv.paragraph(`❌ Core localization file not found: ${langCorePath}`);
  return;
}
eval(await app.vault.read(langCoreFile));

if (typeof langUserPath === "string" && langUserPath.trim() !== "") {
  const langUserFile = app.vault.getAbstractFileByPath(langUserPath);
  if (langUserFile) {
    eval(await app.vault.read(langUserFile));
  } else {
    window.UNIVERSAL_CARDS_LANG_USER = {};
  }
} else {
  window.UNIVERSAL_CARDS_LANG_USER = {};
}

const scriptFile = app.vault.getAbstractFileByPath(scriptPath);
if (!scriptFile || typeof scriptFile.path !== "string") {
  dv.paragraph(`❌ Script not found or the path is incorrect. Your path: ${scriptPath}`);
  return;
}
const scriptContent = await app.vault.read(scriptFile);
eval(scriptContent);

if (typeof initializeSectionMatches === "function") {
  initializeSectionMatches(config);
}
if (typeof runUniversalCards === "function") {
  runUniversalCards(dv, config);
}
```
