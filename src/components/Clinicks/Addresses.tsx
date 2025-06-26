"use client";
import Loading from "@/app/loading";
import { ManageClinicsContext } from "@/Context/ClinicContext";
import Card from "@/Ui/Card";
import { useContext, useEffect, useState } from "react";
import { MdAddLocation } from "react-icons/md";
import AddAddresses from "./AddAddresse";

export default function Addresses() {
    const { addresses, removeAddress, setAddressFilter, setCounter } = useContext(ManageClinicsContext);
    const [open, setOpen] = useState(false);
useEffect(() => {
        if (!addresses || addresses.length === 0) {
        setCounter((prev) => prev + 1); // ⬅️ هذا يجبر السياق على جلب البيانات
        }
}, []);
    const egyptGovernoratesEn = [
        "Cairo", "Giza", "Alexandria", "Dakahlia", "Red Sea", "Beheira", "Fayoum", "Gharbia", "Ismailia",
        "Menoufia", "Minya", "Qalyubia", "New Valley", "Suez", "Aswan", "Assiut", "Beni Suef", "Port Said",
        "Damietta", "Sharqia", "South Sinai", "Kafr El Sheikh", "Matrouh", "Luxor", "Qena", "North Sinai", "Sohag"
    ];

    return (
        <div className="p-8 min-h-screen bg-gradient-to-b from-white to-blue-50">
            <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">Addresses</h1>

            {/* ✅ التحقق من حالة البيانات */}
            {addresses === undefined || addresses === null ? (
                <Loading tex="Addresses" />
            ) : addresses.length === 0 ? (
                <div className="text-center text-gray-500 text-lg font-medium mt-12">
                    Addresses not Found
                </div>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {addresses.map((address) => {
                        const { addressId, addressLine1, city } = address;

                        return (
                            <Card
                                key={addressId}
                                className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition-shadow duration-300"
                            >
                                <li className="list-none flex flex-col items-start text-left space-y-2">
                                    <p className="text-lg font-semibold text-blue-900">Address #{addressId}</p>
                                    <p className="text-sm text-gray-700"><strong>Line:</strong> {addressLine1}</p>
                                    <p className="text-sm text-gray-600"><strong>City:</strong> {city}</p>
                                </li>
                                <div className="mt-4 flex justify-center">
                                    <button
                                        onClick={() => removeAddress(addressId)}
                                        className="flex items-center gap-2 text-red-600 hover:text-white border border-red-600 hover:bg-red-600 transition-all duration-300 px-4 py-1.5 rounded-md text-sm font-medium"
                                    >
                                        Delete Address
                                    </button>
                                </div>
                            </Card>
                        );
                    })}
                </ul>
            )}

            {/* زر إضافة عنوان */}
            <div className="fixed bottom-10 right-5 mt-8 text-center">
                <button
                    className="p-4 animate-pulse bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center mx-auto text-xl"
                    onClick={() => setOpen(true)}
                >
                    <MdAddLocation />
                </button>
            </div>

            {/* نافذة إضافة عنوان */}
            {open && <AddAddresses setOpen={setOpen} />}

            {/* فلتر العناوين حسب المحافظة */}
            <div className="fixed top-10 right-10 w-72 bg-white/15 border backdrop-blur-lg border-blue-200 shadow-xl rounded-xl p-6 z-10">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">Filter Addresses</h2>
                <select
                    onChange={(e) => {
                        setAddressFilter(e.target.value);
                        setCounter((prev) => prev + 1);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                >
                    <option value="">Select a governorate</option>
                    {egyptGovernoratesEn.map((gov) => (
                        <option key={gov} value={gov}>
                            {gov}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
