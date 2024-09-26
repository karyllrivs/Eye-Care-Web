import { useSelector } from "react-redux";
import { selectCurrentPersonnel } from "../redux/user/user.selector";
import { Navigate } from "react-router-dom";

const PersonnelRolesRoute = ({ roles, children, isSidebar = false }) => {

    const currentPersonnel = useSelector(selectCurrentPersonnel);

    if (!roles.includes(currentPersonnel.role)) {
        if (isSidebar)
            return null;
        return <Navigate to="/" />;
    }

    return children;
}

export default PersonnelRolesRoute