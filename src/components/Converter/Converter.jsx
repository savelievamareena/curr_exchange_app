import React, {useContext, useState} from "react";
import "./Converter.css";
import {CurrContext} from "../../context/currenciesContext.js";

export default function Converter() {
    const currenciesWithDescriptions = useContext(CurrContext);
    const [rates, setRates] = useState({});

    const [currenciesFrom, setCurrenciesFrom] = useState([]);
    const [currenciesTo, setCurrenciesTo] = useState([]);

    const [selectedFromIndex, setSelectedFromIndex] = useState(0);
    const [selectedToIndex, setSelectedToIndex] = useState(1);

    const [amountToConvert, setAmountToConvert] = useState("");
    const [conversionResult, setConversionResult] = useState(0);

    React.useEffect(() => {
        if(currenciesWithDescriptions.length > 0) {
            fetch("https://api.vatcomply.com/rates?base=USD")
                .then(response => response.json())
                .then(data => {
                    if(typeof data === "object" && typeof data.rates === "object") {
                        let cutRates = Object.keys(data.rates);

                        let shortenedWithDesc = currenciesWithDescriptions.filter(currencyObj => {
                            return cutRates.includes(currencyObj.code);
                        })

                        setCurrenciesFrom(shortenedWithDesc);
                        setCurrenciesTo(shortenedWithDesc);

                        setRates(data.rates);
                    }
                })
        }
    }, [currenciesWithDescriptions])

    function handleChangeFrom(e) {
        let currentCurrencyIndex = currenciesFrom.findIndex(currency => {
            return currency.code === e.currentTarget.value
        });
        setSelectedFromIndex(currentCurrencyIndex);
    }

    function handleChangeTo(e) {
        let currentCurrencyIndex = currenciesTo.findIndex(currency => {
            return currency.code === e.currentTarget.value
        })
        setSelectedToIndex(currentCurrencyIndex);
    }

    function handleAmountChange(value) {
        setAmountToConvert(value);
    }

    function handleConvert(e) {
        let rateToUsd = 1 / rates[currenciesFrom[selectedFromIndex].code];
        let rateFromUsd = rates[currenciesTo[selectedToIndex].code];

        let result = amountToConvert * rateToUsd * rateFromUsd;
        let displayOptions = result * 100 < 1 ? +result.toFixed(5) : +result.toFixed(2)
        setConversionResult(displayOptions);
    }

    function switchCurrencies() {
        let tempSelectedTo = selectedFromIndex;
        setSelectedFromIndex(selectedToIndex);
        setSelectedToIndex(tempSelectedTo);
        setConversionResult(0);
    }

    let currenciesFromSelectEl = currenciesFrom.map((curr, i) => (
        <option value={curr.code} key={i}>
            {curr.code}
        </option>
    ))

    let currenciesToSelectEl = currenciesTo.map((curr, i) => (
        <option value={curr.code} key={i}>
            {curr.code}
        </option>
    ))

    return(
        <main className="main_content_wrapper">
            <div className="currencies_selects_container">
                <div>
                    <input type="text" placeholder="Enter amount" value={amountToConvert} onChange={(e) => handleAmountChange(e.currentTarget.value)} />
                </div>
                <div className="select_label_container">
                    <select name="from" id="currency_from" onChange={handleChangeFrom} value={currenciesFrom[selectedFromIndex]?.code}>
                        {currenciesFromSelectEl}
                    </select>
                    <div className="label_div">
                        {currenciesFrom[selectedFromIndex]?.title}
                    </div>
                </div>
                <div className="to_switch_container">
                    <span>TO</span>
                    <button type="button" className="switch_button" onClick={switchCurrencies}>switch</button>
                </div>
                <div className="select_label_container">
                    <select name="from" id="currency_to" onChange={handleChangeTo} value={currenciesTo[selectedToIndex]?.code}>
                        {currenciesToSelectEl}
                    </select>
                    <div className="label_div">
                        {currenciesTo[selectedToIndex]?.title}
                    </div>
                </div>
            </div>
            <div className="result_wrapper">
                {conversionResult > 0 ? conversionResult : ""}
            </div>
            <div>
                <button type="button" onClick={handleConvert}>Convert</button>
            </div>
        </main>
    )
}