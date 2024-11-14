import React from "react";
import { Link } from "react-router-dom";

interface Car {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={car.imageUrl} alt={car.title} className="w-full h-48 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{car.title}</h2>
        <p>{car.description}</p>
        <div className="card-actions justify-end">
          <Link to={`/products/${car.id}`} className="btn btn-primary btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
