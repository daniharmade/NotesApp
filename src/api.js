import Swal from "sweetalert2";

const BASE_URL = "https://notes-api.dicoding.dev/v2";

async function fetchNotes() {
  try {
    Swal.fire({
      title: "Fetching Notes...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const response = await fetch(`${BASE_URL}/notes`);
    const result = await response.json();

    Swal.close(); // Tutup loading

    if (result.status === "success") {
      return result.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Failed to fetch notes. Please try again!",
      });
      return [];
    }
  } catch (error) {
    Swal.close(); // Tutup loading jika error
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "An error occurred while fetching notes.",
    });
    return [];
  }
}

async function addNote(title, body) {
  try {
    // Menampilkan SweetAlert loading
    Swal.fire({
      title: "Processing...",
      text: "Please wait while we add your note.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const response = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });

    const result = await response.json();
    Swal.close(); // Tutup loading

    if (result.status === "success") {
      // Tampilkan SweetAlert sukses
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Note added successfully.",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        // Reload halaman setelah SweetAlert ditutup
        window.location.reload();
      });

      return result.data;
    } else {
      // Tampilkan SweetAlert error
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Failed to add note. Try again!",
      });

      return null;
    }
  } catch (error) {
    Swal.close(); // Tutup loading jika error
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "An error occurred while adding the note.",
    });

    return null;
  }
}

async function deleteNote(id) {
  const confirmDelete = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to recover this note!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (!confirmDelete.isConfirmed) return false; // Jika user membatalkan

  try {
    Swal.fire({
      title: "Deleting...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();

    Swal.close(); // Tutup loading

    if (result.status === "success") {
      Swal.fire("Deleted!", "Your note has been deleted.", "success");
      return true;
    } else {
      Swal.fire("Error", "Failed to delete note!", "error");
      return false;
    }
  } catch (error) {
    Swal.fire("Error", "An error occurred while deleting!", "error");
    return false;
  }
}

async function archiveNote(id) {
  try {
    Swal.fire({
      title: "Archiving...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    Swal.close(); // Tutup loading

    if (result.status === "success") {
      Swal.fire({
        icon: "success",
        title: "Archived!",
        text: "Your note has been archived.",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        window.location.reload(); // Reload halaman setelah sukses
      });

      return true;
    } else {
      Swal.fire("Error", "Failed to archive note!", "error");
      return false;
    }
  } catch (error) {
    Swal.fire("Error", "An error occurred while archiving!", "error");
    return false;
  }
}

async function unarchiveNote(id) {
  try {
    Swal.fire({
      title: "Unarchiving...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    Swal.close(); // Tutup loading

    if (result.status === "success") {
      Swal.fire({
        icon: "success",
        title: "Unarchived!",
        text: "Your note has been restored.",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        window.location.reload(); // Reload halaman setelah sukses
      });

      return true;
    } else {
      Swal.fire("Error", "Failed to unarchive note!", "error");
      return false;
    }
  } catch (error) {
    Swal.fire("Error", "An error occurred while unarchiving!", "error");
    return false;
  }
}

export { fetchNotes, addNote, deleteNote, archiveNote, unarchiveNote };
