---
cssclasses:
  - hide-properties
obsidianUIMode: preview
---
# 🧭 [[01 Roadmap|Roadmap]] • [[00 HUB|Home Page]] 🏠
---
# 🖼️ **05 Image Presets**

This section lists ready-made **CSS presets** for styling images in your cards.

> ⚠️ **Note:** The final look may vary depending on:
> 
> - your screen or Obsidian window size,
> - the theme you use,
> - font and padding settings.

---

## 📋 All available presets

| Purpose                                | CSS class                     |
|----------------------------------------|-------------------------------|
| 📢 Banner (horizontal, responsive)     | `custom-image-banner`         |
| 👤 Avatar (round, compact)             | `custom-image-avatar-small`   |
| 🟪 Square image (cover/tile style)     | `custom-image-square-large`   |
| 🖼️ Thumbnail (for galleries/cards)     | `custom-image-thumbnail`      |
| ↔️ Flexible image (with constraints)   | `custom-image-flexible`       |

---

## 📢 Banner (horizontal, responsive)

![[custom-image-banner.png]]

---

## 👤 Avatar (round, compact)

![[custom-image-avatar-small.png]]

---

## 🟪 Square image (cover/tile style)

![[custom-image-square-large.png]]

---

## 🖼️ Thumbnail (for galleries/cards)

![[custom-image-thumbnail.png]]

---

## ↔️ Flexible image with constraints

![[custom-image-flexible.png]]

---

# **How to create your own preset**

## 🔧 Usage Example

```js
Poster: {
  type: "image",
  label: "Poster",
  cssClass: "custom-image-banner", // <- using the "banner" preset
},
```

## 🎨 Creating your own style

If you want to create a **custom image style preset**, follow these simple steps:

### 🧱 For **Minimal** theme users

1. **Open the CSS file:**
```text
[CARDS]Z_universal-dataview-cards-user.css
```

2. Find the following section (it's near the beginning):

```css
/* ================================================= */
/* 🖼️ IMAGE PRESETS FOR CARDS                        */
/* ================================================= */
```

3. Add your custom style **at the beginning or end** of this block. Follow the existing format:
```css
/* Banner (horizontal, responsive) */
.custom-image-banner {
  width: 100% !important;
  height: auto !important;
  max-height: 220px !important;
  object-fit: cover !important;
  border-radius: 12px !important;
  aspect-ratio: 3 / 1 !important;
}
```

### 🤖 Don’t know how to write CSS?

Just ask any AI — like ChatGPT.

Here’s a ready-to-use prompt:

#### 🧠 **Prompt to generate an Obsidian image style:**

> You are a helper that creates CSS for images used in **Obsidian**.
> 
> You’ll receive a description of how the image should look (e.g. banner, square, avatar).
> 
> Generate a CSS class with appropriate styles.  
> Make sure to add `!important` to key properties that can be overridden by Obsidian themes or plugins — especially `width`, `height`, `max-height`, `object-fit`, `aspect-ratio`.
> 
> Don’t use `!important` for things that rarely conflict (like `border-radius` or `box-shadow`).
> 
> Output a complete `.custom-image-[name]` class and describe what it does.
> 
> ⚠️ Your CSS should work reliably in **any Obsidian theme**.
> 
> ---
> 
> **Example user request:**
> 
> > Make a banner-style image: wide, with limited height, cropped edges, and rounded corners. Used for movie cards.

---

#### 🟢 Example result from the AI:

```css
/* Banner-style image with cropped edges */
.custom-image-banner {
  width: 100% !important;
  height: auto !important;
  max-height: 220px !important;
  object-fit: cover !important;
  aspect-ratio: 3 / 1 !important;
  border-radius: 12px;
}
```

You can copy this prompt and change the **example request** to fit your idea.

---
# 🧭 [[01 Roadmap|Roadmap]] • [[00 HUB|Home Page]] 🏠