// ╭────────────────────────────────────────────╮
// │  Script localisation by pleXXX             │
// │  Designed for universal-cards-core.js      │
// ╰────────────────────────────────────────────╯

window.UNIVERSAL_CARDS_LANG = {
  // English
  en: {
    // === ERRORS: Configuration validation errors
    ERRORS: {
      // General
      MISSING_FIELDS: "❌ Missing <code>fields</code> object.",
      EMPTY_FIELDS:
        "❌ The <code>fields</code> object doesn’t contain any fields.",
      MISSING_FIELDS_OBJECT: "❌ Missing <code>fields</code> object.",
      EMPTY_FIELDS_OBJECT:
        "❌ The <code>fields</code> object doesn’t contain any fields.",
      MISSING_SECTIONS: "❌ Missing <code>sections</code> array.",

      // Folder
      MISSING_FOLDER_KEYWORD:
        "❌ Missing folder path: <code>folderKeyword</code>.",

      // Filtering
      MISSING_TYPE_FIELD:
        "❌ <code>typeFilteringEnabled</code> is on, but <code>typeField</code> is not set.",
      INVALID_TYPE_VALUE:
        "❌ <code>typeFilteringEnabled</code> is on, but <code>typeValue</code> must be a non-empty array of strings.",

      // Fields
      FIELD_MISSING_TYPE: (key) =>
        `❌ Field <code>${key}</code> is missing a <code>type</code>.`,
      RATING_MISSING_CONFIG: (key) =>
        `❌ Field <code>${key}</code> with type <code>rating</code> must include <code>config.maxRating</code> (a number).`,

      // Sections
      NO_SECTION_ID: "(no id)",
      EMPTY_FACTORY: "(empty)",
      UNKNOWN_FACTORY: (secId, factory) =>
        `❌ Section <code>${secId}</code> uses an unknown factory: <code>${factory}</code>`,
      SECTION_MISSING_FIELDS: (secId) =>
        `❌ Section <code>${secId}</code> is missing the <code>fields</code> list.`,
      SECTION_UNKNOWN_FIELD: (secId, fieldName) =>
        `❌ Section <code>${secId}</code> references a nonexistent field: <code>${fieldName}</code>`,

      // Field mapping
      SEARCHFIELD_NOT_IN_FIELDS: (field) =>
        `❌ The value <code>${field}</code> in <code>searchField</code> doesn’t match any key in <code>fields</code>.`,
      SORTFIELD_NOT_IN_FIELDS: (field) =>
        `❌ The field <code>${field}</code> in <code>defaultSortField</code> doesn’t exist in <code>fields</code>.`,

      // Section IDs
      DUPLICATE_SECTION_IDS: (list) =>
        `❌ Duplicate section <code>id</code> values found: <code>${list}</code>.`,

      // Card counter
      MISSING_COUNTER_TEXT:
        "❌ Card counter is enabled, but <code>cardCounter.textBefore</code> is missing or not a string.",

      // SORT BUTTONS
      // 🔳 sortButtons is missing
      SORT_BUTTONS_REQUIRED:
        "❌ The <code>sortButtons</code> field is required — even if the list is empty.",
      // 🔳 sortButtons: not an array
      INVALID_SORT_BUTTONS:
        "❌ The <code>sortButtons</code> field is invalid. It must be a list of buttons.",
      // 🏷️ button without label
      SORT_BUTTON_MISSING_LABEL: (index) =>
        `❌ Sort button #${index} is missing a <code>label</code>.`,
      // ❌ button without field or special
      SORT_BUTTON_MISSING_FIELD: (index) =>
        `❌ Sort button #${index} is missing a <code>field</code> or <code>special</code> value.`,
      // Random sort field
      RANDOMSORTFIELD_NOT_IN_FIELDS: (field) =>
        `❌ Field <code>${field}</code> in <code>randomSortFields</code> is missing from <code>fields</code>.`,

      // Check sectionGroupField
      SECTIONGROUPFIELD_NOT_IN_FIELDS: (field) =>
        `❌ Field <code>${field}</code> is set as <code>sectionGroupField</code>, but was not found in <code>fields</code>.`,

      // Check allowedSectionValues
      INVALID_ALLOWED_SECTION_VALUES:
        "❌ Field <code>allowedSectionValues</code> must be an array of strings.",

      // Check modalBehavior
      INVALID_MODAL_BEHAVIOR: (value) =>
        `❌ Invalid value <code>${value}</code> for <code>modalBehavior</code>. Use \"click\" or \"hold\".`,

      // Check searchBox.placeholderText
      INVALID_SEARCHBOX_PLACEHOLDER:
        "❌ Field <code>searchBox.placeholderText</code> must be a string.",

      // Check filtering.mode
      INVALID_FILTER_MODE: (mode) =>
        `❌ Invalid filtering mode <code>${mode}</code>. Allowed values: \"byTypes\" or \"byFields\".`,

      // Check filtering.allowedFields
      FILTERFIELD_NOT_IN_FIELDS: (field) =>
        `❌ Field <code>${field}</code> from <code>filtering.allowedFields</code> was not found in <code>fields</code>.`,

      // Check filtering.allowedTypes
      FILTERTYPE_INVALID: (type) =>
        `❌ Type <code>${type}</code> in <code>filtering.allowedTypes</code> is not supported.`,

      // Check fields.*.type for valid types
      FIELD_INVALID_TYPE: (field, type) =>
        `❌ Field <code>${field}</code> has an invalid type <code>${type}</code>.`,
    },

    // === UI: Titles, labels, captions
    UI: {
      CONFIG_ERROR_TITLE: "Configuration Errors Detected",
      SCRIPT_STOPPED:
        "Script execution has been stopped until the errors are fixed.",

      RESET_MODAL: {
        TITLE: "Reset all filters?",
        SUBTITLE: "The following will be cleared:",
        LI_TAGS: "All selected tags",
        LI_MODE: "Filtering mode",
        LI_RULES: "Filtering rules",
      },

      FILTER: {
        TITLE: "Filter Settings",
        DESCRIPTION: "Define rules to filter the cards.",
        FIELD_LABEL: "Field to filter by:",
        VALUE_LABEL: "Filter values:",
        VALUE_PLACEHOLDER: "Type a value and press Enter...",
        MODE_LABEL: "Filtering mode:",
        MODE_WHITELIST: "✅ Show",
        MODE_BLACKLIST: "🚫 Exclude",
        CLEAR_TAGS: "🗑 Clear tags",
        APPLY: "✅ Apply",
        RESET: "🔄 Reset filters",
        CONFIRM: "✅ Yes, reset",
        CANCEL: "❌ Cancel",
        LOGIC_LABEL: "Filtering logic",
        LOGIC_TOOLTIP:
          "🔘 Any rule — the card will be shown if at least one of the selected conditions is met.\n🧩 All rules — the card will be shown only if all conditions are met.",
        LOGIC_ANY: "🔘 Any rule",
        LOGIC_ALL: "🧩 All rules",
        BUTTON_LABEL: "Filter",
      },

      MORE_ITEMS: (n) => `+ ${n} more…`,

      MEDIA: {
        FILE_SCHEME_UNSUPPORTED:
          "⚠️ Local file:// links are not supported in Obsidian",
        AUDIO_EXTERNAL_LINK: "Listen to audio",
        AUDIO_UNKNOWN_FORMAT: "Unknown audio format",
        VIDEO_EXTERNAL_LINK: "Watch video",
        VIDEO_UNKNOWN_FORMAT: "Unknown video format",
        YOUTUBE_ID_EXTRACTION_ERROR: "⚠️ Failed to extract YouTube ID",
        YOUTUBE_INVALID_URL: "⚠️ Invalid YouTube URL",
      },

      DATE: {
        INVALID_FORMAT: "Invalid date format",
        INVALID: "Invalid date",
        ERROR: "Date parsing error",
      },

      RATING: {
        INVALID: "Invalid rating",
      },

      RENDER: {
        UNKNOWN_FIELD: "Unknown field:",
        UNSUPPORTED_TYPE: "Unsupported field type",
        FIELD_ERROR: "Field error",
      },

      INIT: {
        FILE_NOT_FOUND: "⛔ Failed to determine the current file.",
        LOADING_DELAY_1: "Dataview hasn’t finished loading yet.",
        LOADING_DELAY_2: "Try reopening the note or just wait a few seconds.",
      },

      COLLAPSE_ALL: {
        BUTTON_LABEL: "Collapse all",
        TOOLTIP: "Collapse all sections and scroll to the top",
      },
    },

    // === UPDATES: Script update
    UPDATES: {
      FETCH_ERROR: "❌ Failed to fetch version info",
      CURRENT_VERSION_LABEL: "Current script version:",
      NEW_VERSION_NOTICE: (version) =>
        `New version available: <strong>${version}</strong>`,
      UPDATE_LINK_LABEL: "Update script",
    },

    // === INFO: Placeholder for future use
    INFO: {
      NO_RESULTS: {
        LINE_1: "Nothing here yet.",
        LINE_2: "Add some cards or adjust the filters to see results.",
      },
    },
  },
  // Russian
  ru: {
    // === ERRORS: Ошибки валидации конфигурации
    ERRORS: {
      // Общие
      MISSING_FIELDS: "❌ Отсутствует объект <code>fields</code>.",
      EMPTY_FIELDS:
        "❌ В объекте <code>fields</code> не указано ни одного поля.",
      MISSING_FIELDS_OBJECT: "❌ Отсутствует объект <code>fields</code>.",
      EMPTY_FIELDS_OBJECT:
        "❌ В объекте <code>fields</code> не указано ни одного поля.",
      MISSING_SECTIONS: "❌ Отсутствует массив <code>sections</code>.",

      // Папка
      MISSING_FOLDER_KEYWORD:
        "❌ Не указан путь к папке: <code>folderKeyword</code>.",

      // Фильтрация
      MISSING_TYPE_FIELD:
        "❌ Включена фильтрация <code>typeFilteringEnabled</code>, но не указано поле: <code>typeField</code>.",
      INVALID_TYPE_VALUE:
        "❌ Включена фильтрация <code>typeFilteringEnabled</code>, но <code>typeValue</code> должен быть непустым массивом строк.",

      // Поля
      FIELD_MISSING_TYPE: (key) =>
        `❌ Поле <code>${key}</code> не имеет заданного типа <code>type</code>.`,
      RATING_MISSING_CONFIG: (key) =>
        `❌ Поле <code>${key}</code> с типом <code>rating</code> должно содержать <code>config.maxRating</code> (число).`,

      // Секции
      NO_SECTION_ID: "(без id)",
      EMPTY_FACTORY: "(пусто)",
      UNKNOWN_FACTORY: (secId, factory) =>
        `❌ В секции <code>${secId}</code> указана неизвестная фабрика: <code>${factory}</code>`,
      SECTION_MISSING_FIELDS: (secId) =>
        `❌ В секции <code>${secId}</code> отсутствует список полей <code>fields</code>.`,
      SECTION_UNKNOWN_FIELD: (secId, fieldName) =>
        `❌ В секции <code>${secId}</code> используется несуществующее поле: <code>${fieldName}</code>`,

      // Сопоставление полей
      SEARCHFIELD_NOT_IN_FIELDS: (field) =>
        `❌ Указанное значение <code>${field}</code> в <code>searchField</code> не существует в <code>fields</code>.`,
      SORTFIELD_NOT_IN_FIELDS: (field) =>
        `❌ Поле <code>${field}</code> в <code>defaultSortField</code> отсутствует в <code>fields</code>.`,

      // ID секций
      DUPLICATE_SECTION_IDS: (list) =>
        `❌ Повторяющиеся <code>id</code> у секций: <code>${list}</code>.`,

      // Счётчик карточек
      MISSING_COUNTER_TEXT:
        "❌ Включён счётчик карточек, но <code>cardCounter.textBefore</code> не задан или не является строкой.",

      // КНОПКИ СОРТИРОВКИ
      // 🔳 sortButtons отсутствует
      SORT_BUTTONS_REQUIRED:
        "❌ Обязательно укажите поле <code>sortButtons</code> — даже если список пустой.",
      // 🔳 sortButtons: не является массивом
      INVALID_SORT_BUTTONS:
        "❌ Поле <code>sortButtons</code> заполнено неправильно. Должен быть список кнопок.",
      // 🏷️ кнопка без label
      SORT_BUTTON_MISSING_LABEL: (index) =>
        `❌ В кнопке сортировки №${index} не указан <code>label</code>.`,
      // ❌ кнопка без поля field или special
      SORT_BUTTON_MISSING_FIELD: (index) =>
        `❌ В кнопке сортировки №${index} не указано поле <code>field</code> или <code>special</code>.`,

      // Поле рандомной сортировки
      RANDOMSORTFIELD_NOT_IN_FIELDS: (field) =>
        `❌ Поле <code>${field}</code> в <code>randomSortFields</code> отсутствует в <code>fields</code>.`,

      // Проверка sectionGroupField
      SECTIONGROUPFIELD_NOT_IN_FIELDS: (field) =>
        `❌ Поле <code>${field}</code> указано как <code>sectionGroupField</code>, но не найдено в <code>fields</code>.`,

      // Проверка allowedSectionValues
      INVALID_ALLOWED_SECTION_VALUES:
        "❌ Поле <code>allowedSectionValues</code> должно быть списком строк.",

      // Проверка modalBehavior
      INVALID_MODAL_BEHAVIOR: (value) =>
        `❌ Значение <code>${value}</code> недопустимо для <code>modalBehavior</code>. Используйте "click" или "hold".`,

      // Проверка searchBox.placeholderText
      INVALID_SEARCHBOX_PLACEHOLDER:
        "❌ Поле <code>searchBox.placeholderText</code> должно быть строкой.",

      // Проверка filtering.mode
      INVALID_FILTER_MODE: (mode) =>
        `❌ Недопустимый режим фильтрации <code>${mode}</code>. Допустимые значения: "byTypes" или "byFields".`,

      // Проверка filtering.allowedFields
      FILTERFIELD_NOT_IN_FIELDS: (field) =>
        `❌ Поле <code>${field}</code> из <code>filtering.allowedFields</code> не найдено в <code>fields</code>.`,

      // Проверка filtering.allowedTypes
      FILTERTYPE_INVALID: (type) =>
        `❌ Тип <code>${type}</code> в <code>filtering.allowedTypes</code> не поддерживается.`,

      // Проверка fields.*.type на допустимые типы
      FIELD_INVALID_TYPE: (field, type) =>
        `❌ В поле <code>${field}</code> указан недопустимый тип <code>${type}</code>.`,
    },

    // === UI: Заголовки, подписи, надписи
    UI: {
      CONFIG_ERROR_TITLE: "Обнаружены ошибки в конфигурации",
      SCRIPT_STOPPED: "Скрипт остановлен до исправления ошибок.",
      RESET_MODAL: {
        TITLE: "Сбросить все фильтры?",
        SUBTITLE: "Будет сброшено:",
        LI_TAGS: "Все выбранные теги",
        LI_MODE: "Режим фильтрации",
        LI_RULES: "Условия фильтрации",
      },
      FILTER: {
        TITLE: "Настройка фильтрации",
        DESCRIPTION: "Задайте правила фильтрации карточек.",
        FIELD_LABEL: "Поле для фильтрации:",
        VALUE_LABEL: "Значения фильтра:",
        VALUE_PLACEHOLDER: "Введите значение и нажмите Enter...",
        MODE_LABEL: "Режим фильтрации:",
        MODE_WHITELIST: "✅ Показать",
        MODE_BLACKLIST: "🚫 Исключить",
        CLEAR_TAGS: "🗑 Очистить теги",
        APPLY: "✅ Применить",
        RESET: "🔄 Сбросить фильтры",
        CONFIRM: "✅ Да, сбросить",
        CANCEL: "❌ Отмена",
        LOGIC_LABEL: "Условия фильтрации",
        LOGIC_TOOLTIP:
          "🔘 Любое правило — карточка будет показана, если выполнено хотя бы одно из добавленных условий.\n🧩 Все правила — карточка будет показана, только если выполнены все условия сразу.",
        LOGIC_ANY: "🔘 Любое правило",
        LOGIC_ALL: "🧩 Все правила",
        BUTTON_LABEL: "Фильтр",
      },
      MORE_ITEMS: (n) => `+ ещё ${n}…`,
      MEDIA: {
        FILE_SCHEME_UNSUPPORTED:
          "⚠️ Локальные file:// ссылки не поддерживаются в Obsidian",
        AUDIO_EXTERNAL_LINK: "Слушать аудио",
        AUDIO_UNKNOWN_FORMAT: "Неизвестный формат аудио",
        VIDEO_EXTERNAL_LINK: "Смотреть видео",
        VIDEO_UNKNOWN_FORMAT: "Неизвестный формат видео",
        YOUTUBE_ID_EXTRACTION_ERROR: "⚠️ Не удалось извлечь ID YouTube",
        YOUTUBE_INVALID_URL: "⚠️ Невалидная YouTube-ссылка",
      },
      DATE: {
        INVALID_FORMAT: "Неверный формат даты",
        INVALID: "Невалидная дата",
        ERROR: "Ошибка обработки даты",
      },
      RATING: {
        INVALID: "Некорректная оценка",
      },
      RENDER: {
        UNKNOWN_FIELD: "Неизвестное поле:",
        UNSUPPORTED_TYPE: "Неподдерживаемый тип поля",
        FIELD_ERROR: "Ошибка поля",
      },
      INIT: {
        FILE_NOT_FOUND: "⛔ Не удалось определить текущий файл.",
        LOADING_DELAY_1: "Dataview пока не успел загрузить данные.",
        LOADING_DELAY_2:
          "Откройте заметку заново или просто подождите пару секунд.",
      },
      COLLAPSE_ALL: {
        BUTTON_LABEL: "Свернуть всё",
        TOOLTIP: "Свернуть все секции и вернуться к началу",
      },
    },

    // === UPDATES: Обновление скрипта
    UPDATES: {
      FETCH_ERROR: "❌ Не удалось получить данные о версии",
      CURRENT_VERSION_LABEL: "Текущая версия скрипта:",
      NEW_VERSION_NOTICE: (version) =>
        `Доступна новая версия <strong>${version}</strong>`,
      UPDATE_LINK_LABEL: "Обновить скрипт",
    },

    // === INFO: Резерв на будущее
    INFO: {
      NO_RESULTS: {
        LINE_1: "Здесь пока пусто.",
        LINE_2: "Добавьте карточки или измените условия фильтрации.",
      },
    },
  },
  // Ukrainian
  uk: {
    // === ERRORS: Помилки валідації конфігурації
    ERRORS: {
      // Загальні
      MISSING_FIELDS: "❌ Відсутній обʼєкт <code>fields</code>.",
      EMPTY_FIELDS: "❌ В обʼєкті <code>fields</code> не вказано жодного поля.",
      MISSING_FIELDS_OBJECT: "❌ Відсутній обʼєкт <code>fields</code>.",
      EMPTY_FIELDS_OBJECT:
        "❌ В обʼєкті <code>fields</code> не вказано жодного поля.",
      MISSING_SECTIONS: "❌ Відсутній масив <code>sections</code>.",

      // Папка
      MISSING_FOLDER_KEYWORD:
        "❌ Не вказано шлях до папки: <code>folderKeyword</code>.",

      // Фільтрація
      MISSING_TYPE_FIELD:
        "❌ Увімкнено фільтрацію <code>typeFilteringEnabled</code>, але не вказано поле: <code>typeField</code>.",
      INVALID_TYPE_VALUE:
        "❌ Увімкнено фільтрацію <code>typeFilteringEnabled</code>, але <code>typeValue</code> має бути непорожнім масивом рядків.",

      // Поля
      FIELD_MISSING_TYPE: (key) =>
        `❌ Поле <code>${key}</code> не має заданого типу <code>type</code>.`,
      RATING_MISSING_CONFIG: (key) =>
        `❌ Поле <code>${key}</code> з типом <code>rating</code> повинно містити <code>config.maxRating</code> (число).`,

      // Секції
      NO_SECTION_ID: "(без id)",
      EMPTY_FACTORY: "(порожньо)",
      UNKNOWN_FACTORY: (secId, factory) =>
        `❌ У секції <code>${secId}</code> вказано невідому фабрику: <code>${factory}</code>`,
      SECTION_MISSING_FIELDS: (secId) =>
        `❌ У секції <code>${secId}</code> відсутній список полів <code>fields</code>.`,
      SECTION_UNKNOWN_FIELD: (secId, fieldName) =>
        `❌ У секції <code>${secId}</code> використовується неіснуюче поле: <code>${fieldName}</code>`,

      // Відповідність полів
      SEARCHFIELD_NOT_IN_FIELDS: (field) =>
        `❌ Значення <code>${field}</code> у <code>searchField</code> не існує в <code>fields</code>.`,
      SORTFIELD_NOT_IN_FIELDS: (field) =>
        `❌ Поле <code>${field}</code> у <code>defaultSortField</code> відсутнє в <code>fields</code>.`,

      // ID секцій
      DUPLICATE_SECTION_IDS: (list) =>
        `❌ Повторювані <code>id</code> у секціях: <code>${list}</code>.`,

      // Лічильник карток
      MISSING_COUNTER_TEXT:
        "❌ Увімкнено лічильник карток, але <code>cardCounter.textBefore</code> не задано або не є рядком.",

      // КНОПКИ СОРТУВАННЯ
      // 🔳 sortButtons відсутнє
      SORT_BUTTONS_REQUIRED:
        "❌ Обов’язково вкажіть поле <code>sortButtons</code> — навіть якщо список порожній.",
      // 🔳 sortButtons: не є масивом
      INVALID_SORT_BUTTONS:
        "❌ Поле <code>sortButtons</code> заповнене неправильно. Має бути список кнопок.",
      // 🏷️ кнопка без label
      SORT_BUTTON_MISSING_LABEL: (index) =>
        `❌ У кнопці сортування №${index} не вказано <code>label</code>.`,
      // ❌ кнопка без поля field або special
      SORT_BUTTON_MISSING_FIELD: (index) =>
        `❌ У кнопці сортування №${index} не вказано поле <code>field</code> або <code>special</code>.`,
      // Поле випадкового сортування
      RANDOMSORTFIELD_NOT_IN_FIELDS: (field) =>
        `❌ Поле <code>${field}</code> у <code>randomSortFields</code> відсутнє у <code>fields</code>.`,

      // Перевірка sectionGroupField
      SECTIONGROUPFIELD_NOT_IN_FIELDS: (field) =>
        `❌ Поле <code>${field}</code> вказане як <code>sectionGroupField</code>, але не знайдене у <code>fields</code>.`,

      // Перевірка allowedSectionValues
      INVALID_ALLOWED_SECTION_VALUES:
        "❌ Поле <code>allowedSectionValues</code> має бути списком рядків.",

      // Перевірка modalBehavior
      INVALID_MODAL_BEHAVIOR: (value) =>
        `❌ Недопустиме значення <code>${value}</code> для <code>modalBehavior</code>. Використовуйте \"click\" або \"hold\".`,

      // Перевірка searchBox.placeholderText
      INVALID_SEARCHBOX_PLACEHOLDER:
        "❌ Поле <code>searchBox.placeholderText</code> має бути рядком.",

      // Перевірка filtering.mode
      INVALID_FILTER_MODE: (mode) =>
        `❌ Недопустимий режим фільтрації <code>${mode}</code>. Допустимі значення: \"byTypes\" або \"byFields\".`,

      // Перевірка filtering.allowedFields
      FILTERFIELD_NOT_IN_FIELDS: (field) =>
        `❌ Поле <code>${field}</code> з <code>filtering.allowedFields</code> не знайдене у <code>fields</code>.`,

      // Перевірка filtering.allowedTypes
      FILTERTYPE_INVALID: (type) =>
        `❌ Тип <code>${type}</code> у <code>filtering.allowedTypes</code> не підтримується.`,

      // Перевірка fields.*.type на допустимі типи
      FIELD_INVALID_TYPE: (field, type) =>
        `❌ У полі <code>${field}</code> вказано недопустимий тип <code>${type}</code>.`,
    },
    // === UI: Заголовки, підписи, надписи
    UI: {
      CONFIG_ERROR_TITLE: "Виявлено помилки в конфігурації",
      SCRIPT_STOPPED: "Скрипт зупинено до виправлення помилок.",
      RESET_MODAL: {
        TITLE: "Скинути всі фільтри?",
        SUBTITLE: "Буде скинуто:",
        LI_TAGS: "Усі вибрані теги",
        LI_MODE: "Режим фільтрації",
        LI_RULES: "Умови фільтрації",
      },
      FILTER: {
        TITLE: "Налаштування фільтрації",
        DESCRIPTION: "Задайте правила фільтрації карток.",
        FIELD_LABEL: "Поле для фільтрації:",
        VALUE_LABEL: "Значення фільтра:",
        VALUE_PLACEHOLDER: "Введіть значення і натисніть Enter...",
        MODE_LABEL: "Режим фільтрації:",
        MODE_WHITELIST: "✅ Показати",
        MODE_BLACKLIST: "🚫 Виключити",
        CLEAR_TAGS: "🗑 Очистити теги",
        APPLY: "✅ Застосувати",
        RESET: "🔄 Скинути фільтри",
        CONFIRM: "✅ Так, скинути",
        CANCEL: "❌ Скасувати",
        LOGIC_LABEL: "Умови фільтрації",
        LOGIC_TOOLTIP:
          "🔘 Будь-яке правило — картка буде показана, якщо виконано хоча б одну з обраних умов.\n🧩 Всі правила — картка буде показана лише тоді, коли виконано всі умови.",
        LOGIC_ANY: "🔘 Будь-яке правило",
        LOGIC_ALL: "🧩 Всі правила",
        BUTTON_LABEL: "Фільтр",
      },
      MORE_ITEMS: (n) => `+ ще ${n}…`,
      MEDIA: {
        FILE_SCHEME_UNSUPPORTED:
          "⚠️ Локальні посилання file:// не підтримуються в Obsidian",
        AUDIO_EXTERNAL_LINK: "Слухати аудіо",
        AUDIO_UNKNOWN_FORMAT: "Невідомий формат аудіо",
        VIDEO_EXTERNAL_LINK: "Дивитися відео",
        VIDEO_UNKNOWN_FORMAT: "Невідомий формат відео",
        YOUTUBE_ID_EXTRACTION_ERROR: "⚠️ Не вдалося отримати ID YouTube",
        YOUTUBE_INVALID_URL: "⚠️ Невалідне посилання YouTube",
      },
      DATE: {
        INVALID_FORMAT: "Неправильний формат дати",
        INVALID: "Невалідна дата",
        ERROR: "Помилка обробки дати",
      },
      RATING: {
        INVALID: "Некоректна оцінка",
      },
      RENDER: {
        UNKNOWN_FIELD: "Невідоме поле:",
        UNSUPPORTED_TYPE: "Непідтримуваний тип поля",
        FIELD_ERROR: "Помилка поля",
      },
      INIT: {
        FILE_NOT_FOUND: "⛔ Не вдалося визначити поточний файл.",
        LOADING_DELAY_1: "Dataview ще не встиг завантажити дані.",
        LOADING_DELAY_2:
          "Відкрийте нотатку заново або зачекайте кілька секунд.",
      },
      COLLAPSE_ALL: {
        BUTTON_LABEL: "Згорнути все",
        TOOLTIP: "Згорнути всі секції й повернутися на початок",
      },
    },
    // === UPDATES: Оновлення скрипта
    UPDATES: {
      FETCH_ERROR: "❌ Не вдалося отримати дані про версію",
      CURRENT_VERSION_LABEL: "Поточна версія скрипта:",
      NEW_VERSION_NOTICE: (version) =>
        `Доступна нова версія <strong>${version}</strong>`,
      UPDATE_LINK_LABEL: "Оновити скрипт",
    },

    // === INFO: Резерв на майбутнє
    INFO: {
      NO_RESULTS: {
        LINE_1: "Тут поки що порожньо.",
        LINE_2: "Додайте картки або змініть умови фільтрації.",
      },
    },
  },
};
