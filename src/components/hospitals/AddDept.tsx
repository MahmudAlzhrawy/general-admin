    "use client";
    import { useFormik } from "formik";
    import * as Yup from "yup";
    import { useContext } from "react";
    import { RestoHosShcoContext } from "@/Context/resto_hos_shco_Context";
    import { IoClose } from "react-icons/io5";

    type AddDepart = {
    hospitalId: number;
    departmentName: string;
    };

    export default function AddDepartmentModal({ setOpen }: { setOpen: (v: boolean) => void }) {
    const { hospital, assigenDepToHos } = useContext(RestoHosShcoContext);

    const formik = useFormik<AddDepart>({
        initialValues: {
        hospitalId: 0,
        departmentName: "",
        },
        validationSchema: Yup.object({
        hospitalId: Yup.number().required("Please select a hospital"),
        departmentName: Yup.string().required("Department name is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
        await assigenDepToHos(values);
        resetForm();
        setOpen(false);
        },
    });

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center px-4">
        <div className="relative bg-white p-6 rounded-xl shadow-xl max-w-md w-full animate-fade-in">
            {/* Close Button */}
            <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
            <IoClose />
            </button>

            <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
            Assign Department to Hospital
            </h2>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* 🔹 Select Hospital */}
            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                Select Hospital
                </label>
                <select
                name="hospitalId"
                value={formik.values.hospitalId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                <option value="">Choose hospital</option>
                {hospital.map((h) => (
                    <option key={h.hospitalId} value={h.hospitalId}>
                    {h.hospitalName}
                    </option>
                ))}
                </select>
                {formik.touched.hospitalId && formik.errors.hospitalId && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.hospitalId}</p>
                )}
            </div>

            {/* 🔹 Department Name */}
            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                Department Name
                </label>
                <input
                type="text"
                name="departmentName"
                value={formik.values.departmentName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="e.g. Cardiology"
                />
                {formik.touched.departmentName && formik.errors.departmentName && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.departmentName}</p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
            >
                Assign Department
            </button>
            </form>
        </div>
        </div>
    );
    }
