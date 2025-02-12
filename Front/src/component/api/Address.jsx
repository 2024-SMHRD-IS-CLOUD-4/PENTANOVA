import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

const Address = ({ onAddressChange }) => {
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
    top: '30%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '360px',
    height: '480px',
    border: '1px solid #ededed',
  };

  const completeHandler = (data) => {
    let { address, sido } = data;
    setAddress(address);
    setSido(sido);
    onAddressChange(address, sido); // 🚀 Join 컴포넌트로 전달
    setIsOpen(false);
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  const toggleHandler = () => {
    setIsOpen((prevOpenState) => !prevOpenState);
  };

  return (
    <div>
      <div>
        <button
          type="button"
          className="sBtn"
          onClick={toggleHandler}
          style={{
            margin: '-20px',
            marginRight: '0px',
          }}
        >
          주소 찾기
        </button>
        <input
          className="jipInput"
          value={address}
          readOnly
        />
      </div>
      {isOpen && (
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '0',
            left: '0',
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '0px',
          }}
        >
          <DaumPostcode
            theme={themeObj}
            style={postCodeStyle}
            onComplete={completeHandler}
            onClose={closeHandler}
          />
          <button
            className="sBtn"
            onClick={closeHandler}
            style={{
              position: 'absolute',
              top: '82%',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            닫기
          </button>
        </div>
      )}
    </div>
  );
};

export default Address;
