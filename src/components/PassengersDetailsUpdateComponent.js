import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import '../styles/PassengersDetailsComponent.scss'
import axios from "axios";

const PassengersDetailsUpdateComponent = () => {

    const [givenName, setGivenName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const loyaltyProgrammeAccounts = [{
        airline_iata_code: "null",
        account_number: "null"
    }]
    const location = useLocation();

    const passengers = location.state.passengers

    const capitalize = (type = toString()) => {
        return type[0].toUpperCase().concat(type.substring(1));
    };

    const handelSubmit = async (e, id) => {

        e.preventDefault()

        async function updateRequestPassengers() {

            const offerId = location.state.id

            try {
                await axios.patch(`http://localhost:8080/api/offers/offer/${offerId}/passengers/${id}`,
                    {
                        data: {
                            given_name: givenName,
                            family_name: familyName,
                            loyalty_programme_accounts: loyaltyProgrammeAccounts
                        }
                    })
            } catch (error) {
                console.log(error)
            }
        }

        console.log(id)
        await updateRequestPassengers();
    }

    return (
        <div className='passenger-details-containerAll'>
            <h2>Passenger Details</h2>
            {passengers.map((passenger, index) => (
                <div key={index}>
                    <form onSubmit={(e) => handelSubmit(e, passenger.id)}>
                        <div className="form-passenger-details">
                            <div className="passenger-type">
                                <h5 className="passengerType">{capitalize(passenger.type)} {index + 1}</h5>
                            </div>
                            <section className="passenger-details">
                                <label className="">Title</label>
                                <select>
                                    <option autoCapitalize="true" value=""></option>
                                    <option value="mr">Mr</option>
                                    <option value="ms">Ms</option>
                                    <option value="dr">Dr</option>
                                    <option value="prof">Prof</option>
                                </select>
                                <div className="div">
                                    <label htmlFor="">First Name {givenName}</label>
                                    <input className="form-input" onChange={(e) => setGivenName(e.target.value)}
                                           type="text"/>
                                </div>

                                <div className="div">
                                    <label htmlFor="">Last Name</label>
                                    <input className="form-input" onChange={(e) => setFamilyName(e.target.value)}
                                           type="text"/>
                                </div>

                                <div className="div">
                                    <label htmlFor="">Date of Birth</label>
                                    <input className="form-input" type="date"/>
                                </div>
                                <div className="someDiv">
                                    <h6>Gender</h6>
                                    <span>
                                        <input className="form-input" name="gender" value="m" type="radio"/>
                                         <label>Male</label>
                                        <input className="form-input" name="gender" value="f" type="radio"/>
                                        <label>Female</label>
                                    </span>
                                </div>
                            </section>
                        </div>
                        <button className="btn btn-dark text-white" type={"submit"}>Submit</button>
                    </form>
                </div>
            ))}
        </div>
    );
};

export default PassengersDetailsUpdateComponent;
