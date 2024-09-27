import React, { useEffect, useState } from "react";
import { CarCards } from "./CarCards";
import CarFilterDropdown from "./CarFilterDropdown";

/**************
 * Author: Subhash Kumar 
 * Email: subhash.kumar307@gmail.com
 * Date: September 27, 2024
*
**************/


export interface CarDetails {
    id: string,
    modelName: string,
    bodyType: string,
    modelType: string,
    imageUrl: string
}

export const CarModels: React.FC = () => {
    const [models, setModels] = useState<CarDetails[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [carsPerPage, setCarsPerPage] = useState(4);
    const [selectedBodyType, setSelectedBodyType] = useState<string>('');


    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % models.length);
    };

    const goToPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + models.length) % models.length);
    };
    // const currentCars = models?.filter((car) => car.bodyType === selectedBodyType).slice(currentIndex, currentIndex + carsPerPage);
    let currentCars;
    if (selectedBodyType) {
        currentCars = models?.filter((car) => car.bodyType === selectedBodyType).slice(currentIndex, currentIndex + carsPerPage);
    } else {
        currentCars = models.slice(currentIndex, currentIndex + carsPerPage);
    }
    const remainingCars = carsPerPage - currentCars.length;
    const carsToShow = remainingCars > 0 ? [...currentCars, ...models.slice(0, remainingCars)] : currentCars;

    const handleResize = () => {
        if (window.innerWidth <= 480) {
            setCarsPerPage(1);
        } else if (window.innerWidth <= 768) {
            setCarsPerPage(2);
        } else {
            setCarsPerPage(4);
        }
    };


    useEffect(() => {
        fetch('api/cars.json')
            .then((response) => response.json())
            .then((data) => setModels(data))
            .catch((error) => console.error('Error fetching data:', error));


        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);


    }, []);

    const uniqueBodyTypes = [...new Set(models.map((car) => car.bodyType))];

    return (
        <div className="container">
            <h1>All models</h1>
            <hr />

            {/* Dropdown to filter the car based on the body type */}
            <div className="gap-16 flex-row justify-end items-center mb-16">
                <div className="">
                    <b>Select car model:</b>
                </div>
                <div className="w-xs">
                    <CarFilterDropdown
                        uniqueBodyTypes={uniqueBodyTypes}
                        selectedBodyType={selectedBodyType}
                        onBodyTypeChange={(bodyType: string) => {
                            setSelectedBodyType(bodyType);
                            setCurrentIndex(0); 
                        }}
                    />
                </div>
            </div>

            {/* It will show the list of all the available cars*/}
            <div className="card-wrapper" style={{ display: 'flex', justifyContent: 'space-between' }}>
                {carsToShow.map((car) => (
                    <CarCards key={car.id} car={car} />
                ))}
            </div>
            {/* Previous and next button to see other cars*/}
            <div className="gap-16 flex-row justify-end items-center mb-16" >
                <button onClick={goToPrev} className="btn btn-outline-primary flex justify-end item-center">
                    <svg viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                        <path d="M9 1.5L5 5.5 9 9.5" fill="none" stroke="#1c6bba" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </button>

                <button onClick={goToNext} className="btn btn-outline-primary flex justify-end item-center" style={{ marginLeft: '20px' }}>
                    <svg viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                        <path d="M2 1.5l4 4-4 4" fill="none" stroke="#1c6bba" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </button>
            </div>

        </div>


    );
};
