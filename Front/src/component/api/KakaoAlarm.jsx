import React, { useEffect, useState } from 'react';

const KakaoAlarm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부
  const [nickname, setNickname] = useState("닉네임 입력"); // 닉네임
  const [date1, setDate1] = useState("시작 기간 입력"); // 기간
  const [date2, setDate2] = useState("끝 나는 기간"); // 기간
  const [test1, setTest1] = useState("병해충 경보 입력"); // 병해충 경보
  const [test2, setTest2] = useState("병해충 주의 입력"); // 병해충 주의
  const [test3, setTest3] = useState("병해충 예보 입력"); // 병해충 예보

  useEffect(() => {
    // ✅ Kakao SDK 동적 로드
    const script = document.createElement('script');
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    script.onload = () => {
      // ✅ SDK 초기화
      if (!window.Kakao || !window.Kakao.isInitialized()) {
        window.Kakao.init('4bb49841a03ba73d1018198ab73c7634'); // 본인의 JavaScript 키 입력
        console.log("✅ Kakao 초기화 여부:", window.Kakao.isInitialized());
      }

      // ✅ 로그인 버튼 생성
      if (window.Kakao && window.Kakao.Auth) {
        window.Kakao.Auth.createLoginButton({
          container: '#kakao-login-btn',
          success: function (authObj) {
            alert("✅ 로그인 성공!");
            setIsLoggedIn(true); // 로그인 성공 상태
          },
          fail: function (err) {
            alert("🚨 로그인 실패!");
            console.error(err);
          },
        });
      } else {
        console.error("🚨 Kakao SDK 로드 실패!");
      }
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // ✅ 피드 메시지 전송 함수
  const handleSendMessage = () => {
    // SDK 초기화 상태 확인
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      alert("🚨 Kakao SDK가 초기화되지 않았습니다!");
      console.error("🚨 Kakao SDK 미초기화 상태");
      return;
    }

    // Kakao.Link 객체 확인
    if (!window.Kakao.Link || !window.Kakao.Link.sendCustom) {
      alert("🚨 Kakao 메시지 기능을 사용할 수 없습니다.");
      console.error("🚨 Kakao.Link.sendCustom()가 존재하지 않습니다!");
      return;
    }

    try {
      // ✅ 템플릿 ID와 동적 데이터 전달
      window.Kakao.Link.sendCustom({
        templateId: 116902, // 카카오 디벨로퍼에서 발급한 템플릿 ID
        templateArgs: {
          nickname: nickname,
          date1: date1,
          date2: date2,
          test1: test1,
          test2: test2,
          test3: test3,
        },
      });

      alert("✅ 메시지 전송 완료!");
    } catch (err) {
      console.error("🚨 메시지 전송 실패:", err);
      alert("🚨 메시지 전송 중 오류가 발생했습니다.");
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      {/* ✅ 카카오 로그인 버튼 */}
      <div id="kakao-login-btn"></div>

      {/* ✅ 입력 폼 - 피드 내용 수정 가능 */}
      {isLoggedIn && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <input
            type="text"
            placeholder="닉네임 입력"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            style={{ width: '300px', padding: '10px', marginBottom: '10px' }}
          />
          <br />
          <input
            type="date"
            placeholder="기간 입력"
            value={date1}
            onChange={(e) => setDate1(e.target.value)}
            style={{ width: '300px', padding: '10px', marginBottom: '10px' }}
          />
          <br />
          <input
            type="date"
            placeholder="기간 입력"
            value={date2}
            onChange={(e) => setDate2(e.target.value)}
            style={{ width: '300px', padding: '10px', marginBottom: '10px' }}
          />
          <br />
          <input
            type="text"
            placeholder="병해충 경보 입력"
            value={test1}
            onChange={(e) => setTest1(e.target.value)}
            style={{ width: '300px', padding: '10px', marginBottom: '10px' }}
          />
          <br />
          <input
            type="text"
            placeholder="병해충 주의 입력"
            value={test2}
            onChange={(e) => setTest2(e.target.value)}
            style={{ width: '300px', padding: '10px', marginBottom: '10px' }}
          />
          <br />
          <input
            type="text"
            placeholder="병해충 예보 입력"
            value={test3}
            onChange={(e) => setTest3(e.target.value)}
            style={{ width: '300px', padding: '10px', marginBottom: '10px' }}
          />
          <br />
          <button
            onClick={handleSendMessage}
            style={{ marginTop: '20px', padding: '10px 20px' }}
          >
            📩 피드 메시지 보내기
          </button>
        </div>
      )}
    </div>
  );
};

export default KakaoAlarm;
