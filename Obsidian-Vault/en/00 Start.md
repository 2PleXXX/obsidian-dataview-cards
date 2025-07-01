---
cssclasses:
  - hide-properties
obsidianUIMode: preview
---


# Getting Started with the Script

To get started with the script, please install the following dependencies:

1. Plugin: [Dataview](obsidian://show-plugin?id=dataview)  
2. Plugin: [Style Settings](obsidian://show-plugin?id=obsidian-style-settings)  
3. Theme: [Minimal Theme](https://github.com/kepano/obsidian-minimal) (Optional. See STEP 4 below)

---

## 🧭 **STEP 1: Introduction to the Script**

Want to understand how the script works and what it can do? Start with these materials:

- 📄 [[00 Script Features]] — a detailed description of the features  
- 👁️ [[01 Visual Overview of Features]] — a visual example in action  
- 👁️ [[04 Card Appearance in Different Themes]] — a comparison of how cards look in different themes  

---

## 🧩 **STEP 2: Dataview Settings**

Go to the settings of the **Dataview** plugin and enable the following options:

- Enable JavaScript queries  
- Enable inline JavaScript queries  

---

## 🎨 **STEP 3: Style Settings Configuration**

This step is optional.  
When using the zoom feature built into the script, you might notice the card "jumps" behind the enlarged image.  
If this bothers you, follow the steps described below.

In the **Style Settings** plugin settings, find the **"Images"** section:  
![[assets/Screenshots/Style Settings 1.png]]  
Disable the `"Disable image zoom"` option.

> ⚠️ If you **do not use the Minimal theme**, you can skip this step. See more details in the next step.

---

## 🖌️ **STEP 4: Choosing the Style**

You can:  
- Install the **Minimal** theme and use `[CARDS]universal-dataview-cards.css` **or**  
- Use an alternative CSS file:  
  `[CARDS]universal-dataview-cards(Without Theme).css`

However, with the second option, the appearance of the cards may be distorted, and compatibility with other themes is not guaranteed.  
Feel free to experiment! 🧪

---

## **STEP 5: Required CSS Class**

Before you start creating your config (using a DataviewJS block), you **must use the following class**:

```css
---
cssclasses:
  - cards
---
```

For a more polished look, I recommend adding these classes:

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

You can find more detailed information about classes and cards on the [Minimal Theme Author's Website](https://minimal.guide/features/helper-classes)

---
## 💡 **STEP 6: Use Only the `dataviewjs` Block**

The entire script — from start to finish — **must be written inside a `dataviewjs` block**.

The block starts with three backticks, followed by `dataviewjs`, and ends with three backticks.

Example:

```Dataviewjs
// your script here
```

---
## 🧩 **STEP 7: Why This Block Order?**

When reading and configuring all 11 configuration blocks, you may notice that the order seems odd.  
You might wonder:

> 🧐 "Why do I need to change something in block 8 first, and then suddenly go back to block 4?"

Here's the explanation:

I intentionally arranged the blocks so that **everything that can become large** is placed **at the very end**.  
For example: lists of fields, filters, sorting buttons — all of these can take dozens of lines.  
If such large sections were at the top, you would have to scroll through them each time just to change something simple — like the script language or the path to YAML files.

This approach makes working with the config **much more convenient**:  
You configure the general parameters first, and only after that — the parts that may grow or scale.

---
## 📁 **STEP 8: Where Are the Files Located?**

🔧 All core script files are located **inside your Obsidian vault**. Here's where you can find them:

- 🧠 **Core script**  
    `universal-cards-core.js`  
    👉 Path: `.obsidian/scripts/`  
    _(To access the file, open your vault via File Explorer or Finder)_
    
- 🌐 **Localization file**  
    `universal-cards-lang.js`  
    👉 Located **next to the core**, in the same folder
    
- 🎨 **Main style file**  
    `[CARDS]universal-dataview-cards.css`  
    👉 Path: `.obsidian/snippets/`
    
- 🧾 **Alternative style (without theme binding)**  
    `[CARDS]universal-dataview-cards(Without Theme).css`  
    👉 Also located in `.obsidian/snippets/`
    

---

## 🧩 **STEP 9: Important Information About the Script**

> ⚙️ **The script is reusable.**  
> It is designed to use a single shared core for all configurations.

**Key points:**

- 📁 **Single core** — you use one shared `.js` file for all use cases
    
- 🗂️ **Multiple configuration notes are allowed** — each with its own `DataviewJS` block and individual settings
    
- ⛔ **Only one DataviewJS block per note** should call this script (to avoid conflicts)
    

---

## **STEP 10:**

![[Reading skills.gif]]

> [[00 GIF Author|GIF Author]]

In future guides, I will explain in detail how everything works.  
If you read carefully, you should have no issues. :)

---

_**After completing all the steps, proceed to [[01 Roadmap|Configuration Blocks]] for a detailed exploration of the features.**_