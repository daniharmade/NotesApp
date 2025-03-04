class LoadingIndicator extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <div class="loading-container">
                <div class="spinner"></div>
                <p>Loading...</p>
            </div>
        `;
  }
}

customElements.define("loading-indicator", LoadingIndicator);
