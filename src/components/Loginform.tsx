"use client"
import { useFormik } from "formik"
import { Toast } from "@/sweetalert"
import * as Yup from "yup"
import { useContext } from "react"

export default function LoginPage() {
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required')
        }),
        onSubmit: async (values) => {
            try {
                const log = await fetch(`http://citypulse.runasp.net/api/User/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                })
                if (!log.ok) {
                    throw new Error('Failed to log in')
                } else {
                    const response = await log.json()
                    if (response) {
                        localStorage.setItem('adminToken', response.token)
                        localStorage.setItem('adminId', JSON.stringify(response.id))

                        if (response.roles === "Admin" ) {
                            Toast.fire({
                                title: "Done",
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 2000
                            })
                            window.location.href = '/dashboard'
                        } else {
                            Toast.fire({
                                title: "This account is not authorized to login here!",
                                icon: 'warning',
                                showConfirmButton: false,
                                timer: 2000
                            })
                        }
                    } else {
                            Toast.fire({
                                title: "Failed",
                                icon: 'error',
                                showConfirmButton: false,
                            timer: 2000
                        })
                    }
                }
            } catch (e) {
                Toast.fire({
                    title: "An error occurred while trying to log in",
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2000
                })
                console.error('An error occurred while trying to log in', e)
            }
        }
    })

    return (
        <>
            <div className="container w-full h-screen mx-auto flex justify-center items-center bg-gray-100">
                <div className="formsec w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
                    <form onSubmit={formik.handleSubmit} className="w-full">
                        <h2 className="text-center text-4xl font-bold text-gray-800 tracking-tight mb-6">Login</h2>

                        <div className="form-group mb-5">
                            <input
                                className="w-full p-4 rounded-xl shadow-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                placeholder="Username"
                                type="text"
                                {...formik.getFieldProps('username')}
                            />
                            {formik.touched.username && formik.errors.username && (
                                <div className="error text-red-400 text-sm text-center font-semibold mt-2">{formik.errors.username}</div>
                            )}
                        </div>

                        <div className="form-group mb-5">
                            <input
                                className="w-full p-4 rounded-xl shadow-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                placeholder="Password"
                                type="password"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <div className="error text-red-400 text-sm text-center font-semibold mt-2">{formik.errors.password}</div>
                            )}
                        </div>

                        <button
                            className="w-full p-3 text-lg font-semibold bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
                            type="submit"
                            disabled={!formik.isValid}
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
