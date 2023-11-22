import React, {useContext, useState} from "react";
import {CurrContext} from "../../context/currenciesContext.js";
import "./CurrenciesList.css";

export default function CurrenciesList() {
    const currenciesWithDescriptions = useContext(CurrContext);
    const [defaultCurr, setDefaultCurr] = useState({
        code: "USD",
        title: "United States Dollar"
    });
    const [rates, setRates] = useState([]);

    const [currWithTitles, setCurrWithTitles] = useState([]);
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        setLoading(true);
        if(currenciesWithDescriptions.length > 0) {
            fetch("https://api.vatcomply.com/rates?base=" + defaultCurr.code)
                .then(response => response.json())
                .then(data => {
                    if(typeof data === "object" && typeof data.rates === "object") {
                        let cutRates = Object.keys(data.rates);

                        let shortenedWithDesc = currenciesWithDescriptions.filter(currencyObj => {
                            return cutRates.includes(currencyObj.code);
                        })

                        setCurrWithTitles(shortenedWithDesc);
                        setRates(prevState => {
                            let tempRates = [];
                            for(const key in data.rates) {
                                tempRates.push({code: key, rate: data.rates[key]});
                            }
                            return tempRates.sort((a, b) => a.code.localeCompare(b.code));
                        });
                    }
                })
        }

        setTimeout(()=> {setLoading(false)}, 1000)
    }, [currenciesWithDescriptions, defaultCurr])

    const baseCurrencyOptions = currWithTitles.map((curr, i) => {
        return(
            <option key={i}>{curr.code}</option>
        )
    })

    const currInList = rates.map((currObj, i) => {
        return (
            <div className="curr_el_in_list" key={i}>
                <span>{currObj.code}:</span> <span>{currObj.rate < 0.01 ? currObj.rate.toFixed(4) : currObj.rate.toFixed(2)}</span>
            </div>
        )
    })

    function handleChangeDefaultCurr(e){
        const selectedCurrency = currenciesWithDescriptions.find(currEl => {
            return currEl.code === e.currentTarget.value;
        });

        if (selectedCurrency) {
            setDefaultCurr(selectedCurrency);
        }
    }

    return(
        <main className="curr_list_wrapper">
            <div className="default_currency_container">
                <div>
                    Please, select base currency
                </div>
                <select type="text" value={defaultCurr.code} onChange={handleChangeDefaultCurr}>
                    {baseCurrencyOptions}
                </select>
                <div className="default_currency_title">
                    {defaultCurr.title}
                </div>
            </div>
            <div className="curr_list_container">
                {loading ? "Loading..." : currInList}
            </div>
        </main>
    )
}