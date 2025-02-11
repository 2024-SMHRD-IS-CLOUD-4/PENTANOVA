// pages/Dashboard.js
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { AppData } from '../../function/AuthContext';
import { Button, Grid, MenuItem, Paper, Select } from '@mui/material';
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
  const [selectedDate, setSelectedDate] = useState("30");
  const [selectedDp, setSelectedDp] = useState(""); // 🔴 기본 선택지 상태
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
    setDpList(dpResponse.data);
    if (dpResponse.data.length > 0) {
      setSelectedDp(dpResponse.data[0].dp_num);
    }

    dpCount.fill(0);
    dpResponse.data.map((dp, idx) => {
      diagResponse.data.map(diag => {
        if (diag.dp_num.dp_num === dp.dp_num) {
          if (dateRef2.current.value === diag.createdAt.split('-')[1]) {
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
            if (user.createdAt.split('-')[1] === month) {
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
            if (diag.createdAt.split('-')[1] === month) {
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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={0} sx={{ padding: 2, textAlign: 'center', borderRadius:'20px'}}>
          <span>질병:{dpTypeCount[1]}회,해충:{dpTypeCount[0]}회</span>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={0} sx={{ padding: 2, boxShadow: 'none', borderRadius: '20px' }}>
          <span>병해충 진단 현황</span>
           {/* 기본값 `30`으로 설정 */}
           <Select
            ref={dateRef2}
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)}
            sx={{ 
              width: 'fit-content', 
              height: '40px', 
              borderRadius: '20px', 
              float: 'right', 
              fontSize: '14px', 
              marginBottom: '20px' 
            }}
          >
            <MenuItem value="30">최근 30일</MenuItem>
            <MenuItem value="60">1달 전</MenuItem>
            <MenuItem value="90">2달 전</MenuItem>
          </Select>
          {data4 ? <Pie data={data4} options={options2}/> : <p>데이터 없음</p>}
          {/* 리스트를 좌우로 정렬 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
              {/* 상위 3개 - 왼쪽 정렬 */}
              <ul style={{ width: '48%', listStyle: 'none', padding: 0, margin: 0 }}>
                {dpList.slice(0, 3).map((dp, idx) => (
                  <li key={dp.dp_num} style={{ padding: '5px 0' }}>
                    {dp.name} <span style={{ float: 'right' }}>{dpCount[idx]}회</span>
                  </li>
                ))}
              </ul>

              {/* 나머지 - 오른쪽 정렬 */}
              <ul className='scroll' style={{ height:'116px', width: '48%', listStyle: 'none', paddingTop:8, paddingBottom: 8, margin: 0, fontSize:'12px', backgroundColor:'#ededed'}}>
                {dpList.slice(3).map((dp, idx) => (
                  <li key={dp.dp_num} style={{ padding: '5px 0'}}>
                    {dp.name} <span style={{ float: 'right' }}>{dpCount[idx + 3]}회</span>
                  </li>
                ))}
              </ul>
            </div>
        </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          {/* 오른쪽: 지역별 병해충 분포 (상단) */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ padding: 2, boxShadow: 'none', borderRadius: '20px' }}>
            <Select
              ref={dpRef}
              value={selectedDp} // 🔴 기본 선택지 적용
              onChange={(e) => setSelectedDp(e.target.value)}
              sx={{ 
                width: 'fit-content', 
                height: '40px', 
                borderRadius: '20px', 
                float: 'right', 
                fontSize: '14px', 
                marginBottom: '20px' 
              }}
            >
                {dpList.map(dp => (
                  <MenuItem key={dp.dp_num} value={dp.dp_num}>{dp.name}</MenuItem>
                ))}
              </Select>
              {data3 ? <Bar data={data3} /> : <p>데이터 없음</p>}
            </Paper>
          </Grid>

          {/* 오른쪽 아래: 이용현황 */}
          <Grid item xs={12} sx={{ alignSelf: 'flex-end', marginTop: '20px' }}>
            <Paper elevation={0} sx={{ padding: 2, boxShadow: 'none', borderRadius: '20px' }}>
              <Button
                variant={activeTab === '이용현황' ? 'contained' : 'outlined'}
                onClick={() => setActiveTab('이용현황')}
                sx={{ 
                  borderRadius: '20px',
                  backgroundColor: activeTab === '이용현황' ? 'transparent' : 'transparent',
                  color: activeTab === '이용현황' ? '#555' : '#999',
                  border: activeTab === '이용현황' ? '1px solid #555' : '1px solid #999',
                  boxShadow: activeTab === '이용현황' ? 'none' : 'none',
                  marginRight: 2,
                  marginBottom:4,
                  '&:hover': {
                    backgroundColor: activeTab === '이용현황' ? 'transparent' : 'transparent',
                    color: activeTab === '이용현황' ? '#555' : '#999',
                    boxShadow: activeTab === '이용현황' ? 'none' : 'none',
                  }
                }}
              >
                이용 현황
              </Button>
              <Button
                variant={activeTab === '가입현황' ? 'contained' : 'outlined'}
                onClick={() => setActiveTab('가입현황')}
                sx={{ 
                  borderRadius: '20px',
                  backgroundColor: activeTab === '가입현황' ? 'transparent' : 'transparent',
                  color: activeTab === '가입현황' ? '#555' : '#999',
                  border: activeTab === '가입현황' ? '1px solid #555' : '1px solid #999',
                  boxShadow: activeTab === '가입현황' ? 'none' : 'none',
                  marginBottom:4,
                  '&:hover': {
                    backgroundColor: activeTab === '가입현황' ? 'transparent' : 'transparent',
                    color: activeTab === '가입현황' ? '#555' : '#999',
                    boxShadow: activeTab === '가입현황' ? 'none' : 'none',
                  }
                }}
              >
                가입 현황
              </Button>

              {/* 탭 전환 */}
              {activeTab === '이용현황' ? (
                data2 ? <Line data={data2} /> : <p>이용현황 데이터 없음</p>
              ) : (
                data1 ? <Bar data={data1} /> : <p>가입현황 데이터 없음</p>
              )}
            </Paper>
          </Grid>
        </Grid>
    </Grid>
  );
};
export default Dashboard;