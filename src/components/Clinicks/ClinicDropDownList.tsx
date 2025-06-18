"use client";
import { FaUserDoctor } from "react-icons/fa6";
import { FaClinicMedical, FaAddressCard } from "react-icons/fa";
import { useContext } from "react";
import { ManageClinicsContext } from "@/Context/ClinicContext";
import { useState, useEffect } from "react";

interface DropDownListProps {
  isOpen?: boolean;
}

export default function DropDownList({ isOpen }: DropDownListProps) {
  const {
    setShowClinic,
    setShowDoctor,
    setShowAddress,
  }=useContext(ManageClinicsContext);
const [activeTab, setActiveTab] = useState<string>("");

  // Load the active tab from localStorage on component mount
  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab") || "doctor";
    handleClick(savedTab);
  }, []);

  // Function to handle tab change
  const handleClick = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  // Styling for the list items
  const getLinkStyle = (tab: string) =>
    `flex items-center font-serif rounded p-2 transition duration-200 ${
      activeTab === tab
        ? "bg-white text-black font-bold shadow"
        : "text-white hover:bg-white/20"
    }`;
  return (
    <div
      className={`
        dropdown-list bg-white/15 shadow-lg rounded-lg w-[98%] px-4 py-4
        transform transition-all duration-700 ease-in-out
        ${isOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-10 opacity-0 pointer-events-none"}
      `}
    >
      <ul className="space-y-2">
        <li className="hover:bg-gray-100 p-2 rounded">
          <a 
          onClick={() => {
            handleClick("doctor");
            setShowClinic(false);
            setShowDoctor(true);
            setShowAddress(false);
          }}
          href="#doctors" 
          className={getLinkStyle("doctor")}>
            <span className="text-xl mr-2">
              <FaUserDoctor className="text-white" />
            </span>
            Doctors
          </a>
        </li>
        <li className="hover:bg-gray-100 p-2 rounded">
          <a 
          onClick={() => {
            handleClick("clinic");
            setShowClinic(true);
            setShowDoctor(false);
            setShowAddress(false);
          }}
          href="#Clinics" 
          className={getLinkStyle("clinic")}>
            <span className="text-xl mr-2">
              <FaClinicMedical className="text-white" />
            </span>
            Clinics
          </a>
        </li>
        <li className="hover:bg-gray-100 p-2 rounded">
          <a 
          onClick={() => {
            handleClick("address");
            setShowClinic(false);
            setShowDoctor(false);
            setShowAddress(true);
          }}
          href="#addresses" className={getLinkStyle("address")}>
            <span className="text-xl mr-2">
              <FaAddressCard className="text-white" />
            </span>
            Addresses
          </a>
        </li>
        
      </ul>
    </div>
  );
}
