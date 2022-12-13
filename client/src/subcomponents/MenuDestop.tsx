import { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import {
  actionclosesidebar,
  actionopensidebar,
} from "../redux/actionCreator/actionCreateSidebar";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { Link, useNavigate } from "react-router-dom";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { Userinfo } from "../typeing";
import { axiospublic } from "../axios/configApi";
import { actionLogout } from "../redux/actionCreator/actionCreateAuth";
import InputSearch from "./InputSearch";
interface togglesidebar {
  sidebar: { toggle: boolean };
}

interface StateTypeAuth {
  auth: {
    accessToken: string | null | undefined;
    userInfo: Userinfo | null;
    isLoading: boolean;
    erroMessage: null | string;
  };
}
interface Props {
  isScrolled: boolean;
}
interface togglesidebar {
  sidebar: { toggle: boolean };
}
const MenuDesktop: React.FC<Props> = ({ isScrolled }) => {
  const dispatch: Dispatch<any> = useDispatch();
  const toggle = useSelector((state: togglesidebar) => state?.sidebar?.toggle);
  const user = useSelector((state: StateTypeAuth) => state?.auth?.userInfo);
  const navigate = useNavigate();
  const hanlerLogout = async () => {
    try {
      await axiospublic.get("/auth/logout");
      dispatch(actionLogout());
      navigate("/");
    } catch (error) {}
  };

  return (
    <>
      <div className="flex items-center space-x-2 md:space-x-10">
        <div className="flex-1 w-32 pl-2 ml-2 text-center">
          <Link
            to="/"
            className="cursor-pointer object-contain headerLink py-1 px-2 inline-block"
          >
            <h2
              className={`text-2xl font-semibold ${
                isScrolled ? "text-blue-700" : "text-blue-700"
              }`}
            >
              نماوا
            </h2>
          </Link>
        </div>
        <ul className="hidden space-x-4 p-0 m-0 md:flex">
          <li
            className={`headerLink ${
              isScrolled ? "hover:text-cyan-500" : null
            }`}
          >
            <Link to="/action">فیلم ها</Link>
          </li>
          <li
            className={`headerLink ${
              isScrolled ? "hover:text-cyan-500" : null
            }`}
          >
            <Link to="/comedy">سریال ها</Link>
          </li>
          {user?.username ? (
            <li
              className={`headerLink ${
                isScrolled ? "hover:text-cyan-500" : null
              }`}
            >
              <Link to="/mylist"> لیست من</Link>
            </li>
          ) : null}
          <li
            className={`hidden space-x-4 p-0 m-0 sm:flex headerLink ${
              isScrolled ? "hover:text-cyan-500" : null
            }`}
          >
            {user?.role === "admin" ? (
              <Link to="/dashboard">پنل کاربری</Link>
            ) : (
              <Link to="/dashboard/me">پنل کاربری</Link>
            )}
          </li>
          {/* {user?.username ? (
            <li
              className={`hidden space-x-4 p-0 m-0 sm:flex headerLink ${
                isScrolled ? "hover:text-cyan-500" : null
              }`}
            >
              <span className="text-blue-700	">{user?.username}</span>
            </li>
          ) : null} */}
          {user?.username ? (
            <li
              className={`hidden space-x-4 p-0 m-0 sm:flex headerLink ${
                isScrolled ? "hover:text-cyan-500" : null
              }`}
            >
              <span onClick={hanlerLogout} className="">
                خروج
              </span>
            </li>
          ) : null}
        </ul>
        <div className="space-x-4 p-0 m-0 md:hidden">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => dispatch(actionopensidebar())}
          />
        </div>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <div>
          <InputSearch />
        </div>
        {/* <HiMagnifyingGlass className="hidden h-6 w-6 sm:inline text-white" /> */}
        <div>
          <Link
            to="/account"
            className="text-white transiation ease-in-out hover:text-blue-700 duration-300"
          >
            خرید اشتراک
          </Link>
        </div>
        <div className=" text-white lg:border border-white  hover:text-white  font-bold uppercase py-1 px-1 lg:px-4 lg:py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
          {user?.username ? (
            <span>{user?.username}</span>
          ) : (
            <>
              <Link to="/login">
                <span className=" text-sm text-white">ورود</span>
              </Link>
              /
              <Link to="/register">
                <span className="text-sm text-white">ثبت نام</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MenuDesktop;
