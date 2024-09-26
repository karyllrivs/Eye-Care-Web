import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCurrentAdmin } from "../redux/user/user.selector";

const AdminRoute = ({ children }) => {

    const currentAdmin = useSelector(selectCurrentAdmin);

    if (!currentAdmin) {
        return <Navigate to="/admin-login" />;
    }

    return children;
};

export default AdminRoute;
