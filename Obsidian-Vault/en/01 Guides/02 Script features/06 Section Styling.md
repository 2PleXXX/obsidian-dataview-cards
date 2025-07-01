---
cssclasses:
  - hide-properties
obsidianUIMode: preview
---

# 🧭 [[01 Roadmap|Roadmap]] • [[00 HUB|Home Page]] 🏠
---
# **06 Section Style**

## 🧩 **Creating your own style for sections**

You can set a custom display style for section headers. This allows you to visually highlight certain blocks, for example, "Favorites" or "Important".

---

### 🔧 Step 1: Specify the class in the config

Add the parameter `styleClass` to the section object — this will be your custom CSS class name.

Example:

```js
{
  id: "favourite",
  title: "⭐ Favorite",
  styleClass: "my-style-favourite", // 👈 your class here
  allowDuplicates: true,
  matchFactory: "matchBySectionValue",
  matchArgs: { field: "Favourite", values: ["Yes"] },
  fields: [
    "Poster",
    "Title",
  ],
},
```

---
### 📁 Step 2: Open the CSS file

Open the styles file `[CARDS]universal-dataview-cards.css`

---

### 🔍 Step 3: Find the section block

Look for this header inside the file:

```css
/* ================================================= */
/* Sections                                          */
/* ================================================= */
```

---
### 📌 Step 4: See example of default and custom style

Default section header style example:

```css
/* Default section header style */
.universal-section summary h3 {
  margin: 0;
  font-size: 1.1em;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5em;
  color: var(--text-normal);
  text-shadow: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.4;
}
```

---
### 🎨 Step 5: Add your own style

Create your custom style block below the default styles. Example:

```css
.my-style-favourite summary h3 {
  color: var(--text-accent);
  font-weight: 700;
  letter-spacing: 0.2px;
  text-shadow: 0 0 4px var(--color-accent);
}
```

✅ Important:  
– Always use the format `.your-class summary h3` — otherwise the style won't apply.  
– Place your style **after** the default style block, or it may be overridden.

---

#### ✏️ Can I modify the default style?

Yes. You can change any existing styles — for example, all sections at once. But it’s better to use `styleClass` to avoid accidentally affecting other sections.

#### ❓ Don’t know how to write the style?

Ask any AI (like ChatGPT). Just describe the effect you want:

```text
“Make the section header red and bold with a slight glow.”
```

---
# 🧭 [[01 Roadmap|Roadmap]] • [[00 HUB|Home Page]] 🏠