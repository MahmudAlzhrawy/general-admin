import { text } from "stream/consumers";

    interface LoadingProps {
        tex:string
    }
    export default function Loading({tex}: LoadingProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-solid mb-6"></div>

        {/* Text */}
        <p className="text-xl text-gray-800 font-semibold animate-pulse tracking-wide">
            Loading, {tex}...
        </p>
        </div>
    );
    }
