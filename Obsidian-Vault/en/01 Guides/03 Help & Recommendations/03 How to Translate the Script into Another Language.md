---
cssclasses:
  - hide-properties
obsidianUIMode: preview
---
# 🧭 [[01 Roadmap|Roadmap]] • [[00 HUB|Home Page]] 🏠
---
# **03 🈳 How to Translate the Script into Another Language**

If you want to use the script in your native language — that’s totally possible!  
You don’t need any programming knowledge for this. Just a bit of attention and care.

## 🗂 Step 1: Find the Localization File

Look for the file named `universal-cards-lang.js` (you probably placed it near the main script).  
This file contains all the translations.

Open it, and you'll see a ready-made English translation inside this block:

```js
window.UNIVERSAL_CARDS_LANG = {
  en: {
    ...
  }
};
```

## 🌍 Step 2: Copy the English Block

Copy the entire block starting from:

```js
en: {
```
and ending with its closing curly brace `},`, then paste it right below.  
Replace `en:` with the code of your language.  
For example, for a German translation, use `de:`:

```js
de: {
  // your translation goes here
},
```

## 📝 Step 3: Translate Everything Inside

Now the fun part — replace the English text with your translation.

Inside the block, you'll see many labels.  
These are not technical commands — they’re the interface texts users will see: button labels, alerts, errors, tips.

Examples:

"Filter Settings" → “Filtereinstellungen”  
"Reset filters" → “Filter zurücksetzen”  
"Nothing here yet." → “Noch nichts hier.”

⚠️ Do **not** change the key names like `FILTER`, `TITLE`, `BUTTON_LABEL`, etc. —  
those are internal identifiers. Only change the text inside the quotes.

## 🔁 Step 4: What About Strings with (key), (index), (n)?

You may see strings where the text is dynamically generated from variables. For example:

```js
MORE_ITEMS: (n) => `+ ${n} more…`,
```

This means the script will insert a number into `${n}` when it runs, e.g. `+ 3 more…`.

Translation example:

```js
MORE_ITEMS: (n) => `+ ${n} weitere`,
```

Similarly:

```js
FIELD_MISSING_TYPE: (key) =>
  `Field ${key} is missing a type.`,
```

Translation:

```js
FIELD_MISSING_TYPE: (key) =>
  `Dem Feld ${key} fehlt der Typ.`,
```

Don’t be afraid of these strings — just keep the structure and insert your translation in the right place.

## 💾 Step 5: Done? Set the Language in the Config

Once your translation is complete, go back to your configuration note and add the parameter:

```js
language: "de"
```
(or whatever language code you used).

Now the script will use your translation!

## 🧪 Step 6: Test the Translation

Open a note where the script is used and check that all interface texts have switched to your language.  
If you still see English text — there may be an error in the translation, or the language code doesn't match.

---
# 🧭 [[01 Roadmap|Roadmap]] • [[00 HUB|Home Page]] 🏠