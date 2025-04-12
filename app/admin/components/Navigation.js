"use client";

const Navigation = ({ handleNavClick, navClick }) => {
  const navItems = [
    "Inventory",
    "Discount",
    "Payment",
    "Reports",
    "User Management",
  ];

  return (
    <div className="bg-white border-r-[1px] w-[17vw] border-gray-400 flex flex-col justify-between text-black py-[15px] h-[100vh]">
      <div>
        <div className="pb-[15px] px-[30px]">
          <p className="text-[35px] font-bold">ADMIN</p>
        </div>
        <div>
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
        <div className="bg-gray-400 h-[0.5px]" />
        <p className="text-[11px] text-center mt-2">
          Copyright &copy; Codebug.lk. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Navigation;
