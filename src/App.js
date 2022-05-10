//! IMPORT DEPENDANCIES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.scss";
import Cookies from "js-cookie";
import axios from "axios";

//! IMPORT COMPONENTS
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Publish from "./containers/Publish";
import Payment from "./containers/Payment";

//! IMPORT FONTAWESOME
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faMagnifyingGlass,
    faToggleOff,
    faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import Header from "./components/Header/Header";
library.add(faMagnifyingGlass, faToggleOn, faToggleOff);

function App() {
    //**************************STATES *********************** */
    const [token, setToken] = useState(Cookies.get("userToken") || null);
    const [values, setValues] = useState([0, 500]);
    const [searchinput, setSearchinput] = useState("");
    const [sort, setSort] = useState("price-desc");
    const [switchPage, setSwitchPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [data, setData] = useState(); //! Request State
    const [isLoading, setIsLoading] = useState(true); //! Request State

    //********************NEED THIS FUNCTIONS  *******************/
    //! setUser function is used to create account, login & disconnect
    const setUser = (token) => {
        if (token !== null) {
            Cookies.set("userToken", token, { expires: 10 });
        } else {
            Cookies.remove("userToken");
        }
        setToken(token);
    };
    //*************************** REQUEST ***********************/
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://lereacteur-vinted-api.herokuapp.com/offers?title=${searchinput}&priceMax=${values[1]}&priceMin=${values[0]}&sort=${sort}&limit=${limit}&page=${switchPage}`
                );
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error.response);
            }
        };
        fetchData();
    }, [searchinput, values, sort, switchPage, limit]);
    //***************************END*************************** */
    return (
        <Router>
            <Header
                token={token}
                setUser={setUser}
                searchinput={searchinput}
                setSearchinput={setSearchinput}
                data={data}
                values={values}
                setValues={setValues}
                sort={sort}
                setSort={setSort}
            />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            data={data}
                            isLoading={isLoading}
                            searchinput={searchinput}
                            token={token}
                            switchPage={switchPage}
                            setSwitchPage={setSwitchPage}
                            setLimit={setLimit}
                            limit={limit}
                        />
                    }
                />
                <Route path="/offer/:id" element={<Offer />} />
                <Route path="/signup" element={<Signup setUser={setUser} />} />
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/publish" element={<Publish token={token} />} />
                <Route path="/payment" element={<Payment />} />
            </Routes>
        </Router>
    );
}

export default App;
