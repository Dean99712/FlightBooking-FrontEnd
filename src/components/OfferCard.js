import React, {useEffect, useState} from 'react';
import '../styles/OfferCard.scss'
import Card from "./Card";
import {useNavigate} from "react-router-dom";
import {end, parse} from "iso8601-duration";
import {duration} from "moment";
import SeatMapsModal from "./extras/SeatMapModal";
import {refType} from "@mui/utils";

const OfferCard = (props) => {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false);

    const [slices, setSlices] = useState([])
    const [passengers, setPassengers] = useState([])
    const [segments, setSegments] = useState([])
    const [segmentPassengers, setSegmentPassengers] = useState([])

    let [days, setDays] = useState('')
    let [hours, setHours] = useState('')
    let [minutes, setMinutes] = useState('')

    const convertToFullDate = date => {
        const time = new Date(date)
        const year = time.getFullYear()
        const month = time.toLocaleString('en-US', {month: "short"})
        const days = time.toLocaleString('en-US', {day: "2-digit"})
        return [month, days, year].join(' ');
    };

    const convertDate = date => {
        return new Date(date).toLocaleTimeString('he-IL', {timeStyle: "short", hour12: false, timeZone: "UTC",});
    };

    const convertCurrency = amount => {
        const us = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        return us.format(amount)
    };

    const convertDuration = (date) => {

        // const days = moment.duration(date).days()
        // const hours = moment.duration(date).hours()
        // const minutes = moment.duration(date).minutes()

        days = end(parse(date)).getUTCDay()
        hours = end(parse(date)).getUTCHours()
        minutes = end(parse(date)).getUTCMinutes()
        let time = {days, hours, minutes};
        const newTime = duration(time)
    };

    useEffect(() => {

        const fetchedDataHandler = () => {

            const transferredSlices = props.slices.map(slice => {
                return {
                    id: slice.id,
                    duration: slice.duration,
                    destination: slice.destination,
                    fare_brand_name: slice.fare_brand_name,
                    origin: slice.origin,
                    segments: slice.segments
                }
            })
            const transferredPassengers = props.passengers.map(passenger => {
                return {
                    id: passenger.id,
                    age: passenger.age,
                    family_name: passenger.family_name,
                    given_name: passenger.given_name,
                    type: passenger.type,
                }
            })
            setSlices(transferredSlices)
            setPassengers(transferredPassengers)
        };

        fetchedDataHandler();

    }, []);

    useEffect(() => {
        const fetchedSegmentsHandler = () => {

            props.slices.map(slice => {
                const transferredSegments = slice.segments.map(segment => {
                    return {
                        id: segment.id,
                        arriving_at: segment.arriving_at,
                        departing_at: segment.departing_at,
                        aircraft: segment.aircraft,
                        marketing_carrier: segment.marketing_carrier,
                        operating_carrier: segment.operating_carrier,
                        marketing_carrier_flight_number: segment.marketing_carrier_flight_number,
                        duration: segment.duration,
                        origin_terminal: segment.origin_terminal,
                        passengers: segment.passengers,
                        fare_brand_name: segment.fare_brand_name,
                        stops: segment.stops
                    }
                })
                return setSegments(transferredSegments);
            })
        }
        fetchedSegmentsHandler()
    }, [])

    useEffect(() => {

        const segmentPassengersHandler = () => {

            props.slices.map(slice => {
                slice.segments.map(segment => {
                    const transferredSegmentPassengers = segment.passengers.map(passenger => {
                        return {
                            cabin_class: passenger.cabin_class,
                            cabinClassMarketingName: passenger.cabin_class_marketing_name,
                            passenger_id: passenger.passenger_id
                        }
                    });
                    return setSegmentPassengers(transferredSegmentPassengers)
                })
                return true
            })
        }
        segmentPassengersHandler()
    }, []);

    const getFirstDepartureDate = (segments = []) => {
        const [{departing_at}] = segments
        return convertDate(departing_at)
    }
    const getLastArrivalDate = (array = []) => {
        let arriving_at = array[array.length - 1].arriving_at
        return convertDate(arriving_at)
    };

    const navigateToPassengersDetails = (id) => {
        return navigate(`/passengers`, {state: {id, passengers}})
    }

    return (
        <div>
            <div>
                {slices.map((slice) => (
                    <div className='FromAndTo'>
                        <Card key={slice.id} className="offer-card-container">
                            <p>{props.id}</p>
                            <div>
                                <div className="time">{getFirstDepartureDate(segments)}</div>
                                <p className="slice-title">{slice.origin.city_name}</p>
                                <p className="slice-title">{slice.origin.iata_code}</p>
                            </div>
                            <div>
                                <div>
                                    <p>{convertDuration(slice.duration)}</p>
                                </div>
                            </div>
                            <div>
                                <div className="time">{getLastArrivalDate(segments)}</div>
                                <p className="slice-title">{slice.destination.city_name}</p>
                                <p className="slice-title">{slice.destination.iata_code}</p>
                            </div>
                            <div className="offer-select-container">
                                <div className="amountAndCabinClass">
                                    <p className="slice-title">{slice.fare_brand_name}</p>
                                    <p className="slice-title">From</p>
                                    <p className="slice-title">{convertCurrency(props.totalAmount)}</p>
                                    <button className="btn btn-dark text-white"
                                            onClick={() => navigateToPassengersDetails(props.id)}>Select
                                        Offer
                                    </button>
                                </div>

                            </div>
                        </Card>
                    </div>
                ))
                }</div>
        </div>
    );
};

export default OfferCard;
