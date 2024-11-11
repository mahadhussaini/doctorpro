import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DoctorList.css";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  const hasTimings = Array.isArray(doctor.timings) && doctor.timings.length > 1;

  return (
    <div
      className="doctor-card"
      onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
    >
      <div className="doctor-card-header">{doctor.name}</div>
      <div className="doctor-card-body">
        <p>
          <b>Specialization:</b> {doctor.specialty}
        </p>
        <p>
          <b>Experience:</b> {doctor.experience} years
        </p>
        <p>
          <b>Fees:</b> Rs. {doctor.fee}
        </p>
        <p>
          <b>Location:</b> {doctor.location}
        </p>
        <p>
          <b>Timings:</b>{" "}
          {hasTimings
            ? `${doctor.timings[0]} - ${doctor.timings[1]}`
            : "Not Available"}
        </p>
      </div>
    </div>
  );
};

export default DoctorList;
