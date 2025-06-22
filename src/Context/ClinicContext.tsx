"use client"
import { Toast } from "@/sweetalert";
import React, { createContext, useState, Dispatch, SetStateAction, ReactNode, useEffect } from "react";

interface ManageClinicProviderProps {
    children: ReactNode;
}

interface Doctor {
    doctorId: number;
    doctorName: string;
    specialization: string;
    experienceYears: number;
    description: string;
    academicDegree: string;
    profileImage: string;
}

interface Clinic {
    clinicId: number;
    clinicName: string;
    addressId: number;
    description: string;
    doctorId: number;
}
interface AddClinic {
    clinicName: string;
    addressId: number;
    description: string;
    doctorId: number;
}

interface Address {
    addressId: number;
    addressLine1: string;
    city: string;
}

interface AddAddress{
    Address: string;
    city: string;
}

interface ManageClinicsContextType {
    setAddressFilter:Dispatch<SetStateAction<string>>;
    setCounter:Dispatch<SetStateAction<number>>;
    clinics: Clinic[];
    doctors: Doctor[];
    addresses: Address[];
    showClinic: boolean;
    setShowClinic: Dispatch<SetStateAction<boolean>>;
    showDoctor: boolean;
    setShowDoctor: Dispatch<SetStateAction<boolean>>;
    showAddress: boolean;
    setShowAddress: Dispatch<SetStateAction<boolean>>;
    addAddress: (address: AddAddress) => void;
    removeAddress: (addressId: number) => void;
    addClinic: (clinic: AddClinic) => void;
    removeClinic: (clinicId: number) => void;
    removeDoctor: (doctorId: number) => void;
}

export const ManageClinicsContext = createContext<ManageClinicsContextType>({
    setAddressFilter:()=>{},
    setCounter: () => {},
    clinics: [],
    doctors: [],
    addresses: [],
    showClinic: false,
    setShowClinic: () => {},
    showDoctor: false,
    setShowDoctor: () => {},
    showAddress: false,
    setShowAddress: () => {},
    addAddress: () => {},
    removeAddress: () => {},
    addClinic: () => {},
    removeClinic: () => {},
    removeDoctor: () => {},
});

export const ManageClinicsProvider: React.FC<ManageClinicProviderProps> = ({ children }) => {
    const [clinics, setClinics] = useState<Clinic[]>([]);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [showClinic, setShowClinic] = useState(false);
    const [showDoctor, setShowDoctor] = useState(false);
    const [showAddress, setShowAddress] = useState(false);
    const [counter, setCounter] = useState(0);
    const [adminToken, setAdminToken] = useState<string | null>(null);
    const [filter, setAddressFilter] = useState<string>("Assiut");
    useEffect(() => {
        const token = localStorage.getItem("generaladminToken");
        setAdminToken(token);
    }, []);
    useEffect(() => {
        if(!adminToken){
            return console.log("token not brovided !")
        }
        const fetcheDoctors = async () => {
            const res = await fetch('https://citypulse.runasp.net/api/AdminClinic/AllDoctors', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${adminToken}`,
                }
            })
            if(res.ok){
                const data = await res.json();
                setDoctors(data.$values);
            }
            else{
                console.error("Failed to fetch doctors");
            }
        }
        const fetchClinics = async () => {
            const res = await fetch('https://citypulse.runasp.net/api/AdminClinic/AllClinics', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${adminToken}`,
                }
            });
            if (res.ok) {
                const data = await res.json();
                setClinics(data.$values);
            } else {
                console.error("Failed to fetch clinics");
            }
        };
        const fetchAddresses = async () => {
            const res = await fetch(`https://citypulse.runasp.net/api/AdminClinic/AllAddressesByCity?city=${filter}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${adminToken}`,
                }
            });
            if (res.ok) {
                const data = await res.json();
                setAddresses(data.$values);
                
            } else {
                console.error("Failed to fetch addresses");
            }
        };
        fetchClinics();
        fetchAddresses();
        fetcheDoctors();
    },[counter]);

    const addAddress = async(address: AddAddress) => {
        if(!adminToken){
            return console.log("token not brovided !")
        }
        const res = await fetch(`https://citypulse.runasp.net/api/AdminClinic/AddNewDoctorAddress?Address=${address.Address}&city=${address.city}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${adminToken}`,
            },
        });
        if(res.ok) {
            setCounter((prev)=>prev+1)
            Toast.fire({
                icon: "success",
                title: "Address added successfully"
            })
        } else {
            console.error("Failed to add address");
        }
    };

    const removeAddress = async (addressId: number) => {
        if(!adminToken){
            return console.log("token not brovided !")
        }
        try{

            const res = await fetch(`https://citypulse.runasp.net/api/AdminClinic/DeleteAddress/${addressId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${adminToken}`,
                }
            });
            if (res.ok) {
                setAddresses(prev => prev.filter(address => address.addressId !== addressId));
                Toast.fire({
                    icon: "success",
                    title: "Address removed successfully"
                });
            } else {
                console.log("Failed to remove address");
            }
        }catch (error) {
            Toast.fire({
                icon: "warning",
                title: "Failed to remove address - it may be related to a clinic"
            });
            console.log(error)
        }
    };

    const addClinic = async(clinic: AddClinic) => {
        if(!adminToken){
            return console.log("token not brovided !")
        }
        const res = await fetch(`https://citypulse.runasp.net/api/AdminClinic/AddClinic`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${adminToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(clinic)
        });
        if (res.ok) {
            Toast.fire({
                icon: "success",
                title: "Clinic added successfully"
            });
        } else {
            console.error("Failed to add clinic");
        }
    };

    const removeClinic = async(clinicId: number) => {
        if(!adminToken){
            return console.log("token not brovided !")
        }
        try {

            const res = await fetch(`https://citypulse.runasp.net/api/AdminClinic/DeleteClinic/${clinicId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${adminToken}`,
                }
            });
            if (res.ok) {
                setClinics(prev => prev.filter(clinic => clinic.clinicId !== clinicId));
                Toast.fire({
                    icon: "success",
                    title: "Clinic removed successfully"
                });
            } else {
                console.error("Failed to remove clinic");
            }
        }
        catch (error) {
            Toast.fire({
                icon: "error",
                title: "Failed to remove clinic"
            });
                        console.log(error)

        }
    };
    const removeDoctor = async (doctorId: number) => {
        if(!adminToken){
            return console.log("token not brovided !")
        }
        try {

            const res = await fetch(`https://citypulse.runasp.net/api/AdminClinic/DeleteDoctor/${doctorId}`, {   
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${adminToken}`,
                }
            });
            if (res.ok) {
                setDoctors(prev => prev.filter(doctor => doctor.doctorId !== doctorId));
                Toast.fire({
                    icon: "success",
                    title: "Doctor removed successfully"
                });
            } else {
                Toast.fire({
                    icon: "warning",
                    title: "Failed to remove doctor"
                });
            }
        }catch (error) {
            Toast.fire({
                icon: "error",
                title: "Doctor may be related with clinic"
            });
                        console.log(error)
        }
    };

    return (
        <ManageClinicsContext.Provider value={{
            setAddressFilter,
            setCounter,
            clinics,
            doctors,
            addresses,
            showClinic,
            setShowClinic,
            showDoctor,
            setShowDoctor,
            showAddress,
            setShowAddress,
            addAddress,
            removeAddress,
            addClinic,
            removeClinic,
            removeDoctor
        }}>
            {children}
        </ManageClinicsContext.Provider>
    );
};
