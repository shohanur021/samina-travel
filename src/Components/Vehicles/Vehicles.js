import React from 'react';
import bike from '../../Components/Images/bike.png'
import train from '../../Components/Images/train.png'
import bus from '../../Components/Images/bus.png'
import car from '../../Components/Images/car.png'
import { useHistory } from 'react-router';

const Vehicles = () => {
  const history = useHistory();
  const handleSelection = (vehicle) => {
     history.push(`/vehicles/${vehicle}`);
   }
    return (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 w-100 mx-auto mt-5 pt-4">
          <div className="col">
            <div className="card  m-4 ">
            <img src={bike} onClick={() => handleSelection("bike")} className="card-img-top w-100 bg-light" alt="..."></img>
            </div>
          </div>
          <div className="col">
            <div className="card  m-4 ">
            <img src={car} onClick={() => handleSelection("car")} className="card-img-top w-100 bg-light" alt="..."></img>
            </div>
          </div>
          <div className="col">
            <div className="card  m-4 ">
            <img src={bus} onClick={() => handleSelection("bus")} className="card-img-top w-100 bg-light" alt="..."></img>
            </div>
          </div>
          <div className="col">
            <div className="card  m-4 ">
            <img src={train} onClick={() => handleSelection("train")} className="card-img-top w-100 bg-light" alt="..."></img>
            </div>
          </div>
        </div>
    );
};

export default Vehicles;
