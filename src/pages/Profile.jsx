import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { AiOutlineMail, AiOutlinePhone, AiOutlineKey, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../components/InputField";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../utils/axiosClient";
import { getFile } from "../utils/serverFileUtils";
import { setCurrentUserProfile } from "../redux/profile/profile.action";
import { selectCurrentUserProfile } from "../redux/profile/profile.selector";

const Profile = () => {
  const dispatch = useDispatch();
  const currentUserProfile = useSelector(selectCurrentUserProfile);
  const [profile, setProfile] = useState(currentUserProfile);
  const [formFields, setFormFields] = useState(profile);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(""); // State for password error message
  const [emailError, setEmailError] = useState(""); // State for email error message

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "mobile_number") {
      const formattedValue = value.replace(/\D/g, "").slice(0, 11);
      setFormFields({
        ...formFields,
        [name]: formattedValue,
      });
    } else {
      setFormFields({
        ...formFields,
        [name]: value,
      });
    }

    // Reset password error when the user types in the password fields
    if (name === "new_password" || name === "confirm_password") {
      setPasswordError("");
    }

    // Reset email error when the user types in the email field
    if (name === "email") {
      setEmailError("");
    }
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to validate password strength
  const isPasswordStrong = (password) => {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /\d/.test(password) && 
           /[!@#$%^&*(),.?":{}|<>]/.test(password);
  };

  // Function to load and preview the user image
  const loadUserImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormFields({
          ...formFields,
          image: reader.result, // Update the image state
        });
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { new_password, confirm_password, email } = formFields;

    // Check for valid email format
    if (!isValidEmail(email)) {
      setEmailError("Invalid email format.");
      return;
    }

    // Check for weak password
    if (!isPasswordStrong(new_password)) {
      setPasswordError("Password must be at least 8 characters long, contain upper and lower case letters, numbers, and special characters.");
      return;
    }

    if (new_password !== confirm_password) {
      toast.error("New password and confirm password do not match.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const { user_id } = currentUserProfile;

    axiosClient
      .put("/profiles/" + user_id, formFields, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data: { message, profile } }) => {
        setProfile(profile);
        setFormFields(profile);
        dispatch(setCurrentUserProfile(profile));
        toast.success(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          alert(message);
        }
      );
  };

  const handleReset = () => {
    setFormFields(profile);
  };

  const {
    first_name,
    last_name,
    address,
    email,
    mobile_number,
    new_password,
    confirm_password,
  } = formFields;

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-grow pl-[20rem] pr-[4rem]">
          <div className="container mx-auto mt-10 px-4 lg:px-0">
            <h1 className="text-2xl font-bold text-[#384D6C] mb-4 underline pb-8">
              User Profile
            </h1>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row items-center border-b-2 border-gray-300 pb-9 mb-8">
                <div className="mb-4 md:mr-4">
                  <label htmlFor="userImage">
                    <img
                      id="profileImagePreview"
                      src={
                        formFields.image || (profile.image
                          ? getFile(profile.image)
                          : `https://eu.ui-avatars.com/api/?name=${first_name}+${last_name}&size=250`)
                      }
                      alt="Profile Icon"
                      className="rounded-full w-24 md:w-48 h-24 md:h-48 mx-auto md:mx-0"
                    />
                  </label>
                  <input
                    id="userImage"
                    type="file"
                    accept="image/*"
                    onChange={loadUserImage}
                    style={{ display: "none" }}
                  />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold text-[#384D6C] mb-2">
                    {first_name + " " + last_name}
                  </h1>
                  {address && (
                    <p className="text-gray-600 mb-1">Address: {address}</p>
                  )}
                  {mobile_number && (
                    <p className="text-gray-600 mb-1">
                      Contact: {mobile_number}
                    </p>
                  )}
                  <p className="text-gray-600">Email: {email}</p>
                </div>
              </div>

              <div className="mb-4 flex flex-col md:flex-row">
                <div className="mb-4 md:mr-2 w-full md:w-1/2">
                  <InputField
                    label="First Name"
                    type="text"
                    name="first_name"
                    value={first_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4 md:ml-2 w-full md:w-1/2">
                  <InputField
                    label="Last Name"
                    type="text"
                    name="last_name"
                    value={last_name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-4">
                <InputField
                  label="Address"
                  type="text"
                  name="address"
                  value={address}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4 flex flex-col md:flex-row">
                <div className="mb-4 md:mr-2 w-full md:w-1/2">
                  <InputField
                    label="Email Address"
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    icon={<AiOutlineMail />}
                  />
                  {emailError && <p className="text-red-500 mb-2">{emailError}</p>} {/* Email error message */}
                </div>
                <div className="mb-4 md:ml-2 w-full md:w-1/2">
                  <InputField
                    label="Phone Number"
                    type="text"
                    name="mobile_number"
                    value={mobile_number}
                    onChange={handleChange}
                    icon={<AiOutlinePhone />}
                  />
                </div>
              </div>
              <div className="mb-4 flex flex-col md:flex-row">
                <div className="mb-4 md:mr-2 w-full md:w-1/2 relative">
                  <InputField
                    label="New Password"
                    type={showNewPassword ? "text" : "password"}
                    name="new_password"
                    value={new_password}
                    onChange={handleChange}
                    icon={<AiOutlineKey />}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </button>
                  {passwordError && <p className="text-red-500 mb-2">{passwordError}</p>} {/* Password error message */}
                </div>
                <div className="mb-4 md:ml-2 w-full md:w-1/2 relative">
                  <InputField
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirm_password"
                    value={confirm_password}
                    onChange={handleChange}
                    icon={<AiOutlineKey />}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Profile;
