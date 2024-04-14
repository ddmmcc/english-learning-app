import {LitElement, html} from "lit";
import {ButtonClonStyles} from "./button-clon-style";

export class ButtonClon extends LitElement {
    static styles = [ ButtonClonStyles ];

    static get properties (){
        return {
            text: {type: String}
        }
    }

    constructor(){
        super();
    }

    render(){
        return html`
            <div>
                <slot></slot>
            </div>
            `
    }
}
customElements.define('button-clon', ButtonClon);