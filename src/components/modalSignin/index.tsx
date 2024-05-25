import React, { useState } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../features/modal/modalSlice";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { userLogin } from "../../features/users/userSlice";
interface DecodedJwtPayload {
  id: string;
  email: string;
  dob: string;
  exp: number;
  gender: string;
  name: string;
  photoUrl: string;
  state: string;
  timeStamp: string;
  phone: string;


  mobile_no: string;
  doctor_id: string;
  registration_no: string;
  specilization: string;
  rating: number;
  city: string;
  address: string;
}
function ModalSignin() {
  const dispatch = useDispatch();
  const [state, setstate] = useState(true);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const toggleModal = () => {
    dispatch(setModal());
  };

  const [userType, setUserType] = useState(0);
  const [patientSelector, setPatientSelector] = useState(
    "modalPatientSelector"
  );
  const [doctorSelector, setDoctorSelector] = useState("modalDoctorSelector");

  const changeStyleDoctorClick = () => {
    setstate(false);
    if (
      patientSelector === "modalPatientSelector" &&
      doctorSelector === "modalDoctorSelector"
    ) {
      setPatientSelector("modalDoctorSelector");
      setDoctorSelector("modalPatientSelector");
      setUserType(1);
    }
  };

  const changeStylePatientClick = () => {
    setstate(true);
    if (
      patientSelector === "modalDoctorSelector" &&
      doctorSelector === "modalPatientSelector"
    ) {
      setPatientSelector("modalPatientSelector");
      setDoctorSelector("modalDoctorSelector");
      setUserType(0);
    }
  };

  const signinHandle = async () => {
    console.log("rediret");
    window.location.href = "patientdashboard";
  /*  const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;

    // console.log(temp_email+"+"+temp_password);

    console.log("initiating api...");

    const apiUrl = "http://52.66.241.131/IoMTAppAPI/api/authUser.php";
    const data = {
      email,
      password,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse && jsonResponse.Status) {
          const jwtToken = jsonResponse.Status.jwt;
          console.log("JWT Token:", jwtToken);
          const decodedJwt: DecodedJwtPayload = jwt_decode(jwtToken);
          console.log(decodedJwt);

          dispatch(
            userLogin({
              email: decodedJwt.email,
              dob: decodedJwt.dob,
              exp: decodedJwt.exp,
              gender: decodedJwt.gender,
              name: decodedJwt.name,
              photoUrl: decodedJwt.photoUrl,
              state: decodedJwt.state,
              timeStamp: decodedJwt.timeStamp,
              city: decodedJwt.city,
            })
          );

          // window.location.href = "/dashboard"
          window.location.href = "patientdashboard";
        } else {
          console.error("Invalid response structure.");
        }
      } else {
        console.error("Error sending JSON data:", response.statusText);
        window.alert("invalid email or password");
      }
    } catch (error) {
      console.error("Error sending JSON data:", error);
    }*/
  };
  const signinHandledoc = async () => {
    const doctor_id = (document.getElementById("Doctorid") as HTMLInputElement)
      .value;
    const password = (
      document.getElementById("docpassword") as HTMLInputElement
    ).value;
    console.log("initiating api...");

    const apiUrl = "http://52.66.241.131/IoMTAppAPI/api/authDoctor.php";
    const data = {
      doctor_id,
      password,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse && jsonResponse.Status) {
          const jwtToken = jsonResponse.Status.jwt;
          console.log("JWT Token:", jwtToken);
          const decodedJwt: DecodedJwtPayload = jwt_decode(jwtToken);
          console.log(decodedJwt);

          dispatch(
            userLogin({
              email: decodedJwt.email,
              dob: decodedJwt.dob,
              exp: decodedJwt.exp,
              doctor_id: decodedJwt.doctor_id,
              name: decodedJwt.name,
              photoUrl: decodedJwt.photoUrl,
              registration_no: decodedJwt.registration_no,
              mobile_no: decodedJwt.mobile_no,
              specilization: decodedJwt.specilization,
              rating: decodedJwt.rating,
              gender: decodedJwt.gender,
              address:decodedJwt.address,
            })
          );

          window.location.href = "doctordashboard";
            
        } else {
          console.error("Invalid response structure.");
        }
      } else {
        console.error("Error sending JSON data:", response.statusText);
        window.alert("invalid email or password");
      }
    } catch (error) {
      console.error("Error sending JSON data:", error);
    }
  };
  return (
    <>
      <div className="flex justify-center h-full w-full overlay ">
        <div className="modal-background">
          <div className="modalContainer ">
            <div className="closeModal ">
              <button className="w-5 h-5 items-center" onClick={toggleModal}>
                x
              </button>
            </div>
            <div className="modalRow">
              <div className="signinText">
                <b>Sign In</b>
              </div>
            </div>
            <div className="modalRow">
              <div
                className={patientSelector}
                onClick={changeStylePatientClick}
              >
                Patient
              </div>
              <div className={doctorSelector} onClick={changeStyleDoctorClick}>
                Doctor
              </div>
            </div>

            {state ? (
              <div>
                <div className="modalRow">
                  <div>
                    <div className="input-field-name">
                      <label htmlFor="email">Email </label>
                    </div>
                    <div>
                      <input type="email" id="email" name="email" />
                    </div>
                  </div>
                </div>
                <div className="modalRow">
                  <div>
                    <div className="input-field-name">
                      <label htmlFor="password">Password </label>
                    </div>

                    <div>
                      <input type="password" id="password" name="password" />
                    </div>
                  </div>
                </div>
                <div className="modalRow rounded-xl h-14 overflow-hidden">
                  <div className="loginBtn " onClick={signinHandle}>
                    Login
                  </div>
                </div>

                <div className="modalRow">
                  <div className="forgotPassword">Forgot Password? </div>
                </div>

                <div className="modalRow">
                  <button className="googleSignupBtn">
                    <img
                      src="./static/google.svg"
                      alt="Google Icon"
                    />
                    Continue with Google
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="modalRow">
                  <div>
                    <div className="input-field-name">
                      <label htmlFor="Doctorid">Doctor ID </label>
                    </div>
                    <div>
                      <input type="text" id="Doctorid" name="Doctorid" />
                    </div>
                  </div>
                </div>
                <div className="modalRow">
                  <div>
                    <div className="input-field-name">
                      <label htmlFor="docpassword">Password </label>
                    </div>

                    <div>
                      <input
                        type="password"
                        id="docpassword"
                        name="docpassword"
                      />
                    </div>
                  </div>
                </div>
                <div className="modalRow rounded-xl h-14 overflow-hidden">
                  <div className="loginBtn " onClick={signinHandledoc}>
                    Login
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalSignin;
