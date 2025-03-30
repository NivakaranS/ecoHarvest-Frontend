
import Product from "./Product";

const PopularProducts = () => {
    return(
        <div className="text-black min-h-[100vh] bg-[#F5F5F5] flex items-center justify-center">
            <div className="w-[94vw] h-[100%]">
                <div className="py-[5px] w-fit flex items-center justify-center text-[22px] pl-[35px] pr-[40px] rounded-l-[5px] rounded-tr-[5px] rounded-br-[35px] ">
                    <p className="text-[40px] text-gray-800 select-none">Popular Products</p>
                </div>

                <div className="flex items-center justify-center" >
                    <div className=" grid grid-cols-6 w-[95%] gap-[5px] pt-[15px] pb-[45px]">
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        
                    </div>
                </div>
                
            </div>
            

        </div>
    )
}

export default PopularProducts;