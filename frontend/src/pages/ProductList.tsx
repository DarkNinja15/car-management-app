import React, { useState, useEffect } from "react";
import axios from "axios";
import CarCard from "../components/CardCard";

const ProductList: React.FC = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      const { data } = await axios.get(`/api/cars?search=${search}`);
      setCars(data);
    };
    fetchCars();
  }, [search]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Cars</h1>
      <input
        type="text"
        placeholder="Search cars..."
        className="input input-bordered w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
