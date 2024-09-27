import React, { useState } from "react";

interface CarFilterDropdownProps {
    uniqueBodyTypes: string[];
    selectedBodyType: string;
    onBodyTypeChange: (bodyType: string) => void;
}

const CarFilterDropdown: React.FC<CarFilterDropdownProps> = ({ uniqueBodyTypes, selectedBodyType, onBodyTypeChange }) => {
    return (
        <select value={selectedBodyType} onChange={(e) => onBodyTypeChange(e.target.value)} style={{height:"auto"}}>
            <option value="">All</option> 
            {uniqueBodyTypes.map((bodyType) => (
                <option key={bodyType} value={bodyType}>
                    {bodyType}
                </option>
            ))}
        </select>
    );
};

export default CarFilterDropdown;
