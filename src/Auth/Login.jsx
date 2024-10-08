import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import login_image from "../assets/image_login.png";
import axiosClient from "../utils/axiosClient";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/user/user.action";
import { setCurrentUserProfile } from "../redux/profile/profile.action";
import PolicyModal from "./PolicyModal";
import { firebaseApp } from "../utils/firebaseUtils";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import GoogleButton from "react-google-button";

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /** Policy Feature */
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
  const togglePolicyConfirmation = () => {
    setIsPolicyAccepted(!isPolicyAccepted);
  }
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const defaultFormFields = {
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  };

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { first_name,
    last_name, email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const switchMode = (mode) => {
    if (mode) setIsPolicyAccepted(false);

    resetFormFields();
    setIsLoginMode(mode);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      if (!email || !password) {
        setError("Fill all the empty fields.");
        return;
      }

      axiosClient
        .post("/login", formFields)
        .then(({ data: { currentUser, profile } }) => {
          dispatch(setCurrentUser(currentUser));
          dispatch(setCurrentUserProfile(profile));

          resetFormFields();
          navigate("/dashboard");
        })
        .catch(
          ({
            response: {
              data: { message, notVerified },
            },
          }) => {
            if (notVerified)
              navigate("/verify-account");
            setError(message);
          }
        );
    } else {
      if (!first_name || !last_name || !email || !password) {
        setError("Fill all the empty fields.");
        return;
      }

      /** Create User */
      axiosClient
        .post("/register", formFields)
        .then(() => {
          navigate("/verify-account");
          resetFormFields();
        })
        .catch(
          ({
            response: {
              data: { message },
            },
          }) => {
            setError(message);
          }
        );
    }
  };


  const signInWithGooglePopUp = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebaseApp);
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const { email } = result.user;
        signInWithGoogle(email);

        // You can send the user info to your server for further processing.
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
      });
  };

  const signInWithGoogle = (email) => {
    axiosClient
      .post("/auth-google", { email })
      .then(({ data: { currentUser, profile } }) => {
        dispatch(setCurrentUser(currentUser));
        dispatch(setCurrentUserProfile(profile));

        resetFormFields();
        navigate("/dashboard");
      })
      .catch(
        ({
          response: {
            data: { message, notVerified },
          },
        }) => {
          if (notVerified)
            navigate("/verify-account");
          setError(message);
        }
      );
  }


  return (
    <>
      <Navbar />
      <div className="bg-gray-100 flex h-[50rem] items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="p-[4rem] hidden md:block">
          <img
            src={login_image}
            alt="Login Image"
            className="h-full max-h-full w-auto mr-8"
          />
        </div>
        <div className="w-full max-w-md space-y-8">
          <div className="bg-white shadow-md border border-[#000000] border-8 rounded-lg p-6">
            <img className="mx-auto h-[50%] w-auto pb-6" src={Logo} alt="" />

            <div className="flex justify-center pt-5 pb-5">
              <button
                type="button"
                onClick={() => switchMode(true)}
                className={`mr-2 inline-flex justify-center w-[45%] border border-transparent bg-[#67BCEE] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 ${isLoginMode ? "bg-[#8F959E]" : "bg-gray-200 text-gray-700"
                  }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => switchMode(false)}
                className={`ml-2 inline-flex justify-center w-[45%] border border-transparent bg-[#67BCEE] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 ${isLoginMode ? "bg-gray-200 text-gray-700" : "bg-[#8F959E]"
                  }`}
              >
                Sign up
              </button>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {!isLoginMode && (
                <>
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <div className="mt-1">
                      <input
                        name="first_name"
                        type="text"
                        value={first_name}
                        onChange={handleChange}
                        required
                        className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <div className="mt-1">
                      <input
                        name="last_name"
                        type="text"
                        value={last_name}
                        onChange={handleChange}
                        required
                        className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={handleChange}
                    required
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handleChange}
                    required
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-center mt-2">
                {isLoginMode
                  ? <a href="/password-reset" className="hover:underline text-blue-500 cursor-pointer">Forgot password</a>
                  : <>
                    <input type="checkbox" name="policy" id="policy" onChange={togglePolicyConfirmation} />&nbsp;<label htmlFor="policy">I accept the <span className="hover:underline text-blue-500 cursor-pointer" onClick={toggleModal}>Terms and Conditions.</span> </label>
                  </>}
              </div>

              <div className="flex justify-center mt-2">
                <button
                  type="submit"
                  className={`mr-2 inline-flex justify-center w-[45%] rounded-full border border-transparent bg-[#000000] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 ${!isLoginMode && !isPolicyAccepted ? "cursor-not-allowed" : ""}`}
                  disabled={!isLoginMode && !isPolicyAccepted}
                >
                  {isLoginMode ? "Login" : "Sign up"}
                </button>
              </div>

              {isLoginMode &&
                <>
                  <div className="flex justify-center">
                    or
                  </div>
                  <div className="flex justify-center mt-2">
                    <GoogleButton
                      type="dark"
                      label="Sign-in with Google"
                      onClick={signInWithGooglePopUp}
                    />
                  </div>
                </>
              }
              <div className="flex justify-center mt-2">
                <button
                  type="button"
                  onClick={() => switchMode(!isLoginMode)}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  {isLoginMode
                    ? "I Don't Have an Account? Sign Up"
                    : "Already have an account? Log In here"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <PolicyModal handleCloseModal={toggleModal} isModalVisible={isModalVisible} />
    </>
  );
};

export default Login;
