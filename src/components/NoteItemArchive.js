import { deleteNote, unarchiveNote } from "../api";

class NoteItemArchive extends HTMLElement {
  set note(note) {
    this._note = note;
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="note archived">
        <h2>${this._note.title}</h2>
        <p>${this._note.body}</p>
        <small>${new Date(this._note.createdAt).toLocaleString()}</small>
        <button class="delete-btn">Delete</button>
        <button class="unarchive-btn">Unarchive</button>
      </div>
    `;

    this.setupEventListeners();
  }

  setupEventListeners() {
    const deleteBtn = this.querySelector(".delete-btn");
    const unarchiveBtn = this.querySelector(".unarchive-btn");

    deleteBtn.addEventListener("click", async () => {
      const isDeleted = await deleteNote(this._note.id);
      if (isDeleted) {
        this.remove();
        document.dispatchEvent(new CustomEvent("noteUpdated"));
      }
    });

    unarchiveBtn.addEventListener("click", async () => {
      unarchiveBtn.disabled = true;
      const isSuccess = await unarchiveNote(this._note.id);

      if (isSuccess) {
        document.dispatchEvent(new CustomEvent("noteUpdated"));
      }

      unarchiveBtn.disabled = false;
    });
  }
}

customElements.define("note-item-archive", NoteItemArchive);
