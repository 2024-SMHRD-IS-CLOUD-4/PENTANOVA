import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

const Diagnosis = () => {
  return (
    <div>
      Diagnosis <br />
      <button>
        <NavLink to="/AiDiagnosis" className={isActive => isActive ? 'active' : ''}>
          AI 병해충진단
        </NavLink>
      </button><br />
      <button>
        <NavLink to="/selfDiagnosis" className={isActive => isActive ? 'active' : ''}>
          자가진단
        </NavLink>
      </button><br />
      <button>
        <NavLink to="/hisDiagnosis" className={isActive => isActive ? 'active' : ''}>
          진단이력 관리
        </NavLink>
      </button>
    </div>
  )
}
export default Diagnosis;