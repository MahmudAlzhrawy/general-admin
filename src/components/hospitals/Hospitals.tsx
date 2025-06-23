"use client";
import Loading from "@/app/loading";
import { RestoHosShcoContext } from "@/Context/resto_hos_shco_Context";
import Card from "@/Ui/Card";
import { useContext, useEffect, useState } from "react";
import { FaHospital } from "react-icons/fa";
import AddHospital from "./Addhospital";

export default function Hospitals() {
    const { hospital, removeHospital, setHospitalFilter, setCounter, Cities } = useContext(RestoHosShcoContext);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!hospital || hospital.length === 0) {
            setCounter((prev) => prev + 1);
        }
    }, []);

    const handleAddHospital = () => {
        setOpen(true);
    };

    return (
        <div className="relative p-8 min-h-screen bg-gradient-to-b from-white to-blue-50">
            <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">Hospitals</h1>

            {/* حالة التحميل أو عدم وجود بيانات */}
            {hospital === undefined || hospital === null ? (
                <Loading tex="Hospitals" />
            ) : hospital.length === 0 ? (
                <div className="text-center text-gray-500 text-lg font-medium mt-12">
                No hospitals Found
                </div>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hospital.map((h) => {
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
                        } = h;

                        return (
                            <Card key={hospitalId} className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300">
                                <li className="list-none flex flex-col items-center text-center p-4">
                                    <img
                                        src={`https://citypulse.runasp.net/images/Hospitals/${hospitalImage}`}
                                        alt={hospitalName}
                                        className="w-28 h-28 object-cover rounded-full mb-4 border-4 border-blue-100 shadow-md"
                                    />
                                    <h2 className="text-xl font-bold text-blue-800">{hospitalName}</h2>
                                    <p className="text-sm text-blue-600 font-medium">Type: {hospitalType}</p>

                                    <div className="text-sm text-gray-700 mt-2 space-y-1">
                                        <p><strong>Location:</strong> {location}</p>
                                        <p><strong>Phone:</strong> {phoneNumber}</p>
                                        <p><strong>City Code:</strong> {cityCode}</p>
                                        <p><strong>Opening Hours:</strong> {openingHours}</p>
                                        {wepsite && (
                                            <p>
                                                <a
                                                    href={wepsite}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 underline hover:text-blue-700"
                                                >
                                                    Visit Website
                                                </a>
                                            </p>
                                        )}
                                    </div>

                                    <p className="mt-3 text-sm text-gray-500">{description}</p>

                                    <div className="mt-4">
                                        <button
                                            onClick={() => removeHospital(hospitalId)}
                                            className="text-red-600 border border-red-600 px-4 py-1 rounded-md hover:bg-red-600 hover:text-white transition duration-300 text-sm"
                                        >
                                            Delete {hospitalName}
                                        </button>
                                    </div>
                                </li>
                            </Card>
                        );
                    })}
                </ul>
            )}

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

            {/* فلترة المستشفيات حسب المحافظة */}
            <div className="fixed top-10 right-10 w-72 bg-white/30 backdrop-blur border border-blue-200 shadow-xl rounded-xl p-6 z-10">
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
