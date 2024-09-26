import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCurrentAdmin, selectCurrentPersonnel, selectCurrentUser } from "../redux/user/user.selector";

const UnAuthenticatedRoute = ({ children }) => {

    const currentUser = useSelector(selectCurrentUser);
    const currentPersonnel = useSelector(selectCurrentPersonnel);
    const currentAdmin = useSelector(selectCurrentAdmin);

    if (currentUser) {
        return <Navigate to="/" />;
    }

    if (currentPersonnel) {
        return <Navigate to="/personnel" />;
    }

    if (currentAdmin) {
        return <Navigate to="/admin" />;
    }

    return children;
};

export default UnAuthenticatedRoute;
