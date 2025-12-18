import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

   const navigate = useNavigate();

  useEffect(() => {
    if (!query) return;

    setLoading(true);

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/product/search?q=${query}`)
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [query]);

  const handleClick = (item) => {
    navigate(`/tshirt/${item._id}`, { state: item });
  };

  return (
    <div className="px-6 sm:px-10 py-10">
      <h2 className="text-2xl font-bold mb-6">
        Search results for:{" "}
        <span className="text-pink-600">{query}</span>
      </h2>

      {/* LOADING */}
      {loading && <p className="text-gray-500">Loading products...</p>}

      {/* NO RESULTS */}
      {!loading && products.length === 0 && (
        <p className="text-gray-500">No products found.</p>
      )}

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {products.map((item) => (
          <div
            key={item._id}
            className="border rounded-xl shadow hover:shadow-lg transition p-4"
          >
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/${item.image[0]}`}
              alt={item.name}
              className="w-full h-56 object-cover rounded-lg"
            />

            <h3 className="mt-3 font-semibold text-lg truncate">
              {item.name}
            </h3>

            <p className="text-gray-600 mt-1">₹{item.price}</p>

            <button
              className="mt-3 w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
               onClick={() => handleClick(item)}
            >
              View Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
