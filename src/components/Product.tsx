// components/Product.tsx
import { useContext } from "react";
import { BsEyeFill, BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

interface ProductProps {
  product: {
    id: number;
    image: string;
    category: string;
    title: string;
    price: number;
  };
}

const Product = ({ product }: ProductProps) => {
  const context = useContext(CartContext);

  if (!context) {
    console.error(
      "CartContext is undefined. Make sure CartProvider is provided."
    );
    return null;
  }

  const { addToCart } = context;

  const { id, image, category, title, price } = product;

  const handleAddToCart = () => {
    addToCart({
      id,
      title,
      price,
      image,
      category,
      amount: 0,
    });
  };

  return (
    <div>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <img
              className="max-h-[160px] group-hover:scale-110 transition duration-300"
              src={image}
              alt={title}
            />
          </div>
          <div className="absolute top-6 -right-11 group-hover:right-5 gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button
              onClick={handleAddToCart}
              aria-label={`Add ${title} to cart`}
              title={`Add ${title} to cart`}
            >
              <div className="flex justify-center items-center text-white w-12 h-12 bg-red-500">
                <BsPlus className="text-3xl" />
              </div>
            </button>
            <Link
              to={`/product/${id}`}
              className="w-12 h-12 bg-white flex justify-center items-center text-black drop-shadow-xl"
            >
              <BsEyeFill />
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="text-sm capitalize text-gray-500 mb-1">{category}</div>
        <a href={`/product/${id}`}>
          <h2 className="font-semibold mb-1">{title}</h2>
        </a>
        <div className="font-semibold">$ {price}</div>
      </div>
    </div>
  );
};

export default Product;
