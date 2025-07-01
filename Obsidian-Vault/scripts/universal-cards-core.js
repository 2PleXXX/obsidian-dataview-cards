// ╭────────────────────────────────────────────────────────────╮
// │  Script by pleXXX                                          │
// │  💬 Telegram: t.me/sad2plexxx                              │
// │  🐙 GitHub: https://github.com/2PleXXX                     │
// │                                                            │
// │  Designed for Obsidian (Dataview + Minimal)                │
// ╰────────────────────────────────────────────────────────────╯

const SCRIPT_VERSION = "0.0.1";

// === БЛОК 1. 📋 СООТВЕТСТВИЕ СЕКЦИЯМ ===

// ✅ Validates user config for required structure, types, and references.
// Checks folder, type filtering, fields, sections, sort buttons, and more.
function validateConfig(config, dv, t) {
  const errors = [];

  // === 1. folderKeyword must be a non-empty string
  if (
    typeof config.folderKeyword !== "string" ||
    config.folderKeyword.trim() === ""
  ) {
    errors.push(t.ERRORS.MISSING_FOLDER_KEYWORD);
  }

  // === 2. Type filtering requires a valid field name and at least one string value
  if (config.typeFilteringEnabled) {
    if (!config.typeField || typeof config.typeField !== "string") {
      errors.push(t.ERRORS.MISSING_TYPE_FIELD);
    }

    if (
      !Array.isArray(config.typeValue) ||
      config.typeValue.length === 0 ||
      config.typeValue.some((v) => typeof v !== "string")
    ) {
      errors.push(t.ERRORS.INVALID_TYPE_VALUE);
    }
  }

  // === 3. fields must be a non-empty object
  if (!config.fields || typeof config.fields !== "object") {
    errors.push(t.ERRORS.MISSING_FIELDS_OBJECT);
  } else if (Object.keys(config.fields).length === 0) {
    errors.push(t.ERRORS.EMPTY_FIELDS_OBJECT);
  }

  // === 4. Each field must define a 'type'
  for (const [key, def] of Object.entries(config.fields || {})) {
    if (!def?.type) {
      errors.push(t.ERRORS.FIELD_MISSING_TYPE(key));
    }
  }

  // === 5. For 'rating' fields, maxRating must be defined and a number
  for (const [key, def] of Object.entries(config.fields || {})) {
    if (def?.type === "rating") {
      if (!def.config || typeof def.config.maxRating !== "number") {
        errors.push(t.ERRORS.RATING_MISSING_CONFIG(key));
      }
    }
  }

  // === 6. 'sections' must be a non-empty array
  if (!Array.isArray(config.sections) || config.sections.length === 0) {
    errors.push(t.ERRORS.MISSING_SECTIONS);
  }

  // === 7. Validate 'matchFactory' in each section
  const matchFactoryNames = Object.keys(matchFactories || {});
  for (const section of config.sections || []) {
    const secId = section.id || t.ERRORS.NO_SECTION_ID;
    if (
      section.hasOwnProperty("matchFactory") &&
      !matchFactoryNames.includes(section.matchFactory)
    ) {
      errors.push(
        t.ERRORS.UNKNOWN_FACTORY(
          secId,
          section.matchFactory || t.ERRORS.EMPTY_FACTORY
        )
      );
    }
  }

  // === 8. Each section must define a non-empty 'fields' array
  for (const section of config.sections || []) {
    const secId = section.id || t.ERRORS.NO_SECTION_ID;
    if (!Array.isArray(section.fields) || section.fields.length === 0) {
      errors.push(t.ERRORS.SECTION_MISSING_FIELDS(secId));
    }
  }

  // === 9. Section fields must exist in config.fields
  const definedFields = Object.keys(config.fields || {});
  for (const section of config.sections || []) {
    const secId = section.id || t.ERRORS.NO_SECTION_ID;
    for (const fieldName of section.fields || []) {
      if (!definedFields.includes(fieldName)) {
        errors.push(t.ERRORS.SECTION_UNKNOWN_FIELD(secId, fieldName));
      }
    }
  }

  // === 10. Validate searchField items are defined fields
  if (Array.isArray(config.searchField)) {
    for (const field of config.searchField) {
      if (!(field in config.fields)) {
        errors.push(t.ERRORS.SEARCHFIELD_UNKNOWN(field));
      }
    }
  }

  // === 11. Validate defaultSortField exists in config.fields
  if (config.defaultSortField && !(config.defaultSortField in config.fields)) {
    errors.push(t.ERRORS.UNKNOWN_SORT_FIELD(config.defaultSortField));
  }

  // === 12. section.id must be unique
  const seenIds = new Set();
  for (const section of config.sections || []) {
    if (seenIds.has(section.id)) {
      errors.push(t.ERRORS.DUPLICATE_SECTION_ID(section.id));
    } else {
      seenIds.add(section.id);
    }
  }

  // === 13. Ensures that 'cardCounter.textBefore' is a string if counter is enabled
  if (
    config.cardCounter?.enabled &&
    typeof config.cardCounter.textBefore !== "string"
  ) {
    errors.push(t.ERRORS.CARDCOUNTER_TEXT_BEFORE_INVALID);
  }

  // === 14. Ensures 'sortButtons' is an array and each button has a valid label string
  if (!Array.isArray(config.sortButtons)) {
    errors.push(t.ERRORS.SORTBUTTONS_NOT_ARRAY);
  } else {
    for (const btn of config.sortButtons) {
      if (typeof btn.label !== "string") {
        errors.push(t.ERRORS.SORTBUTTON_INVALID(btn?.field || btn?.label));
      }
    }
  }

  // === 15. If defined, 'sectionGroupField' must refer to an existing field
  if (
    config.sectionGroupField &&
    !(config.sectionGroupField in config.fields)
  ) {
    errors.push(t.ERRORS.UNKNOWN_SECTION_GROUP_FIELD(config.sectionGroupField));
  }

  // === 16. All fields in 'randomSortFields' must exist in the defined field list
  if (Array.isArray(config.randomSortFields)) {
    for (const field of config.randomSortFields) {
      if (!(field in config.fields)) {
        errors.push(t.ERRORS.UNKNOWN_RANDOM_SORT_FIELD(field));
      }
    }
  }

  // === 17. 'modalBehavior' must be either 'click' or 'hold' if defined
  if (
    config.modalBehavior &&
    !["click", "hold"].includes(config.modalBehavior)
  ) {
    errors.push(t.ERRORS.INVALID_MODAL_BEHAVIOR(config.modalBehavior));
  }

  // === 18. 'searchBox.placeholderText' must be a string if present
  if (
    config.searchBox?.placeholderText &&
    typeof config.searchBox.placeholderText !== "string"
  ) {
    errors.push(t.ERRORS.SEARCHBOX_PLACEHOLDER_INVALID);
  }

  // === 19. 'filtering.mode' must be one of the allowed values (byFields or byTypes)
  const allowedModes = ["byFields", "byTypes"];
  if (config.filtering?.mode && !allowedModes.includes(config.filtering.mode)) {
    errors.push(t.ERRORS.INVALID_FILTER_MODE(config.filtering.mode));
  }

  // === 20. All 'allowedFields' in filtering must reference valid field keys
  if (Array.isArray(config.filtering?.allowedFields)) {
    for (const field of config.filtering.allowedFields) {
      if (!(field in config.fields)) {
        errors.push(t.ERRORS.UNKNOWN_FILTER_FIELD(field));
      }
    }
  }

  // === 21. Each field's type must be from the list of supported field types
  const validFieldTypes = [
    "text",
    "badge",
    "date",
    "pageLink",
    "number",
    "rating",
    "progressBar",
    "image",
    "audio",
    "video",
    "tags",
    "list",
    "link",
  ];

  for (const [key, def] of Object.entries(config.fields || {})) {
    if (def?.type && !validFieldTypes.includes(def.type)) {
      errors.push(t.ERRORS.FIELD_INVALID_TYPE(key, def.type));
    }
  }

  // Each value in 'allowedTypes' must be a valid field type
  if (Array.isArray(config.filtering?.allowedTypes)) {
    for (const type of config.filtering.allowedTypes) {
      if (!validFieldTypes.includes(type)) {
        errors.push(t.ERRORS.FILTERTYPE_INVALID(type));
      }
    }
  }

  // === 22. 'styleMap' for badge fields must be an array of objects with 'match' and 'class' strings
  for (const [key, def] of Object.entries(config.fields || {})) {
    if (def.type === "badge" && def.styleMap) {
      for (const style of def.styleMap) {
        if (
          typeof style !== "object" ||
          typeof style.match !== "string" ||
          typeof style.class !== "string"
        ) {
          errors.push(t.ERRORS.BADGE_STYLEMAP_INVALID(key));
        }
      }
    }
  }

  // === 23. 'progressBar' fields must define both 'currentField' and 'maxField' in config
  for (const [key, def] of Object.entries(config.fields || {})) {
    if (def.type === "progressBar") {
      const cfg = def.config || {};
      if (!cfg.currentField || !cfg.maxField) {
        errors.push(t.ERRORS.PROGRESSBAR_MISSING_FIELDS(key));
      }
    }
  }

  // === 24. 'searchField' must not contain duplicate field names
  if (Array.isArray(config.searchField)) {
    const seen = new Set();
    for (const field of config.searchField) {
      if (seen.has(field)) {
        errors.push(t.ERRORS.SEARCHFIELD_DUPLICATE(field));
      } else {
        seen.add(field);
      }
    }
  }

  // === 25. Each section must have a non-empty string 'id'
  for (const section of config.sections || []) {
    if (typeof section.id !== "string" || section.id.trim() === "") {
      errors.push(t.ERRORS.SECTION_ID_INVALID());
    }
  }

  // === If any validation errors exist, display them as an HTML error box and stop execution
  if (errors.length > 0) {
    const msg = `
      <div class="universal-error-box">
        <h3>🧨 ${t.UI.CONFIG_ERROR_TITLE}</h3>
        <ul>${errors.map((e) => `<li>${e}</li>`).join("")}</ul>
        <p>⚠️ ${t.UI.SCRIPT_STOPPED}</p>
      </div>`;
    dv.container.innerHTML += msg;
    return false;
  }

  return true;
}

// 📁 Checks whether a file path starts with the specified folder keyword.
function isInFolder(filePath, folderKeyword) {
  if (!filePath || !folderKeyword) return false;

  const normalizedPath = filePath.toLowerCase().replace(/\\/g, "/");
  const normalizedFolder =
    folderKeyword.toLowerCase().replace(/\\/g, "/").replace(/\/+$/, "") + "/";

  return normalizedPath.startsWith(normalizedFolder);
}

// 🧠 Attaches .match functions to config.sections using declared factories and arguments.
function initializeSectionMatches(config) {
  for (const section of config.sections) {
    const factoryName = section.matchFactory;
    if (!factoryName) continue;

    const factory = matchFactories[factoryName];
    if (!factory) {
      continue;
    }

    // Поддержка разных форматов matchArgs:
    if (Array.isArray(section.matchArgs)) {
      // Старый способ (массив аргументов)
      section.match = factory(config, ...section.matchArgs);
    } else if (
      typeof section.matchArgs === "object" &&
      section.matchArgs !== null
    ) {
      // Новый способ (объект аргументов)
      section.match = factory(config, section.matchArgs);
    } else {
      // Нет аргументов
      section.match = factory(config);
    }
  }
}

// 🏗️ Collection of factory functions to build dynamic section matchers.
// Used in config.matchFactory for filtering cards by field values.
const matchFactories = {
  matchBySectionValue: (config, args) => (page) => {
    const field = args.field;
    const targetValues = (args.values || []).map(String);

    const rawValue = page[field];
    if (rawValue === undefined || rawValue === null) return false;

    const pageValues = Array.isArray(rawValue)
      ? rawValue.map((v) => String(v).trim())
      : [String(rawValue).trim()];

    return pageValues.some((val) => targetValues.includes(val));
  },

  matchIfFieldCompare: (config, args) => {
    return (page) => {
      const fieldName = args.field;
      const threshold = args.value;
      const operator = args.operator ?? ">=";

      const def = config.fields?.[fieldName];
      if (!def || (def.type !== "rating" && def.type !== "number"))
        return false;

      let value = page[fieldName];
      if (Array.isArray(value)) value = value[0];
      if (typeof value === "string") {
        value = parseFloat(value.replace(",", "."));
      }

      if (typeof value !== "number" || isNaN(value)) return false;

      switch (operator) {
        case ">":
          return value > threshold;
        case ">=":
          return value >= threshold;
        case "<":
          return value < threshold;
        case "<=":
          return value <= threshold;
        case "!=":
          return value !== threshold;
        case "=":
        case "==":
          return value === threshold;
        default:
          return false;
      }
    };
  },

  matchIfContainsAllValues: (config, args) => {
    return (page) => {
      const requiredValues = args.values || [];
      const allValues = [];

      // Собираем ВСЕ значения всех полей карточки
      for (const key in page) {
        const val = page[key];
        if (val === undefined || val === null) continue;

        if (Array.isArray(val)) {
          allValues.push(...val.map((v) => String(v).trim()));
        } else {
          allValues.push(String(val).trim());
        }
      }

      // Проверяем, что ВСЕ requiredValues найдены в allValues
      return requiredValues.every((value) =>
        allValues.includes(String(value).trim())
      );
    };
  },
};

// 🚫 Checks if a value is considered "blank": null, empty string, or empty array.
function isBlank(val) {
  return (
    val == null ||
    (typeof val === "string" && val.trim() === "") ||
    (Array.isArray(val) && val.filter((v) => v?.trim?.() !== "").length === 0)
  );
}

// 🚀 Main entry point of the script. Initializes config, runs validations, matchers, and rendering logic.
function runUniversalCards(dv, inputConfig = {}) {
  dv.container.classList.add("universal-cards-root");
  const langCode = inputConfig.language || "en";
  const t =
    (window.UNIVERSAL_CARDS_LANG?.[langCode] ||
      window.UNIVERSAL_CARDS_LANG?.["en"]) ??
    {};

  const isValid = validateConfig(inputConfig, dv, t);
  if (!isValid) return;

  let cachedVersionData = {
    version: null,
    timestamp: 0,
  };

  // 🔄 Checks GitHub for script updates and shows a notice if a newer version is available.
  async function checkForScriptUpdates(dv, t) {
    const VERSION_INFO_URL =
      "https://raw.githubusercontent.com/2PleXXX/obsidian-dataview-cards2/refs/heads/main/version.json"; // сравнение версий
    const GITHUB_REPOSITORY =
      "https://github.com/2PleXXX/obsidian-dataview-cards2"; // ссылка на репозиторий
    const SCRIPT_FILE_URL =
      "https://github.com/2PleXXX/obsidian-dataview-cards2/blob/main/universal-cards-core.js"; // ссылка на файл скрипта

    try {
      if (!dv?.container) return;

      let versionContainer = dv.container.querySelector(
        ".universal-version-wrapper"
      );
      if (!versionContainer) {
        versionContainer = document.createElement("div");
        versionContainer.className = "universal-version-wrapper";
        dv.container.prepend(versionContainer);
      }

      if (!versionContainer.querySelector(".universal-script-version")) {
        const versionDiv = document.createElement("div");
        versionDiv.className = "universal-script-version";
        const label = t?.UPDATES?.CURRENT_VERSION_LABEL || "Version:";
        versionDiv.innerHTML = `${label} <a href="${GITHUB_REPOSITORY}" target="_blank">${SCRIPT_VERSION}</a>`;
        versionContainer.appendChild(versionDiv);
      }

      const now = Date.now();
      const TTL = 60 * 1000; // 1 minute

      if (
        !cachedVersionData.version ||
        now - cachedVersionData.timestamp > TTL
      ) {
        const res = await fetch(VERSION_INFO_URL);
        if (!res.ok) throw new Error("Version file fetch failed");

        const data = await res.json();
        cachedVersionData.version = data.version;
        cachedVersionData.timestamp = now;
      }

      const latestVersion = cachedVersionData.version;

      if (
        compareVersions(SCRIPT_VERSION, latestVersion) < 0 &&
        !versionContainer.querySelector(".universal-update-notice")
      ) {
        const notice = document.createElement("div");
        notice.className = "universal-update-notice";
        const updateText =
          t?.UPDATES?.NEW_VERSION_NOTICE?.(latestVersion) ||
          `New version available: ${latestVersion}`;
        const updateLinkText = t?.UPDATES?.UPDATE_LINK_LABEL || "Update";
        notice.innerHTML = `🆕 ${updateText} &nbsp; <a href="${SCRIPT_FILE_URL}" target="_blank">${updateLinkText}</a>`;
        versionContainer.appendChild(notice);
      }
    } catch (e) {
      console.error(
        `💥 ${
          t?.UPDATES?.UPDATE_CHECK_ERROR?.(e.message) || "Update check failed"
        }`
      );
    }
  }

  // 🔢 Compares two version strings ("1.2.3" style). Returns -1, 0, or 1.
  function compareVersions(a, b) {
    const pa = a.split(".").map(Number);
    const pb = b.split(".").map(Number);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
      const diff = (pa[i] || 0) - (pb[i] || 0);
      if (diff) return diff < 0 ? -1 : 1;
    }
    return 0;
  }

  const config = inputConfig;

  // Проверка на ошибки
  if (!validateConfig(config, dv)) return; // ⛔ мягкая остановка

  // ✅ Подключаем матч-функции для всех секций
  initializeSectionMatches(config);

  // ➕ Инициализация .match для unsorted вручную:
  const unsortedSection = config.sections.find((s) => s.id === "unsorted");
  if (unsortedSection) {
    unsortedSection.match = (page) => {
      return !config.sections.some((section) => {
        if (section === unsortedSection) return false;
        if (typeof section.match !== "function") return false;
        return section.match(page, config);
      });
    };
  }

  // === ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ СОСТОЯНИЯ ===
  let currentSortField =
    config.sortButtons?.[0]?.field ||
    config.sortButtons?.[0]?.special ||
    "fileName";
  let currentSortOrder = config.sortButtons?.[0]?.order || "asc";

  let currentSearchQuery = "";

  // === БЛОК 2. 🔧 УТИЛИТЫ ===

  // 🔍 Checks if a page matches config.typeField and config.typeValue criteria.
  function matchesTypeFilter(page, config) {
    if (!config.typeFilteringEnabled) return true;

    const pageVal = page[config.typeField];

    // Если поле отсутствует — исключаем карточку
    if (pageVal === undefined || pageVal === null) return false;

    // Преобразуем config.typeValue в массив строк (в нижнем регистре)
    const expectedValues = Array.isArray(config.typeValue)
      ? config.typeValue.map((v) => String(v).toLowerCase())
      : [String(config.typeValue).toLowerCase()];

    // Преобразуем YAML-значение в массив строк
    const actualValues = Array.isArray(pageVal)
      ? pageVal.map((v) => String(v).toLowerCase())
      : [String(pageVal).toLowerCase()];

    // Проверяем: есть ли хотя бы одно совпадение
    return expectedValues.some((val) => actualValues.includes(val));
  }

  // 🧼 Normalizes a value into an array of clean strings. Accepts strings, arrays, or pageLinks.
  const getCleanedStringList = (val) => {
    if (!val) return [];

    // Если это массив - обрабатываем каждый элемент
    if (Array.isArray(val)) {
      return val
        .filter((item) => item != null && item !== "")
        .map((item) => {
          if (typeof item === "string") {
            return item.trim();
          }
          // Если это объект с путем (иногда Obsidian возвращает такие)
          if (typeof item === "object" && item?.path) {
            return item.path;
          }
          return item;
        })
        .filter((item) => item !== "");
    }

    // Если это строка
    if (typeof val === "string") {
      const trimmed = val.trim();
      if (trimmed === "") return [];

      // Проверяем паттерны, которые указывают на множественные элементы:
      // 1. Есть запятая вне квадратных скобок Obsidian
      // 2. Есть переносы строк
      const hasMultipleItems =
        trimmed.includes("\n") ||
        (trimmed.includes(",") &&
          !isObsidianLinkOnly(trimmed) &&
          !trimmed.startsWith("![](")); // <-- markdown image/audio/video

      if (hasMultipleItems) {
        // Разбиваем по запятым или переносам строк
        const delimiter = trimmed.includes("\n") ? "\n" : ",";
        return trimmed
          .split(delimiter)
          .map((item) => item.trim())
          .filter((item) => item !== "");
      }

      // Иначе это одиночный элемент
      return [trimmed];
    }

    // Если это объект с путем
    if (typeof val === "object" && val?.path) {
      return [val.path];
    }

    return [];
  };

  // Вспомогательная функция для определения, является ли строка одиночной ссылкой Obsidian
  const isObsidianLinkOnly = (str) => {
    // Убираем пробелы и проверяем паттерны
    const trimmed = str.trim();

    // Если строка начинается и заканчивается как ссылка Obsidian
    if (trimmed.startsWith("![[") && trimmed.endsWith("]]")) {
      // Проверяем, что это действительно одна ссылка
      const openBrackets = (trimmed.match(/!\[\[/g) || []).length;
      const closeBrackets = (trimmed.match(/\]\]/g) || []).length;
      return openBrackets === 1 && closeBrackets === 1;
    }

    // Если это обычная ссылка Obsidian без !
    if (trimmed.startsWith("[[") && trimmed.endsWith("]]")) {
      const openBrackets = (trimmed.match(/\[\[/g) || []).length;
      const closeBrackets = (trimmed.match(/\]\]/g) || []).length;
      return openBrackets === 1 && closeBrackets === 1;
    }

    // Если это URL
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return (
        !trimmed.includes(",") || trimmed.indexOf(",") > trimmed.indexOf(" ")
      );
    }

    return false;
  };

  // ➕ Adds prefix and suffix from field definition to the main value.
  const applyPrefixAndSuffix = (value, def) => {
    const prefix = def?.prefix || "";
    const suffix = def?.suffix || "";
    return `${prefix}${value}${suffix}`;
  };

  // 📂 Resolves a file from a raw value like string path, embedded link, or object with .path.
  const resolveFileFromRaw = (raw) => {
    const currentPath = dv.current()?.file?.path;

    let files = app.vault.getFiles();

    // === 1. Если это объект { path: ... }
    if (typeof raw === "object" && raw.path) {
      let foundByPath = files.find((f) => f.path === raw.path);
      if (foundByPath) return foundByPath;

      const fileName = raw.path.split("/").pop();
      let foundByName = files.find((f) => f.name === fileName);

      return foundByPath || foundByName || null;
    }

    // === 2. Если это строка
    if (typeof raw === "string") {
      let cleaned = raw.trim();

      // --- a) wiki-ссылки ![[...]]
      const wikiMatch = cleaned.match(/!\[\[(.*?)\]\]/);
      if (wikiMatch) cleaned = wikiMatch[1];

      // --- b) markdown-ссылки ![](...)
      const markdownMatch = cleaned.match(/!\[\]\((.*?)\)/);
      if (markdownMatch) cleaned = markdownMatch[1];

      // Декодируем URI, убираем \, нормализуем
      try {
        const decoded = decodeURIComponent(cleaned);
        const normalized = decoded.replace(/\\/g, "/");

        let found = files.find(
          (f) =>
            f.path === normalized || f.name === normalized || f.name === decoded
        );
        if (found) return found;
      } catch (e) {
        console.warn("decodeURIComponent error:", e);
      }

      // Попробуем найти через метаданные Obsidian
      const fromMetadata = app.metadataCache.getFirstLinkpathDest(
        cleaned,
        currentPath
      );
      if (fromMetadata) return fromMetadata;

      // Финальный ручной поиск
      const normalized = cleaned.replace(/\\/g, "/");
      let foundByPath = files.find((f) => f.path === normalized);
      if (foundByPath) return foundByPath;

      const fileName = normalized.split("/").pop();
      let foundByName = files.find((f) => f.name === fileName);

      return foundByPath || foundByName || null;
    }

    return null;
  };

  // 🆔 Generates a unique ID for a DOM element based on page and field.
  const getSafeId = (page, key, prefix = "id") => {
    const base = page?.file?.name?.replace(/[^a-zA-Z0-9_-]/g, "") || "page";
    const unique =
      crypto.randomUUID?.() || Math.random().toString(36).substring(2, 10);
    return `${prefix}-${base}-${key}-${unique}`;
  };

  // Для работы с виртуальными полями
  function enrichVirtualFields(pages, config) {
    for (const page of pages) {
      for (const [fieldName, def] of Object.entries(config.fields)) {
        // Виртуальное поле: backlinkCount
        if (fieldName === "backlinkCount" && def.type === "number") {
          const filePath = page?.file?.path;
          if (!filePath) {
            page[fieldName] = 0;
            continue;
          }

          const backlinks = app.metadataCache.resolvedLinks || {};

          // Считаем ВСЕ ссылки на текущий файл из всего vault-а
          let count = 0;
          for (const [sourcePath, targets] of Object.entries(backlinks)) {
            if (targets && targets[filePath]) {
              count += targets[filePath];
            }
          }

          page[fieldName] = count;
        }

        // Виртуальные поля pageLink

        if (def.type === "pageLink") {
          if (isBlank(page[fieldName])) {
            page[fieldName] = page.file.name.replace(/\.md$/, "");
          }
        }

        // Виртуальные поля progressBar
        if (def.type === "progressBar") {
          const currentKey = def?.config?.currentField;
          const maxKey = def?.config?.maxField;

          const rawCurrent = page[currentKey];
          const rawMax = page[maxKey];

          const current = parseFloat(
            Array.isArray(rawCurrent) ? rawCurrent[0] : rawCurrent
          );
          const max = parseFloat(Array.isArray(rawMax) ? rawMax[0] : rawMax);

          if (!isNaN(current) && !isNaN(max) && max > 0) {
            const percent = Math.min(100, Math.round((current / max) * 100));
            // Вставляем значение в page — для фильтров и поиска
            page[fieldName] = percent;
          } else {
            // Можно вставить пустое значение, чтобы фильтры понимали что поле есть
            page[fieldName] = "";
          }
        }
      }
    }
  }

  // === БЛОК 3. 🧮 СОРТИРОВКА И ФИЛЬТРАЦИЯ ===

  // 🔢 Parses a numeric value safely from strings, arrays, etc.
  const parseNumberSafe = (val) => {
    if (Array.isArray(val)) val = val[0];
    if (typeof val === "string") val = val.replace(",", ".");
    return parseFloat(val);
  };

  // ❓ Checks if a numeric value is empty or invalid for sorting.
  const isBlankNumber = (val) => {
    if (val === undefined || val === null) return true;
    if (Array.isArray(val)) val = val[0];
    if (typeof val === "string") val = val.trim();
    if (val === "") return true;

    const num = parseFloat(val.toString().replace(",", "."));
    return isNaN(num);
  };

  // 🔠 Extracts a string value from a field for sorting, with fallbacks.
  const getSortableValue = (page, field) => {
    let raw = page[field];
    if (Array.isArray(raw)) raw = raw[0];

    if (typeof raw === "string" && raw.trim() !== "") return raw.trim();
    if (typeof raw === "object" && raw?.path) return raw.path.split("/").pop();

    return page.file.name.replace(/\.md$/, "");
  };

  // ↕️ Compares two values with blank values pushed to the end of the list.
  function compareWithBlankLast(aVal, bVal, parser, order = "asc") {
    // Значение считается "пустым", если оно undefined, null, пустая строка или пустой массив
    const isTrulyBlank = (val) =>
      val === undefined ||
      val === null ||
      val === "" ||
      (Array.isArray(val) && val.length === 0);

    // сначала выносим все пустые
    const aIsBlank = isTrulyBlank(aVal);
    const bIsBlank = isTrulyBlank(bVal);

    if (aIsBlank && bIsBlank) return 0;
    if (aIsBlank) return 1;
    if (bIsBlank) return -1;

    // обрабатываем дальше только если оба НЕ пустые
    const aParsed = parser(aVal);
    const bParsed = parser(bVal);

    return order === "asc" ? aParsed - bParsed : bParsed - aParsed;
  }

  // 📊 Sorts pages by current field or special rules (length, random, date, etc.).
  const sortPages = (pages) => {
    if (!Array.isArray(config.sortButtons) || config.sortButtons.length === 0) {
      // fallback: сортируем по имени файла
      return [...pages].sort((a, b) => {
        const aName = (a.file.name || "").toLowerCase();
        const bName = (b.file.name || "").toLowerCase();
        return aName.localeCompare(bName);
      });
    }

    const sortDef = config.sortButtons.find(
      (b) => b.field === currentSortField || b.special === currentSortField
    );

    if (!sortDef) return [...pages];

    // === СЛУЧАЙНАЯ СОРТИРОВКА
    if (sortDef.special === "random") {
      return [...pages].sort(() => Math.random() - 0.5);
    }

    // === ПОЛУЧАЕМ ДЕФИНИЦИЮ ПОЛЯ ИЗ КОНФИГА
    const fieldDef = config.fields?.[currentSortField];
    const fieldType = fieldDef?.type;

    return [...pages].sort((a, b) => {
      let aVal = a[currentSortField];
      let bVal = b[currentSortField];

      if (Array.isArray(aVal)) aVal = aVal[0];
      if (Array.isArray(bVal)) bVal = bVal[0];

      // === 📊 СОРТИРОВКА ДЛЯ РЕЙТИНГА
      if (fieldType === "rating") {
        return compareWithBlankLast(
          aVal,
          bVal,
          parseNumberSafe,
          currentSortOrder
        );
      }

      // === 🧮 СОРТИРОВКА ДЛЯ ЧИСЛОВОГО ПОЛЯ
      if (fieldType === "number") {
        if (isBlankNumber(aVal) && isBlankNumber(bVal)) return 0;
        if (isBlankNumber(aVal)) return 1;
        if (isBlankNumber(bVal)) return -1;

        const aNum = parseNumberSafe(aVal);
        const bNum = parseNumberSafe(bVal);
        return currentSortOrder === "asc" ? aNum - bNum : bNum - aNum;
      }

      // === 📈 СОРТИРОВКА ДЛЯ ПРОГРЕССА
      if (fieldType === "progressBar") {
        const currentKey = fieldDef?.config?.currentField;
        const maxKey = fieldDef?.config?.maxField;

        const aCurr = parseNumberSafe(a[currentKey]);
        const aMax = parseNumberSafe(a[maxKey]);
        const bCurr = parseNumberSafe(b[currentKey]);
        const bMax = parseNumberSafe(b[maxKey]);

        const isBlank = (curr, max) =>
          curr === undefined ||
          max === undefined ||
          isNaN(curr) ||
          isNaN(max) ||
          max <= 0;

        if (isBlank(aCurr, aMax) && isBlank(bCurr, bMax)) return 0;
        if (isBlank(aCurr, aMax)) return 1;
        if (isBlank(bCurr, bMax)) return -1;

        const aRatio = aCurr / aMax;
        const bRatio = bCurr / bMax;

        return currentSortOrder === "asc" ? aRatio - bRatio : bRatio - aRatio;
      }

      // === 🗓️ ЕСЛИ ТИП ПОЛЯ — DATE
      if (fieldType === "date") {
        const isBlankDate = (val) =>
          val === undefined ||
          val === null ||
          val === "" ||
          isNaN(Date.parse(val));

        if (isBlankDate(aVal) && isBlankDate(bVal)) return 0;
        if (isBlankDate(aVal)) return 1; // всегда в конец
        if (isBlankDate(bVal)) return -1; // всегда в конец

        const aDate = Date.parse(aVal);
        const bDate = Date.parse(bVal);
        return currentSortOrder === "asc" ? aDate - bDate : bDate - aDate;
      }

      // === ОБЫЧНАЯ ТЕКСТОВАЯ СОРТИРОВКА
      const aStr = (getSortableValue(a, currentSortField) || "").toLowerCase();
      const bStr = (getSortableValue(b, currentSortField) || "").toLowerCase();
      const cmp = aStr.localeCompare(bStr);
      return currentSortOrder === "asc" ? cmp : -cmp;
    });
  };

  // 🧃 Applies advanced filtering rules (whitelist/blacklist logic) to the list of pages.
  const applyFilters = (pages, config) => {
    const cache = getCardScriptCache(dv.current()?.file?.path || "default");
    const filterState = cache.filterState;

    if (
      !filterState ||
      !Array.isArray(filterState.rules) ||
      filterState.rules.length === 0
    ) {
      return pages;
    }

    const logic = filterState.matchLogic || "any";

    // === Группируем правила по полям ===
    const groupedRules = {};
    for (const rule of filterState.rules) {
      if (!groupedRules[rule.field]) {
        groupedRules[rule.field] = {
          whitelist: new Set(),
          blacklist: new Set(),
        };
      }
      for (const val of rule.values) {
        groupedRules[rule.field][rule.mode].add(val);
      }
    }

    return pages.filter((page) => {
      const fieldResults = [];

      for (const field in groupedRules) {
        const valueRaw = page[field];
        if (valueRaw === undefined) {
          fieldResults.push(false);
          continue;
        }

        const values = Array.isArray(valueRaw)
          ? valueRaw.map(String)
          : [String(valueRaw)];
        const { whitelist, blacklist } = groupedRules[field];

        let passed = true;

        // === Сначала whitelist ===
        if (whitelist.size > 0) {
          if (filterState.matchLogic === "all") {
            // ✅ AND: все теги из whitelist должны быть в карточке
            passed = Array.from(whitelist).every((tag) => values.includes(tag));
          } else {
            // ✅ OR: хотя бы один тег из whitelist
            passed = values.some((v) => whitelist.has(v));
          }
        }

        // === Потом blacklist ===
        if (passed && blacklist.size > 0) {
          const blacklistMatch =
            filterState.matchLogic === "all"
              ? Array.from(blacklist).every((tag) => values.includes(tag))
              : values.some((v) => blacklist.has(v));

          if (blacklistMatch) passed = false;
        }

        fieldResults.push(passed);
      }

      return logic === "all"
        ? fieldResults.every(Boolean)
        : fieldResults.some(Boolean);
    });
  };

  // 🔤 Performs basic text search on configured fields, independent of filters.
  const filterPages = (allPages, query) => {
    const fields = Array.isArray(config.searchField)
      ? config.searchField
      : [config.searchField];

    return allPages.where((p) => {
      return fields.some((field) => {
        const val = p[field];
        const str = Array.isArray(val) ? val.join(", ") : String(val || "");
        return str.toLowerCase().includes(query.toLowerCase());
      });
    });
  };

  // === БЛОК 4. 🧠 КЭШ И СОСТОЯНИЕ ===

  // 💾 Builds a unique localStorage key for slider state based on vault and file path.
  const getSliderStorageKey = (page, key) => {
    const pagePath = page?.file?.path || "unknown";
    const vaultName = app.vault.getName(); // ✅ название текущего Vault
    return `universal-slider-${vaultName}-${pagePath}-${key}`;
  };

  // 💽 Stores current slider index in localStorage for persistence.
  const saveSliderPosition = (sliderId, index, storageKey) => {
    try {
      localStorage.setItem(storageKey, index.toString());
    } catch (error) {
      // console.warn("Не удалось сохранить позицию слайдера:", error);
    }
  };

  // 🔄 Retrieves saved slider index from localStorage or returns 0 if missing.
  const loadSliderPosition = (storageKey) => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? parseInt(saved, 10) : 0;
    } catch (error) {
      // console.warn("Не удалось загрузить позицию слайдера:", error);
      return 0;
    }
  };

  // 🧠 Gets or initializes a shared state cache for the current note.
  const getCardScriptCache = (path) => {
    if (!window.cardScriptCache) window.cardScriptCache = {};
    if (!window.cardScriptCache[path]) window.cardScriptCache[path] = {};
    return window.cardScriptCache[path];
  };

  // 👁️ Waits for a DOM element with given ID to appear, then runs callback.
  const observeForImage = (id, callback) => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === 1 && node.id === id) {
            observer.disconnect();
            callback(node);
            return;
          }
          const found = node.querySelector?.(`#${id}`);
          if (found) {
            observer.disconnect();
            callback(found);
            return;
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Если уже в DOM — вызвать сразу
    const existing = document.getElementById(id);
    if (existing) {
      observer.disconnect();
      callback(existing);
    }
  };

  // === БЛОК 5. 🪟 МОДАЛЬНЫЕ ОКНА ===

  // 🪟 Creates or replaces a full-screen modal for displaying an image.
  const ensureModal = (config) => {
    const existing = document.getElementById("universal-modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    const path = dv.current()?.file?.path || "default";
    const modalId = `universal-modal-${path.replace(/[^\w-]/g, "_")}`;
    modal.id = modalId;
    modal.className = resolveCssClass(
      config.modalStyleClasses?.modalClass,
      "universal-modal"
    );

    // === КРИТИЧЕСКИ ВАЖНЫЕ СТИЛИ (НЕ УДАЛЯТЬ! КОММЕНТАРИИ НЕ ТРОГАТЬ) ===
    Object.assign(modal.style, {
      display: "none", // Не отображать по умолчанию
      position: "fixed", // Фиксированная позиция поверх всего
      inset: 0, // Растянуть на весь экран (top/right/bottom/left = 0)
      zIndex: "9999", // Поверх всех элементов
    });

    const modalImg = document.createElement("img");
    modalImg.className = "universal-modal-full";

    modalImg.alt = "Poster";
    modalImg.draggable = false;

    modal.appendChild(modalImg);
    document.body.appendChild(modal);

    // Закрытие модалки по клику вне изображения
    modal.addEventListener("mouseup", () => {
      modal.style.display = "none";
    });
  };

  // 🌄 Shows modal with image once it is loaded.
  const showModal = (src, config) => {
    const path = dv.current()?.file?.path || "default";
    const modalId = `universal-modal-${path.replace(/[^\w-]/g, "_")}`;
    const modal = document.getElementById(modalId);
    const img = modal?.querySelector("img");

    if (modal && img) {
      img.onload = () => {
        modal.style.display = "flex";
      };
      img.src = src;
    }
  };

  // 🖱️ Attaches event listeners to images for modal opening (click/hold mode).
  const activateModalHandlers = (config) => {
    const cache = getCardScriptCache(dv.current()?.file?.path || "default");

    if (!cache.imageIds) return;

    for (const id of cache.imageIds) {
      observeForImage(id, (img) => {
        const src = img.src;
        if (img.dataset.modalAttached === "true") return;
        img.dataset.modalAttached = "true";

        if (config.modalBehavior === "hold") {
          img.addEventListener("mousedown", (e) => {
            e.preventDefault();
            showModal(src, config);

            const onMouseUp = () => {
              const path = dv.current()?.file?.path || "default";
              const modalId = `universal-modal-${path.replace(/[^\w-]/g, "_")}`;
              const modal = document.getElementById(modalId);
              if (modal) modal.style.display = "none";

              document.removeEventListener("mouseup", onMouseUp);
            };

            document.addEventListener("mouseup", onMouseUp);
          });
        } else {
          img.addEventListener("click", (e) => {
            e.preventDefault();
            showModal(src, config);
          });
        }
      });
    }
  };

  // 🧰 Renders the full-screen filter modal.
  // Allows selecting a field, entering tag values, switching between whitelist/blacklist, and match logic.
  // Automatically saves state and reacts to file switch in the same pane.
  const renderFilterModal = (config, onClose) => {
    let clearAllBtn;

    const cache = getCardScriptCache(dv.current()?.file?.path || "default");

    const pendingFilterState = JSON.parse(
      JSON.stringify(
        cache.filterState || {
          rules: [],
          matchLogic: "any",
          filterMode: "whitelist",
        }
      )
    );

    let currentMode = pendingFilterState.filterMode || "whitelist";
    let currentLogic = pendingFilterState.matchLogic || "any";

    const pages = dv
      .pages()
      .where((p) => isInFolder(p.file?.path, config.folderKeyword))
      .where((p) => matchesTypeFilter(p, config)).values;

    enrichVirtualFields(pages, config);

    const existing = document.getElementById("universal-filter-modal");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.id = "universal-filter-modal";
    overlay.className = "universal-modal-overlay";

    // Найдём ближайшую панель, чтобы не перекрывать весь экран
    const parentPanel = dv.container.closest(".view-content");
    parentPanel.style.position = "relative"; // ВАЖНО!
    parentPanel.appendChild(overlay);

    // Содержимое окна
    const modal = document.createElement("div");
    modal.className = "universal-filter-modal-content";

    // Кнопка-крестик
    const closeX = document.createElement("button");
    closeX.className = "universal-filter-close";
    closeX.textContent = "×";
    closeX.onclick = () => {
      overlay.remove();
      app.workspace.off("active-leaf-change", detachHandler);
    };
    modal.appendChild(closeX);

    const title = document.createElement("h2");
    title.textContent = t.UI.FILTER.TITLE;
    modal.appendChild(title);

    const note = document.createElement("p");
    note.textContent = t.UI.FILTER.DESCRIPTION;
    modal.appendChild(note);

    //Скрытие списка подсказок
    const hideSuggestions = () => {
      suggestionList.innerHTML = "";
      suggestionList.style.display = "none";
    };

    // === Список полей ===
    const fieldSelectWrapper = document.createElement("div");
    fieldSelectWrapper.classList.add("universal-input-wrapper");

    const fieldLabel = document.createElement("label");
    fieldLabel.textContent = t.UI.FILTER.FIELD_LABEL;
    fieldLabel.className = "universal-label";
    fieldLabel.htmlFor = "universal-filter-field-select";

    const fieldSelect = document.createElement("select");
    fieldSelect.id = "universal-filter-field-select";
    fieldSelect.className = "universal-select";
    fieldSelect.dataset.lastField = fieldSelect.value;

    // Список допустимых типов полей и полей
    let eligibleFields = [];

    if (config.filtering?.mode === "byFields") {
      const allowedFields = config.filtering.allowedFields || [];
      eligibleFields = Object.entries(config.fields).filter(([key]) =>
        allowedFields.includes(key)
      );
    } else {
      const allowedTypes = config.filtering?.allowedTypes || [
        "text",
        "badge",
        "list",
        "pageLink",
      ];
      eligibleFields = Object.entries(config.fields).filter(([_, def]) =>
        allowedTypes.includes(def.type)
      );
    }

    // Добавляем поля
    for (const [field, def] of eligibleFields) {
      const option = document.createElement("option");
      option.value = field;
      option.textContent = def.label || field;
      fieldSelect.appendChild(option);
    }

    //Поле по умолчанию для фильтрации.
    if (eligibleFields.length > 0) {
      const defaultField = eligibleFields[0][0];
      fieldSelect.value = defaultField;
      fieldSelect.dataset.lastField = defaultField;
    }

    // Вставляем в DOM
    fieldSelectWrapper.appendChild(fieldLabel);
    fieldSelectWrapper.appendChild(fieldSelect);
    modal.appendChild(fieldSelectWrapper);

    fieldSelect.addEventListener("change", () => {
      suggestionList.style.display = "none";

      // Если нет тегов — просто обновить текущее выбранное поле
      if (currentTags.length === 0) {
        fieldSelect.dataset.lastField = fieldSelect.value;
        return;
      }

      const prevField = fieldSelect.dataset.lastField || fieldSelect.value;
      const values = [...currentTags];
      const mode = currentMode;

      if (!Array.isArray(pendingFilterState.rules)) {
        pendingFilterState.rules = [];
      }

      const existingIndex = pendingFilterState.rules.findIndex(
        (r) => r.field === prevField && r.mode === mode
      );

      if (existingIndex !== -1) {
        const oldValues = pendingFilterState.rules[existingIndex].values;
        const combined = Array.from(new Set([...oldValues, ...values]));
        pendingFilterState.rules[existingIndex].values = combined;
      } else {
        pendingFilterState.rules.push({ field: prevField, values, mode });
      }

      currentTags = [];
      renderTags();
      updateActiveFilters();

      fieldSelect.dataset.lastField = fieldSelect.value;
    });

    fieldSelect.dataset.lastField = fieldSelect.value;

    // === Ввод значений (теги) ===
    const valueInputWrapper = document.createElement("div");
    valueInputWrapper.classList.add("universal-input-wrapper");

    const valueLabel = document.createElement("label");
    valueLabel.textContent = t.UI.FILTER.VALUE_LABEL;
    valueLabel.className = "universal-label";

    const tagInputContainer = document.createElement("div");
    tagInputContainer.className = "universal-tag-input-container";

    const tagList = document.createElement("div");
    tagList.className = "universal-tag-list";

    const tagInput = document.createElement("input");
    tagInput.type = "text";
    tagInput.placeholder = t.UI.FILTER.VALUE_PLACEHOLDER;
    tagInput.className = "universal-tag-input";

    // ⬇️ создаём один раз, глобально
    const suggestionList = document.createElement("div");
    suggestionList.className = "universal-suggestion-list";
    suggestionList.style.display = "none";

    tagInputContainer.appendChild(tagList);
    tagInputContainer.appendChild(tagInput);

    tagInputContainer.appendChild(suggestionList);

    // Список текущих тегов
    let currentTags = [];

    // Добавление тега
    const addTag = (value) => {
      const trimmed = value.trim();

      if (!trimmed || currentTags.includes(trimmed)) return;

      currentTags.push(trimmed);
      renderTags();
      tagInput.value = "";
      hideSuggestions();

      updateActiveFilters();
    };

    // Отображение тегов
    const renderTags = () => {
      tagList.innerHTML = "";
      for (const tag of currentTags) {
        const tagEl = document.createElement("span");
        tagEl.className = "universal-tag";
        tagEl.textContent = tag;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "×";
        removeBtn.className = "universal-tag-remove";
        removeBtn.onclick = () => {
          currentTags = currentTags.filter((t) => t !== tag);
          renderTags();
        };

        tagEl.appendChild(removeBtn);
        tagList.appendChild(tagEl);
      }
    };

    //отображение подсказок
    const renderSuggestions = (fieldName) => {
      suggestionList.innerHTML = "";
      suggestionList.style.display = "none";

      const alreadySelected = new Set();
      if (Array.isArray(pendingFilterState?.rules)) {
        for (const rule of pendingFilterState.rules) {
          if (rule.field === fieldName && Array.isArray(rule.values)) {
            for (const val of rule.values) {
              alreadySelected.add(val.toLowerCase());
            }
          }
        }
      }

      // --- Всё, что ниже — выполняется ТОЛЬКО при конкретном поле ---
      let suggestions = pages
        .map((p) => p[fieldName])
        .flat()
        .filter(Boolean);

      suggestions = suggestions.map((val) => {
        if (typeof val === "object" && val !== null) {
          if (val.path) return val.path;
          if (val.name) return val.name;
          return JSON.stringify(val);
        }
        return String(val);
      });

      const unique = Array.from(new Set(suggestions));
      const inputText = tagInput.value.toLowerCase();
      const currentTagsLower = currentTags.map((t) => t.toLowerCase());

      const appliedTags = new Set();
      if (Array.isArray(pendingFilterState?.rules)) {
        for (const rule of pendingFilterState.rules) {
          if (rule.field === fieldName) {
            for (const val of rule.values) {
              appliedTags.add(val.toLowerCase());
            }
          }
        }
      }

      const filtered = unique
        .filter((v) => v.toLowerCase().includes(inputText))
        .filter((v) => !currentTagsLower.includes(v.toLowerCase()))
        .filter((v) => !appliedTags.has(v.toLowerCase()))
        .slice(0, 20);

      if (filtered.length === 0) return;

      filtered.forEach((val) => {
        const item = document.createElement("div");
        item.className = "universal-suggestion-item";
        item.textContent = val;
        item.onclick = () => {
          setTimeout(() => {
            addTag(val);
            hideSuggestions();
            tagInput.focus();
          }, 0);
        };
        suggestionList.appendChild(item);
      });

      suggestionList.style.display = "block";
    };

    // Обработка ввода
    tagInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addTag(tagInput.value);
      }
    });

    tagInput.addEventListener("input", () => {
      renderSuggestions(fieldSelect.value);
    });

    tagInput.addEventListener("focus", () => {
      renderSuggestions(fieldSelect.value);
    });

    // Сборка компонентов
    tagInputContainer.appendChild(tagInput);
    valueInputWrapper.appendChild(valueLabel);
    valueInputWrapper.appendChild(tagInputContainer);
    modal.appendChild(valueInputWrapper);

    // === Переключатель режима фильтрации ===
    const modeWrapper = document.createElement("div");
    modeWrapper.style.marginTop = "1em";

    const modeLabel = document.createElement("label");
    modeLabel.textContent = t.UI.FILTER.MODE_LABEL;
    modeLabel.style.display = "block";
    modeLabel.style.marginBottom = "0.3em";

    const modeToggle = document.createElement("button");
    modeToggle.className = "universal-mode-toggle";

    currentMode = cache.filterState?.filterMode || "whitelist";

    const updateModeButton = () => {
      modeToggle.textContent =
        currentMode === "whitelist"
          ? t.UI.FILTER.MODE_WHITELIST
          : t.UI.FILTER.MODE_BLACKLIST;
    };

    modeToggle.onclick = () => {
      if (currentTags.length > 0) {
        const field = fieldSelect.dataset.lastField || fieldSelect.value;
        const values = [...currentTags];
        const mode = currentMode;

        if (!Array.isArray(pendingFilterState.rules)) {
          pendingFilterState.rules = [];
        }

        const existingIndex = pendingFilterState.rules.findIndex(
          (r) => r.field === field && r.mode === mode
        );

        if (existingIndex !== -1) {
          const oldValues = pendingFilterState.rules[existingIndex].values;
          const combined = Array.from(new Set([...oldValues, ...values]));
          pendingFilterState.rules[existingIndex].values = combined;
        } else {
          pendingFilterState.rules.push({ field, values, mode });
        }

        currentTags = [];
        renderTags();
        updateActiveFilters();
      }

      currentMode = currentMode === "whitelist" ? "blacklist" : "whitelist";
      updateModeButton();
    };

    updateModeButton();

    modeWrapper.appendChild(modeLabel);
    modeWrapper.appendChild(modeToggle);
    modal.appendChild(modeWrapper);

    // === Показать список текущих фильтров ===
    const activeFiltersWrapper = document.createElement("div");
    activeFiltersWrapper.className = "universal-active-filters";

    const updateActiveFilters = () => {
      activeFiltersWrapper.innerHTML = "";

      const rules = pendingFilterState.rules || [];
      if (rules.length === 0) {
        cache.filterCollapseState = {}; // 🔁 сбрасываем состояние, если нет ни одной секции
        return;
      }

      // 🔧 кэш для запоминания свёрнутости
      if (!cache.filterCollapseState) cache.filterCollapseState = {};

      // === Группируем правила по полю ===
      const grouped = {};
      for (const rule of rules) {
        if (!grouped[rule.field]) {
          grouped[rule.field] = { whitelist: [], blacklist: [] };
        }
        grouped[rule.field][rule.mode].push(...rule.values);
      }

      // === Для каждого поля: отрисовываем блок ===
      for (const field in grouped) {
        const fieldGroup = grouped[field];
        const wrapper = document.createElement("div");
        wrapper.className = "universal-filter-field-group";

        const emoji = config.fields?.[field]?.emoji || "📂";

        // === Заголовок со стрелкой и сворачиванием ===
        const toggleBtn = document.createElement("div");
        toggleBtn.className = "universal-collapsible-header";

        const arrow = document.createElement("span");
        arrow.className = "universal-collapsible-arrow";

        const titleText = document.createElement("strong");
        titleText.textContent = `${emoji} ${field}`;

        toggleBtn.appendChild(arrow);
        toggleBtn.appendChild(titleText);
        wrapper.appendChild(toggleBtn);

        const detailsContainer = document.createElement("div");
        detailsContainer.className = "universal-field-details";
        wrapper.appendChild(detailsContainer);

        // === Восстановим состояние collapsed из кэша
        let collapsed = cache.filterCollapseState[field] ?? true;
        detailsContainer.style.display = collapsed ? "none" : "block";
        arrow.textContent = collapsed ? "▶️" : "🔽";

        toggleBtn.addEventListener("click", () => {
          collapsed = !collapsed;
          cache.filterCollapseState[field] = collapsed;
          detailsContainer.style.display = collapsed ? "none" : "block";
          arrow.textContent = collapsed ? "▶️" : "🔽";

          setTimeout(() => {
            activateModalHandlers(config);
          }, 100);
        });

        // === whitelist
        if (fieldGroup.whitelist.length > 0) {
          const whiteRow = document.createElement("div");
          whiteRow.className = "universal-filter-rule";

          const whiteLabel = document.createElement("span");
          whiteLabel.textContent = "✅ ";
          whiteRow.appendChild(whiteLabel);

          fieldGroup.whitelist.forEach((val) => {
            const valEl = document.createElement("span");
            valEl.textContent = val;
            valEl.className = "universal-tag-bubble";

            const xBtn = document.createElement("button");
            xBtn.textContent = "×";
            xBtn.className = "universal-tag-remove-btn";

            xBtn.onclick = () => {
              const idx = rules.findIndex(
                (r) => r.field === field && r.mode === "whitelist"
              );
              if (idx !== -1) {
                const list = rules[idx].values;
                rules[idx].values = list.filter((v) => v !== val);
                if (rules[idx].values.length === 0) rules.splice(idx, 1);
              }

              // если фильтров больше нет — сбрасываем состояние
              const fieldHasValues = rules.some((r) => r.field === field);
              if (!fieldHasValues) {
                delete cache.filterCollapseState[field];
              }

              updateActiveFilters();
              if (typeof onClose === "function") onClose();
            };

            valEl.appendChild(xBtn);
            whiteRow.appendChild(valEl);
          });

          detailsContainer.appendChild(whiteRow);
        }

        // === blacklist
        if (fieldGroup.blacklist.length > 0) {
          const blackRow = document.createElement("div");
          blackRow.className = "universal-filter-rule";

          const blackLabel = document.createElement("span");
          blackLabel.textContent = "🚫 ";
          blackRow.appendChild(blackLabel);

          fieldGroup.blacklist.forEach((val) => {
            const valEl = document.createElement("span");
            valEl.textContent = val;
            valEl.className = "universal-tag-bubble";

            const xBtn = document.createElement("button");
            xBtn.textContent = "×";
            xBtn.className = "universal-tag-remove-btn";

            xBtn.onclick = () => {
              const idx = rules.findIndex(
                (r) => r.field === field && r.mode === "blacklist"
              );
              if (idx !== -1) {
                const list = rules[idx].values;
                rules[idx].values = list.filter((v) => v !== val);
                if (rules[idx].values.length === 0) rules.splice(idx, 1);
              }

              const fieldHasValues = rules.some((r) => r.field === field);
              if (!fieldHasValues) {
                delete cache.filterCollapseState[field];
              }

              updateActiveFilters();
              if (typeof onClose === "function") onClose();
            };

            valEl.appendChild(xBtn);
            blackRow.appendChild(valEl);
          });

          detailsContainer.appendChild(blackRow);
        }

        activeFiltersWrapper.appendChild(wrapper);
      }
      if (clearAllBtn) {
        clearAllBtn.disabled =
          !pendingFilterState?.rules?.length && currentTags.length === 0;
      }
    };

    updateActiveFilters(); // запускаем сразу
    modal.appendChild(activeFiltersWrapper);

    // Кнопки
    const controls = document.createElement("div");
    controls.className = "universal-filter-controls";

    const applyBtn = document.createElement("button");
    applyBtn.textContent = t.UI.FILTER.APPLY;
    applyBtn.onclick = () => {
      // 🛡️ Инициализируем filterState, если его ещё нет
      if (!cache.filterState) {
        cache.filterState = {
          rules: [],
          matchLogic: "any",
          filterMode: "whitelist",
        };
      }

      // ⬇️ Сохраняем текущие теги, если они есть
      const field = fieldSelect.dataset.lastField || fieldSelect.value;
      const values = [...currentTags];
      const mode = currentMode;

      if (values.length > 0) {
        const existingIndex = pendingFilterState.rules.findIndex(
          (r) => r.field === field && r.mode === mode
        );

        if (existingIndex !== -1) {
          const oldValues = pendingFilterState.rules[existingIndex].values;
          const combined = Array.from(new Set([...oldValues, ...values]));
          pendingFilterState.rules[existingIndex].values = combined;
        } else {
          pendingFilterState.rules.push({ field, values, mode });
        }
      }

      // ✅ ПРИМЕНЯЕМ временное состояние
      cache.filterState = JSON.parse(JSON.stringify(pendingFilterState));

      overlay.remove();
      if (typeof onClose === "function") onClose();
    };

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = t.UI.FILTER.CANCEL;
    cancelBtn.onclick = () => {
      overlay.remove();
      app.workspace.off("active-leaf-change", detachHandler);
    };

    clearAllBtn = document.createElement("button");
    clearAllBtn.textContent = t.UI.FILTER.CLEAR_TAGS;
    clearAllBtn.className = "confirm";
    clearAllBtn.disabled =
      !pendingFilterState?.rules?.length && currentTags.length === 0;
    clearAllBtn.title = clearAllBtn.disabled
      ? t.UI.FILTER.TOOLTIP_DISABLED
      : "";

    const clearTagsWarning = config?.filtering?.clearTagsWarning ?? true;
    clearAllBtn.onclick = () => {
      if (!pendingFilterState?.rules?.length) return;

      if (clearTagsWarning) {
        // Открываем подтверждение
        const confirmOverlay = document.createElement("div");
        confirmOverlay.className = "universal-confirm-overlay";

        const confirmBox = document.createElement("div");
        confirmBox.className = "universal-confirm-modal";
        confirmBox.innerHTML = `
          <h3>${t.UI.RESET_MODAL.TITLE}</h3>
          <p>${t.UI.RESET_MODAL.SUBTITLE}</p>
          <ul>
            <li>${t.UI.RESET_MODAL.LI_TAGS}</li>
          </ul>
        `;

        const confirmBtn = document.createElement("button");
        confirmBtn.textContent = t.UI.FILTER.CONFIRM;
        confirmBtn.className = "confirm";
        confirmBtn.onclick = () => {
          pendingFilterState.rules = [];
          cache.filterState = JSON.parse(JSON.stringify(pendingFilterState));
          cache.filterCollapseState = {};
          currentTags = [];
          renderTags();
          updateActiveFilters();
          confirmOverlay.remove();
          overlay.remove(); // ⬅️ Закрываем модалку фильтров
          if (typeof onClose === "function") onClose();
        };

        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = t.UI.FILTER.CANCEL;
        cancelBtn.className = "cancel";
        cancelBtn.onclick = () => {
          confirmOverlay.remove();
        };

        const buttonRow = document.createElement("div");
        buttonRow.className = "button-row";
        buttonRow.appendChild(confirmBtn);
        buttonRow.appendChild(cancelBtn);
        confirmBox.appendChild(buttonRow);
        confirmOverlay.appendChild(confirmBox);
        document.body.appendChild(confirmOverlay);
      } else {
        pendingFilterState.rules = [];
        cache.filterState = JSON.parse(JSON.stringify(pendingFilterState));
        cache.filterCollapseState = {};
        currentTags = [];
        renderTags();
        updateActiveFilters();
        overlay.remove();
        if (typeof onClose === "function") onClose();
      }
    };

    // === Переключатель логики: AND / OR ===
    const logicWrapper = document.createElement("div");
    logicWrapper.style.marginTop = "1em";

    // === Заголовок + иконка инфо ===
    const labelRow = document.createElement("div");
    labelRow.className = "universal-logic-label-row";

    const logicLabel = document.createElement("label");
    logicLabel.textContent = t.UI.FILTER.LOGIC_LABEL;
    logicLabel.className = "universal-logic-label";

    const infoIcon = document.createElement("span");
    infoIcon.className = "universal-info-icon";
    infoIcon.textContent = "ℹ️";
    infoIcon.title = t.UI.FILTER.LOGIC_TOOLTIP;

    labelRow.appendChild(logicLabel);
    labelRow.appendChild(infoIcon);

    const logicToggle = document.createElement("button");
    logicToggle.className = "universal-logic-toggle";

    currentLogic = cache.filterState?.matchLogic || "any";

    const updateLogicButton = () => {
      logicToggle.textContent =
        currentLogic === "any" ? t.UI.FILTER.LOGIC_ANY : t.UI.FILTER.LOGIC_ALL;
    };

    logicToggle.onclick = () => {
      currentLogic = currentLogic === "any" ? "all" : "any";
      pendingFilterState.matchLogic = currentLogic;
      updateLogicButton();
    };

    updateLogicButton();

    logicWrapper.appendChild(labelRow);
    logicWrapper.appendChild(logicToggle);
    modal.appendChild(logicWrapper);

    controls.appendChild(applyBtn);
    controls.appendChild(clearAllBtn);
    controls.appendChild(cancelBtn);
    modal.appendChild(controls);

    overlay.appendChild(modal);

    // === Скрывать подсказки при смене поля ===
    fieldSelect.addEventListener("change", () => {
      suggestionList.style.display = "none"; // ✅ Сохраняем твою часть

      if (currentTags.length === 0) {
        fieldSelect.dataset.lastField = fieldSelect.value;
        return;
      }

      const prevField = fieldSelect.dataset.lastField || fieldSelect.value;
      const values = [...currentTags];
      const mode = currentMode;

      if (!Array.isArray(pendingFilterState.rules)) {
        pendingFilterState.rules = [];
      }

      const existingIndex = pendingFilterState.rules.findIndex(
        (r) => r.field === prevField && r.mode === mode
      );

      if (existingIndex !== -1) {
        const oldValues = pendingFilterState.rules[existingIndex].values;
        const combined = Array.from(new Set([...oldValues, ...values]));
        pendingFilterState.rules[existingIndex].values = combined;
      } else {
        pendingFilterState.rules.push({ field: prevField, values, mode });
      }

      currentTags = [];
      renderTags();
      updateActiveFilters();

      fieldSelect.dataset.lastField = fieldSelect.value;
    });

    // === Скрытие подсказок при клике вне поля или списка ===
    document.addEventListener("mousedown", (e) => {
      setTimeout(() => {
        const clickedInside =
          tagInput.contains(e.target) || suggestionList.contains(e.target);

        if (!clickedInside) {
          suggestionList.style.display = "none";
        }
      }, 0);
    });

    // Закрытие по Esc
    const handleEscape = (e) => {
      if (e.key !== "Escape") return;

      const confirmOverlay = document.querySelector(
        ".universal-confirm-overlay"
      );
      if (confirmOverlay) {
        // Если открыто окно подтверждения — закрываем только его
        confirmOverlay.remove();
        return; // ⛔️ НЕ закрываем основное окно
      }

      const activeEl = document.activeElement;
      const isActive =
        dv.container.contains(activeEl) || overlay.contains(activeEl);
      const isFocused = activeEl
        ?.closest(".workspace-leaf.mod-active")
        ?.contains(overlay);
      const isBody = activeEl === document.body;

      if (isActive || isFocused || isBody) {
        overlay.remove();
        document.removeEventListener("keydown", handleEscape);
        app.workspace.off("active-leaf-change", detachHandler);
      }
    };

    document.removeEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleEscape);

    // === Запоминаем активную панель и файл при открытии фильтра
    const originLeaf = app.workspace.getMostRecentLeaf();
    const originFilePath = originLeaf?.view?.file?.path;

    // === Отслеживаем переключение активной заметки внутри той же панели
    const detachHandler = () => {
      const activeLeaf = app.workspace.getMostRecentLeaf();
      const activeFilePath = activeLeaf?.view?.file?.path;

      const leafUnchanged = activeLeaf === originLeaf;
      const fileChanged = activeFilePath !== originFilePath;

      if (leafUnchanged && fileChanged) {
        document.removeEventListener("keydown", handleEscape);
        app.workspace.off("active-leaf-change", detachHandler);
        overlay.remove();
        if (typeof onClose === "function") onClose();
      }
    };

    app.workspace.on("active-leaf-change", detachHandler);
  };

  // === БЛОК 6. 🖼 РЕНДЕР ПОЛЕЙ ===

  // 🎨 Resolves the final CSS class to apply.
  // Uses a custom class if defined; otherwise, applies a default class.
  const resolveCssClass = (userClass, ...defaultClasses) => {
    const user = (userClass || "").trim();
    const base = defaultClasses.filter(Boolean).join(" ");

    // Если пользователь указал КЛАСС, но он уже содержит базовые — не дублируем
    if (!user) return base;

    const all = `${base} ${user}`;
    return [...new Set(all.split(/\s+/))].join(" ");
  };

  // ⬜ Renders a placeholder element for blank or missing values.
  // Supports custom text via `def.blankText`. Adds tooltip from label or field key.
  function renderBlankPlaceholder(key, def = {}) {
    const text = typeof def.blankText === "string" ? def.blankText : "—";
    const label =
      typeof def.label === "string" && def.label.trim()
        ? def.label.trim()
        : key;

    const safeLabel = String(label)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    return `<div class="universal-field-blank" title="${safeLabel}">${text}</div>`;
  }

  // 🖼️ Generates the HTML for a single image field.
  // Handles external URLs, vault files, unique IDs, and caching for modal activation.
  const parseImage = (val, page, def, key, config) => {
    if (isBlank(val)) return renderBlankPlaceholder(key, def);

    const raw = Array.isArray(val) ? val[0] : val;

    let path = "";
    // 🆔 Генерация уникального ID для привязки модалки
    const id = getSafeId(page, key, "img");

    // ✅ Сохраняем ID изображения в кэш
    const cache = getCardScriptCache(dv.current()?.file?.path || "default");
    if (!cache.imageIds) cache.imageIds = [];
    cache.imageIds.push(id);

    // 🌐 Поддержка внешних ссылок
    if (typeof raw === "string" && raw.startsWith("http")) {
      path = raw;
    } else {
      const file = resolveFileFromRaw(raw);
      if (!file) return "—";
      path = app.vault.getResourcePath(file);
    }

    const imageClass = resolveCssClass(
      def?.cssClass,
      "universal-image",
      config.imageStyleClasses?.imageClass
    );

    const wrapperClass =
      config.imageStyleClasses?.wrapperClass || "universal-image-wrapper";

    return `<div class="${wrapperClass}">
      <img id="${id}" src="${path}" class="${imageClass}" draggable="false" loading="lazy">
    </div>`;
  };

  // 🖼️ Collection of field rendering functions.
  // Each type (image, text, badge, etc.) has a specific renderer returning HTML.
  // Used to display fields based on their `type` in the config.
  const fieldRenderers = {
    // 🖼️ Renders an image field with optional slider support.
    // If multiple images are present and slider is enabled, creates a navigable image carousel with state persistence.
    image: (val, page, def, key, config) => {
      const items = getCleanedStringList(val);
      const maxItems = def?.maxSliderItems || 1;
      const useSlider = def?.slider && items.length > 1;

      if (items.length === 0) return renderBlankPlaceholder(key, def);

      const limitedItems = items.slice(0, maxItems);
      const cache = getCardScriptCache(dv.current()?.file?.path || "default");

      const imageClass = resolveCssClass(
        def?.cssClass,
        "universal-slider-image",
        config.imageStyleClasses?.sliderImageClass
      );

      if (!useSlider || limitedItems.length <= 1) {
        return parseImage(limitedItems[0], page, def, key, config);
      }

      // === СЛАЙДЕР С СОХРАНЕНИЕМ СОСТОЯНИЯ ===
      const sliderId = getSafeId(page, key, "slider");
      const storageKey = getSliderStorageKey(page, key);
      const savedIndex = loadSliderPosition(storageKey);

      const initialIndex = Math.min(savedIndex, limitedItems.length - 1);

      const slides = limitedItems.map((raw, index) => {
        const file = resolveFileFromRaw(raw);
        const isUrl = typeof raw === "string" && raw.startsWith("http");
        const src = isUrl ? raw : file ? app.vault.getResourcePath(file) : "";

        const imgId = getSafeId(page, key + "-" + index, "img");
        if (!cache.imageIds) cache.imageIds = [];
        cache.imageIds.push(imgId);

        const isVisible = index === initialIndex;

        return `<img src="${src}" id="${imgId}" class="${imageClass} universal-slider-image ${
          isVisible ? "" : "universal-slider-hidden"
        }" data-index="${index}" draggable="false" loading="lazy">`;
      });

      setTimeout(() => {
        const wrapper = document.querySelector(
          `[data-slider-wrapper="${sliderId}"]`
        );
        if (!wrapper) return;

        let currentIndex = initialIndex;
        const images = wrapper.querySelectorAll(".universal-slider-image");
        const count = wrapper.querySelector(".universal-slider-count");

        if (count) count.textContent = `${currentIndex + 1} / ${images.length}`;

        const updateSlider = (newIndex) => {
          images[currentIndex].classList.add("universal-slider-hidden");
          currentIndex = (newIndex + images.length) % images.length;
          images[currentIndex].classList.remove("universal-slider-hidden");
          if (count)
            count.textContent = `${currentIndex + 1} / ${images.length}`;
          saveSliderPosition(sliderId, currentIndex, storageKey);
        };

        wrapper
          .querySelector(".universal-slider-prev")
          ?.addEventListener("click", () => updateSlider(currentIndex - 1));
        wrapper
          .querySelector(".universal-slider-next")
          ?.addEventListener("click", () => updateSlider(currentIndex + 1));

        wrapper.addEventListener("keydown", (e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            updateSlider(currentIndex - 1);
          } else if (e.key === "ArrowRight") {
            e.preventDefault();
            updateSlider(currentIndex + 1);
          }
        });

        activateModalHandlers(config);

        wrapper.setAttribute("tabindex", "0");
      }, 100);

      const wrapperClass = `${
        config.imageStyleClasses?.wrapperClass || "universal-image-wrapper"
      } ${
        config.imageStyleClasses?.sliderWrapperClass ||
        "universal-slider-wrapper"
      }`;
      return `<div class="${wrapperClass}" data-slider-wrapper="${sliderId}">
        ${slides.join("\n")}
        <button class="universal-slider-button universal-slider-prev" data-slider="${sliderId}">←</button>
        <button class="universal-slider-button universal-slider-next" data-slider="${sliderId}">→</button>
        <div class="universal-slider-count" data-slider="${sliderId}">${
        initialIndex + 1
      } / ${limitedItems.length}</div>
      </div>`;
    },

    // ✍️ Renders text or a list of values as a comma-separated string.
    // Applies optional prefix and suffix for styling or labeling.
    text: (val, page, def, key, config) => {
      const outerClass = resolveCssClass(def?.cssClass, "universal-text");

      // Приводим к массиву
      const items = getCleanedStringList(val);
      if (items.length === 0) return renderBlankPlaceholder(key, def);

      // Берём первое значение и преобразуем в строку
      const raw = items[0];
      const value = typeof raw === "string" ? raw : String(raw);

      return `<div class="${outerClass}">${applyPrefixAndSuffix(
        value,
        def
      )}</div>`;
    },

    // 🔗 Renders a link to the page itself or to another page-like value.
    // Falls back to the page name if no valid link is provided.
    pageLink: (val, page, def, key, config) => {
      const outerClass = resolveCssClass(def?.cssClass, "universal-link");

      if (!page?.file?.path || !page?.file?.name) {
        return renderBlankPlaceholder(key, def);
      }

      const filePath = page.file.path;
      const fileName = page.file.name.replace(/\.md$/, "");

      // 💡 Безопасное извлечение значения
      let raw = Array.isArray(val) ? val[0] : val;
      const display =
        typeof raw === "string" && raw.trim() !== "" ? raw.trim() : fileName;

      const html = `<a href="${filePath}" class="internal-link">${display}</a>`;
      return `<div class="${outerClass}">${applyPrefixAndSuffix(
        html,
        def
      )}</div>`;
    },

    // 📋 Renders a list of values as either bullet points or inline text.
    // Truncates to `maxItems`, adds a tooltip and hidden marker if needed.
    list: (val, page, def, key, config) => {
      const asBullets = def?.display === "bullets";
      const baseClass = resolveCssClass(
        def?.cssClass,
        asBullets ? "universal-list" : "universal-list-inline"
      );

      const maxItems = def?.maxItems || Infinity;

      const items = getCleanedStringList(val);
      const visible = items.slice(0, maxItems);
      const hidden = items.slice(maxItems);

      if (items.length === 0) return renderBlankPlaceholder(key, def);

      const fullList = items.join(", ");
      const tooltip = hidden.length > 0 ? ` title="${fullList}"` : "";

      const hiddenMarker =
        hidden.length > 0
          ? `<span class="universal-more-items">${t.UI.MORE_ITEMS(
              hidden.length
            )}</span>`
          : "";

      if (asBullets) {
        return `<ul class="${baseClass}"${tooltip}>
        ${visible
          .map((item) => `<li>${applyPrefixAndSuffix(item, def)}</li>`)
          .join("")}
        ${hiddenMarker ? `<li>${hiddenMarker}</li>` : ""}
      </ul>`;
      } else {
        return `<div class="${baseClass}"${tooltip}>
        ${applyPrefixAndSuffix(visible.join(", "), def)}${
          hiddenMarker ? ` ${hiddenMarker}` : ""
        }
      </div>`;
      }
    },

    // 🏷️ Renders inline tag-style badges.
    // Truncates long lists and shows hidden count as a visual indicator.
    badge: (val, page, def, key, config) => {
      const containerClass = "universal-badge-container"; // 🔒 фиксировано

      const maxItems = def?.maxItems || Infinity;
      const items = getCleanedStringList(val);
      const visible = items.slice(0, maxItems);
      const hidden = items.slice(maxItems);

      if (items.length === 0) return renderBlankPlaceholder(key, def);

      const fullList = items.join(", ");
      const tooltip = hidden.length > 0 ? ` title="${fullList}"` : "";

      const hiddenMarker =
        hidden.length > 0
          ? `<span class="universal-more-items">${t.UI.MORE_ITEMS(
              hidden.length
            )}</span>`
          : "";

      const resolveBadgeClass = (item) => {
        const base = "universal-badge-item";
        const extra = def?.cssClass ? ` ${def.cssClass}` : "";

        if (!Array.isArray(def.styleMap)) return base + extra;

        const found = def.styleMap.find(
          (rule) =>
            (rule.match === "*" ||
              rule.match?.toLowerCase() === item.toLowerCase()) &&
            typeof rule.class === "string"
        );
        return found ? `${base}${extra} ${found.class}` : base + extra;
      };

      const badges = visible
        .map((item) => {
          const cls = resolveBadgeClass(item);
          return `<span class="${cls}">${applyPrefixAndSuffix(
            item,
            def
          )}</span>`;
        })
        .join(" ");

      return `<div class="${containerClass}"${tooltip}>${badges} ${hiddenMarker}</div>`;
    },

    // 🔊 Renders an audio player.
    // Supports internal Obsidian files and external audio URLs, with fallbacks for invalid formats.
    audio: (val, page, def, key, config) => {
      const outerClass = resolveCssClass(def?.cssClass, "universal-audio");
      if (isBlank(val)) return renderBlankPlaceholder(key, def);

      const raw = Array.isArray(val) ? val[0] : val;
      const rawStr = String(raw).trim();

      // Прямая внешняя ссылка на аудиофайл
      if (
        rawStr.startsWith("http") &&
        /\.(mp3|ogg|wav|flac|m4a)$/i.test(rawStr)
      ) {
        const id = getSafeId(page, key, "aud");
        return `<div class="${outerClass}">
          <audio id="${id}" src="${rawStr}" controls preload="metadata" style="width: 100%;"></audio>
        </div>`;
      }

      // Внутренний файл из хранилища (включая ![[audio.mp3]])
      const file = resolveFileFromRaw(raw);
      if (file) {
        const src = app.vault.getResourcePath(file);
        const id = getSafeId(page, key, "aud");
        return `<div class="${outerClass}">
          <audio id="${id}" src="${src}" controls preload="metadata" style="width: 100%;"></audio>
        </div>`;
      }

      // file:// — неподдерживаемая схема
      if (rawStr.startsWith("file://")) {
        return `<div class="${outerClass}">${t.UI.MEDIA.FILE_SCHEME_UNSUPPORTED}</div>`;
      }

      // Внешняя ссылка (например, на сайт или стриминг)
      try {
        const url = new URL(rawStr);
        return `<div class="${outerClass}"><a href="${url.href}" target="_blank" rel="noopener noreferrer">${t.UI.MEDIA.AUDIO_EXTERNAL_LINK}</a></div>`;
      } catch (e) {
        return `<div class="${outerClass}">${t.UI.MEDIA.AUDIO_UNKNOWN_FORMAT}</div>`;
      }
    },

    // 🎬 Renders a video player.
    // Supports YouTube embeds, external video links, and local vault files.
    video: (val, page, def, key, config) => {
      const outerClass = resolveCssClass(def?.cssClass, "universal-video");
      if (isBlank(val)) return renderBlankPlaceholder(key, def);

      const raw = Array.isArray(val) ? val[0] : val;
      const rawStr = String(raw).trim();

      // YouTube
      if (rawStr.includes("youtube.com") || rawStr.includes("youtu.be")) {
        try {
          const url = new URL(rawStr);
          const videoId =
            url.searchParams.get("v") || url.pathname.split("/").pop();

          if (videoId && videoId.length === 11) {
            return `<div class="universal-video-container">
              <iframe class="universal-video" src="https://www.youtube.com/embed/${videoId}" 
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen></iframe>
            </div>`;
          } else {
            return `<div class="${outerClass}">${t.UI.MEDIA.YOUTUBE_ID_EXTRACTION_ERROR}</div>`;
          }
        } catch (e) {
          return `<div class="${outerClass}">${t.UI.MEDIA.YOUTUBE_INVALID_URL}</div>`;
        }
      }

      // Прямая внешняя ссылка на видеофайл (mp4, webm, ogg, mov)
      if (rawStr.startsWith("http") && /\.(mp4|webm|ogg|mov)$/i.test(rawStr)) {
        const id = getSafeId(page, key, "vid");
        return `<div class="universal-video-container">
          <video id="${id}" class="universal-video" src="${rawStr}" controls preload="metadata"></video>
        </div>`;
      }

      // Внутренний файл из хранилища Obsidian (включая путь в виде строки)
      const file = resolveFileFromRaw(raw);
      if (file) {
        const src = app.vault.getResourcePath(file);
        const id = getSafeId(page, key, "vid");
        return `<div class="universal-video-container">
        <video id="${id}" class="universal-video" src="${src}" controls preload="metadata"></video>
      </div>`;
      }

      // file:// — неподдерживаемая схема
      if (rawStr.startsWith("file://")) {
        return `<div class="${outerClass}">${t.UI.MEDIA.FILE_SCHEME_UNSUPPORTED}</div>`;
      }

      // Просто внешняя ссылка (на случай непонятного формата)
      try {
        const url = new URL(rawStr);
        return `<div class="${outerClass}"><a href="${url.href}" target="_blank" rel="noopener noreferrer">${t.UI.MEDIA.VIDEO_EXTERNAL_LINK}</a></div>`;
      } catch (e) {
        return `<div class="${outerClass}">${t.UI.MEDIA.VIDEO_UNKNOWN_FORMAT}</div>`;
      }
    },

    // 📈 Renders a progress bar based on two fields: current and max.
    // Supports CSS class thresholds to colorize progress dynamically.
    progressBar: (val, page, def, key, config) => {
      const outerClass = resolveCssClass(
        def?.cssClass,
        "universal-progress-wrapper"
      );

      const currentKey = def?.config?.currentField;
      const maxKey = def?.config?.maxField;
      const thresholds = def?.config?.thresholds ?? [];

      const rawCurrent = page[currentKey];
      const rawMax = page[maxKey];

      const current = parseFloat(
        Array.isArray(rawCurrent) ? rawCurrent[0] : rawCurrent
      );
      const max = parseFloat(Array.isArray(rawMax) ? rawMax[0] : rawMax);

      if (isNaN(current) || isNaN(max) || max <= 0)
        return renderBlankPlaceholder(key, def);

      const percent = Math.min(100, Math.round((current / max) * 100));

      // Определяем класс по порогам
      let progressClass = "progress-undefined";
      for (const rule of thresholds) {
        if (percent >= rule.min) {
          progressClass = rule.class;
          break;
        }
      }

      return `
      <div class="${outerClass}">
        <div class="universal-progress-bar-outer">
          <div class="universal-progress-bar-fill ${progressClass}" style="width: ${percent}%;"></div>
          <div class="universal-progress-label">${percent}%</div>
        </div>
      </div>
    `;
    },

    // 📅 Renders a localized date.
    // Supports Luxon for formatting and falls back to native Date API.
    date: (val, page, def, key, config) => {
      const outerClass = resolveCssClass(def?.cssClass, "universal-date");
      if (isBlank(val)) return renderBlankPlaceholder(key, def);

      const raw = Array.isArray(val) ? val[0] : val;

      // Определяем язык
      const getEffectiveLang = (defLang) => {
        const supported = [
          "ru",
          "en",
          "uk",
          "de",
          "fr",
          "es",
          "it",
          "pl",
          "pt",
          "zh",
          "ja",
        ];

        // Если явно указано "auto" или ничего — пробуем автоопределение
        const userLang = navigator.language || "en-US";
        const fallback = userLang.split("-")[0];

        // Если поле явно указано, но пусто → считаем недопустимым
        if (defLang === "") return "en";

        const short = (
          defLang && defLang !== "auto" ? defLang : fallback
        ).split("-")[0];

        return supported.includes(short) ? short : "en";
      };

      const effectiveLang = getEffectiveLang(def?.dateFormat);

      if (window.luxon?.DateTime) {
        const DateTime = window.luxon.DateTime;
        let date = DateTime.fromISO(String(raw));
        if (!date.isValid)
          date = DateTime.fromFormat(String(raw), "dd.MM.yyyy");
        if (!date.isValid)
          date = DateTime.fromFormat(String(raw), "yyyy-MM-dd");
        if (!date.isValid) {
          return `<div class="${outerClass}">${t.UI.DATE.INVALID_FORMAT}</div>`;
        }

        const formatted = date
          .setLocale(effectiveLang)
          .toLocaleString(DateTime.DATE_FULL);

        return `<div class="${outerClass}">${applyPrefixAndSuffix(
          formatted,
          def
        )}</div>`;
      }

      // Fallback: native Date
      try {
        const d = new Date(raw);
        if (isNaN(d.getTime())) {
          return `<div class="${outerClass}">${t.UI.DATE.INVALID}</div>`;
        }

        const formatted = d.toLocaleDateString(effectiveLang, {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        return `<div class="${outerClass}">${applyPrefixAndSuffix(
          formatted,
          def
        )}</div>`;
      } catch (e) {
        return `<div class="${outerClass}">${t.UI.DATE.ERROR}</div>`;
      }
    },

    // ⭐ Renders a star rating out of 5 based on a numeric value and a max score.
    // Uses full/half/empty stars depending on the ratio.
    rating: (val, page, def, key, config) => {
      const outerClass = resolveCssClass(def?.cssClass, "universal-rating");
      if (isBlank(val)) return renderBlankPlaceholder(key, def);

      const raw = Array.isArray(val) ? val[0] : val;
      const score = parseFloat(raw);
      const max = def?.config?.maxRating || 10;

      if (isNaN(score) || isNaN(max) || max <= 0) {
        return `<div class="${outerClass}">${t.UI.RATING.INVALID}</div>`;
      }

      const ratio = Math.max(0, Math.min(score / max, 1));
      const starsTotal = 5;
      const starsValue = ratio * starsTotal;

      const fullStars = Math.floor(starsValue);
      const halfStar = starsValue - fullStars >= 0.5 ? 1 : 0;
      const emptyStars = starsTotal - fullStars - halfStar;

      let html = `<div class="${outerClass}">`;
      for (let i = 0; i < fullStars; i++)
        html += '<span class="star full"></span>';
      if (halfStar) html += '<span class="star half"></span>';
      for (let i = 0; i < emptyStars; i++)
        html += '<span class="star empty"></span>';
      html += `</div>`;

      return html;
    },

    // 🏷️ Renders a list of Obsidian-style tags (#tag).
    // Supports strings with commas and avoids double hashtags.
    tags: (val, page, def, key, config) => {
      const containerClass = resolveCssClass(
        def?.cssClass,
        "universal-tags-container"
      );
      const itemClass = resolveCssClass(def?.itemClass, "universal-tags-item");

      // Используем универсальную функцию для нормализации
      const items = getCleanedStringList(val);

      if (items.length === 0) return renderBlankPlaceholder(key, def);

      const maxItems = def?.maxItems || Infinity;
      const visible = items.slice(0, maxItems);
      const hidden = items.slice(maxItems);

      // Защита от двойных решёток
      const formatTag = (tag) => {
        const clean = tag.trim().replace(/^#+/, ""); // убираем все #
        return `#${clean}`;
      };

      const fullList = visible.concat(hidden).map(formatTag).join(", ");
      const tooltip = hidden.length > 0 ? ` title="${fullList}"` : "";

      const hiddenMarker =
        hidden.length > 0
          ? `<span class="universal-more-items">${t.UI.MORE_ITEMS(
              hidden.length
            )}</span>`
          : "";

      return `<div class="${containerClass}"${tooltip}>
      ${visible
        .map(
          (tag) =>
            `<span class="${itemClass}">${applyPrefixAndSuffix(
              formatTag(tag),
              def
            )}</span>`
        )
        .join(" ")}
      ${hiddenMarker}
    </div>`;
    },

    // 🔢 Renders a numeric value with optional formatting.
    // Attempts to parse from strings or arrays with decimal handling.
    number: (val, page, def, key, config) => {
      if (isBlank(val)) return renderBlankPlaceholder(key, def);

      let raw = Array.isArray(val) ? val[0] : val;

      if (typeof raw === "string") {
        raw = raw.replace(",", ".").trim();
      }

      const num = parseFloat(raw);
      if (isNaN(num)) return renderBlankPlaceholder(key, def);

      const cssClass = resolveCssClass(def.cssClass, "universal-field-number");

      return `<div class="${cssClass}">${applyPrefixAndSuffix(num, def)}</div>`;
    },

    // ссылки
    link: (val, page, def, key, config) => {
      const items = getCleanedStringList(val);
      if (items.length === 0) return renderBlankPlaceholder(key, def);

      const maxItems = def?.maxItems || Infinity;
      const visible = items.slice(0, maxItems);
      const hidden = items.slice(maxItems);
      const tooltip = hidden.length > 0 ? ` title="${items.join(", ")}"` : "";

      const cssClass = resolveCssClass(def?.cssClass, "universal-link-list");
      const linksName = def?.linksName || [];

      const escapeHtml = (str) =>
        String(str)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");

      const renderLink = (raw) => {
        const trimmed = String(raw).trim();
        const unquoted = trimmed.replace(/^"(.*)"$/, "$1"); // убираем кавычки

        if (!/^https?:\/\//.test(unquoted)) return escapeHtml(unquoted); // защита

        // Ищем кастомный label по совпадению ссылки
        const found = linksName.find(
          (item) =>
            typeof item.match === "string" && unquoted.includes(item.match)
        );

        const label =
          found?.label ||
          (def?.shortenDisplay
            ? unquoted.replace(/^https?:\/\//, "").split(/[\/#?]/)[0]
            : unquoted);

        return `<a href="${escapeHtml(
          unquoted
        )}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
      };

      const rendered = visible.map(renderLink).join(", ");
      const hiddenMarker =
        hidden.length > 0
          ? `<span class="universal-more-items">${t.UI.MORE_ITEMS(
              hidden.length
            )}</span>`
          : "";

      return `<div class="${cssClass}"${tooltip}>${applyPrefixAndSuffix(
        `${rendered}${hiddenMarker ? " " + hiddenMarker : ""}`,
        def
      )}</div>`;
    },
  };

  // 🧱 Universal renderer for a single field.
  // Looks up the proper field renderer by type and returns HTML.
  // Handles unknown fields, missing types, and rendering errors.
  const renderField = (page, key, def, config) => {
    try {
      // ⚠️ Нет информации о типе — показываем предупреждение
      if (!def || !def.type) {
        return `<div class="universal-warning">⚠️ ${t.UI.RENDER.UNKNOWN_FIELD} <b>${key}</b></div>`;
      }

      const val = page[key];
      const renderer = fieldRenderers?.[def.type];

      // ⚠️ Тип не поддерживается — выводим сообщение
      if (!renderer) {
        return `<div class="universal-warning">⚠️ ${t.UI.RENDER.UNSUPPORTED_TYPE} <b>${def.type}</b> (${key})</div>`;
      }

      // ✅ Всё в порядке — рендерим
      return renderer(val, page, def, key, config);
    } catch (e) {
      return `<div class="universal-warning">⚠️ ${t.UI.RENDER.FIELD_ERROR} <b>${key}</b>: ${e.message}</div>`;
    }
  };

  // === БЛОК 7. 🧱 СЕКЦИИ ===

  // 📄 Generates one table row (array of rendered cells) for a page.
  // Renders each field using config definitions and wraps them as needed.
  // Skips wrappers for media types like image, audio, etc.
  function generateRow(page, section, config) {
    return section.fields.map((key) => {
      const val = page[key];
      const def = config.fields[key];
      let warn = false;

      const fieldEmoji = def.emoji
        ? `<span class="universal-left-emoji">${def.emoji}</span>`
        : "";

      const html = renderField(page, key, def, config);

      const skipWrapperTypes = ["image", "audio", "video"];
      if (skipWrapperTypes.includes(def?.type)) {
        return `${fieldEmoji}<div>${html}</div>`;
      }

      return `<div class="universal-field-wrapper">${fieldEmoji}${html}</div>`;
    });
  }

  // 🗂️ Renders a single card section as a collapsible <details> block.
  // Handles section state persistence, lazy loading by chunk, and sorting.
  // Uses IntersectionObserver to load sections as they enter the viewport.
  const renderSectionTable = (section, pages, config) => {
    const sorted = sortPages(pages);

    const stateKey = `universal-section-${dv.current().file.path}-${
      section.id
    }`;
    const rememberState = config.sectionBehavior?.rememberState ?? false;
    const defaultOpen = config.sectionBehavior?.defaultOpen ?? true;

    // 🔁 Контейнер для таблицы, будет вставлен позже
    const tableContainer = document.createElement("div");
    tableContainer.className = "universal-section-content";

    // Создаём секцию <details>
    const details = document.createElement("details");
    details.className = `universal-section ${section.styleClass || ""}`;
    details.appendChild(tableContainer);

    // 🧠 Определяем, открыта ли секция
    let isOpen;
    if (rememberState) {
      const saved = localStorage.getItem(stateKey);
      if (saved !== null) {
        isOpen = saved === "true";
      } else {
        isOpen = defaultOpen;
        localStorage.setItem(stateKey, isOpen);
      }
    } else {
      isOpen = defaultOpen;
    }

    if (isOpen) details.setAttribute("open", "open");

    const summary = document.createElement("summary");
    summary.innerHTML = `
      <h3>${section.title}</h3>
      <span class="universal-count">(${sorted.length})</span>
    `;
    details.insertBefore(summary, tableContainer);

    // 💾 Сохраняем состояние секции при клике
    summary.addEventListener("click", () => {
      setTimeout(() => {
        const isNowOpen = details.hasAttribute("open");
        if (rememberState) localStorage.setItem(stateKey, isNowOpen);
      }, 10);
    });

    // ✅ Вся логика отрисовки обёрнута в IIFE
    (() => {
      let renderedOnce = false;

      // 📥 Renders the inner table content for a section.
      // Supports lazy loading via IntersectionObserver, or immediate rendering.
      // Manages chunking, container replacement, and row generation.
      function renderSectionContent() {
        renderedOnce = true;

        const previousContainer = dv.container;
        dv.container = tableContainer;

        try {
          const headers = section.fields.map(
            (key) => config.fields[key]?.label || key
          );

          const virtualWrapper = document.createElement("div");
          tableContainer.appendChild(virtualWrapper);

          const CHUNK_SIZE = config.sectionBehavior.lazyChunkSize ?? 20;
          const PRELOAD_CHUNKS = config.sectionBehavior.lazyPreloadChunks ?? 2;

          if (config.sectionBehavior.lazyLoading) {
            const chunks = [];
            for (let i = 0; i < sorted.length; i += CHUNK_SIZE) {
              chunks.push(sorted.slice(i, i + CHUNK_SIZE));
            }

            let highestLoadedChunk = -1;

            const observer = new IntersectionObserver((entries) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const placeholder = entry.target;
                const chunkIndex = parseInt(placeholder.dataset.chunkIndex);
                if (placeholder.dataset.loaded === "true") return;

                // Подгружаем, если чанк ≤ уже загруженного + preload-запас
                if (chunkIndex > highestLoadedChunk + PRELOAD_CHUNKS) return;

                placeholder.dataset.loaded = "true";
                highestLoadedChunk = Math.max(highestLoadedChunk, chunkIndex);
                observer.unobserve(placeholder);

                const chunk = chunks[chunkIndex];
                const chunkRows = chunk.map((page) =>
                  generateRow(page, section, config)
                );

                const tempDiv = document.createElement("div");
                const prev = dv.container;
                dv.container = tempDiv;
                try {
                  dv.table(headers, chunkRows);
                } finally {
                  dv.container = prev;
                }

                placeholder.replaceWith(...Array.from(tempDiv.children));
                activateModalHandlers(config);
              });
            });

            chunks.forEach((chunk, index) => {
              const placeholder = document.createElement("div");
              placeholder.className = "universal-virtual-placeholder";
              placeholder.dataset.chunkIndex = index;
              placeholder.style.minHeight = "320px";

              virtualWrapper.appendChild(placeholder);
              observer.observe(placeholder);
            });
          } else {
            const rows = sorted.map((page) =>
              generateRow(page, section, config)
            );

            dv.table(headers, rows);
          }
        } finally {
          dv.container = previousContainer;
        }
      }

      // 👂 Секция открылась вручную
      details.addEventListener("toggle", () => {
        if (details.open && !renderedOnce) {
          renderSectionContent();
        }
      });

      // 🔘 Если открыта по умолчанию — сразу отрисовать
      if (isOpen) {
        renderSectionContent();
      }
    })();

    // ⬇️ Вставляем всю секцию
    dv.container.appendChild(details);
  };

  // 🗂️ Processes and renders all configured sections from config.sections.
  // Applies section.match logic, blocking behavior, and duplicate rules.
  // Updates renderedPages and blockedPages sets.
  const renderSections = (sortedPages, renderedPages, blockedPages) => {
    for (const section of config.sections) {
      const isBlocking = section.isBlocking ?? false;

      const pagesForSection = sortedPages.filter((p) => {
        const alreadyBlocked = blockedPages.has(p.file.path);
        const alreadyRendered = renderedPages.has(p.file.path);
        const allowDupes = section.allowDuplicates;

        // 🔐 Пропускаем, если уже попала в блокирующую секцию
        if (alreadyBlocked) return false;
        // ❌ Пропускаем, если уже отрендерена и повторы не разрешены
        if (alreadyRendered && !allowDupes) return false;

        return section.match(p, config);
      });

      if (pagesForSection.length > 0) {
        renderSectionTable(section, pagesForSection, config);

        pagesForSection.forEach((p) => {
          renderedPages.add(p.file.path);
          if (isBlocking) blockedPages.add(p.file.path);
        });
      }
    }
  };

  // 📄 Renders a table for remaining pages not included in any section.
  // Uses generateRow to render each page, then calls dv.table.
  // Returns the list of rendered pages for further processing.
  const renderRemainingPages = (sortedPages, renderedPages) => {
    const remainingPages = sortedPages.filter(
      (p) => !renderedPages.has(p.file.path)
    );

    if (remainingPages.length > 0) {
      const headers = Object.values(config.fields).map((f) => f.label);
      const rows = remainingPages.map((page) =>
        generateRow(page, { fields: Object.keys(config.fields) }, config)
      );
      dv.table(headers, rows);
    }

    return remainingPages;
  };

  // === БЛОК 8. 📦 ЗАГРУЗКА ДАННЫХ ===

  // 🧮 Loads all pages from the vault and filters them based on folder path and type.
  const pages = dv
    .pages()
    .where((p) => isInFolder(p.file?.path, config.folderKeyword))
    .where((p) => matchesTypeFilter(p, config));

  enrichVirtualFields(pages, config);

  // === БЛОК 9. 🚀 ИНИЦИАЛИЗАЦИЯ ===

  // 📦 Returns a memoized object for the current note's observer state.
  // Contains:
  // - `processedImages`: a Set of image IDs already handled
  // - `observerInstance`: shared IntersectionObserver reference
  // Used in lazy image loading via renderCards.
  const getObserverCache = () => {
    const cache = getCardScriptCache(dv.current()?.file?.path || "default");
    if (!cache.processedImages) cache.processedImages = new Set();
    if (!cache.observerInstance) cache.observerInstance = null;
    return cache;
  };

  // Используется механизм кэширования, чтобы ускорить рендер при переключении вкладок
  let currentPath, cache, activePath;
  let canRender = true; // Флаг допуска: разрешает запуск всей инициализации UI и рендера

  // Проверяет, что Dataview загрузился и текущий файл определён
  // - Если нет — показывает сообщение и откладывает инициализацию
  // 🔹 Используется перед вызовом UI.
  try {
    const current = dv.current();
    if (!current?.file?.path) throw new Error(t.UI.INIT.FILE_NOT_FOUND);

    currentPath = current.file.path;
    cache = getCardScriptCache(currentPath);
    cache.imageIds = []; // предотвращает дублирующие события при повторном запуске
    activePath = app.workspace.getActiveFile()?.path;
  } catch (err) {
    canRender = false;

    const notice = document.createElement("div");
    notice.className = "universal-error-toast";
    notice.innerHTML = `
      <div class="toast-line">🫣 ${t.UI.INIT.LOADING_DELAY_1}</div>
      <div class="toast-line">${t.UI.INIT.LOADING_DELAY_2}</div>
    `;

    document.body.appendChild(notice);

    setTimeout(() => {
      notice.classList.add("fade-out");
      setTimeout(() => notice.remove(), 1000);
    }, 4000); // ← общее время показа (в миллисекундах)
  }

  // Загружает сохранённую сортировку из localStorage (если включено)
  // - Устанавливает currentSortField и currentSortOrder
  if (config.rememberSort) {
    const vault = app.vault.getName();
    const file = dv.current()?.file?.path || "unknown-path";
    const sortKeyPrefix = `universal-cards-${vault}-${file}`;

    const savedField = localStorage.getItem(`${sortKeyPrefix}-sort-field`);
    const savedOrder = localStorage.getItem(`${sortKeyPrefix}-sort-order`);

    if (savedField) currentSortField = savedField;
    if (savedOrder) currentSortOrder = savedOrder;
  }

  // 🟢 Продолжаем только если всё готово
  if (canRender) {
    // === UI-КОНТРОЛЛЕРЫ: Поиск, сортировка, фильтрация ===
    // Строим верхнюю панель управления:
    // - Счётчик карточек
    // - Поле поиска
    // - Кнопка фильтра
    // - Кнопки сортировки
    const uiPanel = document.createElement("div");
    uiPanel.className = "universal-control-panel";

    // 🔢 Отображаем общее количество файлов
    if (config.cardCounter?.enabled) {
      const wrapper = document.createElement("div");
      wrapper.className = "universal-total-count";

      const label = document.createElement("span");
      label.className = "universal-total-label";
      label.textContent = config.cardCounter.textBefore + " ";

      const number = document.createElement("span");
      number.className = "universal-total-number";
      number.textContent = pages.length;

      wrapper.appendChild(label);
      wrapper.appendChild(number);
      uiPanel.appendChild(wrapper);
    }

    // Поле поиска
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = config.searchBox?.placeholderText || "Search...";
    searchInput.className = "universal-search-input";
    searchInput.value = currentSearchQuery;
    searchInput.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value;
      requestAnimationFrame(() => {
        updateCardsOnly(); // 🔄 Обновляем только таблицу, без сброса панели
      });
    });

    // 🔍 Строка с фильтром и поиском
    const searchRow = document.createElement("div");
    searchRow.className = "universal-search-row";

    // Кнопка фильтра
    const filterButton = document.createElement("button");
    filterButton.className = "universal-filter-button";
    filterButton.textContent = `🔎 ${t.UI.FILTER.BUTTON_LABEL}`;
    filterButton.onclick = () => renderFilterModal(config, renderAll);

    // Добавляем в строку
    searchRow.appendChild(filterButton);
    searchRow.appendChild(searchInput);

    // Контейнер для кнопок сортировки
    const sortContainer = document.createElement("div");
    sortContainer.className = "universal-sort-buttons";

    // 📦 Общий контейнер для фильтра и сортировок
    const controlGroup = document.createElement("div");
    controlGroup.className = "universal-control-group";

    // Вставляем строку фильтра и контейнер сортировки внутрь
    controlGroup.appendChild(searchRow);
    controlGroup.appendChild(sortContainer);

    // А потом весь этот блок — в uiPanel
    uiPanel.appendChild(controlGroup);

    // Вставка в DOM
    dv.container.prepend(uiPanel);

    /**
     * Обновляет кнопки сортировки в UI.
     * - Автоматически выделяет активную кнопку.
     * - Сохраняет выбранную сортировку в `localStorage` (если включено в config).
     * @example
     * rebuildSortButtons(); // → создаёт кнопки ["🔤 По названию", "🏷️ По жанру", ...]
     */
    const rebuildSortButtons = () => {
      sortContainer.innerHTML = "";

      config.sortButtons.forEach(({ label, field, special, emoji }) => {
        const key = field || special;

        const btn = document.createElement("button");
        btn.className = "universal-sort-button";

        const isActive = currentSortField === key;
        const arrow = isActive
          ? currentSortOrder === "asc"
            ? "🔼"
            : "🔽"
          : "";
        btn.textContent = `${emoji || ""} ${label} ${arrow}`.trim();

        if (isActive) {
          btn.classList.add("active");
        }

        btn.onclick = () => {
          if (currentSortField !== key) {
            // Новая кнопка — берём порядок из кнопки
            currentSortField = key;
            currentSortOrder = btn.order || "asc";
          } else {
            // Повторный клик — меняем порядок
            currentSortOrder = currentSortOrder === "asc" ? "desc" : "asc";
          }

          if (config.rememberSort) {
            const vault = app.vault.getName();
            const file = dv.current()?.file?.path || "unknown-path";
            const sortKeyPrefix = `universal-cards-${vault}-${file}`;

            localStorage.setItem(
              `${sortKeyPrefix}-sort-field`,
              currentSortField
            );
            localStorage.setItem(
              `${sortKeyPrefix}-sort-order`,
              currentSortOrder
            );
          }

          renderAll(); // 🔁 перерисовать всё
        };

        sortContainer.appendChild(btn);
      });
    };

    // 🧱 Отрисовка одной строки таблицы
    const renderRow = (page) => {
      return Object.entries(config.fields).map(([key, def]) =>
        renderField(page, key, def, config)
      );
    };

    /**
     * Показывает "заглушку", если после всех фильтров карточек не осталось
     * Вставляется невидимая таблица + текст
     */
    const renderEmptyPlaceholder = () => {
      const tableWrapper = document.createElement("div");
      tableWrapper.className = "universal-empty-table-wrapper";

      const headers = Object.values(config.fields).map((f) => f.label);
      const emptyRow = headers.map(() => "—");

      dv.container.appendChild(tableWrapper);

      const oldContainer = dv.container;
      dv.container = tableWrapper;
      dv.table(headers, [emptyRow]);
      dv.container = oldContainer;

      const oldMessage = uiPanel.querySelector(".universal-no-results");
      if (oldMessage) oldMessage.remove();

      const message = document.createElement("div");
      message.className =
        config.noResults?.wrapperClass || "universal-no-results";
      message.innerHTML = `
        <div class="no-results-icon">🔍</div>
        <div class="no-results-text">
          ${t.INFO.NO_RESULTS.LINE_1}<br>${t.INFO.NO_RESULTS.LINE_2}
        </div>
      `;
      uiPanel.appendChild(message);
    };

    /**
     * Удаляет заглушку и сообщение, если они были вставлены ранее
     */
    const clearEmptyPlaceholder = () => {
      const placeholder = dv.container.querySelector(
        ".universal-empty-table-wrapper"
      );
      if (placeholder) placeholder.remove();

      const oldMessage = uiPanel.querySelector(".universal-no-results");
      if (oldMessage) oldMessage.remove();
    };

    const ensureLayoutPlaceholder = () => {
      const id = "universal-layout-placeholder";
      let existing = document.getElementById(id);

      if (!existing) {
        const el = document.createElement("div");
        el.id = id;
        el.style.height = "250px"; // Подгони под среднюю высоту карточек
        el.style.opacity = "0";
        el.style.pointerEvents = "none";
        el.style.transition = "opacity 0.3s ease";
        dv.container.appendChild(el);
      }
    };

    const renderLayoutPlaceholderLikeTable = () => {
      const tableWrapper = document.createElement("div");
      tableWrapper.className =
        "universal-empty-table-wrapper universal-layout-fake-table";

      const headers = Object.values(config.fields).map((f) => f.label);
      const emptyRow = headers.map(() => "—");

      dv.container.appendChild(tableWrapper);

      const oldContainer = dv.container;
      dv.container = tableWrapper;
      dv.table(headers, [emptyRow]); // ⬅️ это важно: создаёт псевдо-таблицу
      dv.container = oldContainer;
    };

    const removeLayoutPlaceholder = () => {
      const placeholder = dv.container.querySelector(
        ".universal-layout-fake-table"
      );
      if (placeholder) placeholder.remove();
    };

    /**
     * Проверяет, отрисована ли хотя бы одна таблица (то есть открыта секция с карточками)
     */
    const isAnySectionOpen = () => {
      return !!dv.container.querySelector("details[open] table");
    };

    /**
     * Основная функция рендеринга карточек.
     * 1. Применяет фильтры и поиск.
     * 2. Сортирует карточки.
     * 3. Отображает их в секциях или как "остальные".
     * @param {HTMLElement} container - DOM-элемент, куда вставляются карточки.
     * @returns {object} - { headers: string[], rows: string[][] } (для кэширования).
     */
    const renderCards = (container) => {
      const afterFilter = applyFilters(pages, config); // 🔹 фильтры (Whitelist / Blacklist)
      const afterSearch = filterPages(afterFilter, currentSearchQuery); // 🔹 поиск по строке
      const sortedPages = sortPages(afterSearch); // 🔹 итоговая сортировка

      const renderedPages = new Set();
      const blockedPages = new Set();

      // ✅ Удалим заглушку и сообщение, если они были
      clearEmptyPlaceholder();
      removeLayoutPlaceholder();

      // ⚠️ Нет результатов — показать заглушку
      if (afterSearch.length === 0) {
        renderEmptyPlaceholder();
        ensureLayoutPlaceholder();
        return {
          headers: Object.values(config.fields).map((f) => f.label),
          rows: [],
        };
      }

      // 🧩 Рендер секций
      renderSections(sortedPages, renderedPages, blockedPages);
      const remainingPages = renderRemainingPages(sortedPages, renderedPages);

      // 🧩 Вставим псевдо-таблицу, если карточки есть, но ни одна не отображается
      if (!isAnySectionOpen()) {
        renderLayoutPlaceholderLikeTable();
      } else {
        removeLayoutPlaceholder();
      }

      return {
        headers: Object.values(config.fields).map((f) => f.label),
        rows: remainingPages.map(renderRow),
      };
    };

    function insertCollapseAllButton(container) {
      const oldBtn = container.querySelector(".universal-collapse-button");
      if (oldBtn) oldBtn.remove();

      const button = document.createElement("button");
      button.textContent = `🔼 ${t.UI.COLLAPSE_ALL.BUTTON_LABEL}`;
      button.className = "universal-collapse-button";
      button.title = t.UI.COLLAPSE_ALL.TOOLTIP;

      button.addEventListener("click", () => {
        // === 1. Закрытие секций
        const openSections = container.querySelectorAll(
          "details.universal-section[open]"
        );
        openSections.forEach((el) => el.removeAttribute("open"));

        // === 2. Очистка localStorage
        for (const key in localStorage) {
          if (key.startsWith("universal-section-")) {
            localStorage.removeItem(key);
          }
        }

        // === 3. Скроллим до самого верха в scrollable-области Obsidian
        const scrollable = findScrollableParent(dv.container);
        if (scrollable) {
          scrollable.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          // console.warn("Не найден scrollable-родитель");
        }
      });

      container.appendChild(button);
    }

    function findScrollableParent(el) {
      while (el) {
        const style = getComputedStyle(el);
        const overflowY = style.overflowY;
        if (
          (overflowY === "auto" || overflowY === "scroll") &&
          el.scrollHeight > el.clientHeight
        ) {
          return el;
        }
        el = el.parentElement;
      }
      return null;
    }

    // Перерисовывает только таблицу карточек (без панели):
    // - Используется при вводе в строку поиска
    // - Минимизирует затраты: не трогает фильтры и сортировку
    // 🔹 Используется в: searchInput.addEventListener("input", ...)
    const updateCardsOnly = () => {
      const allNodes = [...dv.container.children];
      const uiPanelEl = uiPanel;

      allNodes.forEach((el) => {
        if (el !== uiPanelEl) dv.container.removeChild(el);
      });

      const { headers, rows } = renderCards(dv.container);

      insertCollapseAllButton(dv.container);

      cache.headers = headers;
      cache.rows = rows;
      cache.rendered = true;
    };

    // Основная точка входа рендера: инициализирует интерфейс и вызывает отрисовку
    // - Строит UI (панель поиска, фильтра, сортировки)
    // - Применяет поиск, фильтры, сортировку
    // - Вызывает renderSections и renderRemainingPages
    // 🔹 Использует: applyFilters, filterPages, sortPages, renderSections, renderRemainingPages
    // создаёт uiPanel, sortButtons, searchInput
    const renderAll = () => {
      // Очистка и инициализация
      dv.container.innerHTML = "";

      if (
        inputConfig.checkVersion !== false &&
        !dv.container.querySelector(".universal-version-wrapper")
      ) {
        checkForScriptUpdates(dv, t);
      }

      ensureModal(config);
      rebuildSortButtons();
      dv.container.appendChild(uiPanel);

      // Сброс кэша изображений перед новой отрисовкой
      cache.imageIds = [];

      // Отрисовка всех карточек
      const { headers, rows } = renderCards(dv.container);

      // Навешиваем обработчики модалок на изображения (если уже отрисовались)
      activateModalHandlers(config);

      /**
       * ⬇️ Обеспечиваем работу модалок изображений в секциях карточек.
       *
       * Проблема: если секция <details> была свёрнута при первой загрузке,
       * её содержимое (включая <img>) появляется только при раскрытии — позже.
       * Поэтому нужно повторно вызывать activateModalHandlers, когда пользователь
       * кликает по <summary> (заголовок секции).
       *
       * Мы даём 200ms на завершение отрисовки и навешиваем обработчики на все summary.
       */
      setTimeout(() => {
        document
          .querySelectorAll(".universal-section summary")
          .forEach((summaryEl) => {
            summaryEl.addEventListener("click", () => {
              setTimeout(() => {
                activateModalHandlers(config);
              }, 100); // ⏱ немного ждём, пока DOM обновится после раскрытия
            });
          });
      }, 200); // ⏱ даём времени карточкам отрисоваться

      // Сохраняем метаданные
      cache.headers = headers;
      cache.rows = rows;

      // === 🧷 КНОПКА "СВЕРНУТЬ ВСЁ" ===

      insertCollapseAllButton(dv.container);

      cache.rendered = true;
    };

    // === Кэширование при переходах между вкладками ===
    if (cache.rendered && cache.headers && cache.rows?.length) {
      try {
        dv.table(cache.headers, cache.rows);
      } catch (e) {
        // 🧠 Если не получилось — сделаем полную перерисовку
        renderAll();
      }
    } else {
      renderAll();
    }
  }
}

window.isBlank = isBlank;
window.runUniversalCards = runUniversalCards;
window.initializeSectionMatches = initializeSectionMatches;
