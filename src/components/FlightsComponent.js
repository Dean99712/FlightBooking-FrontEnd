import React, {useState, useEffect} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong, faPlaneDeparture} from "@fortawesome/free-solid-svg-icons";
import Card from "./Card";
import '../styles/FlightsComponent.scss'
import CardSkeleton from "./CardSkeleton";

const FlightsComponent = () => {

    const [offers, setOffers] = useState([]);
    const [groupedOffers, setGroupedOffers] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [passengers, setPassengers] = useState();

    const location = useLocation()
    const navigate = useNavigate()
    const offerId = location.state.id;

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const response = await axios.get(`http://localhost:8080/api/offers/getOfferById/${offerId}`);
            setOffers(response.data.data);
            setIsLoading(false)
        };
        fetchData();

    }, []);

    useEffect(() => {

        const fetchedDataHandler = () => {

        }
        fetchedDataHandler();
    }, []);

    const convertCurrency = amount => {
        const us = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        return us.format(amount)
    };

    useEffect(() => {
        if (offers.length > 0) {
            const grouped = offers.reduce((acc, offer) => {
                const operatingName = offer?.slices[0]?.segments[0]?.operating_carrier?.name.replace(" ", "_")
                const flightNumber = offer?.slices[0]?.segments[0]?.operating_carrier_flight_number
                const key = `${operatingName}-${flightNumber}`;
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(offer);
                return acc;
            }, {});
            setGroupedOffers(grouped);
            handelPassengers()
        }
    }, [offers]);

    const convertDateToDigits = date => {
        const time = new Date(date).toLocaleTimeString('en-US', {
            timeStyle: "short",
            hour12: true,
            timeZone: "UTC",
        });
        return time.slice(0, -2)
    };

    const getDateTimeLetters = date => {
        const time = new Date(date).toLocaleTimeString('en-US', {
            timeStyle: "short",
            hour12: true,
            timeZone: "UTC",
        });
        return time.slice(-2)
    };

    const getDateDay = date => {
        return new Date(date).toLocaleString('en-US', {weekday: "short"});
    };

    const renderFirstOffer = (key, fares) => {
        const numAscending = [...groupedOffers[key]].sort((a, b) => a.total_amount - b.total_amount);
        const [...rest] = numAscending;
        const firstOffer = rest[0]

        const {
            slices: [{
                origin: {iata_code, city_name},
                duration,
                destination: {iata_code: iataCode, city_name: cityName},
                segments: [{
                    departing_at,
                    marketing_carrier: {
                        logo_symbol_url
                    }
                }]
            }]
        } = firstOffer;

        let arriving_at = firstOffer.slices.map(slice => slice.segments.map(segment => {
            return segment.arriving_at
        }))

        const [last] = arriving_at
        arriving_at = last[last.length -1]

        return <Card className="offers" key={firstOffer.id}>
            <div className="items flight-owner-details"
                 style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "start"}}>
                <img style={{height: '50px', width: '50px'}} src={logo_symbol_url} alt=""/>
                <p>{firstOffer.owner.name}</p>
            </div>
            <div className="items flight-destination-details">
                <p className="slice-day">{getDateDay(departing_at)}</p>
                <p className="slice-time">{convertDateToDigits(departing_at)}<span>{getDateTimeLetters(departing_at)}</span></p>
                <p className="slice-title">{city_name}</p>
            </div>
            <div className="items flight-duration">
                <span>Duration<p className="slice-time">{duration}</p></span>
                <a href="">Show Flight details</a>
                <div style={{display:"flex", gap:'1em', justifyContent:"space-evenly"}}>
                    <p className="slice-subtitle">{iata_code}</p>
                    <FontAwesomeIcon icon={faArrowRightLong}/>
                    <p className="slice-subtitle ">{iataCode}</p>
                </div>
            </div>
            <div className="items flight-origin-details">
                <p className="slice-day">{getDateDay(arriving_at)}</p>
                <p className="slice-time">{convertDateToDigits(arriving_at)}<span>{getDateTimeLetters(arriving_at)}</span></p>
                <p className="slice-title ">{cityName}</p>
            </div>
            <div className="items offer-select">
                <h6>Start from</h6>
                <h5>{convertCurrency(firstOffer.total_amount)}</h5>
                <button className="button-viewDeals"
                        onClick={() => navigateToPassengersDetails(fares)} > View deals
                </button>
            </div>
        </Card>
    };

    const handelPassengers = async () => {
        offers.map(offer => {
            const fetchedPassengers = offer?.passengers.map(passenger => {
                return {
                    id: passenger.id,
                    type: passenger.type,
                    givenName: passenger.given_name,
                    familyName: passenger.family_name,
                    age: passenger.age
                }
            })
            return setPassengers(fetchedPassengers)
        })

    }

    const navigateToPassengersDetails = (fare) => {
        navigate(`/fare_options`, {state: {fare, passengers}})
    };

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

    console.log(offers)

    return (
        <div className="flights-container--all">
            <div className="offers-container">
                <div className="offer-filter-container">
                    <div className="offers-filter">
                    </div>
                    <div className="offers-filter">
                    </div>
                </div>

                <div className="container">
                    {isLoading && <CardSkeleton cards={5}/>}
                    {!isLoading && renderTitle()}
                    {Object.entries(groupedOffers).map(([key, offers], index) => (
                        <div key={index}>
                            {renderFirstOffer(key, offers)}
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default FlightsComponent;
