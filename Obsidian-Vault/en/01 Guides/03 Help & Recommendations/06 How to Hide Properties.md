---
cssclasses:
  - hide-properties
obsidianUIMode: preview
---
# 🧭 [[01 Roadmap|Roadmap]] • [[00 HUB|Home Page]] 🏠
---
# 🕵️‍♂️ **06 How to Hide Properties in a Note**

If you noticed, the properties are **not visible** in the example note.  
This is achieved using a **custom CSS snippet**.

![[View mode.png]]

---

## 🔧 What Do You Need to Do?

1. **Copy the file** `hide-properties.css` from the `snippets` folder into your Obsidian theme folder:

```text
.obsidian/snippets/hide-properties.css
```

2.  **Activate the snippet**:
    
    - Go to `Settings → Appearance → CSS Snippets`
        
    - Find `hide-properties` and enable it
        
3. **Add a CSS class to your note**:  
    At the beginning of your note, add a YAML block with the class:

```css
---
cssclasses: hide-properties
---
```

Now the **Properties** section will be **completely hidden in preview mode**, so nothing distracts you from the content.

---

> 💡 _If you don’t want to hide properties in every note, simply don’t add the `hide-properties` class to those notes._

---
# 🧭 [[01 Roadmap|Roadmap]] • [[00 HUB|Home Page]] 🏠