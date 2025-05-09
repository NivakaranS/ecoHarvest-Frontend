"use client";

const Navigation = ({ handleNavClick, navClick }) => {
  const navItems = [
    "Inventory",
    "Discount",
    "Payment",
    "Reports",
    "User Management",

    "Order Management",
    "Advertisements",
    "Profile Management"

  ];

  return (
    <div>
    <div className="bg-white border-r-[1px] w-[17vw] border-gray-400 flex flex-col justify-between text-black py-[15px] h-[100vh]">
      <div>
        <div className="pb-[15px] leading-[25px] mt-[20px] px-[30px]">

          <p className="text-[28px] font-bold">EcoHarvest</p>
          <p>ADMIN</p>
        </div>

          {navItems.map((item) => (
            <div
              key={item}
              onClick={handleNavClick}
              className={`${
                navClick === item ? "bg-gray-200" : "hover:bg-gray-100"
              } cursor-pointer py-[5px]`}
            >
              <div
                className={`${
                  navClick === item ? "border-l-4" : "ml-[14px]"
                } border-gray-700 ml-[10px] py-[5px] px-[25px]`}
              >
                <p>{item}</p>
              </div>

            </div>
          ))}
        </div>
      </div>
      <div>
       
      </div>
    </div>
  );
};

export default Navigation;
