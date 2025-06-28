"use client";
import { useFormik } from 'formik';
import { Dispatch, SetStateAction, useContext } from 'react';
import { IoClose } from 'react-icons/io5';
import * as Yup from 'yup';
import { RestoHosShcoContext } from "@/Context/resto_hos_shco_Context";

export default function AddSchool({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
    const { AddSchool,Cities } = useContext(RestoHosShcoContext);

    const formik = useFormik({
        initialValues: {
            schoolName: '',
            location: '',
            phoneNumber: '',
            schoolType: '',
            cityCode: '',
            schoolImage: null,
            schoolDescription: '',
            openingHours: '',
            website: '',
        },
        validationSchema: Yup.object({
            schoolName: Yup.string().required('School name is required'),
            location: Yup.string().required('Location is required'),
            phoneNumber: Yup.string().required('Phone number is required'),
            schoolType: Yup.string().required('School type is required'),
            cityCode: Yup.string().required('City code is required'),
            schoolImage: Yup.mixed().nullable().required('Image is required'),
            schoolDescription: Yup.string().required('Description is required'),
            openingHours: Yup.string().required('Opening hours are required'),
            website: Yup.string().url('Enter a valid URL').required('Website is required'),
        }),
        onSubmit: (values, { resetForm }) => {
            AddSchool({
                SchoolName: values.schoolName,
                Location: values.location,
                PhoneNumber: values.phoneNumber,
                SchoolType: values.schoolType,
                CityCode: values.cityCode,
                SchoolImage: values.schoolImage,
                Description: values.schoolDescription,
                OpeningHours: values.openingHours,
                Website: values.website,
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
                <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Add New School</h1>

                <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* School Name */}
                    <div>
                        <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700">
                        School Name
                        </label>
                        <input
                        type="text"
                        id="schoolName"
                        name="schoolName"
                        onChange={formik.handleChange}
                        value={formik.values.schoolName}
                        className={`mt-1 block w-full p-2 border ${formik.errors.schoolName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        />
                        {formik.errors.schoolName && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.schoolName}</p>
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

                    {/* School Description */}
                    <div>
                        <label htmlFor="schoolDescription" className="block text-sm font-medium text-gray-700">
                        School Description
                        </label>
                        <input
                        type="text"
                        id="schoolDescription"
                        name="schoolDescription"
                        onChange={formik.handleChange}
                        value={formik.values.schoolDescription}
                        className={`mt-1 block w-full p-2 border ${formik.errors.schoolDescription ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        />
                        {formik.errors.schoolDescription && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.schoolDescription}</p>
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

                    {/* Website */}
                    <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                        Website
                        </label>
                        <input
                        type="text"
                        id="website"
                        name="website"
                        onChange={formik.handleChange}
                        value={formik.values.website}
                        className={`mt-1 block w-full p-2 border ${formik.errors.website ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        />
                        {formik.errors.website && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.website}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="schoolType" className="block text-sm font-medium text-gray-700 mb-1">School Type</label>
                        <select
                            id="schoolType"
                            name="schoolType"
                            onChange={formik.handleChange}
                            value={formik.values.schoolType}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.cityCode && formik.errors.cityCode ? 'border-red-500' : 'border-gray-300'}`}
                        >
                                <option value="">All Types</option>
                                <option value="Private">Private</option>
                                <option value="Government">Government</option>
                                <option value="International">International</option>
                        </select>
                        {formik.touched.schoolType&& formik.errors.schoolType && (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.schoolType}</p>
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
                    {/* School Image */}
                    <div className="md:col-span-2">
                        <label htmlFor="schoolImage" className="block text-sm font-medium text-gray-700">School Image</label>
                        <input
                            type="file"
                            id="schoolImage"
                            name="schoolImage"
                            onChange={(e) => formik.setFieldValue("schoolImage", e.currentTarget.files?.[0])}
                            className={`mt-1 block w-full p-2 border ${formik.errors.schoolImage ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        />
                        {formik.errors.schoolImage && (
                            <p className="text-red-500 text-xs mt-1">{formik.errors.schoolImage}</p>
                        )}
                    </div>

                    <div className="md:col-span-2 text-center mt-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300"
                        >
                            Add School
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
