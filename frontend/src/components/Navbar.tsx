import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold">
          Car Management
        </Link>
      </div>
      <div className="flex-none">
        <Link to="/products" className="btn btn-ghost">
          My Cars
        </Link>
        <Link to="/products/create" className="btn btn-primary">
          Add Car
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
