"use client";
import Loading from "@/app/loading";
import { ManageClinicsContext } from "@/Context/ClinicContext";
import Card from "@/Ui/Card";
import { useContext, useState,useEffect } from "react";
import { FaUserPlus } from "react-icons/fa6";
import AddDoctors from "./AddDoctors";

export default function Doctors() {
    const { doctors, removeDoctor,setCounter } = useContext(ManageClinicsContext);
    const [open, setOpen] = useState(false);
useEffect(() => {
    if (!doctors || doctors.length === 0) {
    setCounter((prev) => prev + 1); // ⬅️ هذا يجبر السياق على جلب البيانات
    }
}, []);
    const handleAddDoctor = () => {
        setOpen(true);
    };

    return (
 <div className="relative p-8 min-h-screen bg-gradient-to-b from-white to-blue-50">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">Our Doctors</h1>

            {/* ✅ التحقق من البيانات */}
            {doctors === undefined || doctors === null ? (
                <Loading tex="Doctors" />
            ) : doctors.length === 0 ? (
                <div className="text-center text-gray-500 text-lg font-medium mt-12">
                    No doctors found.
                </div>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctors.map((doctor) => {
                        const {
                            doctorId,
                            doctorName,
                            specialization,
                            experienceYears,
                            academicDegree,
                            description,
                            profileImage,
                        } = doctor;

                        return (
                            <Card
                                key={doctorId}
                                className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition-shadow duration-300"
                            >
                                <li className="list-none flex flex-col items-center text-center">
                                    <img
                                        src={`https://citypulse.runasp.net${profileImage}`}
                                        alt={doctorName}
                                        className="w-24 h-24 object-cover rounded-full mb-4 border-2 border-blue-300"
                                    />
                                    <p className="text-lg font-semibold text-blue-900">{doctorName}</p>
                                    <p className="text-sm text-blue-700">{specialization}</p>
                                    <p className="text-sm text-gray-600">{experienceYears} years experience</p>
                                    <p className="text-sm text-gray-600">{academicDegree}</p>
                                    <p className="text-sm text-gray-500 mt-2">{description}</p>
                                </li>
                                <div className="mt-4 flex justify-center">
                                    <button
                                        onClick={() => removeDoctor(doctorId)}
                                        className="flex items-center gap-2 text-red-600 hover:text-white border border-red-600 hover:bg-red-600 transition-all duration-300 px-4 py-1.5 rounded-md text-sm font-medium"
                                    >
                                        Delete {doctorName}
                                    </button>
                                </div>
                            </Card>
                        );
                    })}
                </ul>
            )}

            {/* 🔵 زر إضافة دكتور */}
            <button
                onClick={handleAddDoctor}
                className="fixed bottom-6 right-6 animate-pulse bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center z-50"
                title="Add Doctor"
            >
                <FaUserPlus className="text-xl" />
            </button>

            {/* 🔵 نافذة إضافة دكتور */}
            {open && <AddDoctors setOpen={setOpen} />}
        </div>
    );
}
