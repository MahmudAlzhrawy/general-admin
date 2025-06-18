"use client";
import { ManageClinicsContext } from "@/Context/ClinicContext";
import { useContext } from "react";
import Addresses from "../Clinicks/Addresses";
import Clinics from "../Clinicks/Clinics";
import Doctors from "../Clinicks/Doctors";
import { RestoHosShcoContext } from "@/Context/resto_hos_shco_Context";
import Restaurants from "../Resturant/Resturatnts";
import Hospitals from "../hospitals/Hospitals";
import Schools from "../schools/Schools";
import Admins from "../AdminSettings/Admins";

export default function Content() {
  const {
    showAddress,
    showClinic,
    showDoctor,
  } = useContext(ManageClinicsContext);
  const{
    showHospitals,
    showResto,
    showSchools,
    showAdminSettings
  }=useContext(RestoHosShcoContext)
  return (
    <div className="page-content flex-1 p-4 bg-gray-100">
      {showAddress && <Addresses />}
      {showClinic && <Clinics />}
      {showDoctor && <Doctors />}
      {showResto&&<Restaurants/>}
      {showHospitals&&<Hospitals/>}
      {showSchools&&<Schools/>}
      {showAdminSettings&&<Admins/>}
      {/* {showLink && <LinkComponent />} */}
    {!showAddress && !showClinic && !showDoctor && !showSchools &&!showResto&&!showHospitals&&!showAdminSettings&&(
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg shadow-inner animate-fade-in">
    <div className="text-center px-6 py-10">
      <h1 className="text-5xl font-extrabold text-indigo-800 mb-4 drop-shadow-md animate-slide-in-down">
        Welcome to Your  System
      </h1>
      <p className="text-lg text-gray-700 mb-6 animate-fade-in">
        Choose a section from the sidebar to get started and manage your clinics, doctors, and more.
      </p>

      <div className="animate-bounce mt-10">
        <svg className="w-10 h-10 text-indigo-600 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
)}

    </div>
  );
}   