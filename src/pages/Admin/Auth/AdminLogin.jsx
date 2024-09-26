import { useState } from "react";
import axiosClient from "../../../utils/axiosClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentAdmin } from "../../../redux/user/user.action";

function AdminLogin() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  }

  const handleSubmit = (event) => {

    event.preventDefault();

    const {
      username,
      password
    } = formFields;

    if (
      !username ||
      !password
    ) {
      setError("Please fill in all required fields!");
      return;
    }

    axiosClient
      .post("/admin-login", formFields)
      .then(({ data: { message, currentAdmin } }) => {
        dispatch(setCurrentAdmin(currentAdmin));
        toast.success(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate("/admin-main");
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

  const {
    username,
    password
  } = formFields;

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">EyeCare Admin Login</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg px-10 pt-8 pb-8 mb-4 max-w-md w-full border border-black"
        >
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
            />
            <div className="text-right text-sm pt-3">
              <a href="#" className="text-[#999999] hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-[#2148C0] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
