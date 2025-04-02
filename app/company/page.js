import AllCategories from "../components/AllCategories";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Max from "../components/Max";
import Navigation from "../components/Navigation";
import PopularProducts from "../components/PopularProducts";
import TopSellers from "../components/TopSellers";
import YouMightLike from "../components/YouMightLike";

export default function Home() {
  return (
    <div>
      <Navigation />
      <Hero />
      Company Page
      <AllCategories />
      <TopSellers />
      <PopularProducts />
      <YouMightLike />
      <Max />
      <Footer />
    </div>
  );
}
