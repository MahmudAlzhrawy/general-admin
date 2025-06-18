"use client";
import { RestoHosShcoContext } from '@/Context/resto_hos_shco_Context';
import { useFormik } from 'formik';
import { Dispatch, SetStateAction, useContext } from 'react';
import { IoClose } from 'react-icons/io5';
import * as Yup from 'yup';

export default function AddRestaurant({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
    const { AddResto,Cities } = useContext(RestoHosShcoContext);

    const formik = useFormik({
        initialValues: {
            restaurantName: '',
            location: '',
            phoneNumber: '',
            cusineType: '',
            restaurantImage: null,
            status: '',
            cityCode: '',
            restaurantDescription: '',
            deliveryFee: '',
        },
        validationSchema: Yup.object({
            restaurantName: Yup.string().required('Restaurant name is required'),
            location: Yup.string().required('Location is required'),
            phoneNumber: Yup.string().required('Phone number is required'),
            cusineType: Yup.string().required('Cuisine type is required'),
            restaurantImage: Yup.mixed().nullable().required('Image is required'),
            status: Yup.string().required('Status is required'),
            cityCode: Yup.string().required('City code is required'),
            restaurantDescription: Yup.string().required('Description is required'),
            deliveryFee: Yup.string().required('Delivery fee is required').min(0),
        }),
        onSubmit: async (values, { resetForm }) => {
            AddResto({
                RestaurantName: values.restaurantName,
                RestaurantDescription: values.restaurantDescription,
                RestaurantImage: values.restaurantImage,
                PhoneNumber: values.phoneNumber,
                Location: values.location,
                CusineType: values.cusineType,
                CityCode: values.cityCode,
                DeliveryFee: values.deliveryFee,
                Status: values.status
            });
            resetForm();
            setOpen(false);
        }
    });

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white p-6 rounded-lg shadow-2xl">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl"
                    onClick={() => setOpen(false)}
                >
                    <IoClose />
                </button>
                <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Add New Restaurant</h1>

                <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { name: 'restaurantName', label: 'Restaurant Name' },
                        { name: 'location', label: 'Location' },
                        { name: 'phoneNumber', label: 'Phone Number' },
                        { name: 'cusineType', label: 'Cuisine Type' },
                        { name: 'status', label: 'Status' },
                        { name: 'restaurantDescription', label: 'Description', type: 'textarea' },
                        { name: 'deliveryFee', label: 'Delivery Fee', type: 'number' }
                    ].map(({ name, label, type = 'text' }) => (
                        <div key={name}>
                            <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
                            {type === 'textarea' ? (
                                <textarea
                                    id={name}
                                    name={name}
                                    onChange={formik.handleChange}
                                    value={(formik.values as any)[name]}
                                    className={`mt-1 block w-full p-2 border ${(formik.errors as any)[name] ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                />
                            ) : (
                                <input
                                    type={type}
                                    id={name}
                                    name={name}
                                    onChange={formik.handleChange}
                                    value={(formik.values as any)[name]}
                                    className={`mt-1 block w-full p-2 border ${(formik.errors as any)[name] ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                />
                            )}
                            {(formik.errors as any)[name] && <p className="text-red-500 text-xs mt-1">{(formik.errors as any)[name]}</p>}
                        </div>
                    ))}
                        <div>
                        <label htmlFor="CityCode" className="block text-sm font-medium text-gray-700 mb-1">CityCode</label>
                        <select
                            id="CityCode"
                            name="cityCode"
                            onChange={formik.handleChange}
                            value={formik.values.cityCode}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.cityCode && formik.errors.cityCode ? 'border-red-500' : 'border-gray-300'}`}
                        >
                            <option value="">Select an City</option>
                            {Cities.map((city) => (
                                <option key={city.cityCode} value={city.cityCode}>
                                    {city.cityName} 
                                </option>
                            ))}
                        </select>
                        {formik.touched.cityCode&& formik.errors.cityCode && (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.cityCode}</p>
                        )}
                    </div>
                    {/* Restaurant Image */}
                    <div className="md:col-span-2">
                        <label htmlFor="restaurantImage" className="block text-sm font-medium text-gray-700">Restaurant Image</label>
                        <input
                            type="file"
                            id="restaurantImage"
                            name="restaurantImage"
                            onChange={(event) => {
                                formik.setFieldValue("restaurantImage", event.currentTarget.files?.[0]);
                            }}
                            className={`mt-1 block w-full p-2 border ${formik.errors.restaurantImage ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        />
                        {formik.errors.restaurantImage && (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.restaurantImage}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 text-center mt-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300"
                        >
                            Add Restaurant
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
