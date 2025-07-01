---
cssclasses:
  - hide-properties
obsidianUIMode: preview
---

# 🧭 [[01 Roadmap|Roadmap]] • [[08 🖼 FIELD CREATION|← Back]] • [[10 🛠️ SCRIPT INTEGRATION|Next →]] • [[00 HUB|Home Page]] 🏠

---
# 📦 **BLOCK 09 — CARD SECTIONS**

> 💡 Sections let you group cards by specific conditions.  
> Examples: "Watching", "Completed", "Favorites", "High Rating", etc.

---

## 🔧 Example Section Configuration

```js
{
  id: "section0",
  title: "Section Poster",
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
  ],
},
```

---

## 🔹 `id`

A unique identifier for the section.  
— **Required**  
— Must not duplicate any other section's ID.

> ❗ The special section `unsorted` uses a reserved `id` and **must not be reused**.

---

## 🔹 `title`

The section title displayed in the interface.  
You can include emojis.

- Example: `"Section Poster"`
    

---

## 🔹 `styleClass`

Lets you assign a custom CSS class to the entire section.  
If not specified — default styling is used.

See how to define your own styles → [[06 Section Styling]]

---

## 🔹 `matchFactory`

Defines the **logic** used to decide whether a card belongs in this section.  
You choose from available matching factories.

Examples:

```js
matchFactory: "matchBySectionValue"
matchFactory: "matchIfFieldCompare"
matchFactory: "matchIfContainsAllValues"
```

Full list of factories and descriptions: [[03 Section Logic]]

---

## 🔹 `matchArgs`

Arguments passed to the selected `matchFactory`.

Examples for different factories:

```js
// matchBySectionValue
matchArgs: { field: "Section", values: ["SectionPoster"] }

// matchIfFieldCompare
matchArgs: { field: "Rating", operator: ">=", value: 8 }

// matchIfContainsAllValues
matchArgs: { values: ["Experimental", "Texture"] }
```

- **field** — name of the YAML field to check
    
- **values** — one or more values that must be present in that field
    
- **operator** — comparison operator
    
- **value** — value to compare with the `field`
    

---

## 🔹 `fields`

A list of fields to display in cards under this section.

- Use field names defined in `config.fields` → [[08 🖼 FIELD CREATION]]
    
- Fields are shown **in the order you list them**
    

---

## ⭐ Special Sections

### 🔸 Favorites (`favourite`)

```js
{
  id: "favourite",
  title: "⭐ Favourite",
  styleClass: "universal-favourite",
  allowDuplicates: true,
  matchFactory: "matchBySectionValue",
  matchArgs: { field: "Favourite", values: ["Yes"] },
  fields: [ ... ],
}
```

This is a regular section like any other — but we’ll use it to explain the `allowDuplicates` setting.

#### 🔹 `allowDuplicates`

Controls whether a card can appear in multiple sections at once.

- `true` — the card can appear here **and** in other sections
    
- `false` — the card will appear **only here**
    

You can set `allowDuplicates: true` for any section where you want card duplication —  
**except** for the special "Unsorted" section.

> 📝 **Example:** if a card is marked `Favourite: Yes` but already matched "Watching",  
> then with `allowDuplicates: false`, it **won’t appear** in "Favourite" — it stays in "Watching".

---

### 🔸 Unsorted (`unsorted`)

```js
{
  id: "unsorted",
  title: "🗂 Unsorted",
  styleClass: "universal-unsorted",
  fields: [ ... ],
}
```

A catch-all section for cards that **didn't match any other section**.  
It is **highly recommended not to delete this** — it helps you catch "lost" cards.

> 📝 Tip: always place the `unsorted` section **at the end** of your `config.sections` array.

---

## 💡 General Tips

- Sections are processed **top to bottom** (in the order of `config.sections`)
    
- To avoid cards being "lost":
    
    - Properly configure `matchFactory + matchArgs`,
        
    - Or always include an `unsorted` fallback section.

---
# 🧭 [[01 Roadmap|Roadmap]] • [[08 🖼 FIELD CREATION|← Back]] • [[10 🛠️ SCRIPT INTEGRATION|Next →]] • [[00 HUB|Home Page]] 🏠