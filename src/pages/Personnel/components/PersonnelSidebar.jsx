import { GrNotes, GrUserSettings } from "react-icons/gr"
import { MdPersonalInjury, MdWarehouse } from "react-icons/md"
import { RiUserVoiceFill } from "react-icons/ri"
import PersonnelRolesRoute from "../../../components/PersonnelRolesRoute"
import { Roles } from "../../../enums/personnel.enum"
import { IoMdAnalytics } from "react-icons/io"
import { GiSpectacleLenses } from "react-icons/gi"

const PersonnelSidebar = () => {

    return (
        <aside className="lg:col-span-1 bg-gray-700 text-white p-8">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <ul className="pt-24">

                <PersonnelRolesRoute roles={[Roles.super_admin, Roles.doctor]} isSidebar={true}>
                    <li className="mb-6 font-bold text-gray-300 flex items-center gap-6"><IoMdAnalytics className="text-xl" /><a href="/personnel/analytics">Analytics</a></li>
                </PersonnelRolesRoute>

                <PersonnelRolesRoute roles={[Roles.super_admin, Roles.doctor]} isSidebar={true}>
                    <li className="mb-6 font-bold text-gray-300 flex items-center gap-6"><MdPersonalInjury className="text-xl" /><a href="/personnel/patient">Patient Management</a></li>
                </PersonnelRolesRoute>

                <PersonnelRolesRoute roles={[Roles.super_admin, Roles.doctor]} isSidebar={true}>
                    <li className="mb-6 font-bold text-gray-300 flex items-center gap-6"><GiSpectacleLenses className="text-xl" /><a href="/personnel/lens">Lens Management</a></li>
                </PersonnelRolesRoute>

                <PersonnelRolesRoute roles={[Roles.doctor]} isSidebar={true}>
                    <li className="mb-6 font-bold text-gray-300 flex items-center gap-6"><GrUserSettings className="text-xl" /><a href="/personnel/staff">Staff Management</a></li>
                </PersonnelRolesRoute>

                <PersonnelRolesRoute roles={[Roles.super_admin, Roles.staff]} isSidebar={true}>
                    <li className="mb-6 font-bold text-gray-300 flex items-center gap-6"><GrNotes className="text-xl" /><a href="/personnel/order">Order Management</a></li>
                </PersonnelRolesRoute>

                <PersonnelRolesRoute roles={[Roles.super_admin, Roles.staff]} isSidebar={true}>
                    <li className="mb-6 font-bold text-gray-300 flex items-center gap-6"><MdWarehouse className="text-xl" /><a href="/personnel/inventory">Inventory Management</a></li>
                </PersonnelRolesRoute>

                <PersonnelRolesRoute roles={[Roles.super_admin, Roles.staff]} isSidebar={true}>
                    <li className="mb-6 font-bold text-gray-300 flex items-center gap-6"><RiUserVoiceFill className="text-xl" /><a href="/personnel/consultation">Consultation Management</a></li>
                </PersonnelRolesRoute>

                <PersonnelRolesRoute roles={[Roles.super_admin]} isSidebar={true}>
                    <li className="mb-6 font-bold text-gray-300 flex items-center gap-6"><GrUserSettings className="text-xl" /><a href="/personnel/accounts">Account Management</a></li>
                </PersonnelRolesRoute>
            </ul>
        </aside>
    )
}

export default PersonnelSidebar