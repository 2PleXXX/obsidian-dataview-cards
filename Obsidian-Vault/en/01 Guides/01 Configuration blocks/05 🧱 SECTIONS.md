---
cssclasses:
  - hide-properties
obsidianUIMode: preview
---
# 🧭 [[01 Roadmap|Roadmap]] • [[04 🔍 SEARCH|← Back]] • [[06 🧮 SORTING|Next →]] • [[00 HUB|Home Page]] 🏠

---

# **BLOCK 05 🧱 SECTIONS**

> 💡 **Example block configuration:**

```js
sectionBehavior: {
  rememberState: true,
  defaultOpen: false,
  lazyLoading: true,
  lazyChunkSize: 18,
  lazyPreloadChunks: 2,
},
```

---

## 🧠 `rememberState`

Controls whether the **section state** (open or closed) is remembered:

- `true` – the state is preserved when switching sections or reloading the note.
    
- `false` – the state is reset every time; not remembered.
    

---

## 📂 `defaultOpen`

Defines the **initial state** of sections when the note is opened:

- `true` – all sections are expanded by default.
    
- `false` – all sections are collapsed by default.
    

> ⚠️ **Important:** These parameters may conflict.  
> If you want sections to always be open:
> 
> - Set `rememberState: false`
>     
> - Set `defaultOpen: true`
>     

---

## 🐢 `lazyLoading`

Enables or disables **lazy loading optimization** for cards:

- `false` – all cards in the section are loaded at once in a single table.
    
- `true` – cards are loaded in **chunks** (subsections). Each chunk is rendered only when it nears the viewport.
    

> 🧩 Example: If you have 100 cards and `lazyChunkSize: 20`, the section is split into 5 tables with 20 cards each. As you scroll, one table is loaded at a time.

> ⚠️ **Visual gaps:** Sometimes rows may not align perfectly (e.g., a 6-card row might appear incomplete). This is normal.  
> Adjust `lazyChunkSize` to reduce this effect (e.g., `18` or `24` might work better than `20` if your layout has 6 cards per row).

---

## 📦 `lazyChunkSize`

Number of cards loaded per chunk.

- For example, with `lazyChunkSize: 20`, cards are loaded in batches of 20.
    
- This value affects both loading performance and visual layout.
    
- Choose a size that divides evenly by the number of cards per row (e.g., 6, 12, 18, 24, etc.).
    

> ✅ Smaller values load faster but require more chunks.  
> ✅ Larger values reduce the number of chunks but are heavier to render.

---

## ⏩ `lazyPreloadChunks`

Defines **how many chunks ahead** should be preloaded before they come into view.

- Value is given in **chunks**.
    
- For example, `lazyPreloadChunks: 2` means two additional chunks will be loaded in advance before scrolling reaches them.
    

> 📌 This makes scrolling smoother — the cards are ready by the time you reach them.  
> 📌 If the value is too small (`0`), you may experience loading delays.  
> 📌 If the value is too large (`5+`), it increases memory and CPU usage.

---

### 🧠 Summary

|Setting|Function|
|---|---|
|`lazyLoading`|Enables/disables gradual card loading|
|`lazyChunkSize`|Number of cards per load chunk|
|`lazyPreloadChunks`|Number of upcoming chunks preloaded|

---

### ✅ Recommended Values

|Condition|Recommended Value|
|---|---|
|Simple cards with lots of text|`lazyChunkSize: 20–30`|
|Cards with images|`lazyChunkSize: 12–18`|
|For smooth scrolling|`lazyPreloadChunks: 2–3`|
|To reduce load on weaker devices|`lazyPreloadChunks: 1`|

---
# 🧭 [[01 Roadmap|Roadmap]] • [[04 🔍 SEARCH|← Back]] • [[06 🧮 SORTING|Next →]] • [[00 HUB|Home Page]] 🏠