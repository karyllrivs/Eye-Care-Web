import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { AiOutlineMail, AiOutlinePhone, AiOutlineKey } from "react-icons/ai";
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const loadUserImage = (event) => {
    let reader = new FileReader();
    reader.onload = function () {
      let output = document.getElementById('profileImagePreview');
      output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    setFormFields({
      ...formFields,
      image: event.target.files[0]
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Password validation
    const { new_password, confirm_password } = formFields;
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
          'Content-Type': 'multipart/form-data',
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
  }

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
                      src={profile.image ? getFile(profile.image) : `https://eu.ui-avatars.com/api/?name=${first_name}+${last_name}&size=250`}
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
                  {address &&
                    <p className="text-gray-600 mb-1">Address: {address}</p>}
                  {mobile_number && <p className="text-gray-600 mb-1">Contact: {mobile_number}</p>}
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
                <div className="mb-4 md:mr-2 w-full md:w-1/2">
                  <InputField
                    label="New Password"
                    type="password"
                    name="new_password"
                    value={new_password}
                    onChange={handleChange}
                    icon={<AiOutlineKey />}
                  />
                </div>
                <div className="mb-4 md:ml-2 w-full md:w-1/2">
                  <InputField
                    label="Confirm New Password"
                    type="password"
                    name="confirm_password"
                    value={confirm_password}
                    onChange={handleChange}
                    icon={<AiOutlineKey />}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-8 pb-12">
                <button
                  type="submit"
                  className="px-6 py-3 text-white bg-[#67BCEE] rounded mr-4 font-bold"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 border border-gray-500 rounded mr-4 font-bold"
                >
                  Cancel
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
