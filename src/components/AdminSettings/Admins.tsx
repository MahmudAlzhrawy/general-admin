"use client";
import { useContext, useEffect, useState } from "react";
import { RestoHosShcoContext } from "@/Context/resto_hos_shco_Context";
import Card from "@/Ui/Card";
import Loading from "@/app/loading";
import { FaUserShield, FaUserCog } from "react-icons/fa"; // أيقونات
import AddAdmin from "./AddAdmin";
import MakeAdminForm from "./MakeAdmin";

export default function Admins() {
    const { Admins, removeAdmin, setAdminFilter, setAdCounter } = useContext(RestoHosShcoContext);
    const [open, setOpen] = useState(false);
    const [openMake, setOpenMake] = useState(false);
useEffect(() => {
    setAdminFilter('RestuarantStaff')
    if (!Admins || Admins.length === 0) {
    setAdCounter((prev) => prev + 1); // ⬅️ هذا يجبر السياق على جلب البيانات
    }
}, []);
    const handleAddAdmin = () => setOpen(true);
    const handleMakeAdmin = () => setOpenMake(true);

    return (
        <div className="relative p-8 min-h-screen bg-gradient-to-b from-white to-blue-50">
            <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">Admins</h1>

            {/* ✅ حالة تحميل / عرض / لا توجد بيانات */}
            {Admins === undefined || Admins === null ? (
                <Loading tex="Admins" />
            ) : Admins.length === 0 ? (
                <div className="text-center text-gray-500 text-lg font-medium mt-12">
                    Admins not Found
                </div>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Admins.map((admin) => {
                        const { id, userId, serviceId, serviceName,endDate } = admin;
                        return (
                            <Card
                                key={id}
                                className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition-shadow duration-300"
                            >
                                <li className="list-none flex flex-col items-center text-center">
                                    <FaUserShield className="text-4xl text-blue-600 mb-4" />
                                    <p className="text-lg font-semibold text-blue-900">Admin ID: {id}</p>
                                    <p className="text-sm text-gray-700">User ID: {userId}</p>
                                    <p className="text-sm text-blue-700">Service ID: {serviceId}</p>
                                    <p className="text-sm text-gray-600">Service Name: {serviceName}</p>
                                     <p className="text-sm text-blue-700">EndDate: {endDate}</p>
                                </li>
                                <div className="mt-4 flex justify-center">
                                    <button
                                        onClick={() => removeAdmin(id)}
                                        className="flex items-center gap-2 text-red-600 hover:text-white border border-red-600 hover:bg-red-600 transition-all duration-300 px-4 py-1.5 rounded-md text-sm font-medium"
                                    >
                                        Delete Admin
                                    </button>
                                </div>
                            </Card>
                        );
                    })}
                </ul>
            )}

            {/* ✅ أزرار إضافة وتعديل الأدمن */}
            <div className="fixed bottom-6 right-6 flex gap-4 z-50">
                <button
                    onClick={handleMakeAdmin}
                    title="Make Admin"
                    className="animate-pulse bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
                >
                    <FaUserCog className="text-xl" />
                </button>
                <button
                    onClick={handleAddAdmin}
                    title="Add Admin"
                    className="animate-pulse bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
                >
                    <FaUserShield className="text-xl" />
                </button>
            </div>

            {/* ✅ نوافذ الإضافة والتعديل */}
            {openMake && <MakeAdminForm setOpen={setOpenMake} />}
            {open && <AddAdmin setOpen={setOpen} />}

            {/* ✅ فلتر الأدمنات */}
            <div className="fixed top-10 right-10 w-72 bg-white/30 backdrop-blur-lg border border-blue-200 shadow-xl rounded-xl p-6 z-10">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">Filter Admins</h2>
                <select
                    onChange={(e) => {
                        setAdminFilter(e.target.value);
                        setAdCounter((prev) => prev + 1);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                >
                    <option value="RestuarantStaff">Restaurant Owner</option>
                    <option value="ClinicStaff">Clinic Admin</option>
                </select>
            </div>
        </div>
    );
}
