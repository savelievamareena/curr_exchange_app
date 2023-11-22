import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Converter from "./components/Converter/Converter.jsx";
import CurrenciesList from "./components/CurrenciesList/CurrenciesList.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Converter/>,
            },
            {
                path: "currencies_list",
                element: <CurrenciesList/>
            }
        ],
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)


