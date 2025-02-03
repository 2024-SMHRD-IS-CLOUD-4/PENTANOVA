import React from 'react'
import { NavLink } from 'react-router-dom';
import '../../css/all.css'
import '../../css/user.css'
import logo from '../../assets/logo.png'


const Diagnosis = ({setActiveState}) => {

  const aiDiagnosis = () => setActiveState('AiDiagnosis');
  const selfDiagnosis = () => setActiveState('SelfDiagnosis');
  const hisDiagnosis = () => setActiveState('HisDiagnosis');

  return (
    <div id='diMainBox'>
      <div className='diTitle'>
        <img src={logo} alt="GROWELL" />
        <p>AI · 자가 병해충 진단</p>
      </div>
      <button className="userButton" onClick={aiDiagnosis}>
        <h2>AI 병해충진단</h2>
        <p>이미지를 통한 AI 진단</p>
      </button>
      <button className="userButton" onClick={selfDiagnosis}>
        <h2>자가진단</h2>
        <p>문답을 통한 자가 진단</p>
      </button>
      <button className="userButton" onClick={hisDiagnosis}>
        <h2>진단이력 관리</h2>
        <p>AI, 자가 진단 이력 관리</p>
      </button>
    </div>
  )
}
export default Diagnosis;