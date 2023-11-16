import React, {useState, createContext} from "react";
import './App.css'
import Sidebar from "../Sidebar/Sidebar.jsx";
import {Outlet} from "react-router-dom";
import {CurrContext} from "../../context/currenciesContext.js"

function App() {
    const [currenciesWithDescriptions, setCurrenciesWithDescriptions] = useState([]);

    React.useEffect(() => {
        const options = {
            method: 'GET',
            params: {output: 'JSON'},
            headers: new Headers({
                'X-RapidAPI-Key': '16e4c76afbmsh8e0c9c357e50daap16e26djsn2aefdfa99426',
                'X-RapidAPI-Host': 'currencyapi-net.p.rapidapi.com'
            })
        };

        let fetchingProcessedFlag = false;
        fetch("https://currencyapi-net.p.rapidapi.com/currencies", options)
            .then(response => response.json())
            .then(data => {
                if(!fetchingProcessedFlag) {
                    if(typeof data === "object" && typeof data.currencies === "object") {
                        let currenciesArray = [];
                        for(let key in data.currencies) {
                            let obj = {code: key, title: data.currencies[key]};
                            currenciesArray.push(obj);
                        }
                        setCurrenciesWithDescriptions(currenciesArray);
                    }
                }
            })

        return function () {
            fetchingProcessedFlag = true;
        }
    }, [])



return (
    <CurrContext.Provider value={currenciesWithDescriptions}>
        <div className="layout_wrapper">
            <Sidebar/>
            <Outlet/>
        </div>
    </CurrContext.Provider>
    )
}

export default App
