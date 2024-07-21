import { Link } from "react-router-dom";
import HeroImg from "../assets/images/hero.png";

const Hero = () => {
  return (
    <section className="bg-pink-200 h-[800px] bg-no-repeat bg-cover bg-center py-24">
      <div className="container mx-auto flex justify-around">
        <div className="flex flex-col justify-center">
          <div className="font-semibold flex items-center uppercase">
            <div className="w-10 h-[2px] bg-red-500 mr-3"></div>
            <h1>New Trend</h1>
          </div>
          <h1 className="text-[70px] leading-[1.1] font-light mb-4">
            SPRING SALE STYLISH <br />
            <span className="font-semibold">WOMENS</span>
          </h1>
          <Link
            to={"/"}
            className="self-start uppercase font-semibold border-b-2 border-black"
          >
            Discover More
          </Link>
        </div>
        <div className="hidden lg:block">
          <img
            src={HeroImg}
            alt=""
            className="max-h-[820px] xl:max-h-[705px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
