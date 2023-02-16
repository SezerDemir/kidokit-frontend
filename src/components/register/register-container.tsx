import React from "react"
import {RegisterContent} from "./register-content"
import {RegisterHeader} from "./register-header"

export function RegisterContainer(){
    return(
        
        <div>
            <RegisterHeader />
            <RegisterContent />
        </div>

    );
}