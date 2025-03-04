import "./styles/styles.css";
import "./components/AppBar";
import "./components/NoteForm";
import "./components/NoteItem";
import "./components/AppFooter";
import "./components/LoadingIndicator"; // Impor komponen loading
import { fetchNotes } from "./api";

document.addEventListener("DOMContentLoaded", async () => {
  const notesContainer = document.getElementById("notesContainer");

  // Tambahkan indikator loading sebelum memuat data
  const loadingIndicator = document.createElement("loading-indicator");
  document.body.appendChild(loadingIndicator);

  const notes = await fetchNotes();

  // Hapus indikator loading setelah data dimuat
  loadingIndicator.remove();

  notesContainer.innerHTML = "";

  notes.forEach((note) => {
    const noteElement = document.createElement("note-item");
    noteElement.note = note;
    notesContainer.appendChild(noteElement);
  });
});
