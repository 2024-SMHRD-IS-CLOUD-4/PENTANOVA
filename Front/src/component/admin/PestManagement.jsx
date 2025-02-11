import React, { useState } from 'react';
import CropList from './CropList';

const PestManagement = ({ setActiveState, setCropNum }) => {
  const [activeSection, setActiveSection] = useState("cropGuide"); // 현재 활성화된 섹션 관리
  const [selectedItem, setSelectedItem] = useState("열대과일(과수)"); // 기본 선택된 아이템

  const handleLiClick = (item) => {
    setActiveSection("cropGuide"); // "작물별 도감" 활성화
    setSelectedItem(item); // 클릭한 항목을 저장
  };

  const handleInputClick = () => {
    setActiveSection("pestSearch"); // "병해충 검색" 활성화
    setSelectedItem(null);
  };

  return (
    <div id='pastMainBox'>
      <div id="pastConBoxL">
        {/* 클릭된 상태에 따라 배경색 변경 */}
        <p className={activeSection === "cropGuide" ? "active" : ""}>작물별 도감</p>
        <ul>
          {["열대과일(과수)", "식량작물", "채소", "화훼", "특용작물", "잡초"].map((item) => (
            <li 
              key={item} 
              onClick={() => handleLiClick(item)}
              className={selectedItem === item ? "bold" : ""}
            >
              {item}
            </li>
          ))}
        </ul>

        {/* 클릭된 상태에 따라 배경색 변경 */}
        <p className={activeSection === "pestSearch" ? "active" : ""}>병해충 검색</p>
        <input type="text" onClick={handleInputClick} placeholder='단어를 입력해주세요.'/>
        <button className='sBtn'>검색하기</button>
      </div>
      <div id='pastConBoxR'>
        <div className='scroll'>
          <CropList setActiveState={setActiveState} setCropNum={setCropNum} />
        </div>
      </div>
    </div>
  );
};

export default PestManagement;
