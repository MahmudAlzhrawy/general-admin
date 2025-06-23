"use client";
import Loading from "@/app/loading";
import { RestoHosShcoContext } from "@/Context/resto_hos_shco_Context";
import Card from "@/Ui/Card";
import { useContext, useState } from "react";
import { FaHospital } from "react-icons/fa";
import AddHospital from "./Addhospital"; // تأكد من إنشاء هذا الملف

export default function Hospitals() {
    const { hospital, removeHospital,setHospitalFilter,setCounter ,Cities} = useContext(RestoHosShcoContext);
    const [open, setOpen] = useState(false);

    const handleAddHospital = () => {
        setOpen(true);
    };

    return (
        <div className="relative p-8 min-h-screen bg-gradient-to-b from-white to-blue-50">
            <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">Hospitals</h1>

            {hospital.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hospital.map((hospital) => {
                        const {
                            hospitalId,
                            hospitalName,
                            location,
                            description,
                            phoneNumber,
                            wepsite,
                            openingHours,
                            hospitalImage,
                            hospitalType,
                            cityCode,
                        } = hospital;

                        return (
                            <Card key={hospitalId} className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition-shadow duration-300">
                                <li className="list-none flex flex-col items-center text-center">
                                    <img
                                        src={`https://citypulse.runasp.net/images/Hospitals/${hospitalImage}`}
                                        alt={hospitalName}
                                        className="w-24 h-24 object-cover rounded-full mb-4 border-2 border-blue-300"
                                    />
                                    <p className="text-lg font-semibold text-blue-900">{hospitalName}</p>
                                    <p className="text-sm text-blue-700">Type: {hospitalType}</p>
                                    <p className="text-sm text-gray-600">Location: {location}</p>
                                    <p className="text-sm text-gray-600">Phone: {phoneNumber}</p>
                                    <p className="text-sm text-gray-600">City Code: {cityCode}</p>
                                    <p className="text-sm text-gray-600">Hours: {openingHours}</p>
                                    <p className="text-sm text-blue-600 underline">
                                        <a href={wepsite} target="_blank" rel="noopener noreferrer">
                                            Visit Website
                                        </a>
                                    </p>
                                    <p className="text-sm text-gray-500 mt-2">{description}</p>
                                </li>
                                <div className="mt-4 flex justify-center">
                                    <button
                                        onClick={() => removeHospital(hospitalId)}
                                        className="flex items-center gap-2 text-red-600 hover:text-white border border-red-600 hover:bg-red-600 transition-all duration-300 px-4 py-1.5 rounded-md text-sm font-medium"
                                    >
                                        Delete {hospitalName}
                                    </button>
                                </div>
                            </Card>
                        );
                    })}
                </ul>
            ) : hospital === undefined || hospital === null ? (
                            <Loading tex="Hopitals" />
                        ):(
                        <div className="text-center text-gray-500 text-lg font-medium mt-12">
                            Hospitals not Found
                        </div>  )
            }

            {/* زر إضافة مستشفى */}
            <button
                onClick={handleAddHospital}
                className="fixed bottom-6 right-6 animate-pulse bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center z-50"
                title="Add Hospital"
            >
                <FaHospital className="text-xl" />
            </button>

            {/* نافذة إضافة مستشفى */}
            {open && <AddHospital setOpen={setOpen} />}
             {/* Hospital Filter by Governorate */}
            <div className="fixed top-10  right-10 w-72 bg-white/15 border border-blue-200 shadow-xl rounded-xl p-6 z-10">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Filter Hospitals</h2>
            
            <select
                onChange={(e) => {
                setHospitalFilter(e.target.value);
                setCounter((prev) => prev + 1);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
                <option value="">Select a governorate</option>
                {Cities.map((gov) => (
                <option key={gov.cityName} value={gov.cityCode}>
                    {gov.cityName}
                </option>
                ))}
            </select>
        </div>
        </div>
    );
}
