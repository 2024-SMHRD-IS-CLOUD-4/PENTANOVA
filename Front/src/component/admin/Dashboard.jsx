// pages/Dashboard.js
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { AppData } from '../../function/AuthContext';
import { Grid, Paper, Select } from '@mui/material';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, BarElement, ArcElement, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, plugins } from 'chart.js';
import { Chart } from 'chart.js/auto';
import loadingImg from '../../assets/loading2.gif'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const today = new Date();
const lastSixMonths = [];
const monthNames = [];
const monthNumbers = [];
const months = [];
const dpCount = [];

for (let i = 5; i >= 0; i--) {
  const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
  const year = month.getFullYear();
  const monthNumber = month.getMonth() + 1;
  let monthTemp = "";
  if (monthNumber < 10) {
    monthTemp = String(monthNumber);
    monthTemp = "0" + monthNumber;
    months.push(monthTemp);
  } else {
    monthTemp = String(monthNumber);
    months.push(monthTemp);
  }
  const monthName = month.toLocaleString('default', { month: 'long' });
  lastSixMonths.push({
    year,
    month: monthNumber,
    monthName: monthName,
    startDate: new Date(year, monthNumber - 1, 1),
    endDate: new Date(year, monthNumber, 0)
  });
  monthNames.push(monthName);
  monthNumbers.push(monthNumber);
}

const options = {
  scales: {
    y: {
      beginAtZero: true,
      max: 10,
      ticks: {
        stepSize: 1
      }
    }
  }
};
const options1 = {
  scales: {
    y: {
      beginAtZero: true,
      max: 20,
      ticks: {
        stepSize: 1
      }
    }
  }
};

const options2 = {
  scales: {
  },
  plugins: {
    legend: {
      display: false // 🔴 범례 숨김
    }
  }
};

const option3 = {
  scales: {
    y: {
      beginAtZero: true,
      max: 5,
      ticks: {
        stepSize: 1
      },

    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('이용현황');
  const [data1, setData1] = useState();
  const [data2, setData2] = useState();
  const [data3, setData3] = useState();
  const [data4, setData4] = useState();
  const [userList, setUserList] = useState([]);
  const [dpList, setDpList] = useState([]);
  const [diagList, setDiagList] = useState([]);
  const [dpNames, setDpNames] = useState([]);
  const [dpTypeCount, setDpTypeCount] = useState([0, 0]);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  let region = ['경기도', '강원도', '충청도', '전라도', '경상도']
  const userMonthCount = new Array(months.length).fill(0);
  const diagMonthCount = new Array(months.length).fill(0);
  let regionCount = new Array(region.length).fill(0);
  const shareData = useContext(AppData);
  let dpRef = useRef();
  let dateRef1 = useRef();
  let dateRef2 = useRef();


  const regionChangeData = async () => {
    const diagResponse = await axios.get(`${process.env.REACT_APP_connect}/diag/diagList`)
    regionCount.fill(0);
    region.map((rg, idx) => {
      diagResponse.data.map(diag => {
        if (rg == diag.diag_region) {
          if (diag.dp_num.dp_num == dpRef.current.value) {
            if (dateRef1.current.value == diag.createdAt.split('-')[1])
              regionCount[idx]++;
          }
        }
      })
    });
    setData3({
      labels: region,
      datasets: [
        {
          label: '병해충 분포',
          data: regionCount,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }],
    })
    setLoading1(true)
  }

  const dateChangeData = async () => {
    const diagResponse = await axios.get(`${process.env.REACT_APP_connect}/diag/diagList`)
    const dpResponse = await axios.get(`${process.env.REACT_APP_connect}/dp/dpList`)

    dpCount.fill(0);
    dpResponse.data.map((dp, idx) => {
      diagResponse.data.map(diag => {
        if (diag.dp_num.dp_num == dp.dp_num) {
          if (dateRef2.current.value == diag.createdAt.split('-')[1]) {
            dpCount[idx]++;
          }
        }
      })
    });
    setData4({
      labels: dpNames,
      datasets: [
        {
          data: dpCount
        }
      ]
    })
    setLoading2(true);
  }

  useEffect(() => {
    const getList = async () => {
      try {
        const userResponse = await axios.get(`${process.env.REACT_APP_connect}/user/userList`)
        const diagResponse = await axios.get(`${process.env.REACT_APP_connect}/diag/diagList`)
        const dpResponse = await axios.get(`${process.env.REACT_APP_connect}/dp/dpList`)
        console.log(userResponse.data);
        setUserList(userResponse.data);
        const userData = userResponse.data;
        console.log(dpResponse.data);
        setDpList(dpResponse.data);
        const dpData = dpResponse.data;
        console.log(diagResponse.data);
        setDiagList(diagResponse.data);
        const diagData = diagResponse.data;
        months.map((month, idx) => {
          userData.map(user => {
            if (user.createdAt.split('-')[1] == month) {
              userMonthCount[idx]++;
            }
          })
        });

        diagData.map(diag => {
          diag.dp_num.category ? dpTypeCount[1]++ : dpTypeCount[0]++;
        });

        setData1({
          labels: monthNames,
          datasets: [
            {
              label: '가입자',
              data: userMonthCount,
              backgroundColor: 'rgba(53, 10, 207, 0.5)',
            }
          ]
        });
        dpResponse.data.map(dp => {
          dpNames.push(dp.name);
          dpCount.push(0);
        })

        months.map((month, idx) => {
          diagData.map(diag => {
            if (diag.createdAt.split('-')[1] == month) {
              diagMonthCount[idx]++;
            }
          })
        });

        setData2({
          labels: monthNames,
          datasets: [
            {
              label: '이용 횟수',
              data: diagMonthCount,
              backgroundColor: 'rgba(68, 11, 201, 0.5)',
            }
          ]
        });

        regionChangeData();
        dateChangeData();
      } catch (error) {
        console.error(error);
      }
      setLoading3(true);
    }
    getList();
  }, []);
  const storedUser = sessionStorage.getItem("user");
  const user = JSON.parse(storedUser);

  return (
    <div id='boardMainPage'>
      <div id='boardConUp'>
        <span>질병:{dpTypeCount[1]}회,해충:{dpTypeCount[0]}회</span>
      </div>
      <div id='boardConDown'>
        <div id='boardConDL'>
          <h2>병해충 진단 현황</h2>
          <select ref={dateRef2} onChange={dateChangeData}>
            <option value={months[5]}>최근 30일</option>
            <option value={months[4]}>1달 전</option>
            <option value={months[3]}>2달 전</option>
            <option value={months[2]}>3달 전</option>
            <option value={months[1]}>4달 전</option>
            <option value={months[0]}>5달 전</option>
          </select>
          {data4 ? <Pie data={data4} options={options2}/> : null}
          {dpList.map((dp, idx) => {
              return (
                <li key={dp.dp_num}>{dp.name}: : {dpCount[idx]}회</li>
              )
            })}
        </div>
        <div id='boardConDR'>
          <div id='boardConDRU'>
            <h2>지역별 병해충 분포</h2>
            <select ref={dpRef} defaultValue={1} onChange={regionChangeData}>
              {dpList.map(dp => {
                return (
                  <option key={dp.dp_num} value={dp.dp_num}>{dp.name}</option>
                )
              })}
            </select>
            <select ref={dateRef1} onChange={regionChangeData}>
              <option value={months[5]}>최근 30일</option>
              <option value={months[4]}>1달 전</option>
              <option value={months[3]}>2달 전</option>
              <option value={months[2]}>3달 전</option>
              <option value={months[1]}>4달 전</option>
              <option value={months[0]}>5달 전</option>
            </select>
            {data3 ? <Bar data={data3} options={options} /> : null}
          </div>
          <div id='boardConDRD'>
            <button className='sBtn' onClick={() => setActiveTab('이용현황')}>이용현황</button>
            <button className='sBtn' onClick={() => setActiveTab('가입현황')}>가입현황</button>
            <div className="chart-container">
              {activeTab === '가입현황' && (
                <div className="chart-box">
                  <h2>가입 현황</h2>
                  {data1 ? <Bar data={data1} options={options1} /> : null}
                </div>
              )}

              {activeTab === '이용현황' && (
                <div className="chart-box">
                  <h2>이용 현황</h2>
                  {data2 ? <Line data={data2} options={options1} /> : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;