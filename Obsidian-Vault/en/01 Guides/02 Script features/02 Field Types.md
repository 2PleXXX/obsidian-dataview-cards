---
cssclasses:
  - hide-properties
obsidianUIMode: preview
---
# 🧭 [[01 Roadmap|Roadmap]] • [[00 HUB|Home Page]] 🏠
---
# **02 Field Types**

Note: the `type` for config is shown next to each section heading. For example:

```markdown
### 🖼️ **Image** (`image`) <--- this value in parentheses is the type to use in the config
```

So what you do in the config is like this:

```js
Poster: {
  type: "image", // <--- specify the type as a string
  label: "Image",
},
```

---
## 🖼 Supported link formats for images, audio, and video

In fields of type `image`, `audio`, or `video`, you can use **two main types of links**: **Obsidian wiki-links** and **Markdown links**. Both are supported.

### 🧱 Wiki-links (Obsidian)

Use the format `![[filename]]` or `![[path/to/file]]`.

✅ Examples:

```yaml
![[Pasted image 20250609153421.jpg]]
![[assets/General attachments/01 Posters for films/Pasted image 20250609153421.jpg]]
```

🔹 Advantages:

- They still work even if files are renamed.
- Natively handled inside Obsidian.

### 🌐 Markdown links

Use the format `![](path_to_file)`, just like in regular Markdown.

✅ Examples:

```yaml
![](Pasted%20image%2020250609153421.jpg)
![](assets/General%20attachments/01%20Posters%20for%20films/Pasted%20image%2020250609153421.jpg)
```

📌 Note:

- Spaces in paths **must be URL-encoded** as `%20`.
- Supports both relative and nested paths.

### ⚠️ Important notes

- 🧩 **One link — one field**  
  When referencing a file (image, audio, video), you must use one link per line:

```yaml
image: "![](file.jpg)"        # ✅ correct
```

- 🖼 **Multiple files — use a list**  
  If you want to show several files (e.g. in a slider):

```yaml
image:
  - "![](file1.jpg)"
  - "![[file2.jpg]]"
```

- 🧠 **Wiki-links are preferred**  
  They automatically track file moves and renames.

- 🌐 **Markdown links require exact paths**  
  If the path contains spaces, use `%20`:

```yaml
audio: "![](Music/My%20Song.mp3)"
```

## ──────────────────────────────────────────────────────────────────────

## 🖼️ **Image** (`image`)

**What it does:**  
Displays one or more images directly in the card.  
If there are multiple images, a slider with navigation buttons can be enabled.

### ✅ How to use

In YAML, you can specify:

- **A single image:**
```yaml
image: ![[cover.jpg]]
```

- A list of images:
```yaml
image:
  - ![[cover.jpg]]
  - https://example.com/image.jpg
  - other_image.png
```

### ✅ Supported image formats

| Format           | Supported     | Notes                                 |
| ---------------- | ------------- | ------------------------------------- |
| `.png`           | ✅ Yes         | Recommended                           |
| `.jpg`, `.jpeg`  | ✅ Yes         | Standard                              |
| `.webp`          | ✅ Yes         | Modern format with good compression   |
| `.gif`           | ✅ Yes         | Animations work                       |
| `.svg`           | ⚠️ Partial     | Might not display properly            |

### 📂 Supported sources

| Source                    | Supported     | Example                                 |
| ------------------------- | ------------- | --------------------------------------- |
| Obsidian embedded file    | ✅ Yes         | `Image: image.png` or `![[image.png]]`  |
| External link (`http(s)`) | ✅ Yes         | `Image: https://example.com/image.jpg`  |
| Nonexistent file          | ⚠️ No          | Will display as an empty field          |

### ⚙️ Additional settings

These parameters are configured in the script config under [[08 🖼 FIELD CREATION]]:

| Setting             | What it does                                               |
| ------------------- | ---------------------------------------------------------- |
| `slider: true`      | Enables a slider if there is more than one image          |
| `maxSliderItems: 3` | Shows no more than N images                                |
| `cssClass`          | Adds a custom CSS class for styling images                |
| `emoji`             | Adds an emoji to the field (might not work well for images) |

### 🧠 Smart behavior

- The slider remembers which image you viewed last and reopens the card at that image even after reload.
- If only one image is specified — the slider won’t appear.

### Image presets

I’ve prepared several display presets for images. Learn more here ---> [[05 Image Presets]]

---
## ✍️ **Text** (`text`)

**What it does:**  
Displays a text value — either a single one or multiple. If there are multiple values, they will be joined with a comma.

### ✅ How to use

You can specify:

- **A single value:**
```yaml
author: Umberto Eco
```

- A list of values:
```yaml
genres:
  - Detective
  - History
  - Philosophy
```

📌 Regardless of whether the field is configured as a list, string, or number — it will automatically be processed as text.

### 🔧 Additional settings

These parameters are specified in the script config [[08 🖼 FIELD CREATION]]:

| Setting   | What it does                          |
| --------- | ------------------------------------- |
| `prefix`  | Adds text **before** the value        |
| `suffix`  | Adds text **after** the value         |
| `emoji`   | Adds an emoji to the field            |

### 🧠 Smart behavior

- No matter if the value is written as a string, list, number, or something else — the script will convert it to a text string.
---
## 🔗 Page link (`pageLink`)

**What it does:** Displays a link to the current note. You can optionally define custom link text.

### ✅ How to use

You can:

- **Leave it empty** → will link to the **current note**, using its title:
```yaml
Title:
```

- Provide a custom string with another note’s name:
```yaml
Title: Note about ideas
```

- Or provide a list — the first value will be used:
```yaml
Title:
  - Note 1
  - Note 2
```

- You can skip creating this field in YAML entirely and define it as a virtual field — and it will behave the same way: it will still support filtering, sorting, searching, etc. (see example below).

🧠 **Important:** even if the value is a list, number, or YAML string — the script will process it correctly.

### 🔧 Additional settings

These parameters are specified in the script config:

| Setting    | What it does                            |
| ---------- | --------------------------------------- |
| `prefix`   | Adds text **before** the link           |
| `suffix`   | Adds text **after** the link            |
| `emoji`    | Adds an emoji to the field              |

Virtual field example:
```js
FileName: { // <- this field does not exist in YAML
  type: "pageLink",
  label: "Title",
},
```

This works exactly the same way as if the field were present in YAML.

### 🧠 Default behavior

- If the field is empty or contains only spaces → the **current note title** is used.
- If a number or any other type is provided in YAML, it will be converted to a string.

---
## 🔗 **Link** (`link`)

**What it does:**  
Displays one or more web links from YAML. Allows setting a custom name for each link, shortening displayed text, and limiting the number of visible links.

### ✅ How to use

You can specify:

- **A single link:**
```yaml
Website: https://example.com
```

- A list of links:
```yaml
Links:
  - https://store.steampowered.com/
  - https://youtube.com/
```

📌 All values will be automatically processed and turned into clickable links. Only **standard HTTP(S) links** are supported.  
Wiki-links (`[[Note]]`) and markdown links (`[text](url)`) are **not** supported.

### 🔧 Additional settings

These parameters are specified in the script config under [[08 🖼 FIELD CREATION]]:

| Setting           | What it does                                                            |
| ----------------- | ----------------------------------------------------------------------- |
| `prefix`          | Adds text **before** all links                                          |
| `suffix`          | Adds text **after** all links                                           |
| `emoji`           | Adds an emoji before the value                                          |
| `shortenDisplay`  | Shows only the domain instead of the full link (e.g., `youtube.com`)    |
| `maxItems`        | Limits the number of visible links                                      |
| `linksName`       | Allows assigning custom names for specific links based on content       |

### 📘 Example YAML

```yaml
Sources:
  - "https://store.steampowered.com/"
  - "https://youtube.com/"
```

### ⚙️ Example config setup

```js
Links: {
  type: "link",
  label: "Links",
  prefix: "🌐 ",
  linksName: [
    { match: "store.steampowered.com", label: "Steam" },
    { match: "youtube.com", label: "YouTube" },
  ],
},
```

If there are more links than `maxItems`, it will display `and N more`.

#### 🔗 More about `linksName`

If you want to show more user-friendly names instead of long URLs, use `linksName` with the following fields:

- `match`: a part of the URL to match  
- `label`: the name to display instead

Example:

```js
linksName: [
  { match: "store.steampowered.com", label: "Steam" },
  { match: "youtube.com", label: "YouTube" },
]
```

📌 **Matching works by substring containment.**  
It doesn’t matter where in the URL the match appears — if it's present, the corresponding `label` will be used.

#### ✂️ More about `shortenDisplay`

If you don’t want to use `linksName` but still prefer cleaner-looking links — use `shortenDisplay`.

```js
shortenDisplay: true
```

Then instead of:
```text
https://www.youtube.com/
```

It will display:
```text
youtube.com
```

### ⚠️ Important

You can use both `shortenDisplay` and `linksName` at the same time.  
If a link doesn't match any rule in `linksName`, `shortenDisplay` (if enabled) will be used as a fallback. It’s safe.

### 🧠 Default behavior

- YAML values are automatically converted into links.
- Values not starting with `http://` or `https://` are shown as plain text.
- When `maxItems` is exceeded, extra links are hidden behind `and N more`.
- If `linksName` is not specified or no match is found — the link is shown as-is (or shortened if `shortenDisplay` is enabled).

---
## 📋 **List** (`list`)

**What it does:**  
Displays a list of values — either as bullet points or in a single comma-separated line.

### ✅ How to use

You can specify a list of values in YAML:

```yaml
ToDoList:
  - important
  - idea
  - 🔥
```

Or a single string with multiple values:

```yaml
ToDoList: important, idea, 🔥
```

Any value types are supported — they will be converted to strings. For example:

```yaml
ToDoList: [123, true, "yes"]
```

💡 Everything is processed the same — as an array of strings.

### 🔧 Additional settings

These parameters are specified in the script config under [[08 🖼 FIELD CREATION]]:

| Setting     | What it does                                                        |
| ----------- | ------------------------------------------------------------------- |
| `display`   | `"bullets"` — vertical list with markers, default is inline string |
| `maxItems`  | Limits the number of visible values (extra ones are hidden)         |
| `prefix`    | Adds text before the value/string                                   |
| `suffix`    | Adds text after the value/string                                    |
| `emoji`     | Adds an emoji to the field                                          |
### 🧠 Default behavior

- If there are more values than `maxItems`, extras are hidden:
    - A note like `+ N more` is displayed  
    - The entire line has a **tooltip** with all values — hover to see the full list.
- `display: "bullets"` makes the list vertical:

![[List Bullets.png]]

Without `"bullets"`:

![[List without bullets.png]]

Configuration example:

```js
ToDoList: {
  display: "bullets",
  maxItems: 3,
  cssClass: "tag-list"
}
```

---
## 🏷️ **Badge** (`badge`)

**What it does:**  
Displays a list of values as colorful tags (badges), similar to labels or chips.  
Each badge can have its own style depending on the value.

### ✅ How to use

In YAML, you can provide:

- **A single value:**
```yaml
DemoBadge: important
```

- A list of values:

```yaml
DemoBadge:
  - important
  - urgent
  - "needs attention"
```

- Comma-separated string:

```yaml
DemoBadge: important, urgent, "needs attention"
```

### ⚙️ Additional settings

These parameters are defined in the script config under [[08 🖼 FIELD CREATION]]:

| Setting            | What it does                                                              |
| ------------------ | -------------------------------------------------------------------------- |
| `maxItems`         | Shows no more than N badges. Extra badges are collapsed into `+N` counter |
| `prefix` / `suffix`| Adds text before/after each badge                                          |
| `emoji`            | Adds an emoji before the field                                             |
| `styleMap`         | Allows defining custom styles for specific badge values                   |

🗺️ Example config

```js
Type: {
  type: "badge",
  label: "Type",
  maxItems: 4,
  styleMap: [
    { match: "Film", class: "badge-red" },
    { match: "Series", class: "badge-green" },
  ]
}
```

### 🎨 How `styleMap` works

- Each value from YAML is compared to `match`.
- If a match is found, the specified CSS class is applied.
- If not matched — default styling is used.
- `match` is case-insensitive (e.g. `Film` = `film`).

#### 🧩 What to do next?

To style your badges, follow these steps:

1. **Open the stylesheet file**  
   Locate `universal-dataview-cards.css` in your vault. Find the section:
```css
/* ================================================= */
/* 🏷️ Badges                                         */
/* ================================================= */
```

2. **Add styles for your custom class**  
   For example, if your config includes this style:
```js
{ match: "Film", class: "badge-red" },
```
Then in your CSS file, add a style for the class `badge-red` like this:

```css
.universal-badge-item.badge-red {
  color: red;
  font-size: 1em;
}
```
- Important: **always use the `.universal-badge-item.` prefix** before your class name — otherwise the style won’t apply.
- **(Optional) Get AI help**  
  If you're unsure how to write the CSS, paste this prompt into your AI assistant:

```text
Create a CSS style for a badge with class "badge-red" and prefix "universal-badge-item." that has a blue background, white text, slight border-radius, and padding.  
It should look modern and work well with both light and dark themes.
```

### 🧠 Smart behavior

- Converts all values into strings automatically.

---
## 🏷️ **Tags** (`tags`)

**What it does:**  
Displays a list of tags as styled badge-like elements.  
Supports both arrays and comma-separated strings.

![[tags.png]]

### ✅ How to use

- **A single tag (without `#` — will be added automatically):**

```yanl
tags: important
```

- A single tag (with `#` — duplicate hashes will be removed):

```yaml
tags: "#important"
```

- Multiple tags as a comma-separated string:

```yaml
tags: important, urgent, idea
```

### ⚙️ Additional settings

These parameters are set in the script config under [[08 🖼 FIELD CREATION]]:

| Setting           | What it does                                                |
| ----------------- | ----------------------------------------------------------- |
| `maxItems`        | Shows no more than N tags. Extra ones are collapsed as `+N` |
| `prefix`/`suffix` | Adds text before or after each tag                          |
| `emoji`           | Adds an emoji to the field                                  |

### 🧠 Smart behavior

- ✅ Automatically adds `#` to all tags.
- ✅ Removes duplicate hash symbols (`##tag` won’t happen).
- ✅ Supports both lists and comma-separated strings.

---
## 🎧 **Audio** (`audio`)

**What it does:** Displays an audio player for playing a file or link.

**You can use:**

- A direct web link: `https://site.com/audio.mp3`
- A file from a note: `![[music.mp3]]`

YAML example:

```yaml
Audio:
  - "![[SpotiDown.App - __1997 - juno.mp3]]"
```

### ✅ Supported formats

The script supports **embedding audio** of the following formats:

| Format  | Supported | Notes                                       |
| ------- | --------- | ------------------------------------------- |
| `.mp3`  | ✅ Yes     | Most universal                              |
| `.ogg`  | ✅ Yes     | Works well in Obsidian and browsers         |
| `.wav`  | ✅ Yes     | Lossless, but large file size possible      |
| `.flac` | ✅ Yes     | High quality, not supported by all browsers |
| `.m4a`  | ✅ Yes     | Common on macOS/iOS                         |

### 🚫 Not supported

| Format / Case                              | Reason                                                         |
| ------------------------------------------ | -------------------------------------------------------------- |
| `file://...`                               | 🔒 Browsers and Obsidian **do not allow** playback from `file://` links |
| Streaming services (Spotify, SoundCloud…)  | ⛔ Cannot be embedded via `<audio>`, will show as a plain link  |
| Non-audio files (e.g. `.txt`, `.pdf`, `.zip`) | ⚠️ Will show “Unknown audio format” message                   |

> [!danger]
> Audio files may place a small load on the system

### ⚙️ Additional settings

These parameters are defined in the script config under [[08 🖼 FIELD CREATION]]:

| Setting   | What it does                  |
| --------- | ----------------------------- |
| `emoji`   | Adds an emoji to the field    |

---
## 🎬 **Video** (`video`)

**What it does:** Displays a video player for a file or a link.

YAML examples:

- A video stored inside the Obsidian vault:
```yamnl
Video:
  - "![[ssstik.io_1747125488928.mp4]]"
```

- A direct video link:

```yaml
Video:
  - https://www.youtube.com/watch?v=IxX_QHay02M&ab_channel=W%26W
```

### ✅ Supported formats

| Format  | Supported | Notes                                    |
| ------- | --------- | ----------------------------------------- |
| `.mp4`  | ✅ Yes     | Most reliable and universal               |
| `.webm` | ✅ Yes     | Well supported format                     |
| `.ogg`  | ✅ Yes     | Can also be used for video                |
| `.mov`  | ⚠️ Limited| Not recommended                          |

### ✅ YouTube support

You can embed a direct YouTube link:

> 🧩 The video will be embedded using an iframe with a full-featured player.


### 🚫 Not supported

| Format / Case                              | Reason                                                       |
| ------------------------------------------ | ------------------------------------------------------------ |
| `file://...`                               | 🔒 Local paths with `file://` are blocked by the browser     |
| External video platforms (Vimeo, Rutube…)  | ⛔ Won’t embed, but a “Watch video” link will be shown       |
| Nonexistent or corrupted files             | ⚠️ Will display “Unknown video format” message               |

> [!danger]
> Video files may significantly impact system performance.

### ⚙️ Additional settings

These parameters are defined in the script config under [[08 🖼 FIELD CREATION]]:

| Setting   | What it does                  |
| --------- | ----------------------------- |
| `emoji`   | Adds an emoji to the field    |

---
## 📅 **Date** (`date`)

Displays a date in the card using a localized format.  
Supports formatting via [Luxon](https://moment.github.io/luxon/#/) (if loaded) and a fallback using the browser's `Date()`.  
Automatically detects the language from the system or uses a manually specified one.

### ✅ How to use

Simple date:

```yaml
Date: 2024-12-31
```

Other valid formats:

```yaml
Date: 31.12.2024  # European format
Date: 2024-12-31  # ISO 8601
```

Also works with arrays — only the **first value** is used:

```yaml
Date:
  - 2024-12-31
  - 2025-01-01
```

### 🌍 Supported languages for `dateFormat`

The `dateFormat` parameter lets you specify the language used to display the date (e.g., `12 июня 2025` → `12 June 2025`).

```js
fields: {
	DemoDate: {
	  type: "date",
	  label: "Date",
	  cssClass: "",
	  emoji: "📅",
	  suffix: "",
	  dateFormat: "en",
	  },
},
```

|Value|Interface Language|Example Date|
|---|---|---|
|`"auto"`|Auto-detect (system)|_(default)_|
|`"en"`|English|June 12, 2025|
|`"ru"`|Russian|12 июня 2025|
|`"uk"`|Ukrainian|12 червня 2025|
|`"de"`|German|12. Juni 2025|
|`"fr"`|French|12 juin 2025|
|`"es"`|Spanish|12 de junio de 2025|
|`"it"`|Italian|12 giugno 2025|
|`"pl"`|Polish|12 czerwca 2025|
|`"pt"`|Portuguese|12 de junho de 2025|
|`"zh"`|Chinese (Simplified)|2025年6月12日|
|`"ja"`|Japanese|2025年6月12日|

> ❗ If you specify an invalid or empty language (`""`, `"xx"`, etc.), English (`"en"`) will be used.

### 📌 The `"auto"` option

> `"auto"` uses your operating system's language.  
> This **might not match** your Obsidian interface language.  
> Use `"en"` if you want to guarantee English output.

### ⚙️ Additional settings

These parameters are defined in the script config under [[08 🖼 FIELD CREATION]]:

| Setting     | What it does                                                                 |
| ----------- | ---------------------------------------------------------------------------- |
| `prefix`    | Text added **before** the date (e.g., `"📅 "`).                              |
| `suffix`    | Text added **after** the date (e.g., `" year"`).                            |
| `dateFormat`| Language code (`"auto"`, `"en"`, `"ru"`, `"fr"`, etc.). `"auto"` uses system |
| `emoji`     | Adds an emoji to the field                                                  |

---
## ⭐ **Rating** (`rating`)

**What it does:**  
Displays a numeric rating using up to five stars.  
The number of filled stars depends on the value and the maximum rating.  
Supports half-stars for decimal values and ignores invalid inputs.

### ✅ How to use

In your note’s YAML, just specify a numeric value:
```yaml
Rating: 7.5
```

By default, **the maximum rating is 10**.  
So `7.5` will be shown as roughly ★★★★☆ (4 out of 5 stars).

**You can use:**

| Example        | Meaning                          |
| -------------- | --------------------------------- |
| `rating: 8`    | Eight out of ten                 |
| `rating: 7.5`  | Seven and a half                 |
| `rating: "6"`  | Strings work too                 |
| `rating: "7,5"`| Comma instead of dot — works     |
| `rating: [9]`  | Array — first value is used      |

⚠️ Avoid writing it like this:

| Example          | Why it won’t work                   |
| ---------------- | ----------------------------------- |
| `rating: "4/10"` | Only the first number is used (`4`) |
| `rating: []`     | Empty — won’t render                |
| `rating: "five"` | Text not supported                  |
| `rating: {}`     | Invalid structure                   |

### ⚙️ Additional settings

These parameters are defined in the script config:

| Setting           | What it does                                                  |
| ----------------- | ------------------------------------------------------------- |
| `maxRating: 10`   | Sets the maximum possible value (default is `10`)             |
| `prefix`, `suffix`| Adds text before or after the stars (e.g., `"Rating: "`).     |

Configuration example:

```js
Rating: {
  type: "rating",
  config: {
    maxRating: 5
  },
  prefix: "📊 ",
  suffix: " points"
}
```

### 🧠 Smart behavior

- You can use numbers, strings, or arrays — all are auto-parsed.
- If the value is an array (`[7.5, 8.0]`), the first one is used.
- If the rating exceeds the maximum — it is capped.
- If invalid or missing — a warning icon is shown instead of stars.


### ⚙️ Additional settings

These parameters are defined in the script config under [[08 🖼 FIELD CREATION]]:

| Setting  | What it does                  |
| -------- | ----------------------------- |
| `emoji`  | Adds an emoji to the field    |

---
## 🔢 **Number** (`number`)

**What it does:**  
Displays a numeric value — integer or float.  
Useful for showing any numerical data: rating, weight, price, quantity, etc.  
The script automatically parses numbers, even if they’re stored as text (e.g., `"42"` or `"1,5"`).

### ✅ How to use

In the YAML section of your note, simply write a number:

```yaml
Price: 125
```

You can also use a string — it will be converted automatically:

```yaml
Price: "125"
```

Decimal numbers with dot or comma are supported:

```yamnl
Weight: "2,5"
```

If multiple values are given, the **first** is used:

```yaml
Rating:
  - 7
  - 9
```

### ⚙️ Additional settings

These parameters are defined in the script config:

| Setting            | What it does                                                       |
| ------------------ | ------------------------------------------------------------------ |
| `prefix`, `suffix` | Adds text before/after the number (e.g., `"$"`, `" kg"`, `" pts"`) |
| `emoji`            | Adds an emoji to the field                                         |

### 🧠 Smart behavior

- Strings in YAML will be converted into numbers.
- Comma format is supported: `"3,14"` → `3.14`.
- If a value can't be parsed (e.g., `"not a number"`), an empty placeholder will be shown.
- You can combine with `prefix` and `suffix` to output something like: `💰 1 200 $`.


---
## 📈 **Progress Bar** (`progressBar`)

**What it does:**  
Displays a visual progress bar — useful for task completion, chapters read, skill level, etc.  
It uses two values — current (`current`) and maximum (`max`) — and shows a percentage bar.

### ✅ How to use

In YAML, define two fields — one for current progress and one for the total:

```yaml
Completed: 3
Total: 10
```

Then, in the config under [[08 🖼 FIELD CREATION]], define a virtual field:

```js
Progress: { // <--- THIS IS A VIRTUAL FIELD
  type: "progressBar",
  config: {
    currentField: "Completed", // <--- FROM YAML (do not define this in "08 🖼 FIELD CREATION")
    maxField: "Total"          // <--- FROM YAML (same)
  }
}
```

	📌 This is a **virtual field** — you don’t need to create it in YAML.  
	Filtering and searching will use the value from `currentField`.

#### 🎨 Threshold example
```js
thresholds: [
  { min: 100, class: "progress-complete" },
  { min: 90,  class: "progress-high" },
  { min: 75,  class: "progress-good" },
  { min: 50,  class: "progress-medium" },
  { min: 25,  class: "progress-low" },
  { min: 1,   class: "progress-bad" },
  { min: 0,   class: "progress-empty" },
],
```

	Higher percentages take priority — the first matching threshold is used.

### 🧠 Smart behavior

- Values from text or arrays (e.g., `"5"` instead of `5`) are auto-converted.
- Percentage is calculated as `(current / max) * 100`, rounded, and capped at `100%`.
- If either `current` or `max` is missing or zero — an empty placeholder is shown.
- Bar color is determined by thresholds (e.g., red for <50%).

### 📝 YAML + Config Example

```yaml
Completed: 7
Total: 10
```

```js
Progress: {
  type: "progressBar",
  config: {
    currentField: "Completed",
    maxField: "Total",
    thresholds: [
      { min: 100, class: "progress-complete" },
      { min: 90,  class: "progress-high" },
      { min: 75,  class: "progress-good" },
      { min: 50,  class: "progress-medium" },
      { min: 25,  class: "progress-low" },
      { min: 1,   class: "progress-bad" },
      { min: 0,   class: "progress-empty" },
    ],
  }
}
```

The card will show a colored progress bar:

> ▓▓▓▓▓▓▓▓░░ `70%`

### ⚙️ Additional settings

These parameters are defined in the script config under [[08 🖼 FIELD CREATION]]:

| Setting  | What it does              |
| -------- | ------------------------- |
| `emoji`  | Adds an emoji to the field|

### 🎨 Customizing the progress bar style

You can create your own color scheme to make the progress bar visually stand out.

#### 🧩 Step 1: Open the CSS file

Locate and open `[CARDS]universal-dataview-cards.css`.

#### 🔍 Step 2: Find the section

Search for the following block inside the file:

```css
/* ================================================= */
/* 📊 PROGRESS BAR                                   */
/* ================================================= */
```

#### 🎯 Step 3: Check existing styles

Here’s an example of a default style:
```css
.universal-progress-bar-fill.progress-complete {
  background-color: #10b981;
}
```

This means that when progress reaches a certain level, the bar turns green.

#### 🛠️ Step 4: Add your class to the config

In your config, define your custom classes via `thresholds`. Example:
```js
thresholds: [
  { min: 100, class: "my-style-max" },
  { min: 25,  class: "my-style-low" },
  { min: 1,   class: "my-style-one" },
  { min: 0,   class: "progress-empty" },
]
```

	🧠 Each `min` is the lower bound — e.g., if value ≥100, it will use `my-style-max`.

#### 🎨 Step 5: Define styles in CSS

Now add matching styles in your CSS file. Example:

```css
.universal-progress-bar-fill.my-style-max {
  background-color: green;
}
```

🛑 **Important:** Always prefix with `.universal-progress-bar-fill.` — without it, the style won’t apply.

#### ❓ Not sure which color to use?

Ask an AI like ChatGPT to generate one. Example:

> “Give me a CSS background color code for a soft blue that works well in both dark and light themes.”

---
# 🧭 [[01 Roadmap|Roadmap]] • [[00 HUB|Home Page]] 🏠