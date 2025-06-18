import * as Yup from 'yup';
import { ManageClinicsContext } from "@/Context/ClinicContext";
import { useFormik } from "formik";
import { Dispatch, SetStateAction, useContext } from "react";
import { IoClose } from "react-icons/io5";

export default function AddAddresses({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
    const { addAddress } = useContext(ManageClinicsContext);

    const egyptGovernoratesEn = [
        "Cairo", "Giza", "Alexandria", "Dakahlia", "Red Sea", "Beheira", "Fayoum", "Gharbia", "Ismailia",
        "Menoufia", "Minya", "Qalyubia", "New Valley", "Suez", "Aswan", "Assiut", "Beni Suef", "Port Said",
        "Damietta", "Sharqia", "South Sinai", "Kafr El Sheikh", "Matrouh", "Luxor", "Qena", "North Sinai", "Sohag"
    ];

    const useformik = useFormik({
        initialValues: {
            Address: '',
            city: '',
        },
        validationSchema: Yup.object({
            Address: Yup.string().required('Address is required'),
            city: Yup.string().required('City is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            addAddress({ Address: values.Address, city: values.city });
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
                <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">Add New Address</h2>

                {/* Form */}
                <form onSubmit={useformik.handleSubmit} className="space-y-5">
                    {/* Address Field */}
                    <div>
                        <label htmlFor="Address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                            type="text"
                            id="Address"
                            name="Address"
                            onChange={useformik.handleChange}
                            value={useformik.values.Address}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${useformik.touched.Address && useformik.errors.Address ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {useformik.touched.Address && useformik.errors.Address && (
                            <p className="text-red-500 text-xs mt-1">{useformik.errors.Address}</p>
                        )}
                    </div>

                    {/* City Select */}
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <select
                            id="city"
                            name="city"
                            onChange={useformik.handleChange}
                            value={useformik.values.city}
                            className={`w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${useformik.touched.city && useformik.errors.city ? 'border-red-500' : 'border-gray-300'}`}
                        >
                            <option value="">Select a city</option>
                            {egyptGovernoratesEn.map((gov) => (
                                <option key={gov} value={gov}>{gov}</option>
                            ))}
                        </select>
                        {useformik.touched.city && useformik.errors.city && (
                            <p className="text-red-500 text-xs mt-1">{useformik.errors.city}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Add Address
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
