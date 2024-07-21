import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { BsBag } from "react-icons/bs";
import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const sidebarContext = useContext(SidebarContext);
  const cartContext = useContext(CartContext);

  if (!sidebarContext) {
    throw new Error("Header must be used within a SidebarProvider");
  }

  if (!cartContext) {
    throw new Error("Header must be used within a CartProvider");
  }

  const { isOpen, setIsOpen } = sidebarContext;
  const { itemAmount } = cartContext;

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${isActive ? 'bg-white py-4 shadow-md' : 'bg-none py-6'} fixed w-full z-10 transition-all`}>
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link to={`/`}>
          <div>
            <img className="w-[40px]" src={Logo} alt="Logo" />
          </div>
        </Link>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer flex relative"
        >
          <BsBag className="text-2xl" />
          <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
            {itemAmount}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;