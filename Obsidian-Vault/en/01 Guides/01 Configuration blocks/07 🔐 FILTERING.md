---
cssclasses:
  - hide-properties
obsidianUIMode: preview
---
# 🧭 [[01 Roadmap|Roadmap]] • [[06 🧮 SORTING|← Back]] • [[08 🖼 FIELD CREATION|Next →]] • [[00 HUB|Home Page]] 🏠

---
# **BLOCK 07 🔐 FILTERING**

> 💡 **Example block configuration:**

```js
filtering: {
  clearTagsWarning: true,
  mode: "byTypes",
  allowedTypes: ["text", "badge", "date", "pageLink", "number", "rating", "progressBar"],
  allowedFields: ["Title", "Badge", "DemoDate", "Rating"],
},
```

This block controls the behavior of the **filter modal window**, which appears when clicking the “Filter” button next to the search bar.

---

## ⚠️ `clearTagsWarning`

Controls whether a confirmation window is shown before removing all tags from a card.

**Possible values:**

- `true` — show a warning (default)
    
- `false` — remove tags immediately without confirmation
    

If you’re afraid of accidentally clearing all tags, leave this as `true`.

---

## 🔧 `mode`

Defines **what is shown in the dropdown field selector** inside the filter modal:

- `"byTypes"` — fields are shown by their **types** (not YAML names)
    
- `"byFields"` — shows specific fields listed in `allowedFields`
    

⚠️ All available types are listed here → [[02 Field Types]]

---

## ✅ `allowedTypes`

An array of field types that can be used for filtering (when `mode: "byTypes"`). Example:

```js
["text", "badge", "date", "pageLink", "number", "rating", "progressBar"]
```

⚠️ Full list of types is available here → [[02 Field Types]]

---

## 📌 `allowedFields`

An array of specific fields defined in [[08 🖼 FIELD CREATION]] that are available for filtering (when `mode: "byFields"`). Example:

```js
["Title", "Badge", "DemoDate", "Rating"]
```

If you want to filter by title, but you don’t have a corresponding YAML field — only the file name — that’s not a problem.  
You can create a virtual field. More details here → [[02 Field Types]], BLOCK: 🔗 Note Link (`pageLink`)

---

## ⚙️ `defaultMatchMode`

Defines the **logical rule** used when multiple filters are applied — either match **any** or **all** conditions. This rule is applied when the filter modal is first opened or fully reset.

Possible values:

- `"any"` — a card will be shown if it matches **at least one** filter
    
- `"all"` — a card will be shown **only if all** filters match at the same time
    

### Why is this important?

When a user first opens the filter or clicks “Reset,” the script needs to know which logic to apply — OR (`any`) or AND (`all`).  
This default is defined via `defaultMatchMode`.

If you want cards to show when **at least one** condition matches, use `"any"`.  
If you need **strict matching across all filters**, use `"all"`.

---

## 🌓 `defaultFilterMode`

Defines **how filter values (tags, fields, etc.) behave** when the filter modal is opened or reset.

Possible values:

- `"whitelist"` — show cards that **match** the selected values (e.g., have a certain tag)
    
- `"blacklist"` — hide cards that **contain** the selected values
    

### Why is this important?

When users apply filters, they can act as either **inclusive** or **exclusive**.  
`defaultFilterMode` determines **which behavior is used by default**, especially after clicking the “Reset” button.

If you want filters to **include only matching cards**, use `"whitelist"`.  
If you want to **exclude** cards with certain values, use `"blacklist"`.

Both parameters ensure that **after clearing filters** (or on first open), the script restores the **intended default behavior** you’ve set in the config.  
They are the foundation for predictable and intuitive filter interaction.

Read more about how the filter works here → [[01 Visual Feature Overview]]

---

> 🔠 **Filtering is case-sensitive!**  
> For example, `Tag` and `tag` are treated as different values.

---
# 🧭 [[01 Roadmap|Roadmap]] • [[06 🧮 SORTING|← Back]] • [[08 🖼 FIELD CREATION|Next →]] • [[00 HUB|Home Page]] 🏠