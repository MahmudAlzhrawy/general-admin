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
import { useContext, useState } from "react";
import { RestoHosShcoContext } from "@/Context/resto_hos_shco_Context";
import { ManageClinicsContext } from "@/Context/ClinicContext";
import Link from "next/link";
export default function SideBar() {
const[toggleClinic, setToggleClinic] = useState(false);
const{
    setShowResto,setShowHospitals,setShowSchools,setShowAdminSettings,
    showHospitals,showResto,showSchools,showAdminSettings,

}=useContext(RestoHosShcoContext)
 const {
    setShowClinic,
    setShowDoctor,
    setShowAddress,
  }=useContext(ManageClinicsContext);
const handleToggleClinic = () => {
    setToggleClinic(!toggleClinic);
    setShowResto(false);
    setShowHospitals(false);
    setShowSchools(false);
    setShowAdminSettings(false);

}


    return (
        <div className="sidebar relative pb-2 bg-black/80 text-white  min-h-screen py-4">
            <h2 className="text-4xl font-serif text-gray-200 pb-10 text-center font-bold ">Dashboard</h2>
            <hr className="h-.5 bg-blue-500/50 border-transparent"/>
            <ul className="h-[95%] mb-10   relative flex flex-col "> 
                <li>
                    <a href="#" onClick={handleToggleClinic} >
                        <span>
                            <FaClinicMedical className="inline-block text-2xl mr-2 items-center text-white " />Clinics
                        </span>
                        <TiChevronRightOutline className={`${toggleClinic ?"rotate-90 ":""} duration-500 transform ml-2 inline-block text-sm mr-2 items-center text-white `} />
                    </a>
                    {toggleClinic && 
                    <div className="transform transition-all duration-700 ease-in-out">
                        <ClinicDropdownList  isOpen={toggleClinic} />
                    </div>
                    }
                </li>
                <li>
                    <a href="#Restaurants" className={`${showResto && "bg-white py-3 flex rounded-md  "}`} onClick={()=>{
                        setShowResto(true)
                        setShowSchools(false)
                        setShowHospitals(false)
                        setShowAdminSettings(false)
                        setToggleClinic(false)
                        setShowClinic(false)
                        setShowDoctor(false)
                        setShowAddress(false)
                    }
                        } >
                        <span className={`${showResto &&"text-black font-bold"}`}>
                            <GiForkKnifeSpoon className={`${showResto ?"text-black  inline-block text-2xl mr-2 items-center ":"text-white  inline-block text-2xl mr-2 items-center "}`} />Restaurants
                        </span>
                    </a>
                </li>
                <li >
                    <a href="#schools"  className={`${showSchools && "bg-white py-3 flex rounded-md  "}`} onClick={()=>{
                        setShowSchools(true)
                        setShowResto(false)
                        setShowHospitals(false)
                        setToggleClinic(false)
                        setShowAdminSettings(false)
                         setShowClinic(false)
                        setShowDoctor(false)
                        setShowAddress(false)
                }
                        }  >
                        <span className={`${showSchools &&"text-black font-bold"}`}>
                            <FaSchool className={`${showSchools ?"text-black  inline-block text-2xl mr-2 items-center ":"text-white  inline-block text-2xl mr-2 items-center "}`}  />Schools
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#hospitals" 
                    className={`${showHospitals && "bg-white py-3 flex rounded-md  "}`}
                    onClick={()=>{
                        setShowHospitals(true)
                        setShowSchools(false)
                        setShowResto(false)
                        setToggleClinic(false)
                        setShowAdminSettings(false)
                         setShowClinic(false)
                        setShowDoctor(false)
                        setShowAddress(false)
                    }
                        } >
                        <span className={`${showHospitals &&"text-black font-bold"}`}>
                            <FaHospitalAlt className={`${showHospitals?"text-black  inline-block text-2xl mr-2 items-center ":"text-white  inline-block text-2xl mr-2 items-center "}`}  />Hospitals
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span>
                            <HiOutlineDocumentReport className="inline-block text-2xl mr-2 items-center text-white" />Report
                        </span>
                    </a>
                </li>
            </ul>
                <div className=" flex justify-between items-center absolute  bottom-5  left-0 right-0 px-2  py-2">
                    <a href="#Admins"
                    className={`${showAdminSettings && "bg-white py-3  font-bold px-4 rounded-md text-black  "}`}
                    onClick={()=>{
                        setShowHospitals(false)
                        setShowSchools(false)
                        setShowResto(false)
                        setToggleClinic(false)
                        setShowAdminSettings(true)
                        setShowClinic(false)
                        setShowDoctor(false)
                        setShowAddress(false)
                    }}
                    >
                        <span>
                            <FiSettings className={`inline-block text-2xl mr-2 ${showAdminSettings ?"text-black": "text-white"}`} />
                        </span>
                        Settings
                    </a>
                    <Link href="/">
                        <span>
                            <FiLogOut className="inline-block text-2xl mr-2 text-white" />
                        </span>
                        Logout
                    </Link>
                </div>
        </div>
    );
}