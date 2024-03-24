// src/App.tsx
import React, { useState } from 'react';
import "./index.css"
import { Circle } from 'rc-progress';
import { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from "../../features/users/userSlice";

function VitalsDashboard() {
  const [pulse, setPulse] = useState(0)
  const [SpO2, setSpO2] = useState(0)
  const [roomTemp, setRoomTemp] = useState(0)
  const [bodyTemp, setBodyTemp] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [gsr, setGsr] = useState(0)
  const [sys, setSys] = useState(0)
  const [dia, setDia] = useState(0)
  const [ecgData, setEcgData] = useState([]) 
  const [date, setDate] = useState([0,0,0,0,0])
  const [dateId, setDateId] = useState(0)

  const email = useSelector((state: {user: { id:string, email:string, dob:string, exp:number, gender:string, name:string, photoUrl:string, state:string, timeStamp: string }})=> state.user.email)
  const name = useSelector((state: {user: { id:string, email:string, dob:string, exp:number, gender:string, name:string, photoUrl:string, state:string, timeStamp: string }})=> state.user.name)
  
  console.log(email)

  const espInfo = async () =>{
    const apiUrl = "http://52.66.241.131/IoMTAppAPI/api/getWebData.php";
    const data = {
        // "email": email,  
      "email": "pratikchanda2000.pc@gmail.com", 
    };
    const requestOptions = {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse && jsonResponse.Status) {

          console.log(jsonResponse.Status.record);
          console.log(jsonResponse.Status.record[dateId].pulse);

          setPulse(jsonResponse.Status.record[dateId].pulse);
          setSpO2(jsonResponse.Status.record[dateId].SpO2);
          setBodyTemp(jsonResponse.Status.record[dateId].body_temp)
          setDia(jsonResponse.Status.record[dateId].dia)
          setGsr(jsonResponse.Status.record[dateId].gsr)
          setHumidity(jsonResponse.Status.record[dateId].humidity)
          setRoomTemp(jsonResponse.Status.record[dateId].room_temp)
          setSys(jsonResponse.Status.record[dateId].sys)   
          setEcgData(jsonResponse.Status.record[dateId].ecg)
          date[0] = jsonResponse.Status.record[0].timestamp
          date[1] = jsonResponse.Status.record[1].timestamp
          date[2] = jsonResponse.Status.record[2].timestamp
          date[3] = jsonResponse.Status.record[3].timestamp
          date[4] = jsonResponse.Status.record[4].timestamp
          console.log(date);
          
        }
      } else {
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error sending JSON data:', error);
    }
  }

  useEffect(()=>{
    espInfo();
  },[dateId])

  const options: ApexOptions = {
    chart: {
      id: 'ecg-chart',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000,
        },
      },
    },
    xaxis: {
      type: 'category',
      categories: Array.from({ length: ecgData.length }, (_, i) => (i + 1).toString()),
      labels: {
        show: false, // Set this to false to hide x-axis labels
      },
    },
    yaxis: {
      min: Math.min(...ecgData) - 50,
      max: Math.max(...ecgData) + 50,
      
    },
    stroke: {
      curve: 'straight',
    },
    grid: {
      borderColor: '#A9FFC6', // Set the color of the grid lines to green
    },
    colors: ["#009900"]
  };

  const series = [
    {
      name: 'ECG',
      data: ecgData,
    },
  ];

  const dispatch = useDispatch()

  const handleLogout = () =>{
      dispatch(userLogout())
      window.location.href = "/"

  }

  return (
    <div >
      <div className='vitals-page'>
        <div className='sidenav'>
          <img src="./static/profile-icon.png" height="100px" alt="" />
          <h2>{name}</h2>
          <div >
            <a href="/patientdashboard"><img src="./static/dashboard-icon.png" height="30px" width="30px" alt="" /></a>
          </div>
          <div>
            <a href="/appointment"><img src="./static/appointment-icon.png" height="30px" width="30px"  alt="" /></a>
          </div>
          <div>
            <a href="/history"><img src="./static/history-icon.png" height="30px" width="30px"  alt="" /></a>
          </div>
          <div id='vitalsIcon'>
            <a href="/vitals"><img src="./static/vitals-icon.png" height="30px" width="30px" alt="" /></a>
          </div>
          <div onClick={handleLogout}>
            <img src="./static/logout-icon.png" height="30px" width="30px" alt="" />
          </div>
        </div>
        <div id='vitals-dashboard'>
        <div className='page-label'>
        <span>Vitals Dashboard</span>
        <select name="timestamp" id="timestamp" onChange={(e) => {
          setDateId(parseInt(e.target.value))
          console.log(dateId);
        }}>
          <option value={0}>{date[0]}</option>
          <option value={1}>{date[1]}</option>
          <option value={2}>{date[2]}</option>
          <option value={3}>{date[3]}</option>
          <option value={4}>{date[4]}</option>
        </select>
        </div>
        <div className='vitals-table'>
          <div className='col'>
            <div className='row-vitals'>
              <div className='Progress'>
                <div className="Circle-vitals" >
                  <div> Heart Rate</div>
                  <div className="Label-vitals">{pulse}</div>
                  {/* <Circle percent={50} strokeWidth={5} strokeColor="#25D366" trailWidth={5} trailColor="#d6e7da"/>  */}
                  <img src="./static/heartRate.png" alt="" width={150} />
                </div>
              </div>
              <div className='Progress'>
                <div className="Circle-vitals" >
                  <div> SpO2</div>
                  <div className="Label-vitals-center">{SpO2}</div>
                  <Circle percent={SpO2} strokeWidth={7} strokeColor="#25D366" trailWidth={7} trailColor="#d6e7da"/> 
                </div>
              </div>
            </div>
            <div className='row-vitals'>
              <div className='Progress'>
                <div className="Circle-vitals" >
                  <div> Room Temp.</div>
                  <div className="Label-vitals-center">{roomTemp}°C</div>
                  <Circle percent={(((roomTemp-15)*100/(30-15))>100)?100:((roomTemp-15)*100/(30-15))} strokeWidth={10} strokeColor="#25D366" trailWidth={5} trailColor="#d6e7da" gapDegree={60} gapPosition='bottom'/> 
                </div>
              </div>
              <div className='progress'>
                <div className="Circle-vitals" >
                  <div> <p>Body Temp.</p> </div>
                  <div className="Label-vitals">
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="150" viewBox="0 0 45 125" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5319 79.4599C14.8067 81.6438 14.044 83.8295 12.5307 85.197C8.75357 88.6097 6.34672 93.8771 6.35104 99.7902C6.35834 110.042 13.6289 118.346 22.5902 118.337C31.5516 118.329 38.8103 110.011 38.803 99.7596C38.7986 93.8468 36.3845 88.584 32.6022 85.1781C31.087 83.8134 30.3214 81.6292 30.5929 79.4451C30.6467 79.0122 30.6748 78.5674 30.6743 78.111L30.6302 16.2361C30.6264 11.1102 26.9913 6.95823 22.5105 6.9624C18.0299 6.96661 14.4005 11.1254 14.4043 16.2513L14.4483 78.1262C14.4489 78.5825 14.4775 79.0274 14.5319 79.4599ZM8.9956 16.2563C8.98938 7.7132 15.0382 0.78193 22.5061 0.774908C29.9739 0.767916 36.0326 7.68786 36.0389 16.231L36.0829 78.1061C36.0835 78.8563 36.0375 79.5942 35.9477 80.3163C40.9753 84.8437 44.2059 91.8668 44.2116 99.7546C44.2213 113.424 34.5431 124.514 22.5946 124.525C10.6463 124.536 0.952126 113.464 0.94239 99.7951C0.936711 91.9073 4.15729 84.878 9.17841 80.3413C9.08755 79.6196 9.04022 78.8817 9.03968 78.1311L8.9956 16.2563Z" fill="#317873"/>
                    <path d="M22.5215 22.4313C22.5201 20.7226 23.7301 19.3363 25.2236 19.335L30.6323 19.3301L30.6366 25.5176L25.228 25.5225C23.7344 25.5238 22.5226 24.1399 22.5215 22.4313Z" fill="#317873"/>
                    <path d="M22.5303 34.8063C22.5289 33.0976 23.7388 31.7113 25.2322 31.71L30.6408 31.7051L30.6454 37.8926L25.2368 37.8975C23.7432 37.8988 22.5314 36.5149 22.5303 34.8063Z" fill="#317873"/>
                    <path d="M22.5391 47.1812C22.5377 45.4726 23.7476 44.0863 25.241 44.085L30.6496 44.0801L30.6542 50.2676L25.2456 50.2725C23.752 50.2738 22.5401 48.8899 22.5391 47.1812Z" fill="#317873"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.87402 82.1305L36.9395 113.043L40.7607 108.664L13.6952 77.752L9.87402 82.1305Z" fill="#317873"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.86523 69.7558L39.6372 103.759L43.4586 99.38L13.6867 65.377L9.86523 69.7558Z" fill="#317873"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6846 61.7524L31.277 81.8454L35.0982 77.4665L17.5058 57.3735L13.6846 61.7524Z" fill="#317873"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.502 61.7422L31.2679 69.4697L35.0894 65.0912L28.3232 57.3633L24.502 61.7422Z" fill="#317873"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7285 56.4726L33.3634 56.4521L33.3677 62.6396L11.7328 62.6601L11.7285 56.4726Z" fill="#317873"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.38379 90.5093L33.4492 121.421L37.2707 117.042L10.2053 86.1304L6.38379 90.5093Z" fill="#317873"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.89355 98.8877L24.546 123.617L28.3672 119.239L6.71477 94.5088L2.89355 98.8877Z" fill="#317873"/>
                    </svg>
                    </div>
                    <div>
                      {bodyTemp}°C
                    </div>
                    
                  </div>
                  
                  {/* <Circle percent={50} strokeWidth={5} strokeColor="#25D366" trailWidth={5} trailColor="#d6e7da"/>  */}
                </div>
              </div>
            </div>
            <div className='row-vitals'>
            <div className='progress'>
                <div className="Circle-vitals" >
                  <div> Humidity</div>
                  <div className="Label-vitals">{humidity}</div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="150" height="100" viewBox="0 0 38 40" fill="none">
                  <path d="M16.669 13.3333L17.4308 13.9811L17.1313 14.3333H16.669V13.3333ZM23.75 11C21.2517 11 18.995 12.1415 17.4308 13.9811L15.9072 12.6856C17.822 10.4335 20.6212 9 23.75 9V11ZM32.25 20C32.25 14.9805 28.3967 11 23.75 11V9C29.5967 9 34.25 13.9738 34.25 20H32.25ZM23.75 29C28.3967 29 32.25 25.0195 32.25 20H34.25C34.25 26.0262 29.5967 31 23.75 31V29ZM9.75 29H23.75V31H9.75V29ZM5.75 25C5.75 27.2091 7.54086 29 9.75 29V31C6.43629 31 3.75 28.3137 3.75 25H5.75ZM5.75 18.3333V25H3.75V18.3333H5.75ZM9.75 14.3333C7.54086 14.3333 5.75 16.1242 5.75 18.3333H3.75C3.75 15.0196 6.43629 12.3333 9.75 12.3333V14.3333ZM16.669 14.3333H9.75V12.3333H16.669V14.3333Z" fill="#9ACD32"/>
                  <path d="M25.8364 29.7559C27.5837 29.3418 29.1842 28.4163 30.4533 27.086C31.7224 25.7557 32.6084 24.0749 33.0092 22.2374C33.4099 20.3999 33.309 18.4806 32.7181 16.7009C32.1272 14.9211 31.0704 13.3535 29.6696 12.1787C28.2688 11.004 26.5811 10.27 24.801 10.0614C23.021 9.85281 21.2212 10.1782 19.6093 10.9999C17.9973 11.8216 16.6389 13.1063 15.6907 14.7056C14.7424 16.305 14.243 18.154 14.2501 20.0393" stroke="#9ACD32" stroke-width="2"/>
                  </svg>
                  {/* <Circle percent={50} strokeWidth={5} strokeColor="#25D366" trailWidth={5} trailColor="#d6e7da"/>  */}
                </div>
              </div>
              <div className='progress'>
                <div className="Circle-vitals" >
                  <div> GSR</div>
                  <div className="Label-vitals">{gsr}</div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="150" height="140" viewBox="0 0 188 62" fill="none">
                  <path d="M1 24.6597L24.25 21.3068L47.5 2L70.75 22.9702L94 4.6968L117.25 60L140.5 59.5151L163.75 36.911L187 25.3691" stroke="#00E79B" stroke-width="3"/>
                  </svg>
                  {/* <Circle percent={50} strokeWidth={5} strokeColor="#25D366" trailWidth={5} trailColor="#d6e7da"/>  */}
                </div>
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='Progress-col'>
              <div className="col-vitals" >
                <div>
                  <div> ECG</div>
                  <div className="Label-vitals-ecg">
                    <ReactApexChart options={options} series={series} type="line" height={250} width={450} />
                  </div>
                </div>
              </div>
            </div>
            <div className='Progress-col'>
              <div className="col-vitals" >
                <div>
                  <div> &nbsp;&nbsp;&nbsp;Blood Pressure</div>
                  <div className='row-vitals'>
                    <div className='Progress'>
                      <div className="Circle-vitals" id='sys' >
                        <div> Systolic</div>
                        <div className="Label-vitals">{sys}</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="140" viewBox="0 0 212 136" fill="none">
                        <path d="M1 54.1797L27.125 46.6067L53.25 3L79.375 50.3636L105.5 9.09104L131.625 134L157.75 132.905L183.875 81.8506L210 55.7819" stroke="#0BDA51" stroke-width="3"/>
                        </svg>
                        {/* <Circle percent={50} strokeWidth={5} strokeColor="#25D366" trailWidth={5} trailColor="#d6e7da"/>  */}
                      </div>
                    </div>
                    <div className='Progress'>
                      <div className="Circle-vitals"  id='dia'>
                        <div> Diastolic</div>
                        <div className="Label-vitals">{dia}</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="140" viewBox="0 0 213 139" fill="none">
                        <path d="M2 82.9245L28.25 6L54.5 114.396L80.75 129.986L107 23.1635L133.25 122.796L159.5 81.3529L185.75 119.132L212 137" stroke="#009900" stroke-width="3"/>
                        </svg>
                        {/* <Circle percent={50} strokeWidth={5} strokeColor="#25D366" trailWidth={5} trailColor="#d6e7da"/>  */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
    
  );
}

export default VitalsDashboard;