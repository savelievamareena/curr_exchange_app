import React, {useContext, useState} from "react";
import {CurrContext} from "../../context/currenciesContext.js";

export default function CurrenciesList() {
    const currenciesWithDescriptions = useContext(CurrContext);
    const [defaultCurr, setDefaultCurr] = useState("USD");



    return(
        <main className="main_content_wrapper">
            <div>
                {/*<select type="text" value={defaultCurr}>*/}

                {/*</select>*/}
            </div>
        </main>
    )
}