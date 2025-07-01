---
cssclasses:
  - hide-properties
obsidianUIMode: preview
---
# 🧭 [[01 Roadmap|Roadmap]] • [[00 HUB|Home Page]] 🏠
---
# **02 📑 Recommendations for Naming Fields in YAML**

When creating new fields in YAML, ***do not use spaces*** — this will break the script.  
It can lead to errors when reading or displaying data.

Below are examples of valid formats:

```yaml
ViewingStatus: Watching # ✅ Recommended style
viewing_status: Watching # 🐍 Allowed
viewing-status: Watching # ⚠️ Permissible, but may cause issues in some cases
```

💡 Use a consistent naming style across your entire project.  
The most reliable format avoids special characters and spaces (e.g., `ViewingStatus`).

---
# 🧭 [[01 Roadmap|Roadmap]] • [[00 HUB|Home Page]] 🏠