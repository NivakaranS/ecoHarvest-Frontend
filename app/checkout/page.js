import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Max from "../components/Max";


const CheckoutPage = () => {
    return(
        <div>
            <Navigation/>
            <div className="pt-[15vh] w-[100%] flex items-center justify-center text-black">
                <div className="w-[95%] h-[100vh] ">
                    <p>This is the checkout</p>
                </div>
                </div>
            <Max/>
            <Footer/>

        </div>
    )
}

export default CheckoutPage;