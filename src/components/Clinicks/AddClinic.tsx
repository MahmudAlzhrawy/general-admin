import * as Yup from 'yup';
import { ManageClinicsContext } from "@/Context/ClinicContext";
import { useFormik } from "formik";
import { Dispatch, SetStateAction, useContext } from "react";
import { IoClose } from "react-icons/io5";

export default function AddClinic({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
    const { addClinic, doctors, addresses } = useContext(ManageClinicsContext);

    const useformik = useFormik({
        initialValues: {
            clinicName: '',
            addressId: '',
            description: '',
            doctorId: '',
        },
        validationSchema: Yup.object({
            clinicName: Yup.string()
                .required('Clinic name is required')
                .min(3, 'Must be at least 3 characters'),
            addressId: Yup.number()
                .required('Address ID is required')
                .positive('Must be a positive number'),
            description: Yup.string()
                .required('Description is required')
                .min(10, 'Must be at least 10 characters'),
            doctorId: Yup.number()
                .required('Doctor ID is required')
                .positive('Must be a positive number'),
        }),
        onSubmit: async (values, { resetForm }) => {
            addClinic({
                clinicName: values.clinicName,
                addressId: Number(values.addressId),
                description: values.description,
                doctorId: Number(values.doctorId)
            });
            setOpen(false);
            resetForm();
        }
    });

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
            <div className="relative w-full max-w-md bg-white p-8 rounded-xl shadow-2xl animate-fade-in">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition duration-200"
                    onClick={() => setOpen(false)}
                >
                    <IoClose size={26} />
                </button>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">Add New Clinic</h2>

                {/* Form */}
                <form onSubmit={useformik.handleSubmit} className="space-y-5">
                    {/* Clinic Name */}
                    <div>
                        <label htmlFor="clinicName" className="block text-sm font-medium text-gray-700 mb-1">Clinic Name</label>
                        <input
                            type="text"
                            id="clinicName"
                            name="clinicName"
                            onChange={useformik.handleChange}
                            value={useformik.values.clinicName}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${useformik.touched.clinicName && useformik.errors.clinicName ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {useformik.touched.clinicName && useformik.errors.clinicName && (
                            <p className="text-red-500 text-xs mt-1">{useformik.errors.clinicName}</p>
                        )}
                    </div>

                    {/* Address ID */}
                    <div>
                        <label htmlFor="addressId" className="block text-sm font-medium text-gray-700 mb-1">Address ID</label>
                        <select
                            id="addressId"
                            name="addressId"
                            onChange={useformik.handleChange}
                            value={useformik.values.addressId}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${useformik.touched.addressId && useformik.errors.addressId ? 'border-red-500' : 'border-gray-300'}`}
                        >
                            <option value="">Select an address</option>
                            {addresses.map((address) => (
                                <option key={address.addressId} value={address.addressId}>
                                    {address.addressId} - {address.addressLine1}, {address.city}
                                </option>
                            ))}
                        </select>
                        {useformik.touched.addressId && useformik.errors.addressId && (
                            <p className="text-red-500 text-xs mt-1">{useformik.errors.addressId}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            onChange={useformik.handleChange}
                            value={useformik.values.description}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${useformik.touched.description && useformik.errors.description ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {useformik.touched.description && useformik.errors.description && (
                            <p className="text-red-500 text-xs mt-1">{useformik.errors.description}</p>
                        )}
                    </div>

                    {/* Doctor ID */}
                    <div>
                        <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700 mb-1">Doctor ID</label>
                        <select
                            id="doctorId"
                            name="doctorId"
                            onChange={useformik.handleChange}
                            value={useformik.values.doctorId}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${useformik.touched.doctorId && useformik.errors.doctorId ? 'border-red-500' : 'border-gray-300'}`}
                        >
                            <option value="">Select a doctor</option>
                            {doctors.map((doctor) => (
                                <option key={doctor.doctorId} value={doctor.doctorId}>
                                    {doctor.doctorId}-{doctor.doctorName} 
                                </option>
                            ))}
                        </select>
                        {useformik.touched.doctorId && useformik.errors.doctorId && (
                            <p className="text-red-500 text-xs mt-1">{useformik.errors.doctorId}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Add Clinic
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
