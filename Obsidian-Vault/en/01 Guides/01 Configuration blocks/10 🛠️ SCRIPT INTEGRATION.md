---
cssclasses:
  - hide-properties
obsidianUIMode: preview
---
# 🧭 [[01 Roadmap|Roadmap]] • [[09 📦 CARD SECTIONS|← Back]] • [[00 HUB|Home Page]] 🏠

---

# BLOCK 10 🛠️ SCRIPT INTEGRATION

> 💡 This step is **required** to launch the cards. Here, you connect the core script and the localization file.

---

## 🔹 Connecting the Core Script

This line is responsible for connecting the script core:

```js
const scriptPath = "scripts/universal-cards-core.js";
```

### 📌 Rules:

- `scriptPath` is a **relative path** to the script from the root of your Obsidian vault.
    
- Make sure the path points to the **latest version** of `universal-cards-core.js`.
    
- **Case sensitivity matters**: `"Script/"`, `"script/"`, and `"SCRIPT/"` are treated as different folders.
    

---

## 🔹 Connecting the Localization File

This is done **almost the same way** as with the core script.  
Specify the path to the file:

```js
const langPath = "scripts/universal-cards-lang.js";
```

---

## 🔧 Initialization Block

After setting both paths, **you must add the following block** (do not edit it — it should remain exactly as shown):

```js
const langFile = app.vault.getAbstractFileByPath(langPath);
if (!langFile || typeof langFile.path !== "string") {
  dv.paragraph(`❌ Localization file not found or the path is incorrect. Your path: ${langPath}`);
  return;
}
const langContent = await app.vault.read(langFile);
eval(langContent);

const scriptFile = app.vault.getAbstractFileByPath(scriptPath);
if (!scriptFile || typeof scriptFile.path !== "string") {
  dv.paragraph(`❌ Script not found or the path is incorrect. Your path: ${scriptPath}`);
  return;
}
const scriptContent = await app.vault.read(scriptFile);
eval(scriptContent);

if (typeof initializeSectionMatches === "function") {
  initializeSectionMatches(config);
}
if (typeof runUniversalCards === "function") {
  runUniversalCards(dv, config);
}
```

### 🔚 Where Should This Be Placed?

Immediately **after the configuration block**:

```js
const config = {
  // configuration parameters
};

// Script and localization loading goes here
```

---
🧪 Example Structure:

```css
📁 My_Movies/
├── 📁 scripts/
│   └── 📄 universal-cards-core.js
│   └── 📄 universal-cards-lang.js
├── 📁 YAML folder/
│   └── 📄 Demo 1.md
└── 📄 demo-config.md ← config goes here
```

In this case, the paths would be:
```js
const scriptPath = "My_Movies/scripts/universal-cards-core.js";
const langPath = "My_Movies/scripts/universal-cards-lang.js";
```

---
# 🧭 [[01 Roadmap|Roadmap]] • [[09 📦 CARD SECTIONS|← Back]] • [[00 HUB|Home Page]] 🏠