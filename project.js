// Journal App JavaScript
document.addEventListener("DOMContentLoaded", () => {
    const STORAGE_KEY = "my-journal-entries";
    const DRAFT_TITLE_KEY = "my-journal-draft-title";
    const DRAFT_CONTENT_KEY = "my-journal-draft-content";

    const form = document.getElementById("journal-form");
    const titleInput = document.getElementById("entry-title");
    const contentInput = document.getElementById("entry-content");
    const entriesEl = document.getElementById("entries");
    const emptyEl = document.getElementById("empty");
    const clearDraftBtn = document.getElementById("clear-draft");

    function loadEntries() {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      } catch {
        return [];
      }
    }

    function saveEntries(entries) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    }

    function renderEntries() {
      const entries = loadEntries();
      entriesEl.innerHTML = "";
      if (entries.length === 0) {
        emptyEl.style.display = "block";
        return;
      }
      emptyEl.style.display = "none";
      entries
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .forEach((entry, idx) => {
          const div = document.createElement("article");
          div.className = "entry";
          div.innerHTML = `
            <div class="entry-header">
              <div class="entry-title">${escapeHtml(entry.title || "Untitled")}</div>
              <div class="entry-date">${formatDate(entry.date)}</div>
            </div>
            <div class="entry-content">${escapeHtml(entry.content).replace(/\n/g, "<br>")}</div>
            <div class="entry-actions" role="group" aria-label="Entry actions">
              <button class="btn-secondary" data-action="edit" data-index="${idx}">Edit</button>
              <button class="btn-secondary" data-action="delete" data-index="${idx}">Delete</button>
            </div>
          `;
          entriesEl.appendChild(div);
        });
    }

    function escapeHtml(str) {
      return (str || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    function formatDate(iso) {
      const d = new Date(iso);
      return d.toLocaleString(undefined, {
        year: "numeric", month: "short", day: "numeric",
        hour: "2-digit", minute: "2-digit"
      });
    }

    // Save draft as you type
    const saveDraft = () => {
      localStorage.setItem(DRAFT_TITLE_KEY, titleInput.value);
      localStorage.setItem(DRAFT_CONTENT_KEY, contentInput.value);
    };
    titleInput.addEventListener("input", saveDraft);
    contentInput.addEventListener("input", saveDraft);

    function loadDraft() {
      const t = localStorage.getItem(DRAFT_TITLE_KEY) || "";
      const c = localStorage.getItem(DRAFT_CONTENT_KEY) || "";
      titleInput.value = t;
      contentInput.value = c;
    }

    clearDraftBtn.addEventListener("click", () => {
      titleInput.value = "";
      contentInput.value = "";
      localStorage.removeItem(DRAFT_TITLE_KEY);
      localStorage.removeItem(DRAFT_CONTENT_KEY);
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = titleInput.value.trim();
      const content = contentInput.value.trim();

      if (!content) {
        alert("Write something before saving.");
        return;
      }
      const entries = loadEntries();
      entries.push({ title, content, date: new Date().toISOString() });
      saveEntries(entries);
      titleInput.value = "";
      contentInput.value = "";
      localStorage.removeItem(DRAFT_TITLE_KEY);
      localStorage.removeItem(DRAFT_CONTENT_KEY);
      renderEntries();
    });

    entriesEl.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-action]");
      if (!btn) return;
      const action = btn.dataset.action;
      const index = Number(btn.dataset.index);
      const entries = loadEntries();

      if (action === "delete") {
        const ok = confirm("Delete this entry?");
        if (!ok) return;
        entries.splice(index, 1);
        saveEntries(entries);
        renderEntries();
      } else if (action === "edit") {
        const entry = entries[index];
        titleInput.value = entry.title || "";
        contentInput.value = entry.content || "";
        localStorage.setItem(DRAFT_TITLE_KEY, titleInput.value);
        localStorage.setItem(DRAFT_CONTENT_KEY, contentInput.value);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });

    // Init
    loadDraft();
    renderEntries();
});
