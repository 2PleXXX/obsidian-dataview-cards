---
cssclasses:
  - hide-properties
obsidianUIMode: preview
---
# 🧭 [[01 Roadmap|Roadmap]] • [[03 🔢 CARD COUNTER|← Back]] • [[05 🧱 SECTIONS|Next →]] • [[00 HUB|Home Page]] 🏠

---

# **BLOCK 04 🔍 SEARCH**

> 💡 **Example block configuration:**

```js
searchField: ["Title", "DemoList", "Badge"],
searchBox: {
  placeholderText: "🔍 Search by Title, DemoList, Badge...",
},
```

---

## 🧭 `searchField`

Specifies the field(s) to search through. This must be **one of the fields** defined in the block [[08 🖼 FIELD CREATION]]. For example:

```js
fields: {
  Title: {  // <--- this is the field
    type: "pageLink",
    label: "Title",
  },
},
```

If you want to search by title but don’t have a corresponding YAML field — only the file name — that’s not a problem. You can create a virtual field. More on this here → [[02 Field Types]], BLOCK: 🔗 Note Link (`pageLink`)

> 🔎 The search is case-insensitive.

> ⚠️ **Important:** If you specify a non-standard field (e.g., image or audio), the result may be unpredictable.  
> In most cases, the search will operate on the text representation of the value (e.g., an image link).  
> Here’s an example of how a search by date (type `"date"`) looks:

![[Search by Date.png]]

---

## 💬 `placeholderText`

Placeholder text shown inside the search box before anything is typed.  
You can change it to whatever you like.

---
# 🧭 [[01 Roadmap|Roadmap]] • [[03 🔢 CARD COUNTER|← Back]] • [[05 🧱 SECTIONS|Next →]] • [[00 HUB|Home Page]] 🏠