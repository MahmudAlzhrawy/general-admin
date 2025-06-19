"use client";
import { ManageClinicsContext } from '@/Context/ClinicContext';
import { Toast } from '@/sweetalert';
import { useFormik } from 'formik';
import { Dispatch, SetStateAction, useContext } from 'react';
import { IoClose } from 'react-icons/io5';
import * as Yup from 'yup';

export default function AddDoctors({ setOpen }:{setOpen:Dispatch<SetStateAction<boolean>>}) {
    const {setCounter} =useContext(ManageClinicsContext);
    const useformik = useFormik({
        initialValues: {
            DoctorName: '',
            Specialization: '',
            ExperienceYears: '',
            AcademicDegree: '',
            Description: '',
            ProfileImage: null,
        },
        validationSchema: Yup.object({
            DoctorName: Yup.string().required('Doctor name is required'),
            Specialization: Yup.string().required('Specialization is required'),
            ExperienceYears: Yup.number().required('Experience years are required').min(0, 'Experience must be a positive number'),
            AcademicDegree: Yup.string().required('Academic degree is required'),
            Description: Yup.string().max(500, 'Description must be 500 characters or less'),
            ProfileImage: Yup.mixed().nullable().required('Profile image is required'),
        }),
        onSubmit:async (values,{resetForm}) => {
            const formData = new FormData();
            formData.append('DoctorName', values.DoctorName);
            formData.append('Specialization', values.Specialization);
            formData.append('ExperienceYears', values.ExperienceYears.toString());
            formData.append('AcademicDegree', values.AcademicDegree);
            formData.append('Description', values.Description);
            formData.append('ProfileImage', values.ProfileImage!);
            const res =await fetch(`https://citypulse.runasp.net/api/AdminClinic/AddNewDoctor`,{
                method: 'POST',
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('generaladminToken')}`,
                },
                body: formData,
            })
            if(res.ok){
                Toast.fire({
                    title: "Doctor added successfully",
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                })
                setCounter((prev) => prev + 1);
                console.log('Form submitted with values:', values);
                setOpen(false);
            }
            resetForm();
        }
    });

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
            <div className="relative w-full max-w-2xl bg-white p-6 rounded-lg shadow-2xl animate-fade-in">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl"
                    onClick={() => setOpen(false)} // غيّر هذا لاحقاً لإغلاق النافذة فعلياً
                >
                    <IoClose />
                </button>
                <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Add New Doctor</h1>
                <form onSubmit={useformik.handleSubmit} className="space-y-4">
                    {/* Doctor Name */}
                    <div>
                        <label htmlFor="DoctorName" className="block text-sm font-medium text-gray-700">Doctor Name</label>
                        <input
                            type="text"
                            id="DoctorName"
                            name="DoctorName"
                            onChange={useformik.handleChange}
                            value={useformik.values.DoctorName}
                            className={`mt-1 block w-full p-2 border ${useformik.errors.DoctorName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        />
                        {useformik.errors.DoctorName && <p className="text-red-500 text-xs mt-1">{useformik.errors.DoctorName}</p>}
                    </div>

                    {/* Specialization */}
                    <div>
                        <label htmlFor="Specialization" className="block text-sm font-medium text-gray-700">Specialization</label>
                        <input
                            type="text"
                            id="Specialization"
                            name="Specialization"
                            onChange={useformik.handleChange}
                            value={useformik.values.Specialization}
                            className={`mt-1 block w-full p-2 border ${useformik.errors.Specialization ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        />
                        {useformik.errors.Specialization && <p className="text-red-500 text-xs mt-1">{useformik.errors.Specialization}</p>}
                    </div>

                    {/* Experience Years */}
                    <div>
                        <label htmlFor="ExperienceYears" className="block text-sm font-medium text-gray-700">Experience Years</label>
                        <input
                            type="number"
                            id="ExperienceYears"
                            name="ExperienceYears"
                            onChange={useformik.handleChange}
                            value={useformik.values.ExperienceYears}
                            className={`mt-1 block w-full p-2 border ${useformik.errors.ExperienceYears ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        />
                        {useformik.errors.ExperienceYears && <p className="text-red-500 text-xs mt-1">{useformik.errors.ExperienceYears}</p>}
                    </div>

                    {/* Academic Degree */}
                    <div>
                        <label htmlFor="AcademicDegree" className="block text-sm font-medium text-gray-700">Academic Degree</label>
                        <input
                            type="text"
                            id="AcademicDegree"
                            name="AcademicDegree"
                            onChange={useformik.handleChange}
                            value={useformik.values.AcademicDegree}
                            className={`mt-1 block w-full p-2 border ${useformik.errors.AcademicDegree ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        />
                        {useformik.errors.AcademicDegree && <p className="text-red-500 text-xs mt-1">{useformik.errors.AcademicDegree}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="Description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="Description"
                            name="Description"
                            onChange={useformik.handleChange}
                            value={useformik.values.Description}
                            className={`mt-1 block w-full p-2 border ${useformik.errors.Description ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        />
                        {useformik.errors.Description && <p className="text-red-500 text-xs mt-1">{useformik.errors.Description}</p>}
                    </div>

                    {/* Profile Image */}
                    <div>
                        <label htmlFor="ProfileImage" className="block text-sm font-medium text-gray-700">Profile Image</label>
                        <input
                            type="file"
                            id="ProfileImage"
                            name="ProfileImage"
                            onChange={(event) => {
                                useformik.setFieldValue("ProfileImage", event.currentTarget.files?.[0]);
                            }}
                            className={`mt-1 block w-full p-2 border ${useformik.errors.ProfileImage ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                        />
                        {useformik.errors.ProfileImage && <p className="text-red-500 text-xs mt-1">{useformik.errors.ProfileImage}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
                        >
                            Add Doctor
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
