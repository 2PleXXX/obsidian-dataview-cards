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

## 🗂 Step 1. Find the Localization File

Find the file `universal-cards-lang-core.js` (you most likely placed it next to the script core). This is where all the translations are stored.

Open it, and you’ll see a ready-made English translation — it’s inside this block:

```js
window.UNIVERSAL_CARDS_LANG_CORE = {
  en: {
    ...
  }
};
```
This file is meant **only for reference** and **is not overwritten during updates**.  
You can use it to override any strings or to add a new language.

## 🌍 Step 2. Copy the English Block from the Core File

Open the file `universal-cards-lang-core.js`. Inside, you’ll find a full English translation block:

```js
window.UNIVERSAL_CARDS_LANG_CORE = {
  en: {
    ...
  }
};
```

Copy the entire block:

```js
en: {
  ...
}
```
and paste it into `universal-cards-lang-user.js` under a new language code.  
For example, if you’re creating a German translation:

```js
window.UNIVERSAL_CARDS_LANG_USER = {
  de: {
    // your translation goes here
  }
};
```
If your `user` file already contains the structure `window.UNIVERSAL_CARDS_LANG_USER = { ... }`, just add the new language inside it.

## 📝 Step 3. Translate the Text Inside

Now for the fun part — replace the English text with your translation.

Inside the block, you’ll see a lot of phrases. These aren’t technical commands — they’re the labels, notifications, errors, and tooltips users see in the interface.

Examples:

```sql
"Filter Settings" → “Filtereinstellungen”
"Reset filters" → “Filter zurücksetzen”
"Nothing here yet." → “Noch nichts hier.”
```

⚠️ Do **not** change key names like `FILTER`, `TITLE`, `BUTTON_LABEL`, etc. — these are internal identifiers.  
Only translate the text inside the quotation marks.

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

Once your translation is complete, go back to your config note and add this parameter:

```js
language: "de"
```
(or whatever language code you used)

The script will now use your translation!

## 🧪 Step 6: Test the Translation

Open a note with cards and check if the interface is showing in your language.

If you still see English:

- Make sure the language code in the config is correct;
    
- Ensure the structure of `UNIVERSAL_CARDS_LANG_USER` is valid;
    
- And check that the necessary strings are actually translated.

---
# 🧭 [[01 Roadmap|Roadmap]] • [[00 HUB|Home Page]] 🏠