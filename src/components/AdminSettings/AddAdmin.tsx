"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import { RestoHosShcoContext } from "@/Context/resto_hos_shco_Context";
import { ManageClinicsContext } from "@/Context/ClinicContext";

interface Props {
setOpen: (open: boolean) => void;
}

export default function AddAdmin({ setOpen }: Props) {
const { AddAdmin, Restaurants } = useContext(RestoHosShcoContext);
const { clinics } = useContext(ManageClinicsContext);
const [adminToken, setAdminToken] = useState<string | null>(
localStorage.getItem("generaladminToken")
);

useEffect(() => {
setAdminToken(localStorage.getItem("generaladminToken"));
}, []);

const formik = useFormik({
initialValues: {
    username: "",
    userId: "",
    serviceId: "",
    serviceName: "",
    endDate: "",
},
validationSchema: Yup.object({
    username: Yup.string().required("Username is required"),
    userId: Yup.number().required("User ID is required"),
    serviceId: Yup.number().required("Service ID is required"),
    serviceName: Yup.string().required("Service Name is required"),
    endDate: Yup.date()
    .required("End Date is required")
    .min(new Date(), "End date must be in the future"),
}),
onSubmit: async (values, { resetForm }) => {
    const formattedDate = new Date(values.endDate);
    await AddAdmin({
    userId: Number(values.userId),
    serviceId: Number(values.serviceId),
    serviceName: values.serviceName,
    endDate: formattedDate,
    });
    resetForm();
    setOpen(false);
},
});

return (
<div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center px-2">
    <form
    onSubmit={formik.handleSubmit}
    className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6 space-y-6"
    >
    <h2 className="text-2xl font-bold text-blue-800 text-center">
        Add New Admin
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Username */}
        <div className="col-span-2">
        <label htmlFor="username" className="block font-medium text-blue-700">
            Username
        </label>
        <input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            onBlur={async (e) => {
            formik.handleBlur(e);
            const username = formik.values.username;
            try {
                const res = await fetch(
                `https://citypulse.runasp.net/api/Admin/GetUserByUsername?username=${username}`,
                {
                    method: "GET",
                    headers: {
                    Authorization: `Bearer ${adminToken}`,
                    },
                }
                );

                const data = await res.json();
                if (!res.ok || !data?.userId) {
                formik.setFieldTouched("username", true);
                formik.setFieldError("username", "User not found");
                formik.setFieldValue("userId", "");
                } else {
                formik.setFieldValue("userId", data.userId);
                }
            } catch (err) {
                formik.setFieldTouched("username", true);
                formik.setFieldError("username", "User not found");
                formik.setFieldValue("userId", "");
                console.log(err);
            }
            }}
            value={formik.values.username}
            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
        />
        {formik.touched.username && formik.errors.username && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.username}</p>
        )}
        </div>

        {/* Select Restaurant */}
        <div>
        <label className="block font-medium text-blue-700">Select Restaurant</label>
        <select
            onChange={(e) => formik.setFieldValue("serviceId", e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
        >
            <option value="">Choose a restaurant</option>
            {Restaurants.map((rest) => (
            <option key={rest.restaurantId} value={rest.restaurantId}>
                {rest.restaurantName} - #{rest.restaurantId}
            </option>
            ))}
        </select>
        </div>

        {/* Select Clinic */}
        <div>
        <label className="block font-medium text-blue-700">Select Clinic</label>
        <select
            onChange={(e) => formik.setFieldValue("serviceId", e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
        >
            <option value="">Choose a clinic</option>
            {clinics.map((clinic) => (
            <option key={clinic.clinicId} value={clinic.clinicId}>
                {clinic.clinicName} - #{clinic.clinicId}
            </option>
            ))}
        </select>
        </div>

        {/* User ID */}
        <div>
        <label htmlFor="userId" className="block font-medium text-blue-700">
            User ID
        </label>
        <input
            id="userId"
            name="userId"
            type="number"
            disabled
            value={formik.values.userId}
            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
        />
        </div>

        {/* Service ID */}
        <div>
        <label htmlFor="serviceId" className="block font-medium text-blue-700">
            Service ID
        </label>
        <input
            id="serviceId"
            type="number"
            name="serviceId"
            disabled
            value={formik.values.serviceId}
            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
        />
        </div>

        {/* Service Name */}
        <div>
        <label htmlFor="serviceName" className="block font-medium text-blue-700">
            Service Name
        </label>
        <select
            id="serviceName"
            name="serviceName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.serviceName}
            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
        >
            <option value="">Select Service Name</option>
            <option value="RestuarantStaff">Restuarant Owner</option>
            <option value="ClinicStaff">Clinic Admin</option>
        </select>
        {formik.touched.serviceName && formik.errors.serviceName && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.serviceName}</p>
        )}
        </div>

        {/* End Date */}
        <div>
        <label htmlFor="endDate" className="block font-medium text-blue-700">
            End Date
        </label>
        <input
            id="endDate"
            name="endDate"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.endDate}
            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2"
        />
        {formik.touched.endDate && formik.errors.endDate && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.endDate}</p>
        )}
        </div>
    </div>

    {/* Buttons */}
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
        Add Admin
        </button>
    </div>
    </form>
</div>
);
}
