import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductCreate: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files).slice(0, 10)); // Limit to 10 images
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    images.forEach((image) => formData.append("images", image));

    try {
      await axios.post("/api/cars", formData);
      navigate("/products");
    } catch (error) {
      console.error("Failed to create product", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create a New Car</h1>
      <form onSubmit={handleSubmit} className="form-control gap-4">
        <input
          type="text"
          placeholder="Title"
          className="input input-bordered"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="textarea textarea-bordered"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          className="input input-bordered"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          type="file"
          multiple
          accept="image/*"
          className="file-input file-input-bordered"
          onChange={handleImageUpload}
        />
        <button type="submit" className="btn btn-primary">
          Add Car
        </button>
      </form>
    </div>
  );
};

export default ProductCreate;
