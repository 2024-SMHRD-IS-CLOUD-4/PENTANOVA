import React, { useState } from 'react';
import CropList from './CropList';
import AdminDpList from './AdminDpList';
import DpDetail from './DpDetail';

const PestManagement = () => {
  const [activeState, setActiveState] = useState('CropList');
  const [cropNum, setCropNum] = useState(null);
  const [dpNum, setDpNum] = useState(null);
  const [activeSection, setActiveSection] = useState("cropGuide"); // 현재 활성화된 섹션 관리
  const [selectedItem, setSelectedItem] = useState("열대과일(과수)"); // 기본 선택된 아이템
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 관리

  // 작물 리스트 선택
  const handleLiClick = (item) => {
    setActiveState("CropList"); // CropList 페이지로 이동
    setActiveSection("cropGuide"); // "작물별 도감" 활성화
    setSelectedItem(item); // 클릭한 항목을 저장
  };

  // 검색어 입력
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 검색하기 버튼 클릭 시 AdminDpList 표시 & "병해충 검색" 활성화
  const handleSearchClick = () => {
    if (searchQuery.trim() !== "") {
      setActiveSection("pestSearch");
      setActiveState("AdminDpList");
    }
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
        <input
          type="text"
          onChange={handleInputChange}
          placeholder='단어를 입력해주세요.'
        />
        <button className='sBtn' onClick={handleSearchClick}>검색하기</button>
      </div>

      <div id='pastConBoxR'>
        <div className='scroll'>
          {activeState === 'CropList' && (
            <CropList setActiveState={setActiveState} setCropNum={setCropNum} setDpNum={setDpNum} />
          )}
          {activeState === 'AdminDpList' && (
            <AdminDpList setDpNum={setDpNum} searchQuery={searchQuery} setActiveState={setActiveState} />
          )}
          {activeState === 'DpDetail' && (
            <DpDetail dpNum={dpNum} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PestManagement;