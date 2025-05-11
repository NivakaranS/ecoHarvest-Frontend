import { useState } from "react";
import axios from "axios";

const ProductModal = ({ isOpen, onClose, onSubmit, toastMessage }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setSelectedFile(null);
    setPrediction(null);
    setError(null);
    setPreview(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setError('Only JPG/PNG files are allowed');
        setSelectedFile(null);
        setPreview(null);
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('File size exceeds 5MB');
        setSelectedFile(null);
        setPreview(null);
        return;
      }

      setSelectedFile(file);
      setError(null);
      setPrediction(null);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError('Please select an image');
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null);

    const imageFormData = new FormData();
    imageFormData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/predict', imageFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setPrediction(response.data);
      // Update form data with prediction results
      setFormData(prev => ({
        ...prev,
        name: response.data.label,
        productCategory_id: response.data.category
      }));
    } catch (err) {
      setError(err.response?.data?.detail || 'Error processing image');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, resetForm);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center text-black justify-center bg-black bg-opacity-50 z-40">
      <div className="bg-white h-[90vh] w-[50vw] overflow-y-scroll p-6 rounded-md shadow-lg w-96 relative">
        <h2 className="text-lg font-semibold mb-4">Add New Product</h2>

        {toastMessage && (
          <div className="absolute -top-12 left-0 right-0 mx-auto w-fit bg-green-500 text-white px-4 py-2 rounded shadow-md">
            {toastMessage}
          </div>
        )}

        <div className="space-y-4">
          {/* Image Classification Form */}
          <form onSubmit={handleImageSubmit} className="space-y-2">
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="max-w-xs rounded-md shadow-md"
              />
            )}
            <button
              type="submit"
              disabled={loading || !selectedFile}
              className={`w-full py-2 px-4 rounded-md text-white font-semibold
                ${loading || !selectedFile ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? 'Processing...' : 'Classify Image'}
            </button>
          </form>

          {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {prediction && (
            <div className="p-4 bg-green-100 text-green-700 rounded-md">
              <h2 className="font-semibold">Prediction Results:</h2>
              <p>Food: {prediction.label}</p>
              <p>Category: {prediction.category}</p>
             
            </div>
          )}

          {/* Product Form */}
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
              type="text"
              name="productCategory_id"
              value={formData.productCategory_id}
              placeholder="Product Category ID"
              className="w-full p-2 border rounded"
              onChange={handleChange}
              required
            />
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
    </div>
  );
};

export default ProductModal;