import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import "../../css/all.css"
import "../../css/jip.css"

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
    let { address, sido } = data;

    setZonecode(zonecode);
    setAddress(address);
    props.onAddressChange(address, sido, isOpen);
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
          <input className='jipInput' value={address} />
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