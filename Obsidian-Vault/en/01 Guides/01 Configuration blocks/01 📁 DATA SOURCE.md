---
cssclasses:
  - hide-properties
obsidianUIMode: preview
---
# 🧭 [[01 Roadmap|Roadmap]] • [[02 🪟 MODAL WINDOW SETUP|Next →]] • [[00 HUB|Home Page]] 🏠

---
**BLOCK 01 📁 DATA SOURCE**  
💡 Example block configuration:

```js
language: "ru",
checkVersion: true,

typeFilteringEnabled: true,
folderKeyword: "Attachments/YAML folder/",
typeField: "Type",
typeValue: ["DemoType"],
```

🔹 **language**  
Allows you to change the script's interface language. Currently, three languages are available:

- `"ru"` – Russian
    
- `"en"` – English
    
- `"uk"` – Ukrainian
    

If you don’t add the `language` field or leave it empty, English will be used by default.

If desired, you can easily translate the interface into your own language. Learn more about that [[03 How to Translate the Script into Another Language|HERE]].

🔹 **typeFilteringEnabled**  
Allows you to switch between two filtering modes:

- `true` – Only those metadata entries (YAML from now on) will be included that:
    
    - are located in the specified folder (`folderKeyword`)
        
    - contain the specified field (`typeField`) with a value from `typeValue`
        
- `false` – All YAML entries from the folder are shown, regardless of type.
    

📝 **Tip**: Avoid using `false` if your folder contains different types of YAML files — this prevents mixing unrelated content.

🔹 **folderKeyword**  
Specifies the path to the folder where your YAML files are stored.

Example: `"Demo cards/YAML folder/"`  
Case-insensitive — folders like `example/` and `Example/` will be treated the same.

🔹 **typeField**  
The name of the YAML field used for filtering.

Example: `"Type"`  
This is the key whose value will be compared to entries in the `typeValue` array.

🔹 **typeValue**  
An array of accepted values for the `typeField`.

Example: `["DemoType", "ExampleType"]` — you can list multiple values.  
Case-insensitive — `"demo"` and `"Demo"` are treated as the same.

Example:  
In your YAML:

```yaml
Type:
  - DemoType
```

In the config:

```js
typeField: "Type",
typeValue: ["DemoType"],
```

In this case, only those cards with the value `DemoType` in the `Type` field will be shown.

❓ **What does this mean in practice?**  
Imagine you have a folder named `YAML`, and it contains notes on different topics: anime, TV shows, movies, etc.  
If you set this folder as `folderKeyword`, and set `typeFilteringEnabled` to `false`, then **all** YAML files in the folder will be displayed in cards — regardless of topic.

To avoid this kind of mixing, you can use the `typeField` and `typeValue` parameters.  
For example, you set `typeField` to a field like `Topic` (which must be defined in your YAML), and `typeValue` to `Movie`.  
In this case, `typeFilteringEnabled` must be set to `true`.  
As a result, only cards where the `Topic` field contains the value `Movie` will be shown.

⚠️ **IMPORTANT!**  
Only the **first** value from the `typeValue` field will be taken for filtering.

Example:

```yaml
Type:
  - DemoType
  - Book
  - Film
```

Here, only `DemoType` will be considered.

🔹 **checkVersion**  
This setting controls whether the script’s current version and available updates are shown.

- `true` — version and updates will be displayed.
    
- `false` — version and updates will not be displayed.  
    If this parameter is not set, it defaults to `true`, meaning the version will be shown.

---
# 🧭 [[01 Roadmap|Roadmap]] • [[02 🪟 MODAL WINDOW SETUP|Next →]] • [[00 HUB|Home Page]] 🏠