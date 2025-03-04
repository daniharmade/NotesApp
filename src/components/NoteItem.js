import { deleteNote, archiveNote, unarchiveNote } from "../api";

class NoteItem extends HTMLElement {
  set note(note) {
    this._note = note;
    this.render();
  }

  render() {
    this.innerHTML = `
            <div class="note">
                <h2>${this._note.title}</h2>
                <p>${this._note.body}</p>
                <small>${new Date(this._note.createdAt).toLocaleString()}</small>
                <button class="delete-btn">Delete</button>
                <button class="archive-btn">${this._note.archived ? "Unarchive" : "Archive"}</button>
            </div>
        `;

    // Event listener untuk tombol delete
    this.querySelector(".delete-btn").addEventListener("click", async () => {
      const isDeleted = await deleteNote(this._note.id);
      if (isDeleted) this.remove();
    });

    // Event listener untuk tombol archive/unarchive
    this.querySelector(".archive-btn").addEventListener("click", async () => {
      const archiveBtn = this.querySelector(".archive-btn");
      archiveBtn.disabled = true;

      const isSuccess = this._note.archived
        ? await unarchiveNote(this._note.id)
        : await archiveNote(this._note.id);

      if (isSuccess) {
        this._note.archived = !this._note.archived;
        archiveBtn.textContent = this._note.archived ? "Unarchive" : "Archive";
      }

      archiveBtn.disabled = false;
    });
  }
}

customElements.define("note-item", NoteItem);
