class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <footer>
                <p>&copy; 2025 Notes App. Made by Dani Harmade</p>
            </footer>
        `;
  }
}
customElements.define("app-footer", AppFooter);
