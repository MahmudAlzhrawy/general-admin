    "use client";
    import Loading from "@/app/loading";
    import { ManageClinicsContext } from "@/Context/ClinicContext";
    import Card from "@/Ui/Card";
    import { useContext, useState } from "react";
    import { FaClinicMedical} from "react-icons/fa";
import AddClinic from "./AddClinic";

    export default function Clinics() {
    const { clinics,removeClinic} = useContext(ManageClinicsContext);
        const[open, setOpen] = useState(false);
    return (
        <div className="p-8 min-h-screen bg-gradient-to-b from-white to-blue-50">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">
            Our Clinics
        </h1>

        {clinics.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clinics.map((clinic) => {
                const {
                clinicId,
                clinicName,
                description,
                addressId,
                doctorId,
                } = clinic;

                return (
                <Card
                    key={clinicId}
                    className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition-shadow duration-300"
                >
                    <li className="list-none flex flex-col items-start text-left space-y-2">
                    <p className="text-lg font-semibold text-blue-900">
                        {clinicName}
                    </p>
                    <p className="text-sm text-gray-700">
                        <strong>Description:</strong> {description}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Address ID:</strong> {addressId}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Doctor ID:</strong> {doctorId}
                    </p>
                    </li>
                    <div className="mt-4 flex justify-end">
                    <button
                        onClick={() => removeClinic(clinicId)}
                        className="flex items-center gap-2 text-red-600 hover:text-white border border-red-600 hover:bg-red-600 transition-all duration-300 px-4 py-1.5 rounded-md text-sm font-medium"
                    >
                    
                        Remove {clinicName}
                    </button>
                    </div>
                    
                </Card>
                );
            })}
            </ul>
        ) : (
            <Loading tex="Clinics" />
        )}
        {/*Add Clinic Button*/}
    <div className="mt-8 fixed bottom-10  right-6 flex justify-end">
            <button
                onClick={() => {
                setOpen(true);
                }}
                className="flex animate-pulse items-center gap-2 p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-md"
            >
                <FaClinicMedical className="text-xl" />
            
            </button>
        </div>
        {open && 
        <>
        <AddClinic  setOpen={setOpen} />
        </>
        }
        </div>
    );
    }
