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

Open the style file `[CARDS]Z_universal-dataview-cards-user.css`.

---

### 🔍 Step 3: Find the section block

Look for this header inside the file:

```css
/* ================================================= */
/* Sections                                          */
/* ================================================= */
```

---
### 🎨 Step 4: Add Your Style

Create your own style block below the default ones. Example:

```css
.my-style-favourite summary h3 {
  color: var(--text-accent);
  font-weight: 700;
  letter-spacing: 0.2px;
  text-shadow: 0 0 4px var(--color-accent);
}
```

✅ Important:

- Make sure to use the format `.class-name summary h3` — otherwise the style won’t apply.
    
- Since there are two CSS files — `[CARDS]Z_universal-dataview-cards-user.css` and `[CARDS]A_universal-dataview-cards-core.css` — it’s essential that the user styles file is loaded **after** the core file.  
    In other words, the correct load order should be:
```text
First load [CARDS]A_universal-dataview-cards-core.css  
Then load [CARDS]Z_universal-dataview-cards-user.css
```
This is especially important if you decide to rename the files.

---

#### ✏️ Can I modify the default style?

Yes. You can change any existing styles — for example, all sections at once. But it’s better to use `styleClass` to avoid accidentally affecting other sections.

#### ❓ Don’t know how to write the style?

Ask any AI (like ChatGPT). Just describe the effect you want:

```text
Make the section header red and bold, with a soft glow.

Make sure to use the format `.class-name summary h3`, like this:
.my-style-favourite summary h3 {
}
```

---
# 🧭 [[01 Roadmap|Roadmap]] • [[00 HUB|Home Page]] 🏠