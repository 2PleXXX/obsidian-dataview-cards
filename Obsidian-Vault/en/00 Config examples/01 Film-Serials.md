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

  typeFilteringEnabled: true,
  folderKeyword: "assets/YAML folder/",
  typeField: "Type",
  typeValue: ["Series", "Film",],

  //▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  // 02 🪟 MODAL WINDOW SETTINGS
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
    { label: "By genre", field: "Genre", emoji: "🏷️" },
    { label: "By date", field: "DateFilm", emoji: "🗓️" },
    { label: "By duration", field: "Duration", emoji: "🔢" },
    { label: "By rating", field: "Rating", emoji: "📊" },
    { label: "By symbols length", special: "length", emoji: "🔢" },
    { label: "Random", special: "random", emoji: "♾️" },
  ],

  randomSortFields: ["Title", "Genre", "DateFilm", "Duration", "Rating",],
  defaultSortField: "Title",
  defaultSortOrder: "asc",
  rememberSort: true,

  //▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  // 07 🔐 FILTERING
  //▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  filtering: {
    saveToLocalStorage: true,
    mode: "byTypes",
    allowedTypes: ["text", "badge", "date", "pageLink", "number", "rating", "progressBar",],
    allowedFields: ["Title", "Genre", "DateFilm", "Duration",],
    defaultMatchMode: "any",
    defaultFilterMode: "whitelist",
  },

  //▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  // 08 🖼 DISPLAYED FIELDS
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
    Genre: {
      type: "badge",
      label: "Genre",
      maxItems: 3,
    },
    DateFilm: {
      type: "date",
      label: "Date",
      emoji: "📅",
      dateFormat: "en",
    },
    Duration: {
      type: "number",
      label: "Duration",
      emoji: "🔢",
      suffix: " min",
    },
    Rating: {
      type: "rating",
      label: "Rating",
      emoji: "📊",
      config: {
        maxRating: 10,
      },
    },
    ViewingStatus: {
      type: "text",
      label: "Section",
      cssClass: "",
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
      title: "Unwatched",
      matchFactory: "matchBySectionValue",
      matchArgs: { field: "ViewingStatus", values: ["Unwatched"] },
      fields: [
        "Poster",
        "Title",
        "Genre",
        "DateFilm",
        "Duration",
        "Rating",
        "Type",
      ],
    },
    {
      id: "section2",
      title: "Watching",
      matchFactory: "matchBySectionValue",
      matchArgs: { field: "ViewingStatus", values: ["Watching"] },
      fields: [
        "Poster",
        "Title",
        "Genre",
        "DateFilm",
        "Duration",
        "Rating",
        "Type",
      ],
    },
    {
      id: "section3",
      title: "Dropped",
      matchFactory: "matchBySectionValue",
      matchArgs: { field: "ViewingStatus", values: ["Dropped"] },
      fields: [
        "Poster",
        "Title",
        "Genre",
        "DateFilm",
        "Duration",
        "Rating",
        "Type",
      ],
    },
    {
      id: "section4",
      title: "Watched",
      matchFactory: "matchBySectionValue",
      matchArgs: { field: "ViewingStatus", values: ["Watched"] },
      fields: [
        "Poster",
        "Title",
        "Genre",
        "DateFilm",
        "Duration",
        "Rating",
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
        "Genre",
        "DateFilm",
        "Duration",
        "Rating",
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
        "Genre",
        "DateFilm",
        "Duration",
        "Rating",
        "Type",
        "ViewingStatus",
        "Type",
      ],
    },
  ],
};

//▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
// 10 🛠️ SCRIPT INTEGRATION
//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
const langPath = "scripts/universal-cards-lang.js"; // path to the localization file
const scriptPath = "scripts/universal-cards-core.js"; // path to the core script

// Check if localization file exists
const langFile = app.vault.getAbstractFileByPath(langPath);
if (!langFile || typeof langFile.path !== "string") {
  dv.paragraph(`❌ Localization file not found: ${langPath}`);
  return;
}
const langContent = await app.vault.read(langFile);
eval(langContent);

// Check if core script exists
const scriptFile = app.vault.getAbstractFileByPath(scriptPath);
if (!scriptFile || typeof scriptFile.path !== "string") {
  dv.paragraph(`❌ Core script not found or invalid path: ${scriptPath}`);
  return;
}
const scriptContent = await app.vault.read(scriptFile);
eval(scriptContent);

// Run functions if they are defined
if (typeof initializeSectionMatches === "function") {
  initializeSectionMatches(config);
}
if (typeof runUniversalCards === "function") {
  runUniversalCards(dv, config);
}
```
