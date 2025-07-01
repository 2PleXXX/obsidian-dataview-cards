---
cssclasses:
  - hide-properties
obsidianUIMode: preview
---

# 🧭 [[01 Roadmap|Roadmap]] • [[00 HUB|Home Page]] 🏠
---
# **01 How to Understand the "Evaluation Error" in Obsidian**

If you open a note with a `dataviewjs` block and see a message like:

> [!failure]
> Evaluation Error: SyntaxError: Unexpected identifier 'typeField'

...it means the script couldn't run due to a configuration error.

This error appears as regular gray/black text directly in the note, in the place where the script's result should have been.

---
## 🔍 ==**What is an "Evaluation Error"?**==

"Evaluation Error" means that Dataview tried to run the JavaScript code,
but the code contains a syntax error (a structural mistake).

**_Most common causes_**:
- a comma is missing between lines in the configuration;
- an extra or missing bracket: `{`, `}`, `[`, `]`;
- unclosed quotes: `"`, `'`;
- the line doesn’t follow JavaScript syntax rules.

Example error:
  SyntaxError: Unexpected identifier 'typeField'

What it means:
  ➤ The key `typeField` was encountered, but a comma was missing before it.

Most likely, a line above looks like this:
  folderKeyword: "Demo cards/YAML folder/"   ← and there’s NO comma here

Fix:
  folderKeyword: "Demo cards/YAML folder/",  ← comma added

---
## 🔎 **==Examples of Errors and Their Causes==**

1. ❌ Unexpected identifier 'typeField'  
   📌 Issue: forgot a comma before the `typeField: "..."` line.  
   ✔️ Fix: check the line above — it should end with `...,`.

2. ❌ Unexpected token ':'  
   📌 Issue: the colon `:` is in the wrong place.  
   ✔️ Fix: make sure the line starts with a key, and that there's a comma before it.

3. ❌ Unexpected end of input  
   📌 Issue: a closing bracket `}`, `]` or quote is missing.  
   ✔️ Fix: ensure all opened brackets/quotes are properly closed.

4. ❌ Unexpected token '}'  
   📌 Issue: an extra closing bracket or missing comma before it.  
   ✔️ Fix: check the line above for a missing comma.

---
## 🛠️ **==How to Find and Fix the Error==**

1. Look for the word in quotes in the error message — e.g., `'typeField'`.
2. Open your configuration and locate this line.
3. Be sure to check the **line before it** — that's where the error usually is.
4. Compare it to other lines — do they end with a comma? Then this one should too.
5. Make sure that:
   - lines are separated by commas `,`;
   - all `{}`, `[]`, `"..."` are properly opened and closed.

✅ After fixing — simply refresh the Obsidian note.

---
### 🧪 Things You Can Try

✔️ Delete or comment out parts of the config to isolate the problematic line.

✔️ Temporarily insert a working config example — if it works,
then the issue is definitely in the syntax.

✔️ Compare your config with a sample — look at the structure, indentation, commas.

---
### 📌 If Nothing Helps

- I recommend using a neural network like ChatGPT — show your configuration block and the error message.

---
### 💡 SCRIPT TIP

Some problems may be caught by the script itself and shown as custom messages, such as:  
  ❌ Folder path not specified: `folderKeyword`

In this case, just follow the instruction provided.

---
# 🧭 [[01 Roadmap|Roadmap]] • [[00 HUB|Home Page]] 🏠