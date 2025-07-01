---
cssclasses:
  - hide-properties
obsidianUIMode: preview
---
# 🧭 [[01 Roadmap|Roadmap]] • [[00 HUB|Home Page]] 🏠

---
# 📸 **01 Visual Feature Overview**

This section is a brief visual guide to the main interface elements. You’ll see where everything is located and how it works.

---

## 🔍 General Layout

![[Visual overview 1.png]]

In the screenshot above, you can see:

- **Search bar**
    
- **Sorting and filtering buttons**
    
- **Card sections**
    
- **Script version info**
    
- **Update button**

---

## 🔎 Search Bar

![[Visual overview 2.png]]

The search bar lets you quickly find the cards you need.  
It can be configured to search a specific YAML field (or multiple fields), such as `Title`.  
The search will target **only the value of the specified field**.

---

## 🧭 Sorting Buttons

![[Visual overview 3.png]]

Sorting buttons allow you to sort cards by various criteria.  
You can define in the config:

- Which buttons to display  
- Which field each button sorts by

### 🛠 Special buttons:

1. **Random** — random sorting. You can specify which fields to include in randomization in the config.
    
2. **By backlinks** — sorts cards by the number of backlinks.

---

## 🧪 **Filter** Button

![[Visual overview 4.png]]

Filtering lets you find cards based on YAML field values.

What you can do:

1. **Select a field** — for example, "Genre", "Author", or "Type". The filter will apply to the values of that specific field.

2. **Enter tags** — start typing, and suggestions will appear. You can select one or more tags.

3. **Filtering mode**:
- ✅ **Whitelist** — shows only cards with the selected tags.
- 🚫 **Blacklist** — hides cards with the selected tags.

4. **Filter logic** (can be toggled at the bottom of the window):

	Each time you select a field (e.g., `Genre`) and add tags to it (e.g., `Horror`, `Comedy`), you create a **separate filter rule**. Think of this rule as a condition that must be met.

	If you add filters for other fields (e.g., `Author`, `Type`), there will be multiple such rules.

	Filter logic defines **how these rules are combined**:

	- **OR** — a card will be shown if it matches *at least one* rule.
	- **AND** — a card will be shown only if it matches *all* rules at once.

	🔎 Examples:
	
	You choose the field `Genre` and add the tags `Horror` and `Comedy`:
	
	- **Whitelist + OR** → shows cards with *either* `Horror` **or** `Comedy`.
	- **Whitelist + AND** → shows cards with *both* `Horror` **and** `Comedy`.
	- **Blacklist + OR** → hides cards with `Horror` **or** `Comedy`.
	- **Blacklist + AND** → hides cards *only* if they have *both* genres.

5. **Selected tag list** — displayed below. It shows which tags you’ve added and to which fields. Each section can be expanded/collapsed.

6. **Clear tags** — removes all selected tags.

7. You can close this window by pressing `Esc`.

---

## 🗂 Sections

![[Visual overview 5.png]]

Sections allow you to organize cards into categories.  
Each section can be **expanded** or **collapsed**, and their state is preserved when reopening the note (if enabled in the config).

### 🔘 **Collapse All** Button

![[Visual overview 6.png]]

This button instantly collapses all sections and scrolls back to the top of the note.  
Especially useful when working with a large number of cards.

---

## 🧩 Field Types

![[Visual overview 7.mp4]]

The script supports **13 field types**, including:

- Text  
- Links  
- Dates  
- Numbers  
- Tags  
- Audio  
- Video, and more  

Which fields are displayed and how — is defined in your config file.

> [!danger]  
> ⚠ **Audio and video** may place a high load on your system.  
> It’s recommended to **optimize** or use them sparingly.

---
# 🧭 [[01 Roadmap|Roadmap]] • [[00 HUB|Home Page]] 🏠
