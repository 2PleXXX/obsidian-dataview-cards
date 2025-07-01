---
cssclasses:
  - hide-properties
obsidianUIMode: preview
---
# 🧭 [[01 Roadmap|Roadmap]] • [[00 HUB|Home Page]] 🏠
---
# **04 How to Edit Code for Obsidian More Comfortably**

There are several ways to edit code — from convenient to very basic. Here are the main options:

---

## 🔹 1. Use an IDE (Recommended)

The most convenient and powerful way is to work in a full-featured IDE (Integrated Development Environment), such as [Visual Studio Code](https://code.visualstudio.com/).  
Advantages:

- Syntax highlighting  
- Autocompletion  
- Error checking  
- Easy code navigation  

---

## 🔹 2. Notepad++ — a Backup Option

If, for some reason, you don’t want to use an IDE, [Notepad++](https://notepad-plus-plus.org/) is a decent alternative.  
It’s lightweight but still functional. It lacks some features of an IDE but is far better than editing code directly in Obsidian.

---

## 🔹 3. Obsidian’s Built-in Editor + Code Styler Plugin

You can edit code directly in Obsidian — especially if you install the [Code Styler](obsidian://show-plugin?id=code-styler) plugin.  
It improves the visual appearance of code and makes it a bit easier to work with.

> ⚠️ If you choose this method, I recommend writing code in a `js` block instead of `dataviewjs`, because Code Styler doesn’t recognize the `dataviewjs` language.

Example:

```js
const config = {
  // your code here
};
```

> [!warning] ❗ Important  
> `dataviewjs` blocks in Obsidian can **automatically collapse or reset** when switching tabs or losing focus.
> 
> So it's **strongly recommended to write your code in a `js` block first**, and only change it to `dataviewjs` after you're finished.

---

## 🔹 4. Windows Notepad (Use at Your Own Risk)

The most basic and inconvenient method is the default Windows Notepad.  
Only use it as a last resort.



---
# 🧭 [[01 Roadmap|Roadmap]] • [[00 HUB|Home Page]] 🏠