import './styles/App.scss';
import * as React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import BookFlightComponent from "./components/booking/BookFlightComponent";
import Header from "./components/Header";
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css';
import OrdersComponent from "./components/OrdersComponent";
import {SkeletonTheme} from "react-loading-skeleton";
import PassengersDetailsUpdateComponent from "./components/PassengersDetailsUpdateComponent";
import "react-loading-skeleton/dist/skeleton.css";
import FlightsComponent from "./components/FlightsComponent";
import './styles/FlightsOfferComponent.scss'
import FareOptions from "./components/FareOptions";
import Login from "./components/login/Login";

function App() {

    return (
        <div>
            <SkeletonTheme baseColor={"#b4b4b4"} highlightColor={"#e8e8e8"}>
                <Router>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<BookFlightComponent/>}></Route>
                        <Route path="/orders" element={<OrdersComponent/>}></Route>
                        <Route path="booking/flights" element={<FlightsComponent/>}></Route>
                        <Route path="/fare_options" element={<FareOptions/>}></Route>
                        <Route path="/passengers" element={<PassengersDetailsUpdateComponent/>}></Route>
                        <Route path="/login" element={<Login/>}></Route>-
                    </Routes>
                </Router>
            </SkeletonTheme>
        </div>
    );
}

export default App;
