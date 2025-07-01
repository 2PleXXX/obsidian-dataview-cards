---
cssclasses:
  - cards
  - cards-cols-6
  - table-max
  - cards-align-bottom
  - cards-2-3
  - hide-properties
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
  typeValue: ["DemoType", ],

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
  searchField: ["Title", "DemoList", "Badge",],
  searchBox: {
    placeholderText: "🔍 Search by Title, DemoList, Badge...",
  },

  //▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  // 05 🧱 SECTIONS (behavior)
  //▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  sectionBehavior: {
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
    { label: "By date", field: "DemoDate", emoji: "🗓️" },
    { label: "By list", field: "DemoList", emoji: "🏷️" },
    { label: "By badge", field: "Badge", emoji: "🏷️" },
    { label: "By number", field: "DemoNum", emoji: "🔢" },
    { label: "By rating", field: "Rating", emoji: "📊" },
    { label: "By progress", field: "MyProgress", emoji: "📈" },
    { label: "By tags", field: "tags", emoji: "🆙" },
    { label: "By symbols length", special: "length", emoji: "🔢" },
    { label: "Random", special: "random", emoji: "♾️" },
    { label: "By backlinks", field: "backlinkCount", emoji: "🔁" },
  ],

  randomSortFields: ["Title", "DemoDate", "DemoList", "Badge", "DemoNum", "Rating", "MyProgress", "tags", ],
  rememberSort: true,

  //▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  // 07 🔐 FILTERING
  //▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  filtering: {
    saveToLocalStorage: true,
    mode: "byTypes",
    allowedTypes: ["text", "badge", "date", "pageLink", "number", "rating", "progressBar",],
    allowedFields: ["Title", "Badge", "DemoDate", "Rating",],
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
    DemoDate: {
      type: "date",
      label: "Date",
      emoji: "📅",
      dateFormat: "en",
    },
    DemoList: {
      type: "list",
      label: "List",
      display: "",
      maxItems: 3,
    },
    Badge: {
      type: "badge",
      label: "Badge",
      maxItems: 3,
    },
    Audio: {
      type: "audio",
      label: "Audio",
    },
    DemoNum: {
      type: "number",
      label: "Number",
      emoji: "🔢",
      suffix: " num.",
      prefix: "$ ",
    },
    Video: {
      type: "video",
      label: "Video",
    },
    Rating: {
      type: "rating",
      label: "Rating",
      emoji: "📊",
      config: {
        maxRating: 10,
      },
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
    Section: {
      type: "text",
      label: "Section",
      emoji: "📁",
    },
    Type: {
      type: "text",
      label: "Type",
      emoji: "🧲",
    },
    tags: {
      type: "tags",
      label: "Tags",
      maxItems: 3,
    },
    backlinkCount: {
      type: "number",
      label: "🔁 Backlinks",
    },
  },

  //▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  // 09 📦 CARD SECTIONS
  //▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  sections: [
    {
      id: "section0",
      title: "🖼️ Section Poster",
      styleClass: "",
      matchFactory: "matchBySectionValue",
      matchArgs: { field: "Section", values: ["SectionPoster"] },
      fields: [
        "Poster",
        "Title",
        "DemoDate",
        "DemoList",
        "Badge",
        "DemoNum",
        "Type",
        "tags",
        "backlinkCount",
      ],
    },
    {
      id: "section1",
      title: "🎵 Section Audio",
      matchFactory: "matchBySectionValue",
      matchArgs: { field: "Section", values: ["SectionAudio"] },
      fields: [
        "Audio",
        "Title",
        "DemoDate",
        "DemoList",
        "Badge",
        "DemoNum",
        "Type",
        "tags",
      ],
    },
    {
      id: "section2",
      title: "🎬 Section Video",
      matchFactory: "matchBySectionValue",
      matchArgs: { field: "Section", values: ["SectionVideo"] },
      fields: [
        "Video",
        "Title",
        "DemoDate",
        "DemoList",
        "Badge",
        "DemoNum",
        "Type",
        "tags",
      ],
    },
    {
      id: "section3",
      title: "⭐ Section Rating",
      matchFactory: "matchBySectionValue",
      matchArgs: { field: "Section", values: ["SectionRating"] },
      fields: [
        "Rating",
        "Title",
        "DemoDate",
        "DemoList",
        "Badge",
        "DemoNum",
        "Type",
        "tags",
      ],
    },
    {
      id: "section4",
      title: "📊 Section Progress",
      matchFactory: "matchBySectionValue",
      matchArgs: { field: "Section", values: ["SectionProgress"] },
      fields: [
        "MyProgress",
        "Title",
        "DemoDate",
        "DemoList",
        "Badge",
        "DemoNum",
        "Type",
        "tags",
      ],
    },
    {
      id: "section5",
      title: "🧩 All in one",
      matchFactory: "matchBySectionValue",
      matchArgs: { field: "Section", values: ["All in one"] },
      fields: [
        "Poster",
        "Title",
        "DemoDate",
        "DemoList",
        "Badge",
        "Audio",
        "DemoNum",
        "Video",
        "Rating",
        "MyProgress",
        "Section",
        "Type",
        "tags",
      ],
    },
    {
      id: "section6",
      title: "🎯 Several values",
      allowDuplicates: true,
      matchFactory: "matchBySectionValue",
      matchArgs: { field: "Section", values: ["SectionRating", "SectionProgress"] },
      fields: [
        "Poster",
        "Title",
        "DemoDate",
        "DemoList",
        "Badge",
        "Audio",
        "DemoNum",
        "Video",
        "Rating",
        "MyProgress",
        "Section",
        "Type",
        "tags",
      ],
    },
    {
      id: "section7",
      title: "🎯 Exact match",
      allowDuplicates: true,
      matchFactory: "matchIfContainsAllValues",
      matchArgs: { values: ["Experimental", "Texture"] },
      fields: [
        "Poster",
        "Title",
        "DemoDate",
        "DemoList",
        "Badge",
        "Audio",
        "DemoNum",
        "Video",
        "Rating",
        "MyProgress",
        "Section",
        "Type",
        "tags",
      ],
    },
    {
      id: "favourite",
      title: "⭐ Favorite",
      styleClass: "universal-favourite",
      allowDuplicates: true,
      matchFactory: "matchBySectionValue",
      matchArgs: { field: "Favourite", values: ["Yes"] },
      fields: [
        "Poster",
        "Title",
        "DemoDate",
        "DemoList",
        "Badge",
        "Audio",
        "DemoNum",
        "Video",
        "Rating",
        "MyProgress",
        "Section",
        "Type",
        "tags",
      ],
    },
    {
      id: "top-rated",
      title: "🔥 Top Rated",
      styleClass: "universal-high-rating",
      allowDuplicates: true,
      matchFactory: "matchIfFieldCompare",
      matchArgs: { field: "Rating", operator: ">=", value: 8 },
      fields: [
        "Poster",
        "Title",
        "DemoDate",
        "DemoList",
        "Badge",
        "Audio",
        "DemoNum",
        "Video",
        "Rating",
        "MyProgress",
        "Section",
        "Type",
        "tags",
      ],
    },
    {
      id: "unsorted",
      title: "🗂 Unsorted",
      styleClass: "universal-unsorted",
      fields: [
        "Poster",
        "Title",
        "DemoDate",
        "DemoList",
        "Badge",
        "Audio",
        "DemoNum",
        "Video",
        "Rating",
        "MyProgress",
        "Section",
        "Type",
        "tags",
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
