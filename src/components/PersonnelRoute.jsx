import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCurrentPersonnel } from "../redux/user/user.selector";

const PersonnelRoute = ({ children }) => {

    const currentPersonnel = useSelector(selectCurrentPersonnel);

    if (!currentPersonnel) {
        return <Navigate to="/personnel-login" />;
    }

    return children;
};

export default PersonnelRoute;
