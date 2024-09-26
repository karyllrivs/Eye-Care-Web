import { useState } from "react";
import axiosClient from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import useDialogBox from "../hooks/useDialogBox";
import DialogBox from "../components/DialogBox";

const VerifyAccount = () => {

    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        axiosClient
            .post("/verify-account", { token })
            .then(({ data: { message } }) => {
                openDialogBox(message);
            })
            .catch(
                (e) => {
                    setError(e);
                }
            );
    }


    /** Dialog Feature */
    const [isDialogOpen, title, message, openDialogBox, closeDialogBox] = useDialogBox("Account Verification.");

    return (
        <>
            <section className="bg-white bg-[url('./src/assets/images/login-bg.png')] bg-center bg-no-repeat bg-cover">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold">
                        Verify Account
                    </a>
                    <div className="w-full bg-white rounded-lg border border-black md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                {error && <div className="text-red-500 mb-4">{error}</div>}
                                <div>
                                    <label
                                        htmlFor="token"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Your Verification Token
                                    </label>
                                    <input
                                        type="text"
                                        name="token"
                                        id="token"
                                        value={token}
                                        onChange={(e) => setToken(e.target.value)}
                                        placeholder="xxxxxxxxxxxxxxxxxxxxxxx"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-blue-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <DialogBox title={title} message={message} isDialogOpen={isDialogOpen} closeDialogBox={() => { closeDialogBox(navigate("/login")) }} />
        </>
    )
}

export default VerifyAccount