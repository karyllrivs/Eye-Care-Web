import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputField from "../components/InputField";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ConsultationStatus } from "../enums/consultation.enums";
import { selectCurrentUserProfile } from "../redux/profile/profile.selector";
import { convertTo24HourFormat, formatDate, formatTimeToAMPM } from "../utils/formatter";
import axiosClient from "../utils/axiosClient";

const Consultation = () => {

  const currentUser = useSelector(selectCurrentUserProfile);

  const [formFields, setFormFields] = useState({
    slotId: "",
    date: "",
    time: "",
    mobile: currentUser.mobile_number ?? "",
    status: ConsultationStatus.PENDING,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
    console.log(value);
  };

  const handleDateChange = (date) => {
    setFormFields({
      ...formFields,
      date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      date,
      time,
      mobile } = formFields;

    if (
      !date ||
      !time ||
      !mobile
    ) {
      toast.error("Please fill in all required fields!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const formData = {
      ...formFields,
      time: formatTimeToAMPM(formFields.time),
      date: formatDate(formFields.date),
    }

    axiosClient
      .post("/consultations", formData)
      .then(() => {
        toast.success("You have booked a consultation!", {
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

  const { mobile, date, time } = formFields;
  const { first_name, last_name, email } = currentUser;

  /** Slots Module*/
  const [slots, setSlots] = useState([]);
  useEffect(() => {
    axiosClient
      .get("/consultation-available-slots")
      .then(({ data }) => {
        setSlots(data);
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
  }, []);
  const handleSlotChange = (e) => {
    const slotId = e.target.value;
    const { _id, date, time } = slots.find((slot) => slot._id === slotId);

    setFormFields({
      ...formFields,
      slotId: _id,
      date,
      time: convertTo24HourFormat(time)
    })
  }

  return (
    <>
      <Navbar />
      <section className="bg-gray-100">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          {slots.length > 0 ?
            <div className="bg-white shadow-md rounded-lg px-8 py-6">
              <h4 className="mb-4 text-3xl font-extrabold text-center text-gray-900">
                Book Consultation
              </h4>
              <p className="mb-8 lg:mb-16 font-medium text-center text-gray-900 sm:text-xl">
                A clear vision starts here.
              </p>
              <form onSubmit={handleSubmit} className="space-y-8">
                <InputField
                  label="Name"
                  type="text"
                  onChange={handleChange}
                  value={`${first_name} ${last_name}`}
                  placeholder="Your Name"
                />
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="mb-4 relative">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-1"
                      >
                        Slot
                      </label>
                      <select
                        name="slot"
                        required
                        className="w-full border rounded py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleSlotChange}
                      >
                        <option value="" hidden>Select a slot</option>
                        {slots.map(({ _id, date, time }) => <option key={_id} value={_id}>{date} - {time}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="mb-4 relative">
                      <label className="block text-gray-700 text-sm font-bold mb-1">
                        Date
                      </label>
                      <DatePicker
                        placeholderText="--/--/----"
                        selected={date}
                        name="date"
                        onChange={handleDateChange}
                        value={date}
                        className="w-full border rounded py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="mb-4 relative">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-1"
                      >
                        Time
                      </label>
                      <input
                        type="time"
                        name="time"
                        onChange={handleChange}
                        value={time}
                        required
                        className="w-full border rounded py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <InputField
                  label="Your Email"
                  type="email"
                  onChange={handleChange}
                  value={email}
                  placeholder="email"
                />
                <InputField
                  label="Contact Number"
                  name="mobile"
                  type="text"
                  onChange={handleChange}
                  value={mobile}
                  placeholder="Your Contact Number"
                />
                {
                  currentUser
                    ? <button
                      type="submit"
                      className="py-3 px-5 text-sm font-medium text-center bg-[#23A6F0] text-white rounded-lg w-[15rem] mx-auto block"
                    >
                      Submit
                    </button>
                    : <Link to="/login"
                      className="py-3 px-5 text-sm font-medium text-center bg-[#23A6F0] text-white rounded-lg w-[15rem] mx-auto block"
                    >
                      Sign in first</Link>
                }

              </form>
            </div>
            : <h4 className="mb-4 text-3xl font-extrabold text-center text-gray-900">
              No available slots at the moment.
            </h4>}
        </div>
        <ToastContainer />
      </section>
      <Footer />
    </>
  );
};

export default Consultation;
