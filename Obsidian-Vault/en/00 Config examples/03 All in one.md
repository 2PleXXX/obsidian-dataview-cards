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
//▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
// 01 📁 DATA SOURCE
//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
const config = {
  language: "en",
  checkVersion: true,

  typeFilteringEnabled: true,
  folderKeyword: "assets/YAML folder/",
  typeField: "Type",
  typeValue: ["DemoType",],

  //▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  // 02 🪟 MODAL WINDOW SETUP
  //▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  modalBehavior: "hold",

  //▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  // 03 🔢 CARD COUNTER
  //▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  cardCounter: {
    enabled: true,
    textBefore: "Total cards:",
  },

  //▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  // 04 🔍 SEARCH
  //▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  searchField: ["Title", "DemoList", "Badge",],
  searchBox: {
    placeholderText: "🔍 Search by Title, DemoList, Badge...",
  },

  //▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  // 05 🧱 SECTIONS (behavior)
  //▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  sectionBehavior: {
    rememberState: true,
    defaultOpen: false,
    lazyLoading: true,
    lazyChunkSize: 18,
    lazyPreloadChunks: 2,
  },

  //▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  // 06 🧮 SORTING
  //▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  sortButtons: [
    { label: "By title", field: "Title", emoji: "🔤" },
    { label: "By date", field: "DemoDate", emoji: "🗓️" },
    { label: "By list", field: "DemoList", emoji: "🏷️" },
    { label: "By badge", field: "Badge", emoji: "🏷️" },
    { label: "By number", field: "DemoNum", emoji: "🔢" },
    { label: "By rating", field: "Rating", emoji: "📊" },
    { label: "By progress", field: "MyProgress", emoji: "📈" },
    { label: "By tags", field: "tags", emoji: "🆙" },
    { label: "Random", special: "random", emoji: "♾️" },
    { label: "By backlinks", field: "backlinkCount", emoji: "🔁" },
  ],

  randomSortFields: ["Title", "DemoDate", "DemoList", "Badge", "DemoNum", "Rating", "MyProgress", "tags", ],
  rememberSort: true,

  //▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  // 07 🔐 FILTERING
  //▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  filtering: {
    clearTagsWarning: true,
    mode: "byTypes",
    allowedTypes: ["text", "badge", "date", "pageLink", "number", "rating", "progressBar", "link"],
    allowedFields: ["Title", "Badge", "DemoDate", "Rating",],
  },

  //▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  // 08 🖼 FIELD CREATION
  //▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
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
      display: "bullets",
      maxItems: 3,
    },
    Badge: {
      type: "badge",
      label: "Badge",
      maxItems: 3,
      styleMap: [
        { match: "Glitch", class: "my-style-glitch" },
        { match: "Cyber", class: "my-style-cyber" },
        { match: "Noise", class: "my-style-noise" },
        { match: "Experimental", class: "my-style-experimental" },
      ],
    },
    Audio: {
      type: "audio",
      label: "Audio",
    },
    DemoNum: {
      type: "number",
      label: "Number",
      emoji: "🔢",
      suffix: " money.",
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
    Section: {
      type: "text",
      label: "Section",
      emoji: "📁",
    },
    backlinkCount: {
      type: "number",
      label: "Backlinks",
      prefix: "backlinks: ",
    },
    Links: {
      type: "link",
      label: "Links",
      shortenDisplay: true,
      prefix: "🌐 ",
      linksName: [
        { match: "store.steampowered.com", label: "Steam" },
        { match: "youtube.com", label: "YouTube" },
      ],
    },
  },

  //▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
  // 09 📦 CARD SECTIONS
  //▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
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
        "Links",
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
        "Type",
        "tags",
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
