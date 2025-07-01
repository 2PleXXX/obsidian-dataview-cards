---
cssclasses:
  - hide-properties
obsidianUIMode: preview
---
# 🧭 [[01 Roadmap|Roadmap]] • [[05 🧱 SECTIONS|← Back]] • [[07 🔐 FILTERING|Next →]] • [[00 HUB|Home Page]] 🏠

---

# **BLOCK 06 🧮 SORTING**

> 💡 **Example block configuration:**

```js
sortButtons: [
  { label: "By title", field: "Title", emoji: "🔤" },
  { label: "By date", field: "DemoDate", emoji: "🗓️" },
  { label: "Random", special: "random", emoji: "♾️" },
  { label: "By backlinks", field: "backlinkCount", emoji: "🔁" },
],

randomSortFields: ["Title", "DemoDate", "DemoList"],
rememberSort: true,
```

---

## 🔘 `sortButtons`

Defines the sorting buttons. Each button is an object with several parameters:

- `label` — the name shown on the button (visible to the user).
    
- `field` — the field by which sorting will be performed. This must be one of the fields defined in [[08 🖼 FIELD CREATION]]. For example:
    

```js
fields: {
  Title: {
    type: "pageLink",
    label: "Title",
  },
},
```

- `emoji` — an optional emoji shown next to the button label. You can leave it empty (`""`) if not needed.
    

> 📌 Sort buttons appear **in the order** they are listed in the array — top to bottom.

---

## ✨ Special Buttons

```js
{ label: "Random", special: "random", emoji: "♾️" },
{ label: "By backlinks", field: "backlinkCount", emoji: "🔁" },
```

- `random` — performs random sorting based on the fields specified in `randomSortFields`.
    
- `backlinkCount` — sorts cards by the **number of backlinks** from your entire Obsidian vault.  
    It counts all `[[wikilink]]` references pointing to the current card.
    

### 🔧 Displaying the `backlinkCount` field in a card:

If you want to show the number of backlinks on the card, add the following field to `config.fields` (more about fields in [[08 🖼 FIELD CREATION]]):

```js
backlinkCount: { // <- virtual field; do not rename
  type: "number", // <- must be type "number"
  label: "🔁 Backlinks",
},
```

Then include `"backlinkCount"` in the `fields` array of the appropriate section, and the number will appear along with the other data.

---

## 🎲 `randomSortFields`

```js
randomSortFields: ["Title", "DemoDate", "DemoList"],
```

Defines **which fields participate in random sorting**.  
These fields must be declared in [[08 🖼 FIELD CREATION]].

---

## 💾 `rememberSort`

```js
rememberSort: true,
```

Determines whether the last selected sorting method is remembered:

- `true` — the choice is saved across sessions.
    
- `false` — the choice is not saved.

---
# 🧭 [[01 Roadmap|Roadmap]] • [[05 🧱 SECTIONS|← Back]] • [[07 🔐 FILTERING|Next →]] • [[00 HUB|Home Page]] 🏠