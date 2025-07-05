// ╭────────────────────────────────────────────────────────────────────────────────────────────╮
// │  Script localization by pleXXX                                                             │
// │  💬 Telegram: t.me/sad2plexxx      |      🐙 GitHub: github.com/2PleXXX                   │
// │                                                                                            │
// │  Designed for: universal-cards-core.js                                                     │
// ╰────────────────────────────────────────────────────────────────────────────────────────────╯

window.UNIVERSAL_CARDS_LANG = {
  // English
  en: {
    // === ERRORS: Various error messages
    ERRORS: {
      // Missing fields object
      MISSING_FIELDS_OBJECT: "❌ Missing <code>fields</code> object.",
      // Fields object is empty
      EMPTY_FIELDS_OBJECT:
        "❌ The <code>fields</code> object does not contain any fields.",
      // Missing sections array
      MISSING_SECTIONS: "❌ Missing <code>sections</code> array.",

      // Missing folder path
      MISSING_FOLDER_KEYWORD:
        "❌ The folder path is not specified: <code>folderKeyword</code>.",

      // Type filtering is enabled, but no field is specified
      MISSING_TYPE_FIELD:
        "❌ <code>typeFilteringEnabled</code> is enabled, but <code>typeField</code> is not specified.",
      // Type filtering enabled, but invalid value
      INVALID_TYPE_VALUE:
        "❌ <code>typeFilteringEnabled</code> is enabled, but <code>typeValue</code> must be a non-empty array of strings.",

      // Field without a type
      FIELD_MISSING_TYPE: (key) =>
        `❌ Field <code>${key}</code> is missing a <code>type</code>.`,
      // Rating field missing maxRating
      RATING_MISSING_CONFIG: (key) =>
        `❌ Field <code>${key}</code> with type <code>rating</code> must include <code>config.maxRating</code> (a number).`,

      // Section ID not provided
      NO_SECTION_ID: "(no id)",
      // Factory not specified
      EMPTY_FACTORY: "(empty)",
      // Unknown factory specified
      UNKNOWN_FACTORY: (secId, factory) =>
        `❌ Section <code>${secId}</code> uses an unknown factory: <code>${factory}</code>`,
      // Section missing fields list
      SECTION_MISSING_FIELDS: (secId) =>
        `❌ Section <code>${secId}</code> is missing a <code>fields</code> list.`,
      // Section references an unknown field
      SECTION_UNKNOWN_FIELD: (secId, fieldName) =>
        `❌ Section <code>${secId}</code> references an unknown field: <code>${fieldName}</code>`,

      // searchField references a field not in fields
      SEARCHFIELD_NOT_IN_FIELDS: (field) =>
        `❌ The value <code>${field}</code> in <code>searchField</code> is not defined in <code>fields</code>.`,
      // defaultSortField references a field not in fields
      SORTFIELD_NOT_IN_FIELDS: (field) =>
        `❌ Field <code>${field}</code> in <code>defaultSortField</code> is not defined in <code>fields</code>.`,

      // Duplicate section IDs
      DUPLICATE_SECTION_IDS: (list) =>
        `❌ Duplicate section <code>id</code>s found: <code>${list}</code>.`,

      // Card counter enabled but text is missing
      MISSING_COUNTER_TEXT:
        "❌ Card counter is enabled, but <code>cardCounter.textBefore</code> is missing or not a string.",

      // 🔳 sortButtons is required
      SORT_BUTTONS_REQUIRED:
        "❌ The <code>sortButtons</code> field is required — even if the list is empty.",
      // 🔳 sortButtons is not an array
      INVALID_SORT_BUTTONS:
        "❌ The <code>sortButtons</code> field is invalid. It must be an array of buttons.",
      // 🏷️ Sort button is missing a label
      SORT_BUTTON_MISSING_LABEL: (index) =>
        `❌ Sort button #${index} is missing a <code>label</code>.`,
      // ❌ Sort button missing field or special
      SORT_BUTTON_MISSING_FIELD: (index) =>
        `❌ Sort button #${index} is missing <code>field</code> or <code>special</code>.`,

      // randomSortFields includes unknown field
      RANDOMSORTFIELD_NOT_IN_FIELDS: (field) =>
        `❌ Field <code>${field}</code> in <code>randomSortFields</code> is not defined in <code>fields</code>.`,

      // sectionGroupField not found in fields
      SECTIONGROUPFIELD_NOT_IN_FIELDS: (field) =>
        `❌ Field <code>${field}</code> is specified as <code>sectionGroupField</code>, but it is not found in <code>fields</code>.`,

      // allowedSectionValues must be an array of strings
      INVALID_ALLOWED_SECTION_VALUES:
        "❌ The <code>allowedSectionValues</code> must be an array of strings.",

      // modalBehavior has invalid value
      INVALID_MODAL_BEHAVIOR: (value) =>
        `❌ Invalid value <code>${value}</code> for <code>modalBehavior</code>. Use \"click\" or \"hold\".`,

      // searchBox.placeholderText must be a string
      INVALID_SEARCHBOX_PLACEHOLDER:
        "❌ <code>searchBox.placeholderText</code> must be a string.",

      // filtering.mode has invalid value
      INVALID_FILTER_MODE: (mode) =>
        `❌ Invalid <code>filtering.mode</code>: <code>${mode}</code>. Allowed values: \"byTypes\" or \"byFields\".`,

      // filtering.allowedFields references unknown field
      FILTERFIELD_NOT_IN_FIELDS: (field) =>
        `❌ Field <code>${field}</code> in <code>filtering.allowedFields</code> is not found in <code>fields</code>.`,

      // filtering.allowedTypes contains unsupported type
      FILTERTYPE_INVALID: (type) =>
        `❌ Type <code>${type}</code> in <code>filtering.allowedTypes</code> is not supported.`,

      // Invalid field type in fields
      FIELD_INVALID_TYPE: (field, type) =>
        `❌ Field <code>${field}</code> has an invalid type: <code>${type}</code>.`,

      // badge styleMap must include match and class
      BADGE_STYLEMAP_INVALID: (key) =>
        `❌ Field <code>${key}</code> of type <code>badge</code> must have a <code>styleMap</code> list with both <code>match</code> and <code>class</code> keys.`,

      // progressBar missing currentField or maxField
      PROGRESSBAR_MISSING_FIELDS: (key) =>
        `❌ Field <code>${key}</code> of type <code>progressBar</code> must include <code>currentField</code> and <code>maxField</code> inside <code>config</code>.`,

      // Duplicate field in searchField
      SEARCHFIELD_DUPLICATE: (field) =>
        `❌ Field <code>${field}</code> appears multiple times in <code>searchField</code>. Duplicates are not allowed.`,

      // Section title must be a string
      SECTION_ID_INVALID: () =>
        `❌ Each section must have a string <code>id</code>.`,

      // Unknown field in searchField
      SEARCHFIELD_UNKNOWN: (field) =>
        `Field <code>${field}</code> is listed in <code>searchField</code> but not found in <code>fields</code>. Make sure the field exists and is spelled correctly.`,
    },

    // === UI: Titles, labels, captions
    UI: {
      // 🛠 Configuration errors found
      CONFIG_ERROR_TITLE: "Configuration Errors Detected",
      // ⛔ Script halted until errors are fixed
      SCRIPT_STOPPED: "Script stopped until errors are fixed.",

      RESET_MODAL: {
        // ⚠️ Confirm tag reset
        TITLE: "Reset all tags?",
        // 📃 Subtitle — what will be reset
        SUBTITLE: "The following will be cleared:",
        // 📌 List item — tags
        LI_TAGS: "All selected tags",
      },

      FILTER: {
        // 🧰 Filter modal title
        TITLE: "Filter Settings",
        // 📄 Description under the title
        DESCRIPTION: "Set rules to filter the cards.",
        // 🏷️ Label for selecting a field
        FIELD_LABEL: "Field to filter by:",
        // 🧩 Label for entering values
        VALUE_LABEL: "Filter values:",
        // 🖊️ Placeholder in the value input
        VALUE_PLACEHOLDER: "Type a value and press Enter...",
        // 🔀 Label for filter mode
        MODE_LABEL: "Filter mode:",
        // ✅ Show values
        MODE_WHITELIST: "✅ Show",
        // 🚫 Exclude values
        MODE_BLACKLIST: "🚫 Exclude",
        // 🗑 Button to clear selected tags
        CLEAR_TAGS: "🗑 Clear tags",
        // ✅ Apply filter
        APPLY: "✅ Apply",
        // 🔄 Reset filters
        RESET: "🔄 Reset filters",
        // ✅ Confirm reset
        CONFIRM: "✅ Yes, reset",
        // ❌ Cancel reset
        CANCEL: "❌ Cancel",
        // 📐 Label for logic (any/all)
        LOGIC_LABEL: "Filter logic",
        // ℹ️ Tooltip explaining filter logic
        LOGIC_TOOLTIP:
          "🔘 Any rule — card will be shown if at least one condition is met.\n🧩 All rules — card will be shown only if all conditions are met.",
        // 🔘 Option: any condition
        LOGIC_ANY: "🔘 Any rule",
        // 🧩 Option: all conditions
        LOGIC_ALL: "🧩 All rules",
        // 🔘 Button label
        BUTTON_LABEL: "Filter",
        // 🛈 Tooltip when button is disabled
        TOOLTIP_DISABLED: "No active tags",
      },

      // ➕ Text for hidden items in list
      MORE_ITEMS: (n) => `+ ${n} more…`,

      SEARCH: {
        CLEAR_BUTTON_TITLE: "Clear search",
      },

      MEDIA: {
        // ⚠️ file:// links not supported
        FILE_SCHEME_UNSUPPORTED:
          "⚠️ Local file:// links are not supported in Obsidian",
        // 🔊 External audio link
        AUDIO_EXTERNAL_LINK: "Listen to audio",
        // ❌ Unsupported audio format
        AUDIO_UNKNOWN_FORMAT: "Unknown audio format",
        // 🎥 External video link
        VIDEO_EXTERNAL_LINK: "Watch video",
        // ❌ Unsupported video format
        VIDEO_UNKNOWN_FORMAT: "Unknown video format",
        // ⚠️ Failed to extract YouTube ID
        YOUTUBE_ID_EXTRACTION_ERROR: "⚠️ Could not extract YouTube ID",
        // ⚠️ Invalid YouTube URL
        YOUTUBE_INVALID_URL: "⚠️ Invalid YouTube URL",
      },

      DATE: {
        // ❌ Date format error
        INVALID_FORMAT: "Invalid date format",
        // ❌ Could not recognize date
        INVALID: "Invalid date",
        // ❌ System error while parsing
        ERROR: "Date parsing error",
      },

      RATING: {
        // ❌ Invalid numeric rating
        INVALID: "Invalid rating",
      },

      RENDER: {
        // ❓ Unknown field
        UNKNOWN_FIELD: "Unknown field:",
        // ❌ Unsupported field type
        UNSUPPORTED_TYPE: "Unsupported field type",
        // ❌ Field rendering error
        FIELD_ERROR: "Field error",
      },

      INIT: {
        // ⛔ Failed to get current file
        FILE_NOT_FOUND: "⛔ Could not determine the current file.",
        // ⌛ Dataview still loading
        LOADING_DELAY_1: "Dataview hasn’t finished loading yet.",
        // 🔁 Suggest retry
        LOADING_DELAY_2: "Try reopening the note or just wait a few seconds.",
      },

      COLLAPSE_ALL: {
        // 🔽 Collapse all button
        BUTTON_LABEL: "Collapse all",
        // 💡 Tooltip for the button
        TOOLTIP: "Collapse all sections and scroll to top",
      },
    },

    // === UPDATES: Script update messages
    UPDATES: {
      // ⚠️ Error loading version data
      FETCH_ERROR: "❌ Failed to fetch version data",
      // 🏷️ Label for current script version
      CURRENT_VERSION_LABEL: "Current script version:",
      // 🆕 Notification about new script version
      NEW_VERSION_NOTICE: (version) =>
        `A new version of the script is available: <strong>${version}</strong>`,
      // 🔗 Link text to update the script
      UPDATE_LINK_LABEL: "Update script",
      // 💥 Error during update check
      UPDATE_CHECK_ERROR: (err) => `Error while checking for updates: ${err}`,
    },

    // === INFO: Informational messages
    INFO: {
      NO_RESULTS: {
        // ℹ️ Message when no cards are found
        LINE_1: "Nothing here yet.",
        // 💡 Suggestion to change filter or add data
        LINE_2: "Add some cards or adjust the filter settings.",
      },
    },
  },

  // Russian
  ru: {
    // === ERRORS: Различные ошибки
    ERRORS: {
      // Отсутствует объект полей
      MISSING_FIELDS_OBJECT: "❌ Отсутствует объект <code>fields</code>.",
      // Объект полей пуст
      EMPTY_FIELDS_OBJECT:
        "❌ В объекте <code>fields</code> не указано ни одного поля.",
      // Отсутствует список секций
      MISSING_SECTIONS: "❌ Отсутствует массив <code>sections</code>.",

      // Отсутствует путь к папке
      MISSING_FOLDER_KEYWORD:
        "❌ Не указан путь к папке: <code>folderKeyword</code>.",

      // Включена фильтрация, но не указано поле
      MISSING_TYPE_FIELD:
        "❌ Включена фильтрация <code>typeFilteringEnabled</code>, но не указано поле: <code>typeField</code>.",
      // Включена фильтрация, но значение указано некорректно
      INVALID_TYPE_VALUE:
        "❌ Включена фильтрация <code>typeFilteringEnabled</code>, но <code>typeValue</code> должен быть непустым массивом строк.",

      // Поле без типа
      FIELD_MISSING_TYPE: (key) =>
        `❌ Поле <code>${key}</code> не имеет заданного типа <code>type</code>.`,
      // Поле rating без maxRating
      RATING_MISSING_CONFIG: (key) =>
        `❌ Поле <code>${key}</code> с типом <code>rating</code> должно содержать <code>config.maxRating</code> (число).`,

      // Не указано ID секции
      NO_SECTION_ID: "(без id)",
      // Не указана фабрика
      EMPTY_FACTORY: "(пусто)",
      // Неизвестная фабрика
      UNKNOWN_FACTORY: (secId, factory) =>
        `❌ В секции <code>${secId}</code> указана неизвестная фабрика: <code>${factory}</code>`,
      // В секции нет списка полей
      SECTION_MISSING_FIELDS: (secId) =>
        `❌ В секции <code>${secId}</code> отсутствует список полей <code>fields</code>.`,
      // В секции указано несуществующее поле
      SECTION_UNKNOWN_FIELD: (secId, fieldName) =>
        `❌ В секции <code>${secId}</code> используется несуществующее поле: <code>${fieldName}</code>`,

      // Указано поле для поиска, которого нет в fields
      SEARCHFIELD_NOT_IN_FIELDS: (field) =>
        `❌ Указанное значение <code>${field}</code> в <code>searchField</code> не существует в <code>fields</code>.`,
      // Указано поле сортировки, которого нет в fields
      SORTFIELD_NOT_IN_FIELDS: (field) =>
        `❌ Поле <code>${field}</code> в <code>defaultSortField</code> отсутствует в <code>fields</code>.`,

      // Повторяющиеся ID секций
      DUPLICATE_SECTION_IDS: (list) =>
        `❌ Повторяющиеся <code>id</code> у секций: <code>${list}</code>.`,

      // Включён счётчик, но текст не указан
      MISSING_COUNTER_TEXT:
        "❌ Включён счётчик карточек, но <code>cardCounter.textBefore</code> не задан или не является строкой.",

      // 🔳 Не указан sortButtons (обязательное поле)
      SORT_BUTTONS_REQUIRED:
        "❌ Обязательно укажите поле <code>sortButtons</code> — даже если список пустой.",
      // 🔳 sortButtons: не является массивом
      INVALID_SORT_BUTTONS:
        "❌ Поле <code>sortButtons</code> заполнено неправильно. Должен быть список кнопок.",
      // 🏷️ Кнопка сортировки без подписи
      SORT_BUTTON_MISSING_LABEL: (index) =>
        `❌ В кнопке сортировки №${index} не указан <code>label</code>.`,
      // ❌ Кнопка сортировки без field или special
      SORT_BUTTON_MISSING_FIELD: (index) =>
        `❌ В кнопке сортировки №${index} не указано поле <code>field</code> или <code>special</code>.`,

      // randomSortFields содержит несуществующее поле
      RANDOMSORTFIELD_NOT_IN_FIELDS: (field) =>
        `❌ Поле <code>${field}</code> в <code>randomSortFields</code> отсутствует в <code>fields</code>.`,

      // sectionGroupField не найден в fields
      SECTIONGROUPFIELD_NOT_IN_FIELDS: (field) =>
        `❌ Поле <code>${field}</code> указано как <code>sectionGroupField</code>, но не найдено в <code>fields</code>.`,

      // allowedSectionValues должен быть массивом строк
      INVALID_ALLOWED_SECTION_VALUES:
        "❌ Поле <code>allowedSectionValues</code> должно быть списком строк.",

      // modalBehavior содержит недопустимое значение
      INVALID_MODAL_BEHAVIOR: (value) =>
        `❌ Значение <code>${value}</code> недопустимо для <code>modalBehavior</code>. Используйте "click" или "hold".`,

      // searchBox.placeholderText должен быть строкой
      INVALID_SEARCHBOX_PLACEHOLDER:
        "❌ Поле <code>searchBox.placeholderText</code> должно быть строкой.",

      // filtering.mode содержит недопустимое значение
      INVALID_FILTER_MODE: (mode) =>
        `❌ Недопустимый режим фильтрации <code>${mode}</code>. Допустимые значения: "byTypes" или "byFields".`,

      // filtering.allowedFields ссылается на несуществующее поле
      FILTERFIELD_NOT_IN_FIELDS: (field) =>
        `❌ Поле <code>${field}</code> из <code>filtering.allowedFields</code> не найдено в <code>fields</code>.`,

      // filtering.allowedTypes содержит недопустимый тип
      FILTERTYPE_INVALID: (type) =>
        `❌ Тип <code>${type}</code> в <code>filtering.allowedTypes</code> не поддерживается.`,

      // Неверный тип поля в fields
      FIELD_INVALID_TYPE: (field, type) =>
        `❌ В поле <code>${field}</code> указан недопустимый тип <code>${type}</code>.`,

      // styleMap у badge должен содержать match и class
      BADGE_STYLEMAP_INVALID: (key) =>
        `❌ В поле <code>${key}</code> с типом <code>badge</code> в параметре <code>styleMap</code> должен быть список объектов с ключами <code>match</code> и <code>class</code>.`,

      // progressBar: отсутствует currentField или maxField
      PROGRESSBAR_MISSING_FIELDS: (key) =>
        `❌ В поле <code>${key}</code> с типом <code>progressBar</code> не указаны обязательные параметры <code>currentField</code> и <code>maxField</code> внутри <code>config</code>.`,

      // Поле повторяется в списке searchField
      SEARCHFIELD_DUPLICATE: (field) =>
        `❌ В списке <code>searchField</code> поле <code>${field}</code> указано несколько раз. Поля не должны повторятся.`,

      //  У каждого section.title должно быть строковое значение
      SECTION_ID_INVALID: () =>
        `❌ Каждая секция должна иметь строковой <code>id</code>.`,

      // Проверка searchField
      SEARCHFIELD_UNKNOWN: (field) =>
        `Поле <code>${field}</code> указано в параметре <code>searchField</code>, но не найдено среди <code>fields</code>. Убедитесь, что это поле действительно существует и правильно написано.`,
    },

    // === UI: Заголовки, подписи, надписи
    UI: {
      // 🛠 Обнаружены ошибки конфигурации
      CONFIG_ERROR_TITLE: "Обнаружены ошибки в конфигурации",
      // ⛔ Скрипт остановлен до исправления ошибок
      SCRIPT_STOPPED: "Скрипт остановлен до исправления ошибок.",

      RESET_MODAL: {
        // ⚠️ Подтверждение сброса тегов
        TITLE: "Сбросить все теги?",
        // 📃 Подзаголовок: что будет сброшено
        SUBTITLE: "Будет сброшено:",
        // 📌 Перечисление — теги
        LI_TAGS: "Все выбранные теги",
      },

      FILTER: {
        // 🧰 Заголовок окна фильтрации
        TITLE: "Настройка фильтрации",
        // 📄 Подпись под заголовком
        DESCRIPTION: "Задайте правила фильтрации карточек.",
        // 🏷️ Метка для выбора поля
        FIELD_LABEL: "Поле для фильтрации:",
        // 🧩 Метка для ввода значений
        VALUE_LABEL: "Значения фильтра:",
        // 🖊️ Плейсхолдер в поле значений
        VALUE_PLACEHOLDER: "Введите значение и нажмите Enter...",
        // 🔀 Метка режима фильтрации
        MODE_LABEL: "Режим фильтрации:",
        // ✅ Включить фильтрацию по значению
        MODE_WHITELIST: "✅ Показать",
        // 🚫 Исключить значения
        MODE_BLACKLIST: "🚫 Исключить",
        // 🗑 Кнопка очистки выбранных тегов
        CLEAR_TAGS: "🗑 Очистить теги",
        // ✅ Применить фильтр
        APPLY: "✅ Применить",
        // 🔄 Сбросить фильтр
        RESET: "🔄 Сбросить фильтры",
        // ✅ Подтвердить сброс
        CONFIRM: "✅ Да, сбросить",
        // ❌ Отменить сброс
        CANCEL: "❌ Отмена",
        // 📐 Метка логики условий (any/all)
        LOGIC_LABEL: "Условия фильтрации",
        // ℹ️ Подсказка по логике условий
        LOGIC_TOOLTIP:
          "🔘 Любое правило — карточка будет показана, если выполнено хотя бы одно из добавленных условий.\n🧩 Все правила — карточка будет показана, только если выполнены все условия сразу.",
        // 🔘 Опция: любое условие
        LOGIC_ANY: "🔘 Любое правило",
        // 🧩 Опция: все условия
        LOGIC_ALL: "🧩 Все правила",
        // 🔘 Кнопка запуска фильтра
        BUTTON_LABEL: "Фильтр",
        // 🛈 Подсказка при недоступной кнопке
        TOOLTIP_DISABLED: "Нет активных тегов",
      },

      // ➕ Текст для скрытых элементов в списке
      MORE_ITEMS: (n) => `+ ещё ${n}…`,

      SEARCH: {
        CLEAR_BUTTON_TITLE: "Очистить поиск",
      },

      MEDIA: {
        // ⚠️ Встроенные ссылки file:// не поддерживаются
        FILE_SCHEME_UNSUPPORTED:
          "⚠️ Локальные file:// ссылки не поддерживаются в Obsidian",
        // 🔊 Внешняя ссылка на аудио
        AUDIO_EXTERNAL_LINK: "Слушать аудио",
        // ❌ Неподдерживаемый формат аудио
        AUDIO_UNKNOWN_FORMAT: "Неизвестный формат аудио",
        // 🎥 Внешняя ссылка на видео
        VIDEO_EXTERNAL_LINK: "Смотреть видео",
        // ❌ Неподдерживаемый формат видео
        VIDEO_UNKNOWN_FORMAT: "Неизвестный формат видео",
        // ⚠️ Не удалось извлечь ID YouTube
        YOUTUBE_ID_EXTRACTION_ERROR: "⚠️ Не удалось извлечь ID YouTube",
        // ⚠️ Невалидная ссылка YouTube
        YOUTUBE_INVALID_URL: "⚠️ Невалидная YouTube-ссылка",
      },

      DATE: {
        // ❌ Ошибка формата даты
        INVALID_FORMAT: "Неверный формат даты",
        // ❌ Не удалось распознать дату
        INVALID: "Невалидная дата",
        // ❌ Системная ошибка при разборе
        ERROR: "Ошибка обработки даты",
      },

      RATING: {
        // ❌ Некорректная числовая оценка
        INVALID: "Некорректная оценка",
      },

      RENDER: {
        // ❓ Поле не найдено
        UNKNOWN_FIELD: "Неизвестное поле:",
        // ❌ Тип поля не поддерживается
        UNSUPPORTED_TYPE: "Неподдерживаемый тип поля",
        // ❌ Ошибка при рендеринге
        FIELD_ERROR: "Ошибка поля",
      },

      INIT: {
        // ⛔ Не удалось получить текущий файл
        FILE_NOT_FOUND: "⛔ Не удалось определить текущий файл.",
        // ⌛ Dataview не успел загрузиться
        LOADING_DELAY_1: "Dataview пока не успел загрузить данные.",
        // 🔁 Рекомендация повторить попытку
        LOADING_DELAY_2:
          "Откройте заметку заново или просто подождите пару секунд.",
      },

      COLLAPSE_ALL: {
        // 🔽 Кнопка сворачивания
        BUTTON_LABEL: "Свернуть всё",
        // 💡 Подсказка к кнопке
        TOOLTIP: "Свернуть все секции и вернуться к началу",
      },
    },

    // === UPDATES: Обновление скрипта
    UPDATES: {
      // ⚠️ Ошибка загрузки данных о версии
      FETCH_ERROR: "❌ Не удалось получить данные о версии",
      // 🏷️ Метка текущей версии скрипта
      CURRENT_VERSION_LABEL: "Текущая версия скрипта:",
      // 🆕 Уведомление о новой версии скрипта
      NEW_VERSION_NOTICE: (version) =>
        `Доступна новая версия скрипта <strong>${version}</strong>`,
      // 🔗 Текст ссылки на обновление скрипта
      UPDATE_LINK_LABEL: "Обновить скрипт",
      // 💥 Ошибка во время проверки обновлений
      UPDATE_CHECK_ERROR: (err) => `Ошибка при проверке обновлений: ${err}`,
    },

    // === INFO: Информация
    INFO: {
      NO_RESULTS: {
        // ℹ️ Сообщение при отсутствии карточек
        LINE_1: "Здесь пока пусто.",
        // 💡 Подсказка изменить фильтр или добавить данные
        LINE_2: "Добавьте карточки или измените условия фильтрации.",
      },
    },
  },

  // Ukrainian
  uk: {
    // === ERRORS: Різні помилки
    ERRORS: {
      // Відсутній об'єкт полів
      MISSING_FIELDS_OBJECT: "❌ Відсутній об'єкт <code>fields</code>.",
      // Об'єкт полів порожній
      EMPTY_FIELDS_OBJECT:
        "❌ В об'єкті <code>fields</code> не вказано жодного поля.",
      // Відсутній список секцій
      MISSING_SECTIONS: "❌ Відсутній масив <code>sections</code>.",
      // Відсутній шлях до папки
      MISSING_FOLDER_KEYWORD:
        "❌ Не вказано шлях до папки: <code>folderKeyword</code>.",
      // Увімкнено фільтрацію, але не вказано поле
      MISSING_TYPE_FIELD:
        "❌ Увімкнено фільтрацію <code>typeFilteringEnabled</code>, але не вказано поле: <code>typeField</code>.",
      // Увімкнено фільтрацію, але значення некоректне
      INVALID_TYPE_VALUE:
        "❌ Увімкнено фільтрацію <code>typeFilteringEnabled</code>, але <code>typeValue</code> має бути непорожнім масивом рядків.",

      // Поле без типу
      FIELD_MISSING_TYPE: (key) =>
        `❌ Поле <code>${key}</code> не має вказаного типу <code>type</code>.`,
      // Поле rating без maxRating
      RATING_MISSING_CONFIG: (key) =>
        `❌ Поле <code>${key}</code> з типом <code>rating</code> має містити <code>config.maxRating</code> (число).`,

      // Не вказано ID секції
      NO_SECTION_ID: "(без id)",
      // Не вказано фабрику
      EMPTY_FACTORY: "(порожньо)",
      // Невідома фабрика
      UNKNOWN_FACTORY: (secId, factory) =>
        `❌ У секції <code>${secId}</code> вказано невідому фабрику: <code>${factory}</code>`,
      // У секції відсутній список полів
      SECTION_MISSING_FIELDS: (secId) =>
        `❌ У секції <code>${secId}</code> відсутній список полів <code>fields</code>.`,
      // У секції вказано неіснуюче поле
      SECTION_UNKNOWN_FIELD: (secId, fieldName) =>
        `❌ У секції <code>${secId}</code> використовується невідоме поле: <code>${fieldName}</code>`,

      // Вказано поле для пошуку, якого немає в fields
      SEARCHFIELD_NOT_IN_FIELDS: (field) =>
        `❌ Значення <code>${field}</code> у <code>searchField</code> не існує в <code>fields</code>.`,
      // Вказано поле сортування, якого немає в fields
      SORTFIELD_NOT_IN_FIELDS: (field) =>
        `❌ Поле <code>${field}</code> у <code>defaultSortField</code> відсутнє в <code>fields</code>.`,

      // Повторювані ID секцій
      DUPLICATE_SECTION_IDS: (list) =>
        `❌ Повторювані <code>id</code> у секціях: <code>${list}</code>.`,

      // Увімкнено лічильник, але текст не вказано
      MISSING_COUNTER_TEXT:
        "❌ Увімкнено лічильник карток, але <code>cardCounter.textBefore</code> не вказано або він не є рядком.",

      // 🔳 Не вказано sortButtons (обов’язкове поле)
      SORT_BUTTONS_REQUIRED:
        "❌ Обов'язково вкажіть поле <code>sortButtons</code> — навіть якщо список порожній.",
      // 🔳 sortButtons: не є масивом
      INVALID_SORT_BUTTONS:
        "❌ Поле <code>sortButtons</code> заповнено неправильно. Має бути список кнопок.",
      // 🏷️ Кнопка сортування без підпису
      SORT_BUTTON_MISSING_LABEL: (index) =>
        `❌ У кнопці сортування №${index} не вказано <code>label</code>.`,
      // ❌ Кнопка сортування без field або special
      SORT_BUTTON_MISSING_FIELD: (index) =>
        `❌ У кнопці сортування №${index} не вказано поле <code>field</code> або <code>special</code>.`,

      // randomSortFields містить неіснуюче поле
      RANDOMSORTFIELD_NOT_IN_FIELDS: (field) =>
        `❌ Поле <code>${field}</code> у <code>randomSortFields</code> відсутнє в <code>fields</code>.`,

      // sectionGroupField не знайдено в fields
      SECTIONGROUPFIELD_NOT_IN_FIELDS: (field) =>
        `❌ Поле <code>${field}</code> вказано як <code>sectionGroupField</code>, але не знайдено в <code>fields</code>.`,

      // allowedSectionValues повинен бути масивом рядків
      INVALID_ALLOWED_SECTION_VALUES:
        "❌ Поле <code>allowedSectionValues</code> має бути списком рядків.",

      // modalBehavior містить недопустиме значення
      INVALID_MODAL_BEHAVIOR: (value) =>
        `❌ Значення <code>${value}</code> є недопустимим для <code>modalBehavior</code>. Використовуйте \"click\" або \"hold\".`,

      // searchBox.placeholderText має бути рядком
      INVALID_SEARCHBOX_PLACEHOLDER:
        "❌ Поле <code>searchBox.placeholderText</code> має бути рядком.",

      // filtering.mode містить недопустиме значення
      INVALID_FILTER_MODE: (mode) =>
        `❌ Неприпустимий режим фільтрації <code>${mode}</code>. Допустимі значення: \"byTypes\" або \"byFields\".`,

      // filtering.allowedFields посилається на неіснуюче поле
      FILTERFIELD_NOT_IN_FIELDS: (field) =>
        `❌ Поле <code>${field}</code> з <code>filtering.allowedFields</code> не знайдено в <code>fields</code>.`,

      // filtering.allowedTypes містить недопустимий тип
      FILTERTYPE_INVALID: (type) =>
        `❌ Тип <code>${type}</code> у <code>filtering.allowedTypes</code> не підтримується.`,

      // Невірний тип поля в fields
      FIELD_INVALID_TYPE: (field, type) =>
        `❌ У полі <code>${field}</code> вказано недопустимий тип <code>${type}</code>.`,

      // styleMap у badge має містити match і class
      BADGE_STYLEMAP_INVALID: (key) =>
        `❌ У полі <code>${key}</code> з типом <code>badge</code> у параметрі <code>styleMap</code> має бути список об'єктів з ключами <code>match</code> і <code>class</code>.`,

      // progressBar: відсутній currentField або maxField
      PROGRESSBAR_MISSING_FIELDS: (key) =>
        `❌ У полі <code>${key}</code> з типом <code>progressBar</code> не вказані обов'язкові параметри <code>currentField</code> і <code>maxField</code> у <code>config</code>.`,

      // Поле повторюється у списку searchField
      SEARCHFIELD_DUPLICATE: (field) =>
        `❌ У списку <code>searchField</code> поле <code>${field}</code> вказано кілька разів. Поля не повинні повторюватися.`,

      // У кожного section.title має бути рядкове значення
      SECTION_ID_INVALID: () =>
        `❌ Кожна секція повинна мати <code>id</code> у вигляді рядка.`,

      // Перевірка searchField
      SEARCHFIELD_UNKNOWN: (field) =>
        `Поле <code>${field}</code> вказано в параметрі <code>searchField</code>, але не знайдено серед <code>fields</code>. Переконайтеся, що це поле дійсно існує та правильно написано.`,
    },

    // === UI: Заголовки, підписи, позначки
    UI: {
      // 🛠 Виявлено помилки конфігурації
      CONFIG_ERROR_TITLE: "Виявлено помилки в конфігурації",
      // ⛔ Скрипт зупинено до виправлення помилок
      SCRIPT_STOPPED: "Скрипт зупинено до виправлення помилок.",

      RESET_MODAL: {
        // ⚠️ Підтвердження скидання тегів
        TITLE: "Скинути всі теги?",
        // 📃 Підзаголовок: що буде скинуто
        SUBTITLE: "Буде скинуто:",
        // 📌 Перелік — теги
        LI_TAGS: "Усі вибрані теги",
      },

      FILTER: {
        // 🧰 Заголовок вікна фільтрації
        TITLE: "Налаштування фільтрації",
        // 📄 Підпис під заголовком
        DESCRIPTION: "Задайте правила фільтрації карток.",
        // 🏷️ Мітка для вибору поля
        FIELD_LABEL: "Поле для фільтрації:",
        // 🧩 Мітка для введення значень
        VALUE_LABEL: "Значення фільтра:",
        // 🖊️ Плейсхолдер у полі введення значень
        VALUE_PLACEHOLDER: "Введіть значення і натисніть Enter...",
        // 🔀 Мітка режиму фільтрації
        MODE_LABEL: "Режим фільтрації:",
        // ✅ Увімкнути фільтрацію за значенням
        MODE_WHITELIST: "✅ Показати",
        // 🚫 Виключити значення
        MODE_BLACKLIST: "🚫 Виключити",
        // 🗑 Кнопка очищення вибраних тегів
        CLEAR_TAGS: "🗑 Очистити теги",
        // ✅ Застосувати фільтр
        APPLY: "✅ Застосувати",
        // 🔄 Скинути фільтри
        RESET: "🔄 Скинути фільтри",
        // ✅ Підтвердити скидання
        CONFIRM: "✅ Так, скинути",
        // ❌ Скасувати скидання
        CANCEL: "❌ Скасувати",
        // 📐 Мітка логіки умов (any/all)
        LOGIC_LABEL: "Умови фільтрації",
        // ℹ️ Підказка щодо логіки умов
        LOGIC_TOOLTIP:
          "🔘 Будь-яке правило — картка буде показана, якщо виконано хоча б одну з умов.\n🧩 Усі правила — картка буде показана лише якщо виконано всі умови одночасно.",
        // 🔘 Опція: будь-яке правило
        LOGIC_ANY: "🔘 Будь-яке правило",
        // 🧩 Опція: всі правила
        LOGIC_ALL: "🧩 Усі правила",
        // 🔘 Кнопка запуску фільтра
        BUTTON_LABEL: "Фільтр",
        // 🛈 Підказка при неактивній кнопці
        TOOLTIP_DISABLED: "Немає активних тегів",
      },

      // ➕ Текст для прихованих елементів у списку
      MORE_ITEMS: (n) => `+ ще ${n}…`,

      SEARCH: {
        CLEAR_BUTTON_TITLE: "Очистити пошук",
      },

      MEDIA: {
        // ⚠️ Вбудовані file:// посилання не підтримуються
        FILE_SCHEME_UNSUPPORTED:
          "⚠️ Локальні посилання file:// не підтримуються в Obsidian",
        // 🔊 Зовнішнє посилання на аудіо
        AUDIO_EXTERNAL_LINK: "Прослухати аудіо",
        // ❌ Непідтримуваний формат аудіо
        AUDIO_UNKNOWN_FORMAT: "Невідомий формат аудіо",
        // 🎥 Зовнішнє посилання на відео
        VIDEO_EXTERNAL_LINK: "Переглянути відео",
        // ❌ Непідтримуваний формат відео
        VIDEO_UNKNOWN_FORMAT: "Невідомий формат відео",
        // ⚠️ Не вдалося отримати ID YouTube
        YOUTUBE_ID_EXTRACTION_ERROR: "⚠️ Не вдалося отримати ID YouTube",
        // ⚠️ Неправильне посилання YouTube
        YOUTUBE_INVALID_URL: "⚠️ Неправильне посилання на YouTube",
      },

      DATE: {
        // ❌ Помилка формату дати
        INVALID_FORMAT: "Неправильний формат дати",
        // ❌ Не вдалося розпізнати дату
        INVALID: "Недійсна дата",
        // ❌ Системна помилка під час обробки
        ERROR: "Помилка обробки дати",
      },

      RATING: {
        // ❌ Некоректна числова оцінка
        INVALID: "Некоректна оцінка",
      },

      RENDER: {
        // ❓ Поле не знайдено
        UNKNOWN_FIELD: "Невідоме поле:",
        // ❌ Тип поля не підтримується
        UNSUPPORTED_TYPE: "Непідтримуваний тип поля",
        // ❌ Помилка під час рендерингу
        FIELD_ERROR: "Помилка поля",
      },

      INIT: {
        // ⛔ Не вдалося отримати поточний файл
        FILE_NOT_FOUND: "⛔ Не вдалося визначити поточний файл.",
        // ⌛ Dataview ще не встиг завантажитися
        LOADING_DELAY_1: "Dataview ще не встиг завантажити дані.",
        // 🔁 Рекомендація повторити спробу
        LOADING_DELAY_2:
          "Спробуйте знову відкрити нотатку або зачекайте кілька секунд.",
      },

      COLLAPSE_ALL: {
        // 🔽 Кнопка згортання
        BUTTON_LABEL: "Згорнути все",
        // 💡 Підказка до кнопки
        TOOLTIP: "Згорнути всі секції та повернутися на початок",
      },
    },

    // === UPDATES: Оновлення скрипта
    UPDATES: {
      // ⚠️ Помилка під час завантаження даних про версію
      FETCH_ERROR: "❌ Не вдалося отримати дані про версію",
      // 🏷️ Позначка поточної версії скрипта
      CURRENT_VERSION_LABEL: "Поточна версія скрипта:",
      // 🆕 Сповіщення про нову версію скрипта
      NEW_VERSION_NOTICE: (version) =>
        `Доступна нова версія скрипта: <strong>${version}</strong>`,
      // 🔗 Текст посилання для оновлення скрипта
      UPDATE_LINK_LABEL: "Оновити скрипт",
      // 💥 Помилка під час перевірки оновлень
      UPDATE_CHECK_ERROR: (err) => `Помилка під час перевірки оновлень: ${err}`,
    },

    // === INFO: Інформація
    INFO: {
      NO_RESULTS: {
        // ℹ️ Повідомлення при відсутності карток
        LINE_1: "Тут поки що порожньо.",
        // 💡 Підказка змінити фільтр або додати дані
        LINE_2: "Додайте картки або змініть умови фільтрації.",
      },
    },
  },
};
