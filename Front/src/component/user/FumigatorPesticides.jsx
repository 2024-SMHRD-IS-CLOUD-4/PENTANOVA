import React from 'react'
import { NavLink } from 'react-router-dom'

const FumigatorPesticides = () => {

  return (
    <div>
      <h2>농약 및 방제 정보</h2>
      <button>
        <NavLink to="/Pesticides" className={isActive => isActive ? 'active' : ''}>
          농약 검색
        </NavLink>
      </button><br />
      <button>
        <NavLink to="/Fumigator" className={isActive => isActive ? 'active' : ''}>
          방제 정보
        </NavLink>
      </button><br />
    </div>
  )
}

export default FumigatorPesticides