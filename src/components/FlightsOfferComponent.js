import React, {useEffect, useState} from 'react';
import '../styles/FlightsOfferComponent.scss'
import {useLocation} from "react-router-dom";
import OfferCard from "./OfferCard";
import CardSkeleton from "./CardSkeleton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlaneDeparture} from "@fortawesome/free-solid-svg-icons";
import SeatMapService from "../services/SeatMapService";
import {useQuery} from "@tanstack/react-query";
import FlightsComponent from "./FlightsComponent";

const FlightsOfferComponent = () => {

        const location = useLocation();
        const [offers, setOffers] = useState([]);
        const [error, setError] = useState(null);
        const [isLoading, setIsLoading] = useState(false);

        const offerId = location.state.id;

        useEffect(() => {
            fetchOffersHandler()
        }, []);

        async function fetchOffersHandler() {

            setIsLoading(true);

            const response = await fetch(`http://localhost:8080/api/offers/getOfferById/${offerId}`)
            const data = await response.json()
            const transferredData = data.data.map(offer => {
                return {
                    id: offer.id,
                    conditions: offer.conditions,
                    base_amount: offer.base_amount,
                    passengers: offer.passengers,
                    slices: offer.slices,
                    tax_amount: offer.tax_amount,
                    total_amount: offer.total_amount,
                    base_currency: offer.base_currency,
                    owner: offer.owner
                }
            });
            setOffers(transferredData);
            setIsLoading(false);
        }

        const renderTitle = () => {
            const originCityName = offers[0]?.slices[0]?.origin?.city_name
            const destinationCityName = offers[0]?.slices[0]?.destination?.city_name;
            return <div className="flights-selection">
                <div className="departure-type">
                    <FontAwesomeIcon icon={faPlaneDeparture}/><h5>Departure</h5>
                </div>
                <h3>{originCityName}<span>to</span>{destinationCityName}</h3>
            </div>
        };

        return (
            <div>
                <div className="offers-container">
                    <div className="container">
                        {isLoading && <CardSkeleton cards={5}/>}
                        {!isLoading && renderTitle()}
                        {offers?.map((offer, index) => (<span key={index}>
                            <FlightsComponent
                                id={offer.id}
                                offer={offer}
                                conditions={offer.conditions}
                                baseAmount={offer.base_amount}
                                passengers={offer.passengers}
                                slices={offer.slices}
                                taxAmount={offer.tax_amount}
                                totalAmount={offer.total_amount}
                                baseCurrency={offer.base_currency}
                            />
                            {/*<OfferCard*/}
                            {/*    id={offer.id}*/}
                            {/*    offer={offer}*/}
                            {/*    conditions={offer.conditions}*/}
                            {/*    baseAmount={offer.base_amount}*/}
                            {/*    passengers={offer.passengers}*/}
                            {/*    slices={offer.slices}*/}
                            {/*    taxAmount={offer.tax_amount}*/}
                            {/*    totalAmount={offer.total_amount}*/}
                            {/*    baseCurrency={offer.base_currency}*/}
                            {/*/>*/}
                             </span>))}
                    </div>
                </div>
            </div>
        );

    }
;

export default FlightsOfferComponent;
