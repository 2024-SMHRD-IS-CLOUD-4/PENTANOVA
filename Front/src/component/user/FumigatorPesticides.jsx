import React from 'react'
import '../../css/all.css'
import '../../css/user.css'
import logo from '../../assets/logo.png'

const FumigatorPesticides = ({setActiveState}) => {

  const fumigator = () => setActiveState('Fumigator');
  const pesticides = () => setActiveState('Pesticides');

  return (
    <div id='fpMainBox'>
      <div className='diTitle'>
        <img className='bigLogo' src={logo} alt="GROWELL" />
        <p>농약 및 방제 정보</p>
      </div>
      <button className="userButton" onClick={pesticides}>
        <h2>농약 검색</h2>
      </button>
      <button className="userButton" onClick={fumigator}>
        <h2>방제 정보</h2>
      </button>
    </div>
  )
}

export default FumigatorPesticides