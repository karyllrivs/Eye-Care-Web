import { useSelector } from "react-redux";
import { selectCurrentPersonnel } from "../../../redux/user/user.selector";


const WelcomeScreen = () => {
    const currentPersonnel = useSelector(selectCurrentPersonnel);

    return <div className="px-16 py-8">
        <h1 className="text-5xl font-bold">Welcome, {currentPersonnel.profile.name}</h1>
    </div>
}

export default WelcomeScreen