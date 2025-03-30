import Image from "next/image";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import AllCategories from "./components/AllCategories";
import TopSellers from "./components/TopSellers";
import PopularProducts from "./components/PopularProducts";
import Footer from "./components/Footer";
import YouMightLike from "./components/YouMightLike";
import Max from "./components/Max";

export default function Home() {
  return (
    <div >
      <Navigation />
      <Hero />
      <AllCategories/>
      <TopSellers/>
      <PopularProducts/>
      <YouMightLike/>
      <Max/>
      <Footer/>

    </div>
  );
}
