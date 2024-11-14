import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

interface Car {
  id: string;
  title: string;
  description: string;
  tags: string;
  imageUrl: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      const { data } = await axios.get(`/api/cars/${id}`);
      setCar(data);
      setTitle(data.title);
      setDescription(data.description);
      setTags(data.tags);
    };
    fetchCar();
  }, [id]);

  const handleEdit = async () => {
    try {
      await axios.put(`/api/cars/${id}`, { title, description, tags });
      setIsEditing(false);
      navigate(`/products/${id}`);
    } catch (error) {
      console.error("Failed to update product", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/cars/${id}`);
      navigate("/products");
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  if (!car) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Car Details</h1>
      {isEditing ? (
        <div className="form-control gap-4">
          <input
            type="text"
            className="input input-bordered"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="textarea textarea-bordered"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            className="input input-bordered"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleEdit}>
            Save Changes
          </button>
        </div>
      ) : (
        <div>
          <img src={car.imageUrl} alt={car.title} className="w-full h-64 object-cover rounded-lg mb-4" />
          <h2 className="text-xl font-bold">{car.title}</h2>
          <p>{car.description}</p>
          <p className="text-sm text-gray-500">Tags: {car.tags}</p>
          <div className="mt-4 flex gap-2">
            <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="btn btn-error" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
