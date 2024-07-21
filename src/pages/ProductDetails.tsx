import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { ProductContext } from "../contexts/ProductContext";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const productContext = useContext(ProductContext);
  const cartContext = useContext(CartContext);

  if (!productContext) {
    throw new Error("ProductDetails must be used within a ProductProvider");
  }

  if (!cartContext) {
    throw new Error("ProductDetails must be used within a CartProvider");
  }

  const { products } = productContext;
  const { addToCart } = cartContext;

  const product = products.find((item) => item.id === parseInt(id || '0'));

  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading...
      </section>
    );
  }

  const { title, price, description, image } = product;

  return (
    <section className="pt-32 pb-12 lg:py-32 h-screen flex items-center">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
            <img src={image} alt="" className="max-w-[200px] lg:max-w-sm" />
          </div>
        </div>
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
            {title}
          </h1>
          <div className="text-xl text-red-500 font-medium mb-6">$ {price}</div>
          <p className="mb-8">{description}</p>
          <button
            onClick={() => addToCart({ ...product, amount: 1 })}
            className="bg-black py-4 px-8 text-white"
          >
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;