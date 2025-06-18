"use client"
import { Toast } from "@/sweetalert";
import { Dispatch, SetStateAction,createContext, useEffect, useState  } from "react";
interface Resto{
restaurantId: number;
restaurantName: string;
location: string;
phoneNumber: string;
cusineType: string;
restaurantImage: string;
status: string;
cityCode: string;
restaurantDescription: string;
deliveryFee: number;
}
interface AddResto{
RestaurantName: string;
Location: string;
PhoneNumber: string;
CusineType: string;
RestaurantImage: File|null;
Status: string;
CityCode: string;
RestaurantDescription: string;
DeliveryFee: string
}

interface Hospital{
    hospitalId: number;
    hospitalName: string;
    location: string;
    description: string;
    phoneNumber: string;
    wepsite: string;
    openingHours: string;
    hospitalImage: string;
    hospitalType: string;
    cityCode: string;
}
interface AddHospital{
    HospitalName: string;
    Location: string;
    Description: string;
    PhoneNumber: string;
    Wepsite: string;
    OpeningHours: string;
    HospitalImage:File|null;
    HospitalType: string;
    CityCode: string;
}

interface School{
schoolId: number;
schoolName: string;
location: string;
phoneNumber: string;
schoolImage: string;
schoolType: string;
schoolDescription: string;
cityCode: string;
openingHours: string;
website: string;
}
interface AddSchool{
SchoolName: string;
Location: string;
PhoneNumber: string;
SchoolImage: File|null;
SchoolType: string;
SchoolDescription: string;
CityCode: string;
OpeningHours: string;
Website: string;
}
interface Restaurants{
    restaurantId:number,
    restaurantName:string
}
interface City{
    cityCode:string,
    cityName:string
}
interface Admin{
    id:number,
    userId:number,
    serviceId:number,
    serviceName:string
}
interface AddAdmin{
    userId:number,
    serviceId:number,
    serviceName:string
}
interface MakeAdmen{
    userName:string,
    adminType:string
}

interface ContextProps {
    Admins:Admin[];
    Restaurants:Restaurants[];
    resto: Resto[];
    Cities:City[];
    hospital: Hospital[];
    school: School[];
    setShowResto:Dispatch<SetStateAction<boolean>>;
    setShowHospitals:Dispatch<SetStateAction<boolean>>;
    setShowSchools:Dispatch<SetStateAction<boolean>>;
    setShowAdminSettings:Dispatch<SetStateAction<boolean>>;
    showAdminSettings:boolean,
    showResto: boolean;
    showHospitals: boolean;
    showSchools: boolean;
    MakeAdmin:(adm:MakeAdmen)=>void
    AddResto: (resto: AddResto) => void;
    AddAdmin:(admin:AddAdmin)=>void;
    AddHospital: (hospital: AddHospital) => void;
    AddSchool: (school: AddSchool) => void;
    removeResto: (restaurantId: number) => void;
    removeHospital: (hospitalId: number) => void;
    removeSchool: (schoolId: number) => void;
    removeAdmin:(id:number)=>void,
    setRestoFilter:Dispatch<SetStateAction<string>>;
    setHospitalFilter:Dispatch<SetStateAction<string>>;
    setSchoolFilter:Dispatch<SetStateAction<string>>;
    setAdminFilter:Dispatch<SetStateAction<string>>,
    setCounter: Dispatch<SetStateAction<number>>;
    setAdCounter:Dispatch<SetStateAction<number>>;
}

export const RestoHosShcoContext = createContext<ContextProps>({
    Admins:[],
    Restaurants:[],
    Cities:[],
    resto: [],
    hospital: [],
    school: [],
    setShowAdminSettings:()=>{},
    setShowResto: () => {},
    setShowHospitals: () => {},
    setShowSchools: () => {},
    showAdminSettings:false,
    showResto: false,
    showHospitals: false,
    showSchools: false,
    MakeAdmin:()=>{},
    AddResto: () => {},
    AddHospital: () => {},
    AddSchool: () => {},
    AddAdmin:()=>{},
    removeAdmin:()=>{},
    removeResto: () => {},
    removeHospital: () => {},
    removeSchool: () => {},
    setRestoFilter: () => {},
    setHospitalFilter: () => {},
    setSchoolFilter: () => {},
    setAdminFilter:()=>{},
    setCounter: () => {},
    setAdCounter:()=>{}

});
interface RestoHosShcoProviderProps {
    children: React.ReactNode;
}
export const RestoHosShcoProvider: React.FC<RestoHosShcoProviderProps> = ({ children }) => {
    const [resto, setResto] = useState<Resto[]>([]);
    const [hospital, setHospital] = useState<Hospital[]>([]);
    const [school, setSchool] =useState<School[]>([]);
    const [showResto, setShowResto] = useState<boolean>(false);
    const [showHospitals, setShowHospitals] =useState<boolean>(false);
    const [showSchools, setShowSchools] = useState<boolean>(false);
    const [restoFilter, setRestoFilter] =useState<string>("88");
    const [hospitalFilter, setHospitalFilter] =useState<string>("88");
    const [schoolFilter, setSchoolFilter] =useState<string>("88");
    const [adminFilter, setAdminFilter] =useState<string>("RestuarantOwner");
    const [counter, setCounter] =useState<number>(0);
    const[Cities,setCity]=useState<City[]>([]);
    const[Restaurants,setRestaurants]=useState<Restaurants[]>([])
    const[Admins,setAdmins]=useState<Admin[]>([]);
    const[showAdminSettings,setShowAdminSettings]=useState<boolean>(false)
    const [adcounter, setAdCounter] =useState<number>(0);
    const [adminToken, setAdminToken] = useState<string | null>(localStorage.getItem("generaladminToken"));
useEffect(() => {
        const token = localStorage.getItem("generaladminToken");
        setAdminToken(token);
        const fetchCities = async()=>{
        const res =await fetch(`http://citypulse.runasp.net/api/School/ALlcities`,{
            method:'GET',
        })
        if(res.ok){
            const data =await res.json();
            setCity(data.$values);
            console.log("Cities Done");
        }
        else {
            console.error("failed to fetch Cities")
        }
    }
    const fetchRestaurants = async()=>{
        const res =await fetch(`http://citypulse.runasp.net/api/Restaurant`,{
            method:'GET',
        })
        if(res.ok){
            const data =await res.json();
            setRestaurants(data.$values);
            console.log("Restaurants Done");
        }
        else {
            console.error("failed to fetch Restaurants")
        }
    }
    const fetchAdmins = async()=>{
        const res =await fetch(`http://citypulse.runasp.net/api/Admin/AllAdmins`,{
            method:'GET',
            headers:{
                "Authorization": `Bearer ${adminToken}`,
            },
        })
        if(res.ok){
            const data =await res.json();
            setAdmins((data.$values as Admin[]).filter(admin => admin.serviceName === adminFilter));
            console.log("Admins Done");
        }
        else {
            console.error("failed to fetch Admins")
        }
    }
    fetchAdmins();
    fetchRestaurants();
    fetchCities();
    }, [adcounter]);
useEffect(()=>{
    const fetchRestos = async()=>{
        const res =await fetch(`http://citypulse.runasp.net/api/AdminInstitution/AllRestaurantsByCityCode?CityCode=${restoFilter}`,{
            method:'GET',
            headers:{
                "Authorization": `Bearer ${adminToken}`,
            }
        })
        if(res.ok){
            const data =await res.json();
            setResto(data.$values);
            console.log("resto Done");
        }
        else {
            console.error("failed to fetch restos")
        }
    }
    const fetchSchools = async()=>{
        const res =await fetch(`http://citypulse.runasp.net/api/AdminInstitution/schools-by-city/${schoolFilter}`,{
            method:'GET',
            headers:{
                "Authorization": `Bearer ${adminToken}`,
            }
        })
        if(res.ok){
            const data =await res.json();
            setSchool(data.$values);
            console.log("school Done");
        }
        else {
            console.error("failed to fetch schools")
        }
    }
    const fetchHospitals = async()=>{
        const res =await fetch(`http://citypulse.runasp.net/api/AdminInstitution/hospitals-by-city/${hospitalFilter}`,{
            method:'GET',
            headers:{
                "Authorization": `Bearer ${adminToken}`,
            }
        })
        if(res.ok){
            const data =await res.json();
            setHospital(data.$values);
            console.log("hospital Done");
        }
        else {
            console.error("failed to fetch hospitals")
        }
    }
    fetchHospitals();
    fetchRestos();
    fetchSchools();
},[counter])
    const AddResto = async(newRsto: AddResto) => {
    const formData = new FormData();
    formData.append('RestaurantName', newRsto.RestaurantName);
    formData.append('Location', newRsto.Location);
    formData.append('PhoneNumber', newRsto.PhoneNumber);
    formData.append('CuisineType', newRsto.CusineType);
    formData.append('RestaurantImage', newRsto.RestaurantImage!);
    formData.append('Status', newRsto.Status);
    formData.append('CityCode', newRsto.CityCode);
    formData.append('RestaurantDescription', newRsto.RestaurantDescription);
    formData.append('DeliveryFee', newRsto.DeliveryFee.toString()); 
    const res =await fetch(`http://citypulse.runasp.net/api/AdminInstitution/AddRestaurant`,{
        method:'POST',
        headers:{
                "Authorization": `Bearer ${adminToken}`,
            },
            body:formData,
    })
        if(res.ok){
            Toast.fire({
                icon:"success",
                title:'Successfully add new Restaurant'
            })
            setCounter(prev=>prev+1)
        }
        else{
            Toast.fire({
                icon:"error",
                title:'Failed add new Restaurant'
            })
        }
    };

    const AddHospital = async(data: AddHospital) => {
    const formData = new FormData();
    
    formData.append('hospitalName', data.HospitalName);
    formData.append('location', data.Location);
    formData.append('description', data.Description);
    formData.append('phoneNumber', data.PhoneNumber);
    formData.append('wepsite', data.Wepsite);
    formData.append('openingHours', data.OpeningHours);
    formData.append('hospitalImage', data.HospitalImage!);
    formData.append('hospitalType', data.HospitalType);
    formData.append('cityCode', data.CityCode);
    const res =await fetch(`http://citypulse.runasp.net/api/AdminInstitution/add-hospital`,{
        method:'POST',
        headers:{
                "Authorization": `Bearer ${adminToken}`,
            },
            body:formData,

    })
        if(res.ok){
            Toast.fire({
                icon:"success",
                title:'Successfully add new Hospital'
            })
            setCounter(prev=>prev+1)
        }
        else{
            Toast.fire({
                icon:"error",
                title:'Failed add new Hospital'
            })
        }
    };

    const AddSchool =async (newSchool: AddSchool) => {
    const formData= new FormData();
    formData.append('schoolName', newSchool.SchoolName);
    formData.append('location', newSchool.Location);
    formData.append('phoneNumber', newSchool.PhoneNumber);
    formData.append('schoolImage', newSchool.SchoolImage!);
    formData.append('schoolType', newSchool.SchoolType);
    formData.append('schoolDescription', newSchool.SchoolDescription);
    formData.append('cityCode', newSchool.CityCode);
    formData.append('openingHours', newSchool.OpeningHours);
    formData.append('website', newSchool.Website);
    const res =await fetch(`http://citypulse.runasp.net/api/AdminInstitution/add-school`,{
        method:'POST',
        headers:{
                "Authorization": `Bearer ${adminToken}`,
            },
            body:formData
    })
        if(res.ok){
            Toast.fire({
                icon:"success",
                title:'Successfully add new School'
            })
            setCounter(prev=>prev+1)
        }
        else{
            Toast.fire({
                icon:"error",
                title:'Failed add new School'
            })
        }
    };

    const removeResto = async(restaurantId: number) => {
        setResto(resto.filter(r => r.restaurantId !== restaurantId));
        const res =await fetch(`http://citypulse.runasp.net/api/AdminInstitution/DeleteRestaurant/${restaurantId}`,{
            method:'DELETE',
            headers:{
                "Authorization": `Bearer ${adminToken}`,
            }
        })
        if(res.ok){
            Toast.fire({
                icon:'success',
                title:"Removed Restaurant successfully"
            })
        }
        else{
            Toast.fire({
                icon:'error',
                title:"Removed Restaurant Failed"
            })
        }
    };

    const removeHospital = async(hospitalId: number) => {
        setHospital(hospital.filter(h => h.hospitalId !== hospitalId));
        const res =await fetch(`http://citypulse.runasp.net/api/AdminInstitution/delete-hospital/${hospitalId}`,{
            method:'DELETE',
            headers:{
                "Authorization": `Bearer ${adminToken}`,
            }
        })
        if(res.ok){
            Toast.fire({
                icon:'success',
                title:"Removed Hopsital successfully"
            })
        }
        else{
            Toast.fire({
                icon:'error',
                title:"Removed Hospital Failed"
            })
        }
    };
const AddAdmin =async(admin:AddAdmin)=>{
    const res = await fetch(`http://citypulse.runasp.net/api/Admin/AssignAdminToService?userId=${admin.userId}&serviceId=${admin.serviceId}&serviceName=${admin.serviceName}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${adminToken}`,
                },
            });
            if(res.ok) {
                setCounter((prev)=>prev+1)
                Toast.fire({
                    icon: "success",
                    title: "Admin added successfully"
                })
                setAdCounter(prev=>prev+1);
            } else {
                console.error("Failed to add Admin");
            }
}
const removeSchool = async(schoolId: number) => {
        setSchool(school.filter(s => s.schoolId !== schoolId));
        const res =await fetch(`http://citypulse.runasp.net/api/AdminInstitution/delete-school/${schoolId}`,{
            method:'DELETE',
            headers:{
                "Authorization": `Bearer ${adminToken}`,
            }
        })
        if(res.ok){
            Toast.fire({
                icon:'success',
                title:"Removed School successfully"
            })
        }
        else{
            Toast.fire({
                icon:'error',
                title:"Removed School Failed"
            })
        }
    };

const MakeAdmin=async(adm:MakeAdmen)=>{
        const res = await fetch(`http://citypulse.runasp.net/api/Admin/MakeAdmin?username=${adm.userName}&adminType=${adm.adminType}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${adminToken}`,
                },
            });
            if(res.ok) {
                Toast.fire({
                    icon: "success",
                    title: "Admin changed successfully"
                })
                setAdCounter(prev=>prev+1);
            } else {
                console.error("Failed to chang Admin");
            }
}
const removeAdmin =async(id:number)=>{
    setAdmins(Admins.filter(a => a.id !== id));
        const res =await fetch(`http://citypulse.runasp.net/api/Admin/DeleteAdminService?id=${id}`,{
            method:'DELETE',
            headers:{
                "Authorization": `Bearer ${adminToken}`,
            }
        })
        if(res.ok){
            Toast.fire({
                icon:'success',
                title:"Removed admin successfully"
            })
        }
        else{
            Toast.fire({
                icon:'error',
                title:"Removed admin Failed"
            })
        }
}

    return (
        <RestoHosShcoContext.Provider value={{
            MakeAdmin,
            Admins,
            Restaurants,
            Cities,
            resto,
            hospital,
            school,
            showResto,
            showHospitals,
            showSchools,
            showAdminSettings,
            setShowResto,
            setShowHospitals,
            setShowSchools,
            setShowAdminSettings,
            AddAdmin,
            removeAdmin,
            AddResto,
            AddHospital,
            AddSchool,
            removeResto,
            removeHospital,
            removeSchool,
            setRestoFilter,
            setHospitalFilter,
            setSchoolFilter,
            setAdminFilter,
            setCounter,
            setAdCounter,
        }}>
            {children}
        </RestoHosShcoContext.Provider>
    );
}   