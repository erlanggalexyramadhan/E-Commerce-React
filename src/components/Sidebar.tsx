import { useContext } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { IoArrowForward } from "react-icons/io5";
import { CartContext } from "../contexts/CartContext";
import CartItem from "./CartItem";
import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const sidebarContext = useContext(SidebarContext);
  const cartContext = useContext(CartContext);

  if (!sidebarContext) {
    throw new Error("Sidebar must be used within a SidebarProvider");
  }

  if (!cartContext) {
    throw new Error("Sidebar must be used within a CartProvider");
  }

  const { isOpen, handleClose } = sidebarContext;
  const { cart, clearCart, total, itemAmount } = cartContext || { cart: [] };

  return (
    <div
      className={`fixed top-0 w-full bg-white h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] z-20 px-4 lg:px-[35px] transition-all duration-300 ease-in-out ${
        isOpen ? "right-0" : "-right-full"
      }`}
    >
      <div className="flex justify-between items-center py-6 border-b">
        <div className="uppercase text-sm font-semibold">Shopping Bag ({itemAmount})</div>
        <div
          onClick={handleClose}
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
        >
          <IoArrowForward className="text-2xl" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 h-[520px] lg:h-[640px] overflow-y-auto overflow-x-hidden border-b">
        {cart.map((item) => {
          return <CartItem item={item} key={item.id} />;
        })}
      </div>
      <div className="flex flex-col gap-y-3 py-4 mt-4">
        <div className="flex w-full justify-between items-center">
          <div className="uppercase font-semibold">
            <span className="mr-2">Total:</span>$ {total.toFixed(2)}
          </div>
          <div
            onClick={clearCart}
            className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
          >
            <FiTrash2 />
          </div>
        </div>
        <Link to="/" className="bg-gray-200 flex p-4 justify-center items-center text-black w-full font-medium">
          View cart
        </Link>
        <Link  to="/" className="bg-black flex p-4 justify-center items-center text-white w-full font-medium">
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
