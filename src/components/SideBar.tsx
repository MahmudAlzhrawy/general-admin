"use client";
import { FaClinicMedical } from "react-icons/fa";       // عيادات طبية
import { GiForkKnifeSpoon } from "react-icons/gi";      // مطاعم
import { FaSchool } from "react-icons/fa";              // مدارس
import { FaHospitalAlt } from "react-icons/fa";         // مستشفيات
import { HiOutlineDocumentReport } from "react-icons/hi"; // ريبورت (تقارير)
import { FiSettings } from "react-icons/fi";            // إعدادات
import { FiLogOut } from "react-icons/fi";   
import { TiChevronRightOutline } from "react-icons/ti";
import ClinicDropdownList from "@/components/Clinicks/ClinicDropDownList"; 
import { useState } from "react";
export default function SideBar() {
const[toggleClinic, setToggleClinic] = useState(false);
const[toggleTow, setToggleTow] = useState(false);
const[toggleThree, setToggleThree] = useState(false);
const[toggleFour, setToggleFour] = useState(false);
const handleToggleClinic = () => {
    setToggleClinic(!toggleClinic);
}
const handleToggleTow = () => {
    setToggleTow(!toggleTow);
}
const handleToggleThree = () => {
    setToggleThree(!toggleThree);
}
const handleToggleFour = () => {
    setToggleFour(!toggleFour);
}

    return (
        <div className="sidebar pb-20 bg-blue-600/50 text-white w-64 h-full py-4">
            <h2 className="text-4xl font-serif text-gray-200 pb-10 text-center ">Dashboard</h2>
            <hr className="h-.5 bg-blue-500/50 border-transparent"/>
            <ul className="h-[95%]   relative flex flex-col "> 
                <li>
                    <a href="#" onClick={handleToggleClinic} >
                        <span>
                            <FaClinicMedical className="inline-block text-2xl mr-2 items-center text-white " />Clinics
                        </span>
                        <TiChevronRightOutline className={`${toggleClinic ?"rotate-90 ":""} duration-500 transform ml-2 inline-block text-sm mr-2 items-center text-white `} />
                    </a>
                    {toggleClinic && 
                    <>
                        <ClinicDropdownList  isOpen={toggleClinic} />
                    </>
                    }
                </li>
                <li>
                    <a href="#" onClick={handleToggleTow} >
                        <span>
                            <GiForkKnifeSpoon className="inline-block text-2xl mr-2 items-center text-white" />Restaurants
                        </span>
                        <TiChevronRightOutline className={`${toggleTow ?"rotate-90 ":""} duration-500 transform ml-2 inline-block text-sm mr-2 items-center text-white `} />
                    </a>
                </li>
                <li>
                    <a href="#" onClick={handleToggleThree} >
                        <span>
                            <FaSchool className="inline-block text-2xl mr-2 items-center text-white" />Schools
                        </span>
                        <TiChevronRightOutline className={`${toggleThree ?"rotate-90 ":""} duration-500 transform ml-2 inline-block text-sm mr-2 items-center text-white `} />
                    </a>
                </li>
                <li>
                    <a href="#" onClick={handleToggleFour} >
                        <span>
                            <FaHospitalAlt className="inline-block text-2xl mr-2 items-center text-white" />Hospitals
                        </span>
                        <TiChevronRightOutline className={`${toggleFour ?"rotate-90 ":""} duration-500 transform ml-2 inline-block text-sm mr-2 items-center text-white `} />
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span>
                            <HiOutlineDocumentReport className="inline-block text-2xl mr-2 items-center text-white" />Report
                        </span>
                    </a>
                </li>
                <li className=" flex justify-between items-center absolute bottom-0 left-0 right-0 px-4 py-2">
                    <a href="#">
                        <span>
                            <FiSettings className="inline-block text-2xl mr-2 text-white" />
                        </span>
                        Settings
                    </a>
                    <a href="#">
                        <span>
                            <FiLogOut className="inline-block text-2xl mr-2 text-white" />
                        </span>
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    );
}