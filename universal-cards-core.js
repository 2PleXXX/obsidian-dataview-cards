const SCRIPT_VERSION = "1.0.0"; // Локальная версия скрипта, нужно менять при каждом обновлении логики

// 🔸 Для секции "🛠 Требуют оформления"
function matchIfIncomplete(page, config) {
  const candidateSections = config.sections.filter((section) => {
    if (section.id === "incomplete" || typeof section.match !== "function")
      return false;

    try {
      return section.match(page, config);
    } catch (e) {
      return false;
    }
  });

  if (candidateSections.length === 0) return true;

  for (const section of candidateSections) {
    const fieldsToCheck = getRequiredFieldsForSection(section, config);
    const hasEmpty = fieldsToCheck.some((field) => {
      const def = config.fields[field];
      return def?.type === "progressBar"
        ? isProgressBarBlank(page, def)
        : isBlank(page[field]);
    });
    if (hasEmpty) return true;
  }

  return false;
}

// Логика для матчей секций.
// 🔹 Проверяет, что страница принадлежит к определённому значению в указанном YAML-поле
function matchBySectionValue(value) {
  return function (page, config) {
    return String(page[config.sectionGroupField] ?? "").trim() === value;
  };
}

// Проверяет, пустое ли значение (null, "", [] и т.д.).
function isBlank(val) {
  return (
    val == null ||
    (typeof val === "string" && val.trim() === "") ||
    (Array.isArray(val) && val.filter((v) => v?.trim?.() !== "").length === 0)
  );
}

/**
 * Проверяет, является ли прогресс-бар "пустым":
 * - Если currentField или maxField пустые, возвращает true.
 */
function isProgressBarBlank(page, def) {
  if (!def?.config) return true;
  const current = page[def.config.currentField];
  const max = page[def.config.maxField];
  return isBlank(current) || isBlank(max);
}

/**
 * Возвращает список обязательных полей, которые отображаются в конкретной секции.
 */
function getRequiredFieldsForSection(section, config) {
  return config.requiredFields.filter(
    (field) => Array.isArray(section.fields) && section.fields.includes(field)
  );
}

function runUniversalCards(dv, inputConfig = {}) {
  checkForScriptUpdates();

  async function checkForScriptUpdates() {
    const versionUrl =
      "https://raw.githubusercontent.com/2PleXXX/universal-cards-view/main/version.json";

    try {
      const res = await fetch(versionUrl);
      if (!res.ok) throw new Error("❌ Не удалось получить данные о версии");

      const data = await res.json();
      const latestVersion = data.version;

      if (compareVersions(SCRIPT_VERSION, latestVersion) < 0) {
        const notice = document.createElement("div");
        notice.className = "universal-script-update";
        notice.innerHTML = `🆕 Доступна новая версия <strong>${latestVersion}</strong> &nbsp;
            <a href="https://github.com/2PleXXX/universal-cards-view" target="_blank">Обновить скрипт</a>`;
        dv.container.prepend(notice);
      }
    } catch (e) {
      console.warn("Ошибка при проверке обновлений:", e.message);
    }
  }

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

  // === ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ СОСТОЯНИЯ ===
  let currentSortField = config.defaultSortField;
  let currentSortOrder = config.defaultSortOrder;
  let currentSearchQuery = "";

  // === БЛОК 2. 🔧 УТИЛИТЫ ===
  /**
   * - isBlank, isProgressBarBlank, getCleanedStringList, resolveFileFromRaw, getSafeId, getFirstFieldValue, getRequiredFieldsForSection, resolveFileFromRaw, getSafeId
   * - Вспомогательные функции для работы с данными
   */

  /**
   * Преобразует значение в массив строк:
   * - Если строка — оборачивает в массив
   * - Если массив — фильтрует и очищает
   * - Если пусто — возвращает []
   */
  const getCleanedStringList = (val) => {
    if (Array.isArray(val)) {
      return val
        .map((v) => {
          if (typeof v === "string") return v.trim();
          if (typeof v === "object" && v?.path) return v.path;
          return "";
        })
        .filter((v) => v !== "");
    } else if (typeof val === "string" && val.trim() !== "") {
      return [val.trim()];
    }
    return [];
  };

  /**
   * Извлекает файл из vault по ссылке или пути.
   * Поддерживает форматы: "![[file.png]]", "file.png", { path: "file.png" }.
   */
  const resolveFileFromRaw = (raw) => {
    const currentPath = dv.current()?.file?.path;
    const cache = getCardScriptCache(currentPath || "default");

    if (currentPath) {
      if (
        !cache.allFiles ||
        !Array.isArray(cache.allFiles) ||
        cache.allFiles.length === 0
      ) {
        console.warn("🧼 Обнаружен пустой кэш файлов — перезаполняем");
        cache.allFiles = app.vault.getFiles();
      }
    }

    const files = cache.allFiles;

    if (typeof raw === "object" && raw.path) {
      const fileName = raw.path.split("/").pop();
      return files.find((f) => f.name === fileName);
    }

    if (typeof raw === "string") {
      const match = raw.match(/!\[\[(.*?)\]\]/);
      if (match) {
        return files.find((f) => f.name === match[1]);
      } else {
        const fileName = raw.split("/").pop();
        return files.find((f) => f.name === fileName);
      }
    }

    return null;
  };

  /**
   * Генерирует уникальный ID для элемента DOM.
   * Используется для модальных окон и аудио/видео.
   */
  const getSafeId = (page, key, prefix = "id") => {
    const base = page?.file?.name?.replace(/[^a-zA-Z0-9_-]/g, "") || "page";
    const unique =
      crypto.randomUUID?.() || Math.random().toString(36).substring(2, 10);
    return `${prefix}-${base}-${key}-${unique}`;
  };

  // === БЛОК 3. 🧮 СОРТИРОВКА И ФИЛЬТРАЦИЯ ===
  // - sortPages, getSortableValue, applyFilters, filterPages, parseNumberSafe

  // Превращает любые строки, списки, null и т.п. в число:
  const parseNumberSafe = (val) => {
    if (Array.isArray(val)) val = val[0];
    const num = parseFloat(val);
    return isNaN(num) ? -Infinity : num; // -Infinity — значит "в самый конец"
  };

  /**
   * Преобразует значение поля страницы в строку для сортировки.
   * @param {object} page - Объект страницы из Dataview.
   * @param {string} field - Название поля (например, "НазваниеНоль").
   * @returns {string} - Строка для сравнения (например, "Фантастика" или имя файла).
   */
  const getSortableValue = (page, field) => {
    let raw = page[field];
    if (Array.isArray(raw)) raw = raw[0];

    if (typeof raw === "string" && raw.trim() !== "") return raw.trim();
    if (typeof raw === "object" && raw?.path) return raw.path.split("/").pop();

    return page.file.name.replace(/\.md$/, "");
  };

  /**
   * Сортирует массив страниц по выбранному полю или специальному правилу.
   * Поддерживает: обычные поля, длину контента, случайный порядок и даты.
   * @param {Array} pages - Массив страниц для сортировки.
   * @returns {Array} - Новый отсортированный массив.
   */
  const sortPages = (pages) => {
    const sortDef = config.sortButtons.find(
      (b) => b.field === currentSortField || b.special === currentSortField
    );

    if (!sortDef) return [...pages];

    // === СОРТИРОВКА ПО ДЛИНЕ СОДЕРЖИМОГО
    if (sortDef.special === "length") {
      const getLength = (p) => {
        try {
          return JSON.stringify(p).length;
        } catch (e) {
          return 0;
        }
      };
      return [...pages].sort((a, b) => {
        const aLen = getLength(a);
        const bLen = getLength(b);
        return currentSortOrder === "asc" ? aLen - bLen : bLen - aLen;
      });
    }

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
        const aNum = parseNumberSafe(aVal);
        const bNum = parseNumberSafe(bVal);
        return currentSortOrder === "asc" ? aNum - bNum : bNum - aNum;
      }

      // === 🧮 СОРТИРОВКА ДЛЯ ЧИСЛОВОГО ПОЛЯ
      if (fieldType === "number") {
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

        const aRatio = aMax > 0 ? aCurr / aMax : -Infinity;
        const bRatio = bMax > 0 ? bCurr / bMax : -Infinity;

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

  /**
   * Фильтрует страницы по правилам из `filterState` (whitelist/blacklist).
   * @param {Array} pages - Массив страниц для фильтрации.
   * @param {Config} config - Общий конфиг скрипта.
   * @returns {Array} - Отфильтрованный массив страниц.
   * @example
   * // filterState: { rules: [{ field: "ЖанрНоль", values: ["Фантастика"], mode: "whitelist" }] }
   * applyFilters(pages, config); // → вернёт только карточки с жанром "Фантастика"
   */
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
          passed = values.some((v) => whitelist.has(v));
        }

        // === Потом blacklist ===
        if (passed && blacklist.size > 0) {
          if (values.some((v) => blacklist.has(v))) {
            passed = false;
          }
        }

        fieldResults.push(passed);
      }

      return logic === "all"
        ? fieldResults.every(Boolean)
        : fieldResults.some(Boolean);
    });
  };

  /**
   * Простой текстовый фильтр по полю из config.searchField
   * Работает независимо от фильтров
   */
  const filterPages = (allPages, query) => {
    return allPages.where((p) => {
      const val = p[config.searchField];
      const str = Array.isArray(val) ? val.join(", ") : String(val || "");
      return str.toLowerCase().includes(query.toLowerCase());
    });
  };

  // === БЛОК 4. 🧠 КЭШ И СОСТОЯНИЕ ===
  // getCardScriptCache, getSliderStorageKey, saveSliderPosition, loadSliderPosition, observeForImage

  /**
   * Генерирует уникальный ключ для сохранения состояния слайдера
   * @param {object} page - Объект страницы
   * @param {string} key - Ключ поля
   * @returns {string} - Уникальный ключ для localStorage
   */
  const getSliderStorageKey = (page, key) => {
    const pagePath = page?.file?.path || "unknown";
    return `universal-slider-${pagePath}-${key}`;
  };

  /**
   * Сохраняет текущую позицию слайдера
   * @param {string} sliderId - ID слайдера
   * @param {number} index - Текущая позиция
   * @param {string} storageKey - Ключ для localStorage
   */
  const saveSliderPosition = (sliderId, index, storageKey) => {
    try {
      localStorage.setItem(storageKey, index.toString());
    } catch (error) {
      console.warn("Не удалось сохранить позицию слайдера:", error);
    }
  };

  /**
   * Восстанавливает сохраненную позицию слайдера
   * @param {string} storageKey - Ключ для localStorage
   * @returns {number} - Сохраненная позиция или 0 по умолчанию
   */
  const loadSliderPosition = (storageKey) => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? parseInt(saved, 10) : 0;
    } catch (error) {
      console.warn("Не удалось загрузить позицию слайдера:", error);
      return 0;
    }
  };

  /**
   * Возвращает изолированный кэш для текущей заметки.
   * Хранит: filterState, imageIds, videoIds и др.
   */
  const getCardScriptCache = (path) => {
    if (!window.cardScriptCache) window.cardScriptCache = {};
    if (!window.cardScriptCache[path]) window.cardScriptCache[path] = {};
    return window.cardScriptCache[path];
  };

  /**
   * Отслеживает появление изображения в DOM для модальных окон.
   */
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
  // В этом блоке:
  // - ensureModal - создаёт базовую структуру модального окна
  // - showModal - отображает модальное окно с изображением
  // - renderFilterModal - рендерит модалку для настройки фильтров
  // - activateModalHandlers - добавляет обработчики для изображений

  /**
   * Создаёт модальное окно для показа изображений в полном размере.
   * Заменяет предыдущую модалку, если уже была.
   * @param {Config} config - Конфигурация скрипта
   */
  const ensureModal = (config) => {
    const existing = document.getElementById("universal-modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "universal-modal";
    modal.className = config.modalStyleClasses.modalClass;

    // === КРИТИЧЕСКИ ВАЖНЫЕ СТИЛИ (НЕ УДАЛЯТЬ! КОММЕНТАРИИ НЕ ТРОГАТЬ) ===
    Object.assign(modal.style, {
      display: "none", // Не отображать по умолчанию
      position: "fixed", // Фиксированная позиция поверх всего
      inset: 0, // Растянуть на весь экран (top/right/bottom/left = 0)
      zIndex: "9999", // Поверх всех элементов
    });

    const modalImg = document.createElement("img");
    modalImg.className = config.modalStyleClasses.imageClass;
    modalImg.alt = "Poster";
    modalImg.draggable = false;

    modal.appendChild(modalImg);
    document.body.appendChild(modal);

    // Закрытие модалки по клику вне изображения
    modal.addEventListener("mouseup", () => {
      modal.style.display = "none";
    });
  };

  /**
   * Показывает изображение в модальном окне
   * @param {string} src - Путь к изображению
   * @param {Config} config - Конфигурация скрипта
   */
  const showModal = (src, config) => {
    const modal = document.querySelector(
      `.${config.modalStyleClasses.modalClass}`
    );
    const img = modal?.querySelector("img");

    if (modal && img) {
      img.onload = () => {
        modal.style.display = "flex";
      };
      img.src = src;
    }
  };

  /**
   * Активирует обработчики для модальных окон изображений.
   * - Поддерживает режимы `click` и `hold` (из config.modalBehavior).
   * - Работает через MutationObserver для динамически загруженных картинок.
   * @param {Config} config - Общий конфиг скрипта.
   */
  const activateModalHandlers = (config) => {
    const cache = getCardScriptCache(dv.current()?.file?.path || "default");

    if (!cache.imageIds) return;

    for (const id of cache.imageIds) {
      observeForImage(id, (img) => {
        const src = img.src;
        if (config.modalBehavior === "hold") {
          img.addEventListener("mousedown", (e) => {
            e.preventDefault();
            showModal(src, config);

            const onMouseUp = () => {
              const modal = document.querySelector(
                `.${config.modalStyleClasses.modalClass}`
              );
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

  /**
   * Рендерит модальное окно для настройки фильтров.
   * Позволяет:
   * - Выбирать поля для фильтрации (например, "ЖанрНоль").
   * - Указывать значения (через теги).
   * - Переключать режимы whitelist/blacklist.
   * @param {Config} config - Общий конфиг скрипта.
   * @param {function} onClose - Колбэк, вызываемый после закрытия окна.
   */
  const renderFilterModal = (config, onClose) => {
    const cache = getCardScriptCache(dv.current()?.file?.path || "default");

    const pages = dv
      .pages()
      .where((p) => p.file?.path?.includes(config.folderKeyword))
      .where((p) => {
        if (!config.typeFilteringEnabled) return true;
        const val = p[config.typeField];
        return Array.isArray(val)
          ? val.includes(config.typeValue)
          : val === config.typeValue;
      }).values;

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
    title.textContent = "Настройка фильтрации";
    modal.appendChild(title);

    const note = document.createElement("p");
    note.textContent = "Задайте правила фильтрации карточек.";
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
    fieldLabel.textContent = "Поле для фильтрации:";
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

      if (!cache.filterState) {
        cache.filterState = {
          rules: [],
          matchLogic: config.filtering.defaultMatchMode || "any",
        };
      }

      if (!Array.isArray(cache.filterState.rules)) {
        cache.filterState.rules = [];
      }

      // Найти существующее правило по полю и режиму
      const existingIndex = cache.filterState.rules.findIndex(
        (r) => r.field === prevField && r.mode === mode
      );

      if (existingIndex !== -1) {
        const oldValues = cache.filterState.rules[existingIndex].values;
        const combined = Array.from(new Set([...oldValues, ...values]));
        cache.filterState.rules[existingIndex].values = combined;
      } else {
        cache.filterState.rules.push({ field: prevField, values, mode });
      }

      currentTags = [];
      renderTags();
      updateActiveFilters(); // Обновим список в UI

      // Переключаемся на новое поле
      fieldSelect.dataset.lastField = fieldSelect.value;
    });

    fieldSelect.dataset.lastField = fieldSelect.value;

    // === Ввод значений (теги) ===
    const valueInputWrapper = document.createElement("div");
    valueInputWrapper.classList.add("universal-input-wrapper");

    const valueLabel = document.createElement("label");
    valueLabel.textContent = "Значения фильтра:";
    valueLabel.className = "universal-label";

    const tagInputContainer = document.createElement("div");
    tagInputContainer.className = "universal-tag-input-container";

    const tagList = document.createElement("div");
    tagList.className = "universal-tag-list";

    const tagInput = document.createElement("input");
    tagInput.type = "text";
    tagInput.placeholder = "Введите значение и нажмите Enter...";
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
      if (Array.isArray(cache.filterState?.rules)) {
        for (const rule of cache.filterState.rules) {
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
      if (Array.isArray(cache.filterState?.rules)) {
        for (const rule of cache.filterState.rules) {
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
    modeLabel.textContent = "Режим фильтрации:";
    modeLabel.style.display = "block";
    modeLabel.style.marginBottom = "0.3em";

    const modeToggle = document.createElement("button");
    modeToggle.className = "universal-mode-toggle";

    let currentMode =
      cache.filterState?.filterMode ||
      config.filtering.defaultFilterMode ||
      "whitelist";

    const updateModeButton = () => {
      modeToggle.textContent =
        currentMode === "whitelist" ? "✅ Показать" : "🚫 Исключить";
    };

    modeToggle.onclick = () => {
      // Сохраняем теги перед сменой режима
      if (currentTags.length > 0) {
        const field = fieldSelect.dataset.lastField || fieldSelect.value;
        const values = [...currentTags];
        const mode = currentMode; // старый режим

        if (!cache.filterState) {
          cache.filterState = {
            rules: [],
            matchLogic: config.filtering.defaultMatchMode || "any",
          };
        }

        if (!Array.isArray(cache.filterState.rules)) {
          cache.filterState.rules = [];
        }

        const existingIndex = cache.filterState.rules.findIndex(
          (r) => r.field === field && r.mode === mode
        );

        if (existingIndex !== -1) {
          const oldValues = cache.filterState.rules[existingIndex].values;
          const combined = Array.from(new Set([...oldValues, ...values]));
          cache.filterState.rules[existingIndex].values = combined;
        } else {
          cache.filterState.rules.push({ field, values, mode });
        }

        currentTags = [];
        renderTags();
        updateActiveFilters();
      }

      // Теперь меняем режим
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

      const rules = cache.filterState?.rules || [];

      if (rules.length === 0) return;

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

        // === Заголовок с иконкой поля ===
        const emoji = config.fields?.[field]?.emoji || "📂";
        // === Заголовок со стрелкой и сворачиванием ===
        const toggleBtn = document.createElement("div");
        toggleBtn.className = "universal-collapsible-header";

        const arrow = document.createElement("span");
        arrow.className = "universal-collapsible-arrow";
        arrow.textContent = "🔽"; // по умолчанию — раскрыто

        const titleText = document.createElement("strong");
        titleText.textContent = `${emoji} ${field}`;

        toggleBtn.appendChild(arrow);
        toggleBtn.appendChild(titleText);
        wrapper.appendChild(toggleBtn);

        // === Контейнер для whitelist / blacklist (сворачиваемый)
        const detailsContainer = document.createElement("div");
        detailsContainer.className = "universal-field-details";
        wrapper.appendChild(detailsContainer);

        // === Обработчик сворачивания
        let collapsed = false;
        toggleBtn.addEventListener("click", () => {
          collapsed = !collapsed;
          detailsContainer.style.display = collapsed ? "none" : "block";
          arrow.textContent = collapsed ? "▶️" : "🔽";
        });

        // === Подгруппа: whitelist
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
              // Удаляем тег из whitelist
              const idx = rules.findIndex(
                (r) => r.field === field && r.mode === "whitelist"
              );
              if (idx !== -1) {
                const list = rules[idx].values;
                rules[idx].values = list.filter((v) => v !== val);
                // Если после удаления список пуст — удаляем правило
                if (rules[idx].values.length === 0) rules.splice(idx, 1);
              }

              updateActiveFilters();
              if (typeof onClose === "function") onClose();
            };

            valEl.appendChild(xBtn);
            whiteRow.appendChild(valEl);
          });

          detailsContainer.appendChild(whiteRow);
        }

        // === Подгруппа: blacklist
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
              // Удаляем тег из blacklist
              const idx = rules.findIndex(
                (r) => r.field === field && r.mode === "blacklist"
              );
              if (idx !== -1) {
                const list = rules[idx].values;
                rules[idx].values = list.filter((v) => v !== val);
                if (rules[idx].values.length === 0) rules.splice(idx, 1);
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

      // === Кнопка "Очистить теги"
      const clearAllBtn = document.createElement("button");
      clearAllBtn.textContent = "🗑 Очистить теги";
      clearAllBtn.className = "universal-clear-all-button";

      clearAllBtn.onclick = () => {
        cache.filterState.rules = [];
        currentTags = [];
        renderTags();
        updateActiveFilters();
        if (typeof onClose === "function") onClose();
      };

      activeFiltersWrapper.appendChild(clearAllBtn);
    };

    updateActiveFilters(); // запускаем сразу
    modal.appendChild(activeFiltersWrapper);

    // Кнопки
    const controls = document.createElement("div");
    controls.className = "universal-filter-controls";

    const applyBtn = document.createElement("button");
    applyBtn.textContent = "✅ Применить";
    applyBtn.onclick = () => {
      // 🛡️ Инициализируем filterState, если его ещё нет
      if (!cache.filterState) {
        cache.filterState = {
          rules: [],
          matchLogic: config.filtering.defaultMatchMode || "any",
          filterMode: config.filtering.defaultFilterMode || "whitelist",
        };
      }

      cache.filterState.matchLogic = currentLogic;
      cache.filterState.filterMode = currentMode;

      // ⬇️ Сохраняем текущие теги, если они есть
      const field = fieldSelect.dataset.lastField || fieldSelect.value;
      const values = [...currentTags];
      const mode = currentMode;

      if (values.length > 0) {
        const existingIndex = cache.filterState.rules.findIndex(
          (r) => r.field === field && r.mode === mode
        );

        if (existingIndex !== -1) {
          const oldValues = cache.filterState.rules[existingIndex].values;
          const combined = Array.from(new Set([...oldValues, ...values]));
          cache.filterState.rules[existingIndex].values = combined;
        } else {
          cache.filterState.rules.push({ field, values, mode });
        }
      }

      if (config.filtering.saveToLocalStorage) {
        const key = `universal-${dv.current()?.file?.path}-filters`;
        localStorage.setItem(key, JSON.stringify(cache.filterState));
      }

      overlay.remove();
      onClose();
    };

    //Кнопка сброса фильтров и подтверждение сброса
    const resetBtn = document.createElement("button");
    resetBtn.textContent = "🔄 Сбросить фильтры";
    resetBtn.onclick = () => {
      let confirmModalOpen = true;

      const confirmOverlay = document.createElement("div");
      confirmOverlay.className = "universal-confirm-overlay";

      const confirmBox = document.createElement("div");
      confirmBox.className = "universal-confirm-modal";
      confirmBox.innerHTML = `
      <h3>Сбросить все фильтры?</h3>
      <p>Будет сброшено:</p>
      <ul>
        <li>Все выбранные теги</li>
        <li>Выбранный режим (Black/White list)</li>
        <li>Логика (OR/AND)</li>
      </ul>
    `;

      const confirmBtn = document.createElement("button");
      confirmBtn.textContent = "✅ Да, сбросить";
      confirmBtn.onclick = () => {
        cache.filterState = {
          rules: [],
          matchLogic: config.filtering.defaultMatchMode || "any",
          filterMode: config.filtering.defaultFilterMode || "whitelist",
        };
        currentTags = [];
        renderTags();
        hideSuggestions();

        if (config.filtering.saveToLocalStorage) {
          const key = `universal-${dv.current()?.file?.path}-filters`;
          localStorage.removeItem(key);
        }

        confirmModalOpen = false;
        document.removeEventListener("keydown", escHandler);
        confirmOverlay.remove();
        overlay.remove();

        // ✅ Используем тот же onClose, как при "Применить"
        if (typeof onClose === "function") onClose();
      };

      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "❌ Отмена";
      cancelBtn.onclick = () => {
        confirmModalOpen = false;
        document.removeEventListener("keydown", escHandler);
        confirmOverlay.remove();
      };

      confirmBox.appendChild(confirmBtn);
      confirmBox.appendChild(cancelBtn);
      confirmOverlay.appendChild(confirmBox);
      document.body.appendChild(confirmOverlay);

      const escHandler = (e) => {
        if (e.key === "Escape") {
          if (confirmModalOpen) {
            confirmModalOpen = false;
            confirmOverlay.remove();
            document.removeEventListener("keydown", escHandler);
            e.stopPropagation();
          }
        }
      };
      document.addEventListener("keydown", escHandler, { capture: true });
    };

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "❌ Отмена";
    cancelBtn.onclick = () => {
      overlay.remove();
      app.workspace.off("active-leaf-change", detachHandler);
    };

    // === Переключатель логики: AND / OR ===
    const logicWrapper = document.createElement("div");
    logicWrapper.style.marginTop = "1em";

    // === Заголовок + иконка инфо ===
    const labelRow = document.createElement("div");
    labelRow.className = "universal-logic-label-row";

    const logicLabel = document.createElement("label");
    logicLabel.textContent = "Условия фильтрации";
    logicLabel.className = "universal-logic-label";

    const infoIcon = document.createElement("span");
    infoIcon.className = "universal-info-icon";
    infoIcon.textContent = "ℹ️";
    infoIcon.title =
      "🔘 Любое условие — карточка пройдёт, если выполнено хотя бы одно правило.\n🧩 Все условия — карточка пройдёт, если выполнены все правила.";

    labelRow.appendChild(logicLabel);
    labelRow.appendChild(infoIcon);

    const logicToggle = document.createElement("button");
    logicToggle.className = "universal-logic-toggle";

    let currentLogic =
      cache.filterState?.matchLogic ||
      config.filtering.defaultMatchMode ||
      "any";

    const updateLogicButton = () => {
      logicToggle.textContent =
        currentLogic === "any" ? "🔘 Любое условие" : "🧩 Все условия";
    };

    logicToggle.onclick = () => {
      currentLogic = currentLogic === "any" ? "all" : "any";
      updateLogicButton();
    };

    updateLogicButton();

    logicWrapper.appendChild(labelRow);
    logicWrapper.appendChild(logicToggle);
    modal.appendChild(logicWrapper);

    controls.appendChild(applyBtn);
    controls.appendChild(resetBtn);
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
      const mode = currentMode;
      const values = [...currentTags];

      if (!cache.filterState) {
        cache.filterState = {
          rules: [],
          matchLogic: config.filtering.defaultMatchMode || "any",
        };
      }

      if (!Array.isArray(cache.filterState.rules)) {
        cache.filterState.rules = [];
      }

      const existingIndex = cache.filterState.rules.findIndex(
        (r) => r.field === prevField && r.mode === mode
      );

      if (existingIndex !== -1) {
        const oldValues = cache.filterState.rules[existingIndex].values;
        const combined = Array.from(new Set([...oldValues, ...values]));
        cache.filterState.rules[existingIndex].values = combined;
      } else {
        cache.filterState.rules.push({ field: prevField, values, mode });
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

      const isActive =
        dv.container.contains(document.activeElement) ||
        overlay.contains(document.activeElement);
      const isFocused = document.activeElement
        ?.closest(".workspace-leaf.mod-active")
        ?.contains(overlay);

      if (isActive || isFocused) {
        overlay.remove();
        document.removeEventListener("keydown", handleEscape);
        app.workspace.off("active-leaf-change", detachHandler);
      }
    };
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
  // В этом блоке:
  // - fieldRenderers - объект с рендерерами для всех типов полей
  // - renderField - основная функция для рендеринга полей
  // - parseImage - вспомогательная функция для обработки изображений
  // - resolveCssClass - утилита для работы с CSS-классами

  /**
   * Возвращает CSS-класс: либо пользовательский, либо дефолтный
   * @param {string} userClass - Пользовательский класс из конфига
   * @param {string} defaultClass - Класс по умолчанию
   * @returns {string} - Итоговый класс
   */
  const resolveCssClass = (userClass, defaultClass) => {
    return (userClass || "").trim() || defaultClass;
  };

  /**
   * Рендеринг изображения с модальным окном
   * @param {any} val - Значение поля
   * @param {object} page - Объект страницы
   * @param {object} def - Конфиг поля
   * @param {string} key - Ключ поля
   * @param {Config} config - Конфигурация скрипта
   * @returns {string} - HTML для вставки
   */
  const parseImage = (val, page, def, key, config) => {
    if (isBlank(val)) {
      return `<div class="universal-image-wrapper">Нет ${
        def?.label || key
      }</div>`;
    }

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

    return `<div class="universal-image-wrapper">
    <img id="${id}" src="${path}" class="${resolveCssClass(
      def?.cssClass,
      "universal-image"
    )}" draggable="false" loading="lazy">
  </div>`;
  };

  /**
   * Рендереры для всех поддерживаемых типов полей
   * Каждый возвращает HTML в виде строки
   */
  const fieldRenderers = {
    // 🖼️ Изображение с поддержкой модалки
    image: (val, page, def, key, config) => {
      const items = getCleanedStringList(val);
      const maxItems = def?.maxItems || 1;
      const useSlider = def?.slider && items.length > 1;

      if (items.length === 0) {
        return `<div class="universal-image-wrapper">Нет ${
          def?.label || key
        }</div>`;
      }

      const limitedItems = items.slice(0, maxItems);
      const cache = getCardScriptCache(dv.current()?.file?.path || "default");

      const imageClass = resolveCssClass(def?.cssClass, "universal-image");

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

      return `<div class="universal-image-wrapper universal-slider-wrapper" data-slider-wrapper="${sliderId}">
      ${slides.join("\n")}
      <button class="universal-slider-button universal-slider-prev" data-slider="${sliderId}">←</button>
      <button class="universal-slider-button universal-slider-next" data-slider="${sliderId}">→</button>
      <div class="universal-slider-count" data-slider="${sliderId}">${
        initialIndex + 1
      } / ${limitedItems.length}</div>
    </div>`;
    },

    // 📝 Простое текстовое поле (или список строк)
    text: (val, page, def, key, config) => {
      const outerClass = resolveCssClass(def?.cssClass, "universal-text");
      const items = getCleanedStringList(val);

      const content =
        items.length > 0 ? items.join(", ") : `Нет ${def?.label || key}`;

      return `<div class="${outerClass}">${content}</div>`;
    },

    // 🔗 Ссылка на заметку Obsidian (или замена по полю)
    pageLink: (val, page, def, key, config) => {
      const outerClass = resolveCssClass(def?.cssClass, "universal-link");
      const filePath = page.file.path;
      const fileName = page.file.name.replace(/\.md$/, "");

      // 💡 Безопасное извлечение значения
      let raw = Array.isArray(val) ? val[0] : val;
      const display =
        typeof raw === "string" && raw.trim() !== "" ? raw.trim() : fileName;

      const html = `<a href="${filePath}" class="internal-link">${display}</a>`;
      return `<div class="${outerClass}">${html}</div>`;
    },

    // 📋 Список: bullets или inline
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

      if (items.length === 0) {
        const wrapperClass = resolveCssClass(
          def?.cssClass,
          asBullets ? "universal-list-empty" : baseClass
        );
        return `<div class="${wrapperClass}">Нет ${def?.label || key}</div>`;
      }

      const fullList = items.join(", ");
      const tooltip = hidden.length > 0 ? ` title="${fullList}"` : "";

      const hiddenMarker =
        hidden.length > 0
          ? `<span class="universal-more-items">+ ещё ${hidden.length}…</span>`
          : "";

      if (asBullets) {
        return `<ul class="${baseClass}"${tooltip}>
        ${visible.map((item) => `<li>${item}</li>`).join("")}
        ${hiddenMarker ? `<li>${hiddenMarker}</li>` : ""}
      </ul>`;
      } else {
        return `<div class="${baseClass}"${tooltip}>
        ${visible.join(", ")}${hiddenMarker ? ` ${hiddenMarker}` : ""}
      </div>`;
      }
    },

    // 🏷️ Бейджи: inline-теги
    badge: (val, page, def, key, config) => {
      const containerClass = resolveCssClass(
        def?.cssClass,
        "universal-badge-container"
      );
      const itemClass = resolveCssClass(def?.itemClass, "universal-badge-item");
      const maxItems = def?.maxItems || Infinity;

      const items = getCleanedStringList(val);
      const visible = items.slice(0, maxItems);
      const hidden = items.slice(maxItems);

      if (items.length === 0)
        return `<div class="${containerClass}">Нет ${def?.label || key}</div>`;

      const fullList = items.join(", ");
      const tooltip = hidden.length > 0 ? ` title="${fullList}"` : "";

      const hiddenMarker =
        hidden.length > 0
          ? `<span class="universal-more-items">+ ещё ${hidden.length}…</span>`
          : "";

      return `<div class="${containerClass}"${tooltip}>
      ${visible
        .map((item) => `<span class="${itemClass}">${item}</span>`)
        .join(" ")}
      ${hiddenMarker}
    </div>`;
    },

    // 🔊 Воспроизводимое аудио (mp3, wav)
    audio: (val, page, def, key, config) => {
      const outerClass = resolveCssClass(def?.cssClass, "universal-audio");
      if (isBlank(val))
        return `<div class="${outerClass}">Нет ${def?.label || key}</div>`;

      const raw = Array.isArray(val) ? val[0] : val;
      const rawStr = String(raw).trim();

      if (
        rawStr.startsWith("http") &&
        (rawStr.endsWith(".mp3") ||
          rawStr.endsWith(".ogg") ||
          rawStr.endsWith(".wav"))
      ) {
        const id = getSafeId(page, key, "aud");
        return `<div class="${outerClass}">
        <audio id="${id}" src="${rawStr}" controls preload="metadata" style="width: 100%;"></audio>
      </div>`;
      }

      const file = resolveFileFromRaw(raw);
      if (file) {
        const src = app.vault.getResourcePath(file);
        const id = getSafeId(page, key, "aud");
        return `<div class="${outerClass}">
        <audio id="${id}" src="${src}" controls preload="metadata" style="width: 100%;"></audio>
      </div>`;
      }

      const fallbackFile = app.metadataCache.getFirstLinkpathDest(
        rawStr.replace(/!\[\[|\]\]/g, ""),
        page.file.path
      );
      if (fallbackFile) {
        return `<div class="${outerClass}"><a class="internal-link" href="${fallbackFile.path}">${fallbackFile.name}</a></div>`;
      }

      try {
        const url = new URL(rawStr);
        return `<div class="${outerClass}"><a href="${url.href}" target="_blank" rel="noopener noreferrer">Слушать аудио</a></div>`;
      } catch (e) {
        return `<div class="${outerClass}">Неизвестный формат аудио</div>`;
      }
    },

    // 🎬 Воспроизводимое видео
    video: (val, page, def, key, config) => {
      const outerClass = resolveCssClass(def?.cssClass, "universal-video");
      if (isBlank(val))
        return `<div class="${outerClass}">Нет ${def?.label || key}</div>`;

      const raw = Array.isArray(val) ? val[0] : val;
      const rawStr = String(raw).trim();

      // YouTube
      if (rawStr.includes("youtube.com") || rawStr.includes("youtu.be")) {
        try {
          const url = new URL(rawStr);
          const videoId =
            url.searchParams.get("v") || url.pathname.split("/").pop();

          if (videoId && videoId.length === 11) {
            return `<div class="${outerClass}">
            <iframe width="100%" height="240" src="https://www.youtube.com/embed/${videoId}"
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
          </div>`;
          } else {
            return `<div class="${outerClass}">⚠️ Не удалось извлечь ID YouTube</div>`;
          }
        } catch (e) {
          return `<div class="${outerClass}">⚠️ Невалидная YouTube-ссылка</div>`;
        }
      }

      // Прямая ссылка на mp4
      if (rawStr.startsWith("http") && rawStr.endsWith(".mp4")) {
        const id = getSafeId(page, key, "vid");
        return `<div class="${outerClass}">
        <video id="${id}" src="${rawStr}" controls preload="metadata" style="width: 100%; max-height: 240px;"></video>
      </div>`;
      }

      // Файл из хранилища
      const file = resolveFileFromRaw(raw);
      if (file) {
        const src = app.vault.getResourcePath(file);
        const id = getSafeId(page, key, "vid");
        return `<div class="${outerClass}">
        <video id="${id}" src="${src}" controls preload="metadata" style="width: 100%; max-height: 240px;"></video>
      </div>`;
      }

      // Внутренняя ссылка
      const fallbackFile = app.metadataCache.getFirstLinkpathDest(
        rawStr.replace(/!\[\[|\]\]/g, ""),
        page.file.path
      );
      if (fallbackFile) {
        return `<div class="${outerClass}"><a class="internal-link" href="${fallbackFile.path}">${fallbackFile.name}</a></div>`;
      }

      // Если это просто внешняя ссылка — показываем её
      try {
        const url = new URL(rawStr);
        return `<div class="${outerClass}"><a href="${url.href}" target="_blank" rel="noopener noreferrer">Смотреть видео</a></div>`;
      } catch (e) {
        return `<div class="${outerClass}">Неизвестный формат видео</div>`;
      }
    },

    // Прогресс-бар
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

      if (isNaN(current) || isNaN(max) || max <= 0) {
        return `<div class="${outerClass}">Нет ${def?.label || key}</div>`;
      }

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
          <div class="universal-progress-bar-inner ${progressClass}" style="width: ${percent}%;">
            <span class="universal-progress-label">${percent}%</span>
          </div>
        </div>
      </div>
    `;
    },

    // Дата
    date: (val, page, def, key, config) => {
      const outerClass = resolveCssClass(def?.cssClass, "universal-date");
      if (isBlank(val))
        return `<div class="${outerClass}">Нет ${def?.label || key}</div>`;

      const raw = Array.isArray(val) ? val[0] : val;

      // Попробуем распарсить через luxon или Date
      let date;
      if (window.luxon?.DateTime) {
        const DateTime = window.luxon.DateTime;
        date = DateTime.fromISO(String(raw));
        if (!date.isValid) {
          date = DateTime.fromFormat(String(raw), "dd.MM.yyyy");
        }
        if (!date.isValid) {
          date = DateTime.fromFormat(String(raw), "yyyy-MM-dd");
        }
        if (!date.isValid) {
          return `<div class="${outerClass}">Неверный формат даты</div>`;
        }
        const formatted = date
          .setLocale("ru")
          .toLocaleString(DateTime.DATE_FULL);
        return `<div class="${outerClass}">${formatted}</div>`;
      } else {
        // Без luxon — нативный Date (менее надёжный)
        try {
          const d = new Date(raw);
          if (isNaN(d.getTime())) {
            return `<div class="${outerClass}">Неверная дата</div>`;
          }
          const formatted = d.toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          return `<div class="${outerClass}">${formatted}</div>`;
        } catch (e) {
          return `<div class="${outerClass}">Ошибка даты</div>`;
        }
      }
    },

    // Рейтинг
    rating: (val, page, def, key, config) => {
      const outerClass = resolveCssClass(def?.cssClass, "universal-rating");
      if (isBlank(val))
        return `<div class="${outerClass}">Нет ${def?.label || key}</div>`;

      const raw = Array.isArray(val) ? val[0] : val;
      const score = parseFloat(raw);
      const max = def?.config?.maxRating || 10;

      if (isNaN(score) || isNaN(max) || max <= 0) {
        return `<div class="${outerClass}">Некорректная оценка</div>`;
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

    // 🏷️ Системные теги Obsidian (из поля tags)
    tags: (val, page, def, key, config) => {
      const containerClass = resolveCssClass(
        def?.cssClass,
        "universal-tags-container"
      );
      const itemClass = resolveCssClass(def?.itemClass, "universal-tags-item");

      const items = Array.isArray(val)
        ? val
        : typeof val === "string"
        ? [val]
        : [];

      if (items.length === 0) {
        return `<div class="${containerClass}">Нет ${def?.label || key}</div>`;
      }

      return `<div class="${containerClass}">
      ${items
        .map((tag) => `<span class="${itemClass}">#${tag}</span>`)
        .join(" ")}
    </div>`;
    },
  };

  /**
   * Рендерит поле карточки в HTML на основе его типа.
   * @param {object} page - Данные страницы.
   * @param {string} key - Ключ поля (например, "ИзображениеНоль").
   * @param {object} def - Конфиг поля из `config.fields`.
   * @param {object} config - Общий конфиг скрипта.
   * @returns {string} - HTML для вставки в карточку.
   * @throws {Error} - Если тип поля не поддерживается.
   * @example
   * renderField(page, "ЖанрНоль", { type: "badge" }, config);
   */
  const renderField = (page, key, def, config) => {
    try {
      // ⚠️ Нет информации о типе — показываем предупреждение
      if (!def || !def.type) {
        return `<div class="universal-warning">⚠️ Неизвестное поле: <b>${key}</b></div>`;
      }

      const val = page[key];
      const renderer = fieldRenderers?.[def.type];

      // ⚠️ Тип не поддерживается — выводим сообщение
      if (!renderer) {
        return `<div class="universal-warning">⚠️ Неподдерживаемый тип поля <b>${def.type}</b> (${key})</div>`;
      }

      // ✅ Всё в порядке — рендерим
      return renderer(val, page, def, key, config);
    } catch (e) {
      return `<div class="universal-warning">⚠️ Ошибка поля <b>${key}</b>: ${e.message}</div>`;
    }
  };

  // === БЛОК 7. 🧱 СЕКЦИИ ===
  // В этом блоке:
  // - generateRow
  // - renderSectionTable - рендерит одну секцию карточек
  // - renderSections - обрабатывает все секции по порядку
  // - renderRemainingPages - рендерит карточки, не попавшие в секции

  /**
   * Генерирует одну строку таблицы (массив ячеек) для переданной страницы.
   * Используется и при полной, и при ленивой отрисовке.
   * @param {object} page - Текущая страница из Dataview
   * @param {object} section - Конфиг секции
   * @param {object} config - Общий конфиг скрипта
   * @returns {Array<string>} - Массив HTML-ячеек таблицы (в виде строк)
   */
  function generateRow(page, section, config) {
    return section.fields.map((key) => {
      const val = page[key];
      const def = config.fields[key];
      let warn = false;

      if (config.requiredFields.includes(key)) {
        if (def?.type === "progressBar") {
          warn = isProgressBarBlank(page, def);
        } else if (def?.type !== "image") {
          warn = isBlank(val);
        }
      }

      const fieldEmoji = def.emoji
        ? `<span class="universal-left-emoji">${def.emoji}</span>`
        : "";

      const warningSpan = warn
        ? `<span class="universal-warning" title="Обязательное поле">${config.sectionBehavior.warningEmoji}</span>`
        : "";

      const html = renderField(page, key, def, config);

      const skipWrapperTypes = ["image", "audio", "video", "file", "url"];
      if (skipWrapperTypes.includes(def?.type)) {
        return `${fieldEmoji}<div>${html}${warningSpan}</div>`;
      }

      return `<div class="universal-field-wrapper">${fieldEmoji}${html}${warningSpan}</div>`;
    });
  }

  /**
   * Рендерит секцию карточек в виде сворачиваемого блока <details>.
   * @param {object} section - Конфиг секции из `config.sections`.
   * @param {Array} pages - Массив страниц для отображения.
   * @param {Config} config - Общий конфиг скрипта.
   * @example
   * renderSectionTable(
   *   { id: "incomplete", title: "⚠️ Требуют оформления", ... },
   *   pages,
   *   config
   * );
   */
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
    summary.innerHTML = `<h3>${section.title} <span class="universal-count">(${sorted.length})</span></h3>`;
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

      function renderSectionContent() {
        renderedOnce = true;

        const previousContainer = dv.container;
        // ⬇️ Устанавливаем контейнер вывода для Dataview
        dv.container = tableContainer;

        try {
          const headers = section.fields.map(
            (key) => config.fields[key]?.label || key
          );

          // Обёртка для всех плейсхолдеров и таблиц
          const virtualWrapper = document.createElement("div");
          tableContainer.appendChild(virtualWrapper);

          const CHUNK_SIZE = config.sectionBehavior.lazyChunkSize ?? 20;
          const PRELOAD_MARGIN_PX =
            config.sectionBehavior.lazyPreloadMargin ?? 600;

          if (config.sectionBehavior.lazyLoading) {
            // Разбиваем на чанки
            const chunks = [];
            for (let i = 0; i < sorted.length; i += CHUNK_SIZE) {
              chunks.push(sorted.slice(i, i + CHUNK_SIZE));
            }

            chunks.forEach((chunk, index) => {
              const placeholder = document.createElement("div");
              placeholder.className = "universal-virtual-placeholder";
              placeholder.dataset.chunkIndex = index;
              placeholder.style.minHeight = "320px";

              virtualWrapper.appendChild(placeholder);

              const observer = new IntersectionObserver(
                (entries) => {
                  entries.forEach((entry) => {
                    if (entry.isIntersecting && !placeholder.dataset.loaded) {
                      placeholder.dataset.loaded = "true";
                      observer.disconnect();

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

                      placeholder.replaceWith(...tempDiv.children);
                    }
                  });
                },
                {
                  rootMargin: `${PRELOAD_MARGIN_PX}px`,
                  threshold: 0.1,
                }
              );

              observer.observe(placeholder);
            });
          } else {
            // ❗ Без ленивой загрузки — отрисовываем всё сразу
            const rows = sorted.map((page) =>
              generateRow(page, section, config)
            );

            dv.table(headers, rows);
          }
        } finally {
          // Возвращаем старый контейнер Dataview
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

  /**
   * Рендерит все секции по правилам из config.sections[]
   * @param {Array} sortedPages - Отсортированные страницы
   * @param {Set} renderedPages - Множество уже отрендеренных страниц
   * @param {Set} blockedPages - Множество страниц в блокирующих секциях
   */
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

  /**
   * Отображает карточки, не попавшие ни в одну секцию
   * @param {Array} sortedPages - Отсортированные страницы
   * @param {Set} renderedPages - Множество уже отрендеренных страниц
   * @returns {Array} - Оставшиеся страницы
   */
  const renderRemainingPages = (sortedPages, renderedPages) => {
    const remainingPages = sortedPages.filter(
      (p) => !renderedPages.has(p.file.path)
    );

    if (remainingPages.length > 0) {
      const headers = Object.values(config.fields).map((f) => f.label);
      const rows = remainingPages.map(renderRow);
      dv.table(headers, rows);
    }

    return remainingPages;
  };

  // === БЛОК 8. 📦 ЗАГРУЗКА ДАННЫХ ===

  const pages = dv
    .pages()
    .where((p) => p.file?.path?.includes(config.folderKeyword))
    .where((p) => {
      if (!config.typeFilteringEnabled) return true;
      const val = p[config.typeField];
      return Array.isArray(val)
        ? val.includes(config.typeValue)
        : val === config.typeValue;
    });

  // === БЛОК 9. 🚀 ИНИЦИАЛИЗАЦИЯ ===
  /**
   * В этом блоке:
   * - renderAll - полная перерисовка интерфейса
   * - updateCardsOnly - обновление только таблицы карточек
   * - renderCards - основная функция рендеринга карточек
   * - getObserverCache
   * - Проверка готовности данных и запуск рендеринга
   */

  /** УСТОЙЧИВЫЙ MutationObserver для слежения за всеми изображениями */
  // Используем кэш для хранения observer и уже обработанных картинок
  const getObserverCache = () => {
    const cache = getCardScriptCache(dv.current()?.file?.path || "default");
    if (!cache.processedImages) cache.processedImages = new Set();
    if (!cache.observerInstance) cache.observerInstance = null;
    return cache;
  };

  // Используется механизм кэширования, чтобы ускорить рендер при переключении вкладок
  let currentPath, cache, activePath;
  let canRender = true; // Флаг допуска: разрешает запуск всей инициализации UI и рендера

  try {
    const current = dv.current();
    if (!current?.file?.path)
      throw new Error("⛔ Не удалось определить текущий файл.");

    currentPath = current.file.path;
    cache = getCardScriptCache(currentPath);
    activePath = app.workspace.getActiveFile()?.path;
  } catch (err) {
    canRender = false;

    const notice = document.createElement("div");
    notice.className = "universal-error-toast";
    notice.innerHTML = `
      <div class="toast-line">🫣 Dataview пока не успел загрузить данные.</div>
      <div class="toast-line">Откройте заметку заново или просто подождите пару секунд.</div>
    `;

    document.body.appendChild(notice);

    setTimeout(() => {
      notice.classList.add("fade-out");
      setTimeout(() => notice.remove(), 1000);
    }, 4000); // ← общее время показа (в миллисекундах)
  }

  // Загружаем сохранённую сортировку, если включено
  if (config.rememberSort) {
    const sortKeyPrefix = `universal-${dv.current()?.file?.path || "default"}`;

    const savedField = localStorage.getItem(`${sortKeyPrefix}-sort-field`);
    const savedOrder = localStorage.getItem(`${sortKeyPrefix}-sort-order`);

    if (savedField && savedOrder) {
      currentSortField = savedField;
      currentSortOrder = savedOrder;
    }
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
      wrapper.className = config.cardCounter.wrapperClass || "";

      const label = document.createElement("span");
      label.className = config.cardCounter.labelClass || "";
      label.textContent = config.cardCounter.textBefore + " ";

      const number = document.createElement("span");
      number.className = config.cardCounter.numberClass || "";
      number.textContent = pages.length;

      wrapper.appendChild(label);
      wrapper.appendChild(number);
      uiPanel.appendChild(wrapper);
    }

    // Поле поиска
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = config.searchBox?.placeholderText || "Поиск...";
    searchInput.className =
      config.searchBox?.inputClass || "universal-search-input";
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
    filterButton.textContent = "🔎 Фильтр";
    filterButton.onclick = () => renderFilterModal(config, renderAll);

    // Добавляем в строку
    searchRow.appendChild(filterButton);
    searchRow.appendChild(searchInput);

    // Контейнер для кнопок сортировки
    const sortContainer = document.createElement("div");
    sortContainer.className = `universal-sort-buttons ${
      config.sortButtonStyles?.containerClass || ""
    }`;
    sortContainer.style = config.sortButtonStyles?.spacing || "";

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
        btn.className = config.sortButtonStyles?.buttonClass || "";

        const isActive = currentSortField === key;
        const arrow = isActive
          ? currentSortOrder === "asc"
            ? "🔼"
            : "🔽"
          : "";
        btn.textContent = `${emoji || ""} ${label} ${arrow}`.trim();

        if (isActive) {
          btn.classList.add(config.sortButtonStyles?.activeClass || "");
        }

        btn.onclick = () => {
          if (currentSortField === key) {
            currentSortOrder = currentSortOrder === "asc" ? "desc" : "asc";
          } else {
            currentSortField = key;
            currentSortOrder = "asc";
          }

          if (config.rememberSort) {
            const sortKeyPrefix = `universal-${
              dv.current()?.file?.path || "default"
            }`;
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
      <div class="no-results-text">Здесь пока пусто.<br>Добавьте карточки или измените условия отображения.</div>
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

    // 🔄 Обновляет только таблицу (без сброса UI)
    const updateCardsOnly = () => {
      const allNodes = [...dv.container.children];
      const uiPanelEl = uiPanel;

      allNodes.forEach((el) => {
        if (el !== uiPanelEl) dv.container.removeChild(el);
      });

      const { headers, rows } = renderCards(dv.container);
      cache.headers = headers;
      cache.rows = rows;
      cache.rendered = true;
    };

    /**
     * Полная перерисовка:
     * - Сбрасывает DOM
     * - Перестраивает UI
     * - Рендерит карточки заново
     * - Вешает обработчики на изображения
     */
    // TODO: Оптимизировать при >1000 карточек (сейчас может тормозить).
    const renderAll = () => {
      dv.container.innerHTML = "";
      ensureModal(config);
      rebuildSortButtons();
      dv.container.appendChild(uiPanel);

      cache.imageIds = [];

      const { headers, rows } = renderCards(dv.container);

      activateModalHandlers(config); // ← Вешаем обработчики после полной отрисовки

      cache.headers = headers;
      cache.rows = rows;

      // === 🧷 КНОПКА "СВЕРНУТЬ ВСЁ" ===
      // Удалим старую кнопку, если есть
      const oldBtn = dv.container.querySelector(".universal-collapse-button");
      if (oldBtn) oldBtn.remove();

      // Создаём новую кнопку
      const button = document.createElement("button");
      button.textContent = "🔼 Свернуть всё";
      button.className = "universal-collapse-button";
      button.title = "Свернуть все секции и вернуться к началу";

      button.addEventListener("click", () => {
        const top = dv.container.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: "smooth" });

        const openSections = dv.container.querySelectorAll(
          "details.universal-section[open]"
        );
        openSections.forEach((el) => el.removeAttribute("open"));

        for (const key in localStorage) {
          if (key.startsWith("universal-section-")) {
            localStorage.removeItem(key);
          }
        }
      });

      dv.container.appendChild(button);

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

window.matchBySectionValue = matchBySectionValue;
window.matchIfIncomplete = matchIfIncomplete;
window.isBlank = isBlank;
window.isProgressBarBlank = isProgressBarBlank;
window.getRequiredFieldsForSection = getRequiredFieldsForSection;
window.runUniversalCards = runUniversalCards;
