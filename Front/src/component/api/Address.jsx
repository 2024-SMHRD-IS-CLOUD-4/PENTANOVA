import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import "../../css/all.css"
import "../../css/jip.css"
import shadows from '@mui/material/styles/shadows';

const Address = (props) => {
  const [zonecode, setZonecode] = useState('');
  const [address, setAddress] = useState('');
  const [sido, setSido] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const themeObj = {
    bgColor: '#FFFFFF',
    pageBgColor: '#FFFFFF',
    postcodeTextColor: '#C05850',
    emphTextColor: '#222222',
  };

  const postCodeStyle = {
    position: 'absolute',
    top:'30%',
    left:'50%',
    transform: 'translateX(-50%)',
    width: '360px',
    height: '480px',
    border: '1px solid #ededed',
    boxShadow: '10%'
  };

  const completeHandler = (data) => {
    let { address, sido } = data;

    setZonecode(zonecode);
    setAddress(address);
    props.onAddressChange(address, sido, isOpen);
    setIsOpen(false);
  };

  const closeHandler = () => {
    setIsOpen(false); // 어떤 경우든 모달을 닫음
};

  const toggleHandler = () => {
    setIsOpen((prevOpenState) => !prevOpenState);
  };

  const addressHandler = (event) => {
    setAddress(event.target.value);
    props.onAddressChange(event.target.value, zonecode);
  };

  return (
    <div>
      <div>
        <div>
          <button
            type="button"
            className='sBtn'
            onClick={toggleHandler}
            style={{
              margin:'-20px',
              marginRight:'0px',
            }}  
          >
            주소 찾기
          </button>
          <input className='jipInput' value={address} />
        </div>
        {isOpen && (
          <div style={{width:'100%',height:'100%', position:'absolute',top:'0', left:'0', background:'rgba(0, 0, 0, 0.4)', borderRadius:'0px' }}>
            <DaumPostcode
              theme={themeObj}
              style={postCodeStyle}
              onComplete={completeHandler}
              onClose={closeHandler}
            />
            <button className='sBtn' onClick={closeHandler} style={{position:'absolute',top:'82%', left:'50%',transform: 'translateX(-50%)'}}>닫기</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Address;