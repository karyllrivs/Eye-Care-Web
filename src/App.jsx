import { RouterProvider } from "react-router-dom";

import { isCookieNotExist } from "./utils/cookieUtils";
import { useDispatch } from "react-redux";
import { setCurrentAdmin, setCurrentUser } from "./redux/user/user.action";
import { setCurrentUserProfile } from "./redux/profile/profile.action";
import { router } from "./router.jsx";

function App() {
  const dispatch = useDispatch();

  if (isCookieNotExist(import.meta.env.VITE_EC_USER_TOKEN)) {
    dispatch(setCurrentUser(null));
    dispatch(setCurrentAdmin(null));
    dispatch(setCurrentUserProfile(null));
  }

  return (
    <div className="w-full min-h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
