import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../features/users/userSlice";
import styles from "./index.module.css";

function VerticalNavPatient() {
  const name = useSelector(
    (state: {
      user: {
        id: string;
        email: string;
        dob: string;
        exp: number;
        gender: string;
        name: string;
        photoUrl: string;
        state: string;
        timeStamp: string;
      };
    }) => state.user.name
  );
  const email = useSelector(
    (state: {
      user: {
        id: string;
        email: string;
        dob: string;
        exp: number;
        gender: string;
        name: string;
        photoUrl: string;
        state: string;
        timeStamp: string;
      };
    }) => state.user.email
  );

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLogout());
    window.location.href = "/";
  };

  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    // Function to check screen width and toggle sidenav visibility
    const checkScreenWidth = () => {
      if (window.innerWidth < 960) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
    };

    // Check screen width when component mounts
    checkScreenWidth();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenWidth);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  const closeNav = () => {
    setShowNav(false);
  };

  return (
    <div>
      <button
        className={styles.hamburgerIcon} // Style this button with hamburger menu icon
        onClick={toggleNav}
      >
        <img src="./static/hamburger.svg" alt="Menu" />
      </button>
      <div
        className={`${styles.sidenav} ${showNav ? styles.show : styles.hide}`}
      >
        {/* Close button */}
        <button
          className={styles.closeButton}
          onClick={closeNav} // Close sidenav when clicked
        >
          Close
        </button>
        <div className="flex flex-col">
          <div className=" w-28 h-28 flex justify-center">
            <img
              src="./static/avatar.jpg"
              height="100%"
              width="100%"
              className="border rounded-full"
            />
          </div>
          <h2 className="font-semibold text-center">{name}</h2>
        </div>
        <div className="flex space-x-3 justify-items-start">
          <a href="/patientdashboard">
            <img
              src="./static/menu.png"
              height="22px"
              width="22px"
              alt=""
              className="mt-1"
            />
          </a>
          <a href="/patientdashboard" className="font-semibold text-xl  ">
            Home
          </a>
        </div>
        <div className="flex space-x-3 justify-items-start">
          <a href="/appointment">
            <img
              src="./static/appointment.png"
              height="22px"
              width="22px"
              alt=""
              className="mt-1"
            />
          </a>
          <a href="/appointment" className="font-semibold text-xl  ">
            Appointments
          </a>
        </div>
        <div className="flex space-x-3 justify-items-start">
          <a href="/patientsbookings">
            <img
              src="./static/patient.png"
              height="22px"
              width="22px"
              alt=""
              className="mt-1"
            />
          </a>
          <a href="/patientsbookings" className="font-semibold text-xl  ">
            Upcoming Appointments
          </a>
        </div>
        {/* <div className="flex space-x-3 justify-items-start">
          <a href="/history">
            <img
              src="./static/patient.png"
              height="22px"
              width="22px"
              alt=""
              className="mt-1"
            />
          </a>
          <a href="/history" className="font-semibold text-xl">
            History
          </a>
        </div> */}
        <div className="flex space-x-3 justify-items-start">
          <a href="/vitals">
            <img
              src="./static/robotic-hand.png"
              height="22px"
              width="22px"
              alt=""
              className="mt-1"
            />
          </a>
          <a href="/vitals" className="font-semibold text-xl ">
            Vitals
          </a>
        </div>
        <div
          onClick={handleLogout}
          className="flex mt-auto pb-4 space-x-4  justify-items-center text-red-500"
        >
          <img src="./static/power.png" height="22px" width="26px" alt="" />
          <h3 className="font-semibold text-xl">Logout</h3>
        </div>
      </div>
    </div>
  );
}

export default VerticalNavPatient;
