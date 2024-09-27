import React from "react";
import { CarDetails } from "./CarModels";


interface CarCardProps {
    car: CarDetails;
}
export const CarCards: React.FC<CarCardProps> = ({ car }) => {
    return (
        <div className="car-card m-16">
            <div className=" ">
                <p>{car.bodyType}</p>
                <div className="flex-row">
                    <h3 className="font-medium link-plain">{car.modelName}</h3> <p className="px-4"> {car.modelType}</p>
                </div>
                <img className="img my-16 img-fluid"
                    src={car.imageUrl} alt={car.modelName}
                />
                <div className="">
                    <div className="flex gap-32 justify-center">
                        <a href={`#learn/${car.id}`} className="button-text text-accent-blue " data-color="accent">
                            Learn
                        </a>
                        <a href={`#shop/${car.id}`} className="button-text" data-color="accent">
                            Shop
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
