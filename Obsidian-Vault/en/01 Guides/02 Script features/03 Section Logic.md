---
cssclasses:
  - hide-properties
obsidianUIMode: preview
---
# 🧭 [[01 Roadmap|Roadmap]] • [[00 HUB|Home Page]] 🏠
---
# 🚀 **03 Section Logic**

## 🧠 What is `matchFactory`?

Each card is placed into a specific section based on a condition.  
This condition is defined using a special rule called `matchFactory`.

You simply choose the desired rule type (one of the available ones) and set the parameters in `matchArgs`.

👉 Parameters for `matchArgs` are now written as an **object** — this makes them more readable and clear.

---
## 📋 Overview of available rules (`matchFactory`)
---
### 🔹 `matchBySectionValue`

**What it does:**  
Checks if a specific YAML field (like `"Section"`) contains **at least one value** from a given list. This works with both single strings and arrays.

**When to use:**  
When you want to assign a card to a section if its YAML field includes at least one of the desired values. For example, you can group `"Section: SectionPoster"` and `"Section: SectionAudio"` into the same section.

**How it works:**

- If the YAML field is a string: it compares the value directly.
- If the YAML field is an array: it checks all elements.
- A match is considered successful if **any value** in the field matches **any item** in `values`.

Example YAML:

```yaml
Section:
  - SectionPoster
  - SectionAudio
```

Or:

```yaml
Section: SectionPoster
```

Example section in config:

```js
{
  id: "section0",
  title: "Section Poster",
  matchFactory: "matchBySectionValue",
  matchArgs: { field: "Section", values: ["SectionPoster", "SectionAudio"] },
  fields: [
    "Poster",
    "Title",
    "Type",
    "tags",
  ],
},
```

---
### 🔹 `matchIfFieldCompare`

**What it does:**  
Compares a numeric value from a YAML field with a threshold using a specified condition (`greater`, `less`, `equal`, etc.).

**When to use:**  
To select cards where rating or another number is above (or below) a certain level.

**Supported field types:**  
The field must be one of the following types:

- `"rating"`
- `"number"`

Example YAML:

```yaml
Rating: 9
```

Example section:

```js
{
  id: "section1",
  title: "Top Rated",
  matchFactory: "matchIfFieldCompare",
  matchArgs: { field: "Rating", operator: ">=", value: 8 },
  fields: [
    "Title",
    "Rating",
    "Poster",
    "tags",
  ],
},
```

Available operators:

```text
>    — greater than  
>=   — greater than or equal  
<    — less than  
<=   — less than or equal  
==   — exactly equal  
!=   — not equal  
```

---
### 🔹 `matchIfContainsAllValues`

**What it does:**  
Checks whether **all** of the specified values are found **in any field** of the card.

If **all** values are found (regardless of which fields), the card will be included in the section.

**When to use:**  
For selecting cards based on general keywords, genres, or tags — without caring which specific field they are in.

Example YAML:

```yaml
Title: Quantum Ashes
DemoDate: 2450-11-08
DemoList:
  - Echo
  - Crumble
  - Flash
Badge:
  - Experimental
  - Texture
```

Example section config:

```js
{
  id: "section2",
  title: "Experimental Stuff",
  matchFactory: "matchIfContainsAllValues",
  matchArgs: { values: ["Experimental", "Texture"] },
  fields: [
    "Title",
    "Genres",
    "Poster",
    "Notes",
  ],
},
```

> ✔️ This is a flexible way to filter cards by keywords or tags — works across all fields.

> 🔠 Case-sensitive!  
> For example, `Texture` and `texture` are treated as different values.

---
## 🧾 Summary: What each factory is for

| Factory Name               | Purpose                                                                                                        |
| -------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `matchBySectionValue`      | Checks a specific YAML field (e.g. `"Section"`). If it matches any of the given values — the card is included. |
| `matchIfFieldCompare`      | Compares a numeric field to a threshold (`>`, `<`, etc.).                                                      |
| `matchIfContainsAllValues` | Searches for the presence of all given values across all fields.                                               |

---
These factories work **independently** from each other.  
You can use any of them — in different sections, or combine them across different config files.

The script just applies each rule to every card and determines whether to show it in a section.

---
# 🧭 [[01 Roadmap|Roadmap]] • [[00 HUB|Home Page]] 🏠