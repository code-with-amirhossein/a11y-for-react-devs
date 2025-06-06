import { registerAll } from "@tapsioss/web-components";
registerAll();

class VisibilityWidget extends HTMLElement {
  private isToggled: boolean;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isToggled = false;
    setTimeout(() => this.render());
  }

  get name() {
    return `\`${this.getAttribute("option-name")}\`` || "Feature";
  }

  get classesToToggle() {
    return this.getAttribute("classes-to-toggle") || "";
  }

  get attributeToToggle() {
    return this.getAttribute("attribute-to-toggle");
  }

  toggle() {
    this.isToggled = !this.isToggled;
    this.render();
  }

  render() {
    const container = document.createElement("div");
    const toggledClass =
      this.isToggled && this.classesToToggle ? this.classesToToggle : "";

    const attributes =
      this.attributeToToggle && this.isToggled
        ? `${this.attributeToToggle}="true"`
        : "";

    container.innerHTML = `
      <style>
        figure {
          margin: 1.5rem 0;
        }
        button {
          border: 2px solid black;
          background: black;
          color: white;
          border-radius: 0.375rem;
          padding: 0.5rem;
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.6);
          margin-right: 0.5rem;
          min-width: 220px;
          cursor: pointer;
        }
        a {
          text-decoration: underline;
        }
        .playground {
          background: white;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
        }
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
        }
        .invisible {
            visibility: hidden;
        }
        .hidden {
            display: none;
        }
        .opacity-0 {
            opacity: 0;
        }
      </style>
      <figure>
        <tapsi-button variant="brand" part="toggle" style="margin-bottom: 1rem;">
            Turn ${this.name} ${this.isToggled ? "off" : "on"}
        </tapsi-button>
        <br>
        <div class="playground">
            <div class="${toggledClass}" ${attributes}><tapsi-badge color="info" value="Target Element"></tapsi-badge></div>
            <div><tapsi-badge color="info" class="ml-2" value="Content after target element"></tapsi-badge></div>
        </div>
      </figure>
    `;

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(container);

      const button = this.shadowRoot.querySelector("tapsi-button");
      button?.addEventListener("click", () => this.toggle());
    }
  }
}

customElements.define("visibility-widget", VisibilityWidget);
