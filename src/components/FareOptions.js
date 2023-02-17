import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import '../styles/FareOptions.scss'
import OfferCard from "./OfferCard";

const FareOptions = props => {


    const location = useLocation();
    const fares = location.state.fare;
    const passengers = location.state.passengers

    const numAscending = [...fares].sort((a, b) => a.total_amount - b.total_amount);
    const [slices, setSlices] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {

        const fetchedDataHandler = () => {
            fares.map(fare => {
                const transferredSlices = fare.slices.map(slice => {
                    return {
                        id: slice.id,
                        duration: slice.duration,
                        destination: slice.destination,
                        fare_brand_name: slice.fare_brand_name,
                        origin: slice.origin,
                        segments: slice.segments
                    }
                })
                return setSlices(transferredSlices)
            })
        };
        fetchedDataHandler();

    }, [])

    const convertCurrency = amount => {
        const us = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        return us.format(amount)
    };

    const convertDate = date => {
        return new Date(date).toLocaleTimeString('he-IL', {timeStyle: "short", hour12: false, timeZone: "UTC",});
    };

    const navigateToPassengersDetails = (id) => {
        return navigate(`/passengers`, {state: {id, passengers}})
    }

    return (
        <div className="fare-options--container">
            {numAscending.map(fare => (
                <div key={fare.id} style={{width: '300px', height: '500px', border: '1px solid black'}}>
                    <div>{fare.slices.map(slice => (
                        <div>
                            <p>{convertCurrency(fare.total_amount)}</p>
                            <p>{slice.id}</p>
                            <p>{fare.id}</p>
                        </div>
                    ))}</div>
                    <button onClick={() => navigateToPassengersDetails(fare.id)}>Continue</button>
                </div>
            ))}
        </div>
    );
};

export default FareOptions;
