import React, { useEffect, useState } from 'react';

const KakaoAlarm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem("access_token"));
  const [nickname, setNickname] = useState("");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [test1, setTest1] = useState("");
  const [test2, setTest2] = useState("");
  const [test3, setTest3] = useState("");

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    script.onload = () => {
      if (!window.Kakao || !window.Kakao.isInitialized()) {
        window.Kakao.init('4bb49841a03ba73d1018198ab73c7634'); // 본인의 JavaScript 키 입력
        console.log("✅ Kakao 초기화 여부:", window.Kakao.isInitialized());
      }
      const token = sessionStorage.getItem("access_token");
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        // 토큰이 없으면 로그인 버튼 생성
        if (window.Kakao.Auth && window.Kakao.Auth.createLoginButton) {
          window.Kakao.Auth.createLoginButton({
            container: "#kakao-login-btn",
            success: function (authObj) {
              alert("✅ 로그인 성공!");
              sessionStorage.setItem("access_token", authObj.access_token);
              setIsLoggedIn(true);
            },
            fail: function (err) {
              alert("🚨 로그인 실패!");
              console.error(err);
            },
          });
        }
      }
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSendMessage = () => {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      alert("🚨 Kakao SDK가 초기화되지 않았습니다!");
      console.error("🚨 Kakao SDK 미초기화 상태");
      return;
    }
    if (!window.Kakao.Link || !window.Kakao.Link.sendCustom) {
      alert("🚨 Kakao 메시지 기능을 사용할 수 없습니다.");
      console.error("🚨 Kakao.Link.sendCustom()가 존재하지 않습니다!");
      return;
    }
    try {
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
      setNickname("");
      setDate1("");
      setDate2("");
      setTest1("");
      setTest2("");
      setTest3("");
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
      {!isLoggedIn && (
        <div>
          <div id="kakao-login-btn"></div>
        </div>
      )}

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
            onClick={(e) => e.target.showPicker && e.target.showPicker()}
            style={{ width: '300px', padding: '10px', marginBottom: '10px' }}
          />
          <br />
          <input
            type="date"
            placeholder="기간 입력"
            value={date2}
            onChange={(e) => setDate2(e.target.value)}
            onClick={(e) => e.target.showPicker && e.target.showPicker()}
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
