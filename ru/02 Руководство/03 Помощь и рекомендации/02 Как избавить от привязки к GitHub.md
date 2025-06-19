---
cssclasses:
  - hide-properties
obsidianUIMode: preview
---

# 🧭 [[01 Путеводитель|Путеводитель]] • [[00 HUB|Домашняя страница]] 🏠

---

# **Как избавить от привязки к GitHub?**

_Если вам надоела информация о текущей версии скрипта, а также уведомление о вышедшей новой версии, вы можете удалить блоки кода отвечающие за эту информацию._

## **Шаги по отказу от GitHub**

1. Вам нужно открыть скрипт "universal-cards-core.js".

2. Найти строку: `const SCRIPT_VERSION = "1.0.0";` и удалить её. Она находится в самом начале скрипта.

3. В функции `function runUniversalCards(dv, inputConfig = {}) {...};` в самом её начале удалить строку:

```js
checkForScriptUpdates();
```

4. Удалить весь этот блок:

```js
async function checkForScriptUpdates() {
  const VERSION_MANIFEST_URL =
    "https://raw.githubusercontent.com/2PleXXX/obsidian-dataview-cards/refs/heads/main/manifest.json";

  const GITHUB_REPOSITORY =
    "https://github.com/2PleXXX/obsidian-dataview-cards";

  try {
    const res = await fetch(VERSION_MANIFEST_URL);
    if (!res.ok) throw new Error(t.UPDATES.FETCH_ERROR);

    const data = await res.json();
    const latestVersion = data.version;

    let versionContainer = dv.container.querySelector(
      ".universal-version-wrapper"
    );
    if (!versionContainer) {
      versionContainer = document.createElement("div");
      versionContainer.className = "universal-version-wrapper";
      dv.container.prepend(versionContainer);
    }

    const versionDiv = document.createElement("div");
    versionDiv.className = "universal-script-version";
    versionDiv.innerHTML = `${t.UPDATES.CURRENT_VERSION_LABEL} <a href="${GITHUB_REPOSITORY}" target="_blank">${SCRIPT_VERSION}</a>`;
    versionContainer.appendChild(versionDiv);

    if (compareVersions(SCRIPT_VERSION, latestVersion) < 0) {
      const notice = document.createElement("div");
      notice.className = "universal-update-notice";
      notice.innerHTML = `🆕 ${t.UPDATES.NEW_VERSION_NOTICE(
        latestVersion
      )} &nbsp;
          <a href="${GITHUB_REPOSITORY}" target="_blank">${
        t.UPDATES.UPDATE_LINK_LABEL
      }</a>`;

      versionContainer.insertBefore(notice, versionDiv);
    }
  } catch (e) {
    // console.warn("Ошибка при проверке обновлений:", e.message);
  }
}
```

5. И вот этот удалить:

```js
function compareVersions(a, b) {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pa[i] || 0) - (pb[i] || 0);
    if (diff) return diff < 0 ? -1 : 1;
  }
  return 0;
}
```

6. Комментарии также можно удалить, но на функционал они никак не влияют

Комментарии это строки такого вида:

```js
// Проверяет, доступна ли новая версия скрипта:
```

---

# 🧭 [[01 Путеводитель|Путеводитель]] • [[00 HUB|Домашняя страница]] 🚀
