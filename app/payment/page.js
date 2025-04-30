import Footer  from "../components/Footer"
import Navigation from "../components/Navigation"
const {useState} = require("react")


const Payment = () => {


    useEffect(() => {
        const fetchCart = async () => {
          if(!userLoggedIn) {
            return
          }
          try {
            console.log("iddd", id)
            const response2 = await axios.get(`http://localhost:8000/cart/${id}`);
                        setCart(response2.data.cart);
                        setProductsDetail(response2.data.products);
                        console.log("Product items fetched successfully:", response2.data.products);
                        console.log("Cart items fetched successfully:", response2.data.cart);
                        setNumberOfCartItems(response2.data.cart.products.length);
                        console.log("Length", response2.data.cart.products.length)
          } catch(errr) {
            console.log("Cart Empty")
    
          }
        }
    
        fetchCart();
    
      }, [id])
      
    const [numberOfCartItems, setNumberOfCartItems] = useState(0);
    return (
        <div>
            <Navigation numberOfCartItems={numberOfCartItems}/>
            <div className="h-[100vh] w-[100%]">

            </div>
            <Footer/>
        </div>
    )
}

export default Payment