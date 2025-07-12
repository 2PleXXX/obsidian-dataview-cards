---
cssclasses:
  - hide-properties
obsidianUIMode: preview
---

# 🧭 [[01 Roadmap|Roadmap]] • [[00 HUB|Home Page]] 🏠
---
# 🔧 07 How to Change Card Size

The size of the cards directly depends on the width of the text container on the page. In fact, we are not changing the size of the cards themselves — we are adjusting the **width of the text block**, meaning the **left and right margins**. Since the cards automatically adapt to this width, their appearance changes accordingly.

### 📸 Example

|**100% Width (Default)**|**50% Width (Narrowed)**|
|---|---|
|![[Size_100.png]]|![[Size-50.png]]|

---

## 🛠 What Should You Do?

1. **Open the YAML frontmatter** at the very top of your note.
    
2. Locate or add the `cssclasses` property.
    
3. Add one of the `wide-XX` classes, where `XX` is the desired width between `50` and `100`.
    

### ✅ Example:

```css
cssclasses:
  - wide-75
```

This will set the content width to 75% of the available space.

---

## ℹ️ Additional Information

- These classes can be used **not only for cards**, but also for **any other note** in Obsidian.
    
- **Important:** In the **Minimal** theme, the `wide-XX` classes **may not work properly** due to style conflicts. In other themes like _Default_ or _AnuPpuccin_, these classes work reliably.
    
- This feature is optional. If you decide not to set a custom size, the default width (100%) will be used automatically.

---
# 🧭 [[01 Roadmap|Roadmap]] • [[00 HUB|Home Page]] 🏠