export class SimpleButton {


    render() {
        return `
        <div>
            <slot></slot>
        </div>
        `
    }
}

customElements.define('simple-button', SimpleButton);