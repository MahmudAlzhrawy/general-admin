"use client";
import { useFormik } from 'formik';
import { Dispatch, SetStateAction, useContext } from 'react';
import { IoClose } from 'react-icons/io5';
import * as Yup from 'yup';
import { RestoHosShcoContext } from "@/Context/resto_hos_shco_Context";

export default function AddHospital({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
    const { AddHospital,Cities } = useContext(RestoHosShcoContext);

    const formik = useFormik({
        initialValues: {
            hospitalName: '',
            location: '',
            phoneNumber: '',
            description: '',
            wepsite: '',
            openingHours: '',
            hospitalType: '',
            cityCode: '',
            hospitalImage: null,
        },
        validationSchema: Yup.object({
            hospitalName: Yup.string().required('Hospital name is required'),
            location: Yup.string().required('Location is required'),
            phoneNumber: Yup.string().required('Phone is required'),
            description: Yup.string().required('Description is required'),
            wepsite: Yup.string().url('Enter valid URL').required('Website is required'),
            openingHours: Yup.string().required('Opening hours are required'),
            hospitalType: Yup.string().required('Hospital type is required'),
            cityCode: Yup.string().required('City code is required'),
            hospitalImage: Yup.mixed().nullable().required('Image is required'),
        }),
        onSubmit: (values, { resetForm }) => {
            AddHospital({
                HospitalName: values.hospitalName,
                Location: values.location,
                PhoneNumber: values.phoneNumber,
                Description: values.description,
                Wepsite: values.wepsite,
                OpeningHours: values.openingHours,
                HospitalType: values.hospitalType,
                CityCode: values.cityCode,
                HospitalImage: values.hospitalImage,
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
                <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Add New Hospital</h1>

                <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {/* Hospital Name */}
                    <div>
                        <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700">
                        Hospital Name
                        </label>
                        <input
                        type="text"
                        id="hospitalName"
                        name="hospitalName"
                        onChange={formik.handleChange}
                        value={formik.values.hospitalName}
                        className={`mt-1 block w-full p-2 border ${formik.errors.hospitalName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        />
                        {formik.errors.hospitalName && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.hospitalName}</p>
                        )}
                    </div>

                    {/* Location */}
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                        </label>
                        <input
                        type="text"
                        id="location"
                        name="location"
                        onChange={formik.handleChange}
                        value={formik.values.location}
                        className={`mt-1 block w-full p-2 border ${formik.errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        />
                        {formik.errors.location && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.location}</p>
                        )}
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                        Phone Number
                        </label>
                        <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        onChange={formik.handleChange}
                        value={formik.values.phoneNumber}
                        className={`mt-1 block w-full p-2 border ${formik.errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        />
                        {formik.errors.phoneNumber && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.phoneNumber}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                        </label>
                        <input
                        type="text"
                        id="description"
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        className={`mt-1 block w-full p-2 border ${formik.errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        />
                        {formik.errors.description && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.description}</p>
                        )}
                    </div>

                    {/* Website */}
                    <div>
                        <label htmlFor="wepsite" className="block text-sm font-medium text-gray-700">
                        Website
                        </label>
                        <input
                        type="text"
                        id="wepsite"
                        name="wepsite"
                        onChange={formik.handleChange}
                        value={formik.values.wepsite}
                        className={`mt-1 block w-full p-2 border ${formik.errors.wepsite ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        />
                        {formik.errors.wepsite && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.wepsite}</p>
                        )}
                    </div>

                    {/* Opening Hours */}
                    <div>
                        <label htmlFor="openingHours" className="block text-sm font-medium text-gray-700">
                        Opening Hours
                        </label>
                        <input
                        type="text"
                        id="openingHours"
                        name="openingHours"
                        onChange={formik.handleChange}
                        value={formik.values.openingHours}
                        className={`mt-1 block w-full p-2 border ${formik.errors.openingHours ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        />
                        {formik.errors.openingHours && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.openingHours}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="hospitalType" className="block text-sm font-medium text-gray-700 mb-1">Hospital Type</label>
                        <select
                            id="hospitalType"
                            name="hospitalType"
                            onChange={formik.handleChange}
                            value={formik.values.hospitalType}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.cityCode && formik.errors.cityCode ? 'border-red-500' : 'border-gray-300'}`}
                        >
                                <option value="">All Types</option>
                                <option value="Private">Private</option>
                                <option value="Government">Government</option>
                                
                        </select>
                        {formik.touched.hospitalType&& formik.errors.hospitalType && (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.hospitalType}</p>
                        )}
                    </div>
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
                    {/* Hospital Image (Full Width) */}
                    <div className="md:col-span-2">
                        <label htmlFor="hospitalImage" className="block text-sm font-medium text-gray-700">Hospital Image</label>
                        <input
                            type="file"
                            id="hospitalImage"
                            name="hospitalImage"
                            onChange={(e) => formik.setFieldValue("hospitalImage", e.currentTarget.files?.[0])}
                            className={`mt-1 block w-full p-2 border ${formik.errors.hospitalImage ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        />
                        {formik.errors.hospitalImage && <p className="text-red-500 text-xs mt-1">{formik.errors.hospitalImage}</p>}
                    </div>

                    <div className="md:col-span-2 text-center mt-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300"
                        >
                            Add Hospital
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
