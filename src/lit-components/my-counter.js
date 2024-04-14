import { LitElement, html, css } from "lit";

export class Counter extends LitElement {
    static styles = [
        css`
        :host {
            display: block;
            
        }

        .wrapper{
            display: flex;
            flex-flow: column;
            justify-content: center;
            align-items: center;
            
        }

        .box_counter{
            padding: 1rem 2rem;
            border: 1px solid orange;
            border-radius: 1rem;
            
            display: flex;
            flex-flow: column;
            justify-content: center;
            align-items: center;
        }
        
        h2{
            color: orange;
            text-align: center;
            margin: 0;
        }
        
        .number{
            font-size: 2rem;
            font-weight: 600;
            text-align: center;
            color: orange;
            margin: 0;
        }
        
        .btn{
            background-color: rgb(251, 221, 185);
            color: orange;
            font-weight: 600;
            padding: .3rem 1.5rem;
            border: 2px solid orange;
            border-radius: 1rem;
            margin: 0.5rem 0rem 0rem;
            cursor: pointer;
        }
        
        slot{
            color: grey;
        }

        input{
            border: 1px solid orange;
            border-radius: 1rem;
            padding: .3rem 1rem;
            color: orange;
        }
        
        `
    ];


    static get properties(){
        return {
            counter: { type: Number }
        };
    }

    constructor(){
        super();
        this.counter = 0;
    }


    render(){
        return html `
            <div class="wrapper">
                <div class="box_counter">
                    <h2>Mi contador</h2>   
                    <p class="number">${this.counter}</p>
                    <input id="quantity" type="number" value="1">
                    <button class="btn" @click=${this.increment}>+ 1</button>
                    <button class="btn" @click=${this.decrement}>- 1</button>
                </div>
                <slot name='comment'></slot>
            </div>
        `;
    }

    get quantity(){
        return this.shadowRoot.getElementById('quantity').value
    }

    increment(){
        // let quantity = this.shadowRoot.getElementById('quantity').value
        this.counter += parseInt(this.quantity);
    }

    decrement(){
        this.counter-= parseInt(this.quantity);
    }
}

customElements.define('my-counter', Counter);