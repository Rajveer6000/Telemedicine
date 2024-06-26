import React, { useState } from "react";
import Select from "react-select";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../features/users/userSlice";

interface DecodedJwtPayload {
  email: string;
  dob: string;
  exp: number;
  gender: string;
  name: string;
  photourl: string;
  state: string;
  timestamp: string;
}

function DoctorDetails() {
  const [otp, setOtp] = useState("");
  const [state, setstate] = useState(true);
  const dispatch = useDispatch();
  const handleotpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(event.target.value);
  };
  const degreeOptions: { value: string; label: string }[] = [
    { value: "MBBS", label: "MBBS" },
    { value: "MD", label: "MD" },
    { value: "BDS", label: "BDS" },
  ];
  // const SpecilizationOptions: { value: string; label: string }[] = [
  //   { value: "Pediatrician", label: "Pediatrician" },
  //   { value: "gastro", label: "gastro" },
  //   { value: "Dental", label: "Dental" },
  //   { value: "General", label: "General" },
  //   { value: "Ortho", label: "Ortho" },
  // ];
  const degreeStyles = {
    control: (provided: any) => ({
      ...provided,
      padding: "8px",
      border: "1px solid #2cda6d",
      borderRadius: "10px",
      marginTop: "2px",
      maxWidth: "100%",
      backgroundColor: "white",
      transition: "box-shadow 0.3s, border-color 0.3s",
      "&:hover": {
        borderColor: "#2cda6d",
      },
    }),
  };
  const [emailset, setemail] = useState("");

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    gender: "",
    email: "",
    mobile: "",
    dob: "",
    city: "",
    state: "",
    country: "",
    bloodGroup: "",
    degree: [],
    reg_no: "",
    specialization: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileInputChange = (e: any) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSelectChange = (name: any, selectedOptions: any) => {
    setFormData({
      ...formData,
      [name]: selectedOptions.map((option: any) => option.value),
    });
  };

  const handleSubmit = async () => {
    if (
      formData.fname === "" ||
      formData.lname === "" ||
      formData.email === "" ||
      formData.mobile === "" ||
      formData.dob === "" ||
      formData.city === "" ||
      formData.state === "" ||
      formData.country === "" ||
      formData.password === "" ||
      formData.confirmPassword === "" ||
      formData.gender === "" ||
      formData.bloodGroup === "" ||
      formData.degree.length === 0 ||
      formData.reg_no === "" ||
      formData.specialization === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    if (formData.password != formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      alert("Password must contain at least 6 characters.");
      return false;
    }

    // Check if password contains at least one number
    if (!/\d/.test(formData.password)) {
      alert("Password must contain at least one number.");
      return false;
    }

    // Check if password contains at least one special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password)) {
      alert("Password must contain at least one special character.");
      return false;
    }
    const apiurl = "http://52.66.241.131/IoMTAppAPI/api/addDoctor.php";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        name: formData.fname + " " + formData.lname,
        mobile_no: formData.mobile,
        reg_no: formData.reg_no,
        dob: formData.dob,
        gender: formData.gender,
        specilization: formData.specialization,
        password: formData.password,
        degree: formData.degree,
        certificate: " null",
        blood_grp: formData.bloodGroup,
        address:
          formData.city + ", " + formData.state + ", " + formData.country,
        profileImg: "null",
        rating: 0,
      }),
    };
    try {
      const response = await fetch(apiurl, requestOptions);
      if (response.ok) {
        const jsonResponse = await response.json();
        alert("Successfully added the doctor!");
        if (jsonResponse && jsonResponse.Status) {
          setemail(formData.email);

          setstate(false);
        } else {
        }
      } else {
        window.alert("ram ram sara  na");
      }
    } catch (error) {}
  };
  const handleotp = async (event: React.FormEvent<HTMLFormElement>) => {
    const apiurl = "http://52.66.241.131/IoMTAppAPI/api/authDoctorOTP.php";
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: formData.email, otp: otp }),
    };

    try {
      const response = await fetch(apiurl, requestOptions);

      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse && jsonResponse.Status) {
          const jwtToken = jsonResponse.Status.jwt;
          const decodedJwt: DecodedJwtPayload = jwt_decode(jwtToken);
          dispatch(
            userLogin({
              email: decodedJwt.email,
              dob: decodedJwt.dob,
              exp: decodedJwt.exp,
              gender: decodedJwt.gender,
              name: decodedJwt.name,
              photoUrl: decodedJwt.photourl,
              state: decodedJwt.state,
              timeStamp: decodedJwt.timestamp,
            })
          );
          window.location.href = "/doctordashboard";
          setOtp("");
          setstate(true);
        } else {
        }
      } else {
        window.alert("invalid email or password");
      }
    } catch (error) {}
  };
  return (
    <>
      <div>
        <div className="flex justify-items-start space-x-48 mt-16 items-start">
          <div>
            <label htmlFor="fname">First Name *</label>
            <br />
            <input
            autoComplete="off"
              type="text"
              id="fname"
              name="fname"
              value={formData.fname}
              onChange={handleInputChange}
              required
              className="style_input"
            />
          </div>
          <div>
            <label htmlFor="lname">Last Name *</label>
            <br />
            <input
            autoComplete="off"
              type="text"
              id="lname"
              name="lname"
              value={formData.lname}
              onChange={handleInputChange}
              className="style_input"
              required
            />
          </div>
          <div>
            <label htmlFor="gender">Gender *</label>
            <br />
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="style_input w-[210px]"
              required
            >
              <option value=""></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="flex justify-items-start space-x-48 mt-8">
          <div>
            <label htmlFor="email">Email *</label>
            <br />
            <input
            autoComplete="off"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="style_input"
              required
            />
          </div>
          <div>
            <label htmlFor="mobile">Mobile Number *</label>
            <br />
            <input
            autoComplete="off"
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              className="style_input"
              required
            />
          </div>
          <div className="grow">
            <label htmlFor="dob">Date of Birth *</label>
            <br />
            <input
            autoComplete="off"
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="style_input w-[210px]"
              required
            />
          </div>
        </div>
        <div className="flex justify-items-start space-x-48 mt-8">
          <div>
            <label htmlFor="city">City *</label>
            <br />
            <input
            autoComplete="off"
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="style_input w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="state">State *</label>
            <br />
            <input
            autoComplete="off"
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="style_input w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="country">Country *</label>
            <br />
            <input
            autoComplete="off"
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="style_input w-[210px]"
              required
            />
          </div>
        </div>
        <div className="flex justify-items-start space-x-48 mt-8">
          <div>
            <label htmlFor="bloodGroup">Blood group *</label>
            <br />
            <select
              name="bloodGroup"
              id="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleInputChange}
              className="style_input w-[200px]"
              required
            >
              <option value=""></option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
          {/* <div>
            <label htmlFor="certificate">Upload Certificate(s) *</label>
            <br />
            <input
            autoComplete="off"
              type="file"
              id="certificate"
              name="certificate"
              onChange={handleFileInputChange}
              className="style_input w-[210px]"
            />
          </div> */}
          {/* <div>
            <label htmlFor="image">Upload Image *</label>
            <br />
            <input
            autoComplete="off"
              type="file"
              id="image"
              name="image"
              onChange={handleFileInputChange}
              className="style_input w-[210px]"
              required
            />
          </div> */}
          <div className="w-[210px]">
            <label htmlFor="degree">Degree(s) *</label>
            <br />
            <Select
              styles={degreeStyles}
              name="degree"
              id="degree"
              //  value={formData.degree}
              onChange={(degreeOptions) =>
                handleSelectChange("degree", degreeOptions)
              }
              className="style_input"
              options={degreeOptions}
              isMulti={true}
              placeholder=""
              required
            />
          </div>
          <div>
            <label htmlFor="reg_no">Registration Number *</label>
            <br />
            <input
            autoComplete="off"
              type="text"
              id="reg_no"
              name="reg_no"
              value={formData.reg_no}
              onChange={handleInputChange}
              className="style_input w-[210px]"
            />
          </div>
        </div>
        <div className="flex justify-between space-x-48 mt-8">
          <div className="w-[200px]">
            <label htmlFor="specilization">Specialization In *</label>
            <br />
            <select
              name="specialization"
              id="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              className="style_input w-[200px]"
              required
            >
              <option value=""></option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Gastro">Gastro</option>
              <option value="Dental">Dental</option>
              <option value="General">General</option>
              <option value="Ortho">Ortho</option>
            </select>
          </div>
          <div className="w-[210px]">
            <label htmlFor="password">Password *</label>
            <br />
            <input
            autoComplete="off"
              type="text"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="style_input"
              required
            />
          </div>
          <div className="w-[210px]">
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <br />
            <input
            autoComplete="off"
              type="text"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="style_input"
              required
            />
          </div>
        </div>
      </div>
      {state ? (
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-6 px-8 py-3 bg-[#2cda6d] rounded-3xl text-white font-semibold"
        >
          Submit
        </button>
      ) : (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <form onSubmit={handleotp}>
                  <input
                  autoComplete="off"
                    type="number"
                    value={otp}
                    onChange={handleotpChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter OTP"
                  />
                  <button
                    type="submit"
                    className="mt-6 px-4 py-3 bg-[#2cda6d] rounded-xl text-white font-semibold  focus:outline-none focus:shadow-outline"
                  >
                    Verify OTP
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DoctorDetails;
