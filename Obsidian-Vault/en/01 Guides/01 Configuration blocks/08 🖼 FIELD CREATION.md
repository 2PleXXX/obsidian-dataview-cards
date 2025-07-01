---
cssclasses:
  - hide-properties
obsidianUIMode: preview
---
# 🧭 [[01 Roadmap|Roadmap]] • [[07 🔐 FILTERING|← Back]] • [[09 📦 CARD SECTIONS|Next →]] • [[00 HUB|Home Page]] 🏠

---
# **BLOCK 08 🖼 FIELD CREATION**

> 💡 In this block, you configure which YAML (metadata) fields will appear in cards — and how exactly.

```js
fields: {    // <- Main container for all fields
  Poster: {    // <- Field from YAML / or a virtual field
    type: "image",     // <- Field type
    label: "Poster",    // <- Label shown in the Filter modal
    cssClass: "",     // <- optional property
    emoji: "",     // <- optional property
    slider: true,    // <- optional property
    maxSliderItems: 3,     // <- optional property
  },    // <- End of field
  Badge: {
    type: "badge",
    label: "Badge",
    emoji: "",
    maxItems: 3,
    suffix: "",
  },
  Rating: {
    type: "rating",
    label: "Rating",
    emoji: "📊",
    config: {
      maxRating: 10,
    },
  },
},    // <- End of field container
```

---

## 🏷️ Field Object Structure

Each visible field is configured as an object where:

- `type` — field type (**==required, see more below==**)
    
- `label` — label shown in the filter modal window
    
- `cssClass` — optional CSS class for styling (see how to use presets or create your own → [[05 Image Presets]])
    
- `emoji` — emoji before the label (optional)
    
- plus other properties depending on the type → [[02 Field Types]]
    

---

## 🖼 Examples & Details

#### 📷 `image`

- Used for displaying images.
    
- `slider: true` enables a slider view.
    
- `maxSliderItems` limits the number of images shown.
    

#### 🏷️ `badge`

- Shows a list of badges/tags.
    
- `maxItems` — the maximum number of items to display.
    

#### 📊 `rating`

- Shows a visual rating as stars.
    
- `maxRating` — sets the maximum score (e.g., 10 or 100).
    
- A value of `50` with `maxRating: 100` renders 2.5 stars.
    

You can rename fields and adjust CSS classes to your preference.

---

## 🧱 Structure

Creating visible fields requires strict object formatting.  
Make sure to place **commas**, **curly braces**, and **indentation** correctly.

```js
fields: {                // 🔹 Container for all fields

  fieldName: {           // 🔸 Field name (must match YAML key / or be a virtual field)
    type: "",            // ✅ Required — the type of field
    label: "",           // 🏷️ Label shown in the filter modal
    cssClass: "",        // 🎨 Optional custom CSS class (depends on field type)
    emoji: "",           // 😀 Emoji before label (optional)
    // ⬇️ Additional parameters depending on field type
  },

  anotherField: {
    type: "",
    label: "",
    // ...
  },

}, // 🔚 End of the `fields` container
```

📌 Each field must have a `type` — all other options depend on it.

### ⚠️ Important Notes

- ✅ All fields are defined inside a single `fields` object.
    
- ✏️ Field names like `Poster`, `Badge`, `Rating` are up to you — they must match the keys in your YAML.
    
- If a YAML field is empty, a dash (—) will be shown instead. When you hover over it, a tooltip will appear:
    
    - If `label` is defined, it’s used in the tooltip;
        
    - Otherwise, the YAML field name is used.
        

---

### 🎨 Example with `cssClass`

You can create multiple fields of the same type with different styling using the `cssClass` property.  
This lets you customize the appearance of each field as needed.

Example with two image fields using different styles:

```js
Poster: {
  type: "image",
  label: "Poster",
  slider: true,
  maxSliderItems: 3,
},
Poster2: {
  type: "image",
  label: "Poster",
  slider: true,
  maxSliderItems: 3,
  cssClass: "custom-image-banner",
},
```

📌 Here’s what it looks like in a card:  
![[Several types.png]]

---

## 📚 Field Types

When creating a field, you **must** specify the `type`.  
Currently, **13 field types** are supported.

🔗 Full description of each type available here → [[02 Field Types|Field Types]]

---
# 🧭 [[01 Roadmap|Roadmap]] • [[07 🔐 FILTERING|← Back]] • [[09 📦 CARD SECTIONS|Next →]] • [[00 HUB|Home Page]] 🏠