import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import MapContainer from '../MapContainer/MapContainer';
import './Result.css';
import { useParams } from 'react-router';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import MotorcycleRoundedIcon from '@material-ui/icons/MotorcycleRounded';
import TrainRoundedIcon from '@material-ui/icons/TrainRounded';

const Result = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showInfo, setShowInfo] = useState(false);
    const [location, setLocation] = useState({});
    const {vehicle} = useParams();
    const locationSubmit = data => {
        setShowInfo(true);
        setLocation(data);
    };
    console.log(location);
    let selectIcon;
    if(vehicle === 'car')   selectIcon = <DriveEtaIcon></DriveEtaIcon>;
    else if(vehicle === 'bus')   selectIcon = <AirportShuttleIcon></AirportShuttleIcon>;
    else if(vehicle === 'bike')   selectIcon = <MotorcycleRoundedIcon></MotorcycleRoundedIcon>;
    else  selectIcon = <TrainRoundedIcon></TrainRoundedIcon>;
 
    return (
        <div className="pick-and-map-container">
            {
                showInfo ?
                    <div className="information">
                        <ul>
                            <li> {location.pickFrom} </li>
                            <li> {location.pickTo} </li>
                        </ul>
                    <p>You are travelling by <span>{vehicle}</span>. {selectIcon}</p>
                    </div>
                    :
                    <form className="pick-container" onSubmit={handleSubmit(locationSubmit)}>
                        <label>Pick From</label>
                        <input {...register("pickFrom", { required: true })} />
                        {errors.pickFrom && <span className="error"><small>select your location</small></span>}
                        <label>Pick To</label>
                        <input {...register("pickTo", { required: true })} />
                        {errors.pickTo && <span className="error"><small>select your destination</small></span>}
                        <input type="submit" className="submitPick" />
                    </form>
            }
            <MapContainer className="mapShow"></MapContainer>

        </div>
    );
};

export default Result;