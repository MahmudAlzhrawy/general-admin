"use client"
import Content from "@/components/PageContent/Content";
import SideBar from "@/components/SideBar";
import { ManageClinicsProvider } from "@/Context/ClinicContext";
import { RestoHosShcoProvider } from "@/Context/resto_hos_shco_Context";

export default function Dashboard() {
return (
    <ManageClinicsProvider>
        <RestoHosShcoProvider>
        <div className="dashboard flex max-h-screen overflow-hidden">
            <div className="sidebar custom-scroll text-white w-1/4 ">
                <SideBar/>
            </div>
            <div className="content  grow custom-scroll  bg-white/20">
                <Content/>
            </div>
        </div>
        </RestoHosShcoProvider>
    </ManageClinicsProvider>
);
}
