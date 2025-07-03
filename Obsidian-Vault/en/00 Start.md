---
cssclasses:
  - hide-properties
obsidianUIMode: preview
---
# Getting Started with the Script

To get started, make sure the following dependencies are installed:

1. Plugin: [Dataview](obsidian://show-plugin?id=dataview)
2. Plugin: [Style Settings](obsidian://show-plugin?id=obsidian-style-settings)
3. Theme: [Minimal Theme](https://github.com/kepano/obsidian-minimal) (Optional. See STEP 4 below)

---

## 🧭 **STEP 1: Explore the Script**

Want to understand how the script works and what it can do? Start with these materials:

- 📄 [[00 Script Capabilities]] — detailed description of the capabilities.
- 👁️ [[01 Visual Feature Overview]] — a clear example in action.
- 👁️ [[04 Card Appearance Across Themes]] — a comparison of how cards look across themes.

---

## 🧩 **STEP 2: Dataview Settings**

Go to the **Dataview** plugin settings and enable the following options:

- Enable JavaScript queries
- Enable inline JavaScript queries

---

## 🎨 **STEP 3: Style Settings (OPTIONAL)**

This step is optional.  
When using the zoom feature built into the script, you may notice that the card behind the zoomed image "jumps." If this bothers you, follow the steps below.

In the **Style Settings** plugin settings, locate the **"Images"** section:  
![[assets/Screenshots/Style Settings 1.png]]  
Disable the `"Disable image zoom"` option.

> ⚠️ If you’re **not using the Minimal theme**, you can skip this step. More details in the next step.

---

## 🖌️ **STEP 4: Choose a Theme**

You can either:

- Use the **Minimal** theme, and get full visual support, **or**
- Use another theme of your choice.

However, with other themes, the cards may not appear exactly as shown in the screenshots, and some features might not be fully compatible.  
Feel free to experiment! 🧪

---

## **STEP 5: Source Mode**

Many examples are shown in **Source mode**.  
You can quickly access it via the three-dot menu in the top right corner (see screenshot).

![[Source mode.png]]

---

## **STEP 6: Required Class**

Before creating your own config (using a dataviewjs block), you **must** include the following class:

```css
---
cssclasses:
  - cards
---
```

For improved visuals, you can also add these additional classes:

```css
---
cssclasses:
  - cards
  - cards-cols-6
  - table-max
  - cards-align-bottom
  - cards-2-3
  - hide-properties
---
```

More information about classes and cards can be found on the [Minimal theme author’s site](https://minimal.guide/features/helper-classes).

### 🛠 How to Add `cssclasses` to a Note

To add custom CSS classes to a note, follow these steps:

1. At the very top of the note, type three dashes:
```markdown
---
```

2. In the YAML block that opens, add the `cssclasses` property and the values listed above.

📽️ See demo:  
![[CreateProperties.mp4]]

---

## 💡 **STEP 7: Use Only the `dataviewjs` Block**

The entire script — from start to finish — **must be placed inside a `dataviewjs` block**.

A block starts with three backticks and the word `dataviewjs`, and ends with three backticks.

Example:

```Dataviewjs
// your script here
```

---

## 🧩 **STEP 8: Why This Block Order?**

When reviewing and setting up all 11 configuration blocks, you might wonder:

> 🧐 “Why do I need to configure something in block 8, and then suddenly jump back to block 4?”

Here’s why:

The blocks are intentionally ordered so that **everything that can grow large** is placed **at the very end**.  
For example: lists of fields, filters, sort buttons — these can take up dozens of lines.  
If such bulky sections were at the top, you’d have to scroll past them every time just to change a simple setting like the script’s language or folder path.

This structure makes working with the config **much more convenient**: start with general settings, then handle the complex, scalable parts later.

---

## 📁 **STEP 9: Where Are the Files?**

🔧 All main files of the script are located **inside your Obsidian vault**. Here’s where to find them:

- 🧠 **Core Script File**  
    `universal-cards-core.js`  
    👉 Path: `.obsidian/scripts/`  
    _(To locate the file, open your vault folder using Explorer or Finder)_
    
- 🌐 **Language File**  
    `universal-cards-lang.js`  
    👉 Located **next to the core**, in the same folder
    
- 🎨 **Main Style File**  
    `[CARDS]universal-dataview-cards.css`  
    👉 Path: `.obsidian/snippets/`
    

---

## 🧩 **STEP 10: Important Notes About the Script**

> ⚙️ **The script is reusable.**  
> It’s designed to use a single shared core for all configurations.

**Key points:**

- 📁 **The core file is universal** — you use one `.js` file for all configurations.
    
- 🗂️ **You can have multiple config notes** — each with its own `dataviewjs` block and unique settings.
    
- ⛔ **Only one DataviewJS block per note** — to avoid conflicts, don’t use multiple calls in the same file.
    

---

## **STEP 11:**

![[Reading skills.gif]]

> [[00 GIF Author|GIF author]]

Future guides will walk you through everything in great detail.  
As long as you read carefully, you shouldn’t run into any issues. 🙂

---

_**Once you’ve completed all the steps, proceed to [[01 Roadmap|Configuration Blocks]] to explore all the features in depth.**_