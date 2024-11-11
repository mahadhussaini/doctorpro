import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import "../styles/BookingPageStyles.css";

const hardcodedDoctors = [
  {
    _id: "1",
    name: "Dr. Ali Ahmed",
    specialty: "Cardiologist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 15,
    fee: 5000,
    location: "Karachi, Sindh",
    timings: ["9:00 AM", "5:00 PM"],
  },
  {
    _id: "2",
    name: "Dr. Zainab Khan",
    specialty: "Neurologist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 12,
    fee: 4500,
    location: "Lahore, Punjab",
    timings: ["10:00 AM", "6:00 PM"],
  },
  {
    _id: "3",
    name: "Dr. Usman Tariq",
    specialty: "Dermatologist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 8,
    fee: 3500,
    location: "Islamabad, ICT",
    timings: ["11:00 AM", "7:00 PM"],
  },
  {
    _id: "4",
    name: "Dr. Fatima Noor",
    specialty: "Pediatrician",
    imageUrl: "https://via.placeholder.com/150",
    experience: 10,
    fee: 4000,
    location: "Rawalpindi, Punjab",
    timings: ["9:00 AM", "2:00 PM"],
  },
  {
    _id: "5",
    name: "Dr. Ahmed Ali",
    specialty: "Orthopedic Surgeon",
    imageUrl: "https://via.placeholder.com/150",
    experience: 20,
    fee: 6000,
    location: "Karachi, Sindh",
    timings: ["9:00 AM", "4:00 PM"],
  },
  {
    _id: "6",
    name: "Dr. Mariam Shah",
    specialty: "Gynecologist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 9,
    fee: 4000,
    location: "Lahore, Punjab",
    timings: ["10:00 AM", "5:00 PM"],
  },
  {
    _id: "7",
    name: "Dr. Bilal Aslam",
    specialty: "ENT Specialist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 7,
    fee: 3500,
    location: "Karachi, Sindh",
    timings: ["9:00 AM", "3:00 PM"],
  },
  {
    _id: "8",
    name: "Dr. Sana Rehman",
    specialty: "Psychiatrist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 6,
    fee: 3000,
    location: "Lahore, Punjab",
    timings: ["10:00 AM", "6:00 PM"],
  },
  {
    _id: "9",
    name: "Dr. Fawad Khan",
    specialty: "General Surgeon",
    imageUrl: "https://via.placeholder.com/150",
    experience: 13,
    fee: 5500,
    location: "Multan, Punjab",
    timings: ["8:00 AM", "4:00 PM"],
  },
  {
    _id: "10",
    name: "Dr. Nida Anwar",
    specialty: "Ophthalmologist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 11,
    fee: 4000,
    location: "Faisalabad, Punjab",
    timings: ["10:00 AM", "5:00 PM"],
  },
  {
    _id: "11",
    name: "Dr. Saad Raza",
    specialty: "Cardiologist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 14,
    fee: 7000,
    location: "Karachi, Sindh",
    timings: ["9:00 AM", "6:00 PM"],
  },
  {
    _id: "12",
    name: "Dr. Hina Iqbal",
    specialty: "Neurologist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 6,
    fee: 3500,
    location: "Lahore, Punjab",
    timings: ["9:00 AM", "5:00 PM"],
  },
  {
    _id: "13",
    name: "Dr. Danish Shams",
    specialty: "Pediatrician",
    imageUrl: "https://via.placeholder.com/150",
    experience: 5,
    fee: 3000,
    location: "Karachi, Sindh",
    timings: ["10:00 AM", "2:00 PM"],
  },
  {
    _id: "14",
    name: "Dr. Imran Malik",
    specialty: "Orthopedic Surgeon",
    imageUrl: "https://via.placeholder.com/150",
    experience: 18,
    fee: 6500,
    location: "Lahore, Punjab",
    timings: ["11:00 AM", "7:00 PM"],
  },
  {
    _id: "15",
    name: "Dr. Bushra Fayyaz",
    specialty: "Gynecologist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 12,
    fee: 5000,
    location: "Islamabad, ICT",
    timings: ["9:00 AM", "5:00 PM"],
  },
  {
    _id: "16",
    name: "Dr. Asif Ali",
    specialty: "ENT Specialist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 10,
    fee: 4000,
    location: "Peshawar, KPK",
    timings: ["9:00 AM", "3:00 PM"],
  },
  {
    _id: "17",
    name: "Dr. Ayesha Bukhari",
    specialty: "Psychiatrist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 9,
    fee: 4500,
    location: "Karachi, Sindh",
    timings: ["10:00 AM", "6:00 PM"],
  },
  {
    _id: "18",
    name: "Dr. Raheel Khan",
    specialty: "General Surgeon",
    imageUrl: "https://via.placeholder.com/150",
    experience: 13,
    fee: 5000,
    location: "Lahore, Punjab",
    timings: ["8:00 AM", "5:00 PM"],
  },
  {
    _id: "19",
    name: "Dr. Uzma Shaikh",
    specialty: "Ophthalmologist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 8,
    fee: 4000,
    location: "Karachi, Sindh",
    timings: ["10:00 AM", "4:00 PM"],
  },
  {
    _id: "20",
    name: "Dr. Shahid Nazir",
    specialty: "Cardiologist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 20,
    fee: 7500,
    location: "Islamabad, ICT",
    timings: ["9:00 AM", "6:00 PM"],
  },
  {
    _id: "21",
    name: "Dr. Sameer Malik",
    specialty: "Cardiologist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 16,
    fee: 7500,
    location: "Karachi, Sindh",
    timings: ["9:00 AM", "6:00 PM"],
  },
  {
    _id: "22",
    name: "Dr. Fariha Khurshid",
    specialty: "Neurologist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 7,
    fee: 4500,
    location: "Lahore, Punjab",
    timings: ["10:00 AM", "5:00 PM"],
  },
  {
    _id: "23",
    name: "Dr. Sameer Iqbal",
    specialty: "Dermatologist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 10,
    fee: 4000,
    location: "Islamabad, ICT",
    timings: ["9:00 AM", "5:00 PM"],
  },
  {
    _id: "24",
    name: "Dr. Rida Shah",
    specialty: "Pediatrician",
    imageUrl: "https://via.placeholder.com/150",
    experience: 9,
    fee: 3500,
    location: "Rawalpindi, Punjab",
    timings: ["9:00 AM", "3:00 PM"],
  },
  {
    _id: "25",
    name: "Dr. Ahsan Yousaf",
    specialty: "Orthopedic Surgeon",
    imageUrl: "https://via.placeholder.com/150",
    experience: 12,
    fee: 6000,
    location: "Karachi, Sindh",
    timings: ["10:00 AM", "6:00 PM"],
  },
  {
    _id: "26",
    name: "Dr. Nabeela Arif",
    specialty: "Gynecologist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 8,
    fee: 4000,
    location: "Lahore, Punjab",
    timings: ["10:00 AM", "4:00 PM"],
  },
  {
    _id: "27",
    name: "Dr. Ayesha Ahmad",
    specialty: "ENT Specialist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 11,
    fee: 4200,
    location: "Karachi, Sindh",
    timings: ["9:00 AM", "5:00 PM"],
  },
  {
    _id: "28",
    name: "Dr. Hassan Khan",
    specialty: "Psychiatrist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 6,
    fee: 3800,
    location: "Lahore, Punjab",
    timings: ["10:00 AM", "6:00 PM"],
  },
  {
    _id: "29",
    name: "Dr. Farhan Ali",
    specialty: "General Surgeon",
    imageUrl: "https://via.placeholder.com/150",
    experience: 9,
    fee: 4500,
    location: "Multan, Punjab",
    timings: ["8:00 AM", "4:00 PM"],
  },
  {
    _id: "30",
    name: "Dr. Shazia Qureshi",
    specialty: "Ophthalmologist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 12,
    fee: 4700,
    location: "Faisalabad, Punjab",
    timings: ["9:00 AM", "5:00 PM"],
  },
  {
    _id: "31",
    name: "Dr. Asim Khurshid",
    specialty: "Cardiologist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 18,
    fee: 7000,
    location: "Karachi, Sindh",
    timings: ["9:00 AM", "6:00 PM"],
  },
  {
    _id: "32",
    name: "Dr. Rabia Siddiqui",
    specialty: "Neurologist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 5,
    fee: 3800,
    location: "Lahore, Punjab",
    timings: ["9:00 AM", "5:00 PM"],
  },
  {
    _id: "33",
    name: "Dr. Zahid Bashir",
    specialty: "Dermatologist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 14,
    fee: 5200,
    location: "Islamabad, ICT",
    timings: ["10:00 AM", "5:00 PM"],
  },
  {
    _id: "34",
    name: "Dr. Rabia Noor",
    specialty: "Pediatrician",
    imageUrl: "https://via.placeholder.com/150",
    experience: 11,
    fee: 5000,
    location: "Rawalpindi, Punjab",
    timings: ["9:00 AM", "3:00 PM"],
  },
  {
    _id: "35",
    name: "Dr. Naila Khan",
    specialty: "Orthopedic Surgeon",
    imageUrl: "https://via.placeholder.com/150",
    experience: 9,
    fee: 4700,
    location: "Karachi, Sindh",
    timings: ["10:00 AM", "6:00 PM"],
  },
  {
    _id: "36",
    name: "Dr. Imran Shahid",
    specialty: "Gynecologist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 15,
    fee: 5500,
    location: "Lahore, Punjab",
    timings: ["9:00 AM", "5:00 PM"],
  },
  {
    _id: "37",
    name: "Dr. Nadeem Zaman",
    specialty: "ENT Specialist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 6,
    fee: 4000,
    location: "Karachi, Sindh",
    timings: ["9:00 AM", "3:00 PM"],
  },
  {
    _id: "38",
    name: "Dr. Kamran Hussain",
    specialty: "Psychiatrist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 8,
    fee: 4200,
    location: "Lahore, Punjab",
    timings: ["9:00 AM", "5:00 PM"],
  },
  {
    _id: "39",
    name: "Dr. Waqar Zaman",
    specialty: "General Surgeon",
    imageUrl: "https://via.placeholder.com/150",
    experience: 10,
    fee: 4800,
    location: "Multan, Punjab",
    timings: ["8:00 AM", "4:00 PM"],
  },
  {
    _id: "40",
    name: "Dr. Sana Haroon",
    specialty: "Ophthalmologist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 9,
    fee: 4600,
    location: "Faisalabad, Punjab",
    timings: ["10:00 AM", "5:00 PM"],
  },
  {
    _id: "41",
    name: "Dr. Hassan Iqbal",
    specialty: "Cardiologist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 16,
    fee: 7500,
    location: "Karachi, Sindh",
    timings: ["9:00 AM", "6:00 PM"],
  },
  {
    _id: "42",
    name: "Dr. Yasmin Anwar",
    specialty: "Neurologist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 12,
    fee: 5000,
    location: "Lahore, Punjab",
    timings: ["9:00 AM", "5:00 PM"],
  },
  {
    _id: "43",
    name: "Dr. Sajid Munir",
    specialty: "Dermatologist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 14,
    fee: 5400,
    location: "Islamabad, ICT",
    timings: ["10:00 AM", "5:00 PM"],
  },
  {
    _id: "44",
    name: "Dr. Zeeshan Saleem",
    specialty: "Pediatrician",
    imageUrl: "https://via.placeholder.com/150",
    experience: 13,
    fee: 5300,
    location: "Rawalpindi, Punjab",
    timings: ["9:00 AM", "3:00 PM"],
  },
  {
    _id: "45",
    name: "Dr. Shamsher Ali",
    specialty: "Orthopedic Surgeon",
    imageUrl: "https://via.placeholder.com/150",
    experience: 17,
    fee: 6400,
    location: "Karachi, Sindh",
    timings: ["9:00 AM", "5:00 PM"],
  },
  {
    _id: "46",
    name: "Dr. Zainab Mehmood",
    specialty: "Gynecologist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 10,
    fee: 5100,
    location: "Lahore, Punjab",
    timings: ["9:00 AM", "4:00 PM"],
  },
  {
    _id: "47",
    name: "Dr. Mohtashim Raza",
    specialty: "ENT Specialist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 7,
    fee: 4200,
    location: "Karachi, Sindh",
    timings: ["9:00 AM", "3:00 PM"],
  },
  {
    _id: "48",
    name: "Dr. Mehak Khan",
    specialty: "Psychiatrist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 9,
    fee: 4500,
    location: "Lahore, Punjab",
    timings: ["10:00 AM", "5:00 PM"],
  },
  {
    _id: "49",
    name: "Dr. Faizan Rauf",
    specialty: "General Surgeon",
    imageUrl: "https://via.placeholder.com/150",
    experience: 8,
    fee: 4700,
    location: "Multan, Punjab",
    timings: ["8:00 AM", "4:00 PM"],
  },
  {
    _id: "50",
    name: "Dr. Shaista Aslam",
    specialty: "Ophthalmologist",
    imageUrl: "https://via.placeholder.com/150",
    experience: 12,
    fee: 5000,
    location: "Faisalabad, Punjab",
    timings: ["9:00 AM", "5:00 PM"],
  },
];

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const selectedDoctor = hardcodedDoctors.find(
      (doctor) => doctor._id === params.doctorId
    );
    setDoctor(selectedDoctor);
  }, [params.doctorId]);

  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = { data: { success: true, message: "Doctor is available!" } };
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date || !time) {
        return alert("Date & Time Required");
      }
      dispatch(showLoading());
      const res = { data: { success: true, message: "Booking successful!" } };
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="booking-page">
        <h3 className="page-title">Booking Page</h3>
        <div className="doctor-info-container">
          {doctor && (
            <>
              <h4 className="doctor-name">{doctor.name}</h4>
              <p className="doctor-fee">
                <strong>Fees:</strong> Rs. {doctor.fee}
              </p>
              <p className="doctor-timings">
                <strong>Timings:</strong>{" "}
                {doctor.timings
                  ? `${doctor.timings[0]} - ${doctor.timings[1]}`
                  : "Not available"}
              </p>
              <div className="booking-controls">
                <DatePicker
                  aria-required="true"
                  format="DD-MM-YYYY"
                  className="date-picker"
                  onChange={(value) =>
                    setDate(moment(value).format("DD-MM-YYYY"))
                  }
                />
                <TimePicker
                  aria-required="true"
                  format="HH:mm"
                  className="time-picker"
                  onChange={(value) => setTime(moment(value).format("HH:mm"))}
                />
                <button
                  className="btn btn-primary check-availability"
                  onClick={handleAvailability}
                >
                  Check Availability
                </button>
                <button
                  className="btn btn-dark book-now"
                  onClick={handleBooking}
                >
                  Book Now
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
