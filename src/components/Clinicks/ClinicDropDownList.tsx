import { FaUserDoctor } from "react-icons/fa6";
import { FaClinicMedical, FaAddressCard } from "react-icons/fa";

interface DropDownListProps {
  isOpen?: boolean;
}

export default function DropDownList({ isOpen }: DropDownListProps) {
  return (
    <div
      className={`
        dropdown-list bg-white/15 shadow-lg rounded-lg w-[98%] px-4 py-4
        transform transition-all duration-700 ease-in-out
        ${isOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-10 opacity-0 pointer-events-none"}
      `}
    >
      <ul className="space-y-2">
        <li className="hover:bg-gray-100 p-2 rounded">
          <a href="#" className="flex items-center font-serif text-white">
            <span className="text-xl mr-2">
              <FaUserDoctor className="text-white" />
            </span>
            Doctors
          </a>
        </li>
        <li className="hover:bg-gray-100 p-2 rounded">
          <a href="#" className="flex items-center font-serif text-white">
            <span className="text-xl mr-2">
              <FaClinicMedical className="text-white" />
            </span>
            Clinics
          </a>
        </li>
        <li className="hover:bg-gray-100 p-2 rounded">
          <a href="#" className="flex items-center font-serif text-white">
            <span className="text-xl mr-2">
              <FaAddressCard className="text-white" />
            </span>
            Addresses
          </a>
        </li>
      </ul>
    </div>
  );
}
