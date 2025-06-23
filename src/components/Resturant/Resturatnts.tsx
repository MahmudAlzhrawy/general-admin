"use client";
import Loading from "@/app/loading";
import { RestoHosShcoContext } from "@/Context/resto_hos_shco_Context";
import Card from "@/Ui/Card";
import { useContext, useEffect, useState } from "react";
import { FaUtensils } from "react-icons/fa";
import AddRestaurant from "./AddResto";

export default function Restaurants() {
    const { resto, removeResto, setRestoFilter, setCounter, Cities } = useContext(RestoHosShcoContext);
    const [open, setOpen] = useState(false);
useEffect(() => {
    if (!resto || resto.length === 0) {
    setCounter((prev) => prev + 1); // ⬅️ هذا يجبر السياق على جلب البيانات
    }
}, []);
    const handleAddRestaurant = () => {
        setOpen(true);
    };

    return (
        <div className="relative p-8 min-h-screen bg-gradient-to-b from-white to-blue-50">
            <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">Restaurants</h1>

            {/* حالة تحميل البيانات */}
            {resto === undefined || resto === null ? (
                <Loading tex="Restaurants" />
            ) : resto.length === 0 ? (
                <div className="text-center text-gray-500 text-lg font-medium mt-12">
                    لا توجد مطاعم حالياً.
                </div>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resto.map((rest) => {
                        const {
                            restaurantId,
                            restaurantName,
                            location,
                            phoneNumber,
                            cusineType,
                            restaurantImage,
                            status,
                            restaurantDescription,
                            deliveryFee,
                        } = rest;

                        return (
                            <Card key={restaurantId} className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition-shadow duration-300">
                                <li className="list-none flex flex-col items-center text-center">
                                    <img
                                        src={`https://citypulse.runasp.net/images/Restaurants/${restaurantImage}`}
                                        alt={restaurantName}
                                        className="w-24 h-24 object-cover rounded-full mb-4 border-2 border-blue-300"
                                    />
                                    <p className="text-lg font-semibold text-blue-900">{restaurantName}</p>
                                    <p className="text-sm text-blue-700">Cuisine: {cusineType}</p>
                                    <p className="text-sm text-gray-600">Location: {location}</p>
                                    <p className="text-sm text-gray-600">Phone: {phoneNumber}</p>
                                    <p className="text-sm text-gray-600">Status: {status}</p>
                                    <p className="text-sm text-gray-600">Delivery Fee: {deliveryFee} EGP</p>
                                    <p className="text-sm text-gray-500 mt-2">{restaurantDescription}</p>
                                </li>
                                <div className="mt-4 flex justify-center">
                                    <button
                                        onClick={() => removeResto(restaurantId)}
                                        className="flex items-center gap-2 text-red-600 hover:text-white border border-red-600 hover:bg-red-600 transition-all duration-300 px-4 py-1.5 rounded-md text-sm font-medium"
                                    >
                                        Delete {restaurantName}
                                    </button>
                                </div>
                            </Card>
                        );
                    })}
                </ul>
            )}

            {/* زر إضافة مطعم */}
            <button
                onClick={handleAddRestaurant}
                className="fixed bottom-6 right-6 animate-pulse bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center z-50"
                title="Add Restaurant"
            >
                <FaUtensils className="text-xl" />
            </button>

            {/* نافذة إضافة مطعم */}
            {open && <AddRestaurant setOpen={setOpen} />}

            {/* فلترة حسب المحافظة */}
            <div className="fixed top-10 right-10 w-72 bg-white/15 border border-blue-200 shadow-xl rounded-xl p-6 z-10">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">Filter Restaurants</h2>
                <select
                    onChange={(e) => {
                        setRestoFilter(e.target.value);
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
