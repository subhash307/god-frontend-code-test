import "../public/css/styles.css";
import '@volvo-cars/css/font-face.css';
import '@volvo-cars/css/tokens.css';
import '@volvo-cars/css/styles_all-media.css';
import React from "react";
import { CarModels } from "../src/components/CarModels";

function HomePage() {
  return (
    <React.StrictMode>
      <CarModels />
    </React.StrictMode>
  );
}

export default HomePage;
