import { useState, useEffect } from "react";

const ProductModal = ({ isOpen, onClose, onSubmit, toastMessage }) => {
  const initialFormData = {
    name: "",
    subtitle: "",
    quantity: "",
    unitPrice: "",
    category: "Resell",
    productCategory_id: "",
    imageUrl: "",
    status: "In Stock",
    MRP: "",
  };

  const [formData, setFormData] = useState(initialFormData);
 const [productCategories, setProductCategories] = useState([]);

   useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:8000/productcategories");
        const data = await res.json();
        setProductCategories(data); 
      } catch (err) {
        console.error("Failed to fetch product categories", err);
      }
    };

    if (isOpen) fetchCategories();
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, resetForm);
  };

  if (!isOpen) return null;

  const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const uploadData = new FormData(); 
  uploadData.append("image", file);


  try {
    const res = await fetch("http://localhost:5000/predict", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Image prediction failed");
    console.log(res)
    const data = await res.json();

    setFormData((prev) => ({
      ...prev,
      productCategory_id: data.categoryId,
    }));
  } catch (err) {
    console.error("Prediction error:", err);
  }
};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
      <div className="bg-white p-6 rounded-md shadow-lg w-96 relative">
        <h2 className="text-lg font-semibold mb-4">Add New Product</h2>

        {toastMessage && (
          <div className="absolute -top-12 left-0 right-0 mx-auto w-fit bg-green-500 text-white px-4 py-2 rounded shadow-md">
            {toastMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Product Name"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            placeholder="Subtitle"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            placeholder="Quantity"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="unitPrice"
            value={formData.unitPrice}
            placeholder="Unit Price"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
          <select
            name="category"
            value={formData.category}
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          >
            <option value="Resell">Resell</option>
            <option value="Recycling">Recycling</option>
            <option value="Fertilizer">Fertilizer</option>
          </select>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded"
            onChange={handleFileUpload}
          />
          <select
            name="productCategory_id"
            value={formData.productCategory_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Product Category</option>
            {productCategories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            placeholder="Image URL"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="MRP"
            value={formData.MRP}
            placeholder="MRP"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />

          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
