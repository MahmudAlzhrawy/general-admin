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
                    {[
                        'hospitalName', 'location', 'phoneNumber', 'description',
                        'wepsite', 'openingHours', 'hospitalType', 
                    ].map((field) => (
                        <div key={field}>
                            <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                                {field.replace(/([A-Z])/g, ' $1')}
                            </label>
                            <input
                                type="text"
                                id={field}
                                name={field}
                                onChange={formik.handleChange}
                                value={(formik.values as any)[field]}
                                className={`mt-1 block w-full p-2 border ${(formik.errors as any)[field] ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            />
                            {(formik.errors as any)[field] && (
                                <p className="text-red-500 text-xs mt-1">{(formik.errors as any)[field]}</p>
                            )}
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
