import SideBar from "@/components/SideBar";

export default function Dashboard() {
return (
<div className="dashboard flex">
    <div className="sidebar  text-white w-64 h-screen py-4">
        <SideBar/>
    </div>
    <div className="content grow bg-white/20">
        <h1 className="text-4xl font-bold">content</h1>
    </div>
</div>
);
}
