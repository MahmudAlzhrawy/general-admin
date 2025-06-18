    "use client";
    import { useFormik } from "formik";
    import * as Yup from "yup";
    import { useContext } from "react";
    import { RestoHosShcoContext } from "@/Context/resto_hos_shco_Context";

    interface Props {
    setOpen: (open: boolean) => void;
    }

    export default function MakeAdminForm({ setOpen }: Props) {
    const { MakeAdmin } = useContext(RestoHosShcoContext);
    const formik = useFormik({
        initialValues: {
        username: "",
        adminType: "",
        },
        validationSchema: Yup.object({
        username: Yup.string().required("Username is required"),
        adminType: Yup.string().required("Admin type is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            MakeAdmin({userName:values.username,adminType:values.adminType})
            resetForm();
        },
    });

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
        <form
            onSubmit={formik.handleSubmit}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6"
        >
            <h2 className="text-2xl font-bold text-blue-800 text-center">
            Make User Admin
            </h2>

            <div>
            <label htmlFor="username" className="block font-medium text-blue-700">
                Username
            </label>
            <input
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.username && formik.errors.username && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.username}</p>
            )}
            </div>

            <div>
            <label htmlFor="adminType" className="block font-medium text-blue-700">
                Admin Type
            </label>
            <select
                id="adminType"
                name="adminType"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.adminType}
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Select Admin Type</option>
                <option value="Admin">Admin</option>
                <option value="RestaurantStaff">RestaurantStaff</option>
                <option value="ClinicAdmin">ClinicAdmin</option>
            </select>
            {formik.touched.adminType && formik.errors.adminType && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.adminType}</p>
            )}
            </div>

            <div className="flex justify-between mt-6">
            <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-400 hover:bg-gray-100 text-gray-700"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                Make Admin
            </button>
            </div>
        </form>
        </div>
    );
    }
