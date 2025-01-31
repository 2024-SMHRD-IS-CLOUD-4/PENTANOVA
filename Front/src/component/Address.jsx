import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

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
    width: '360px',
    height: '480px',
  };

  const completeHandler = (data) => {
    let { address, zonecode, sido } = data;
    
    switch(sido){
      case '서울' : 
      case '인천' :
      case '경기' :
        setSido('경기도')
        break;
      case '강원':
        setSido('강원특별자치도')
        break; 
      case '충북':
      case '충남':
      case '대전':
      case '세종특별자치시':
        setSido('충청도')
        break; 
      case '전북특별자치도':
      case '전남':
      case '제주특별자치도':
      case '광주':
        setSido('전라도')
        break;
      case '경북':
      case '경남':
      case '대구':
      case '울산':
      case '부산':
        setSido('경상도')
        break; 
    }
    setZonecode(zonecode);
    setAddress(address);
    props.onAddressChange(address, zonecode, sido);
    setIsOpen(false);
  };

  const closeHandler = (state) => {
    if (state === 'FORCE_CLOSE') {
      setIsOpen(false);
    } else if (state === 'COMPLETE_CLOSE') {
      setIsOpen(false);
    }
  };

  const toggleHandler = () => {
    setIsOpen((prevOpenState) => !prevOpenState);
  };

  const addressHandler = (event) => {
    setAddress(event.target.value);
    props.onAddressChange(event.target.value, zonecode);
  };

  const zonecodeHandler = (event) => {
    setAddress(event.target.value);
  };

  return (
    <div>
      <div>
        <div>
          <button
            type="button"
            onClick={toggleHandler}
          >
            주소 찾기
          </button>
        </div>
        {isOpen && (
          <div>
            <DaumPostcode
              theme={themeObj}
              style={postCodeStyle}
              onComplete={completeHandler}
              onClose={closeHandler}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Address;