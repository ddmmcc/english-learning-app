import { useState } from "react";
import './standar-button.css'



export function StandarButton({children}) {
    return <div class="st-button">
        {children}
    </div>
}