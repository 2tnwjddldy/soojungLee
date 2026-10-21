import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import profilebg from '../assets/profile-bg.png';
import profileImg from '../assets/profileImg.jpg';

export default function ProfilePage() {

    // 토스트 팝업 노출 여부 상태
  const [showToast, setShowToast] = useState(false);

  // 전화번호 클립보드 복사 및 토스트 팝업 실행 함수
  const handleCopyPhone = () => {
    navigator.clipboard.writeText('010-2448-3518');
    
    // 토스트 팝업 띄우기
    setShowToast(true);
    
    // 2초 뒤에 토스트 팝업 자동으로 숨기기
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

//     const handleCopyPhone = () => {
//     navigator.clipboard.writeText('010-2448-3518');
//     alert('✅ 전화번호 복사');
//   };

  return (
    <div 
      /* 화면 전체 크기 및 지정된 패딩(상단 120px, 좌측 80px) 적용 */
      className="relative w-screen h-screen overflow-hidden flex items-center justify-center"
      style={{ 
        backgroundImage: `url(${profilebg})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* 📌 화면 영역(패딩 라인)에 딱 붙어서 위치하는 500x500 프로필 박스 */}
      <div 
        className="flex flex-col items-center justify-center p-[2vw] rounded-[1vw] overflow-y-auto min-w-[220px] min-h-[300px] gap-[clamp(5px,2.5vh,50px)]"
        style={{
          width: '34.72%',   // 1440x900 기준 500px 비율
          height: '55.56%',  
        }}
      >
        
        {/* 1. 이미지 (가로 218.6px -> 218px, 세로 281px, 상단 정중앙) */}
        <div className="mb-[1.5vh] w-full flex items-center justify-center overflow-hidden ">
          <img 
            src={profileImg} 
            alt="Profile" 
            className="h-full w-auto object-contain aspect-[218.6/281] rounded-[0.8vw]"
          />
        </div>

        {/* 2~4. 문자열 정보 상하 한 줄씩 나열 */}
        <div className="w-full flex flex-col items-center shrink-0 gap-[clamp(0px,1.5vh,50px)] text-gray-800 font-medium tracking-wide">
          {/* 이름 (한글/영문) */}
          <div className="text-[clamp(10px,1.5vw,25px)] font-bold">이수정 (Lee Soo Jung)</div>
          
          {/* 생년월일 */}
          <div className="text-[clamp(8px,1.5vw,18px)] text-gray-700">DOB: 2002.03.14</div>
          
          {/* 전화번호 (마우스 오버 또는 클릭 시 복사) */}
          <div 
            onClick={handleCopyPhone}
            title="복사하기"
            className="text-[clamp(8px,1.5vw,18px)] text-gray-700 cursor-pointer hover:text-blue-600 hover:underline transition-colors"
          >
            Phone: 010-2448-3518
          </div>
          
          {/* 이메일 (마우스 오버 또는 클릭 시 메일 쓰기 이동) */}
          <a 
            href="mailto:2tnwjddldy@gmail.com"
            title="메일 보내기"
            className="text-[clamp(8px,1.5vw,18px)] text-gray-700 hover:text-blue-600 hover:underline transition-colors"
          >
            E-mail: 2tnwjddldy@gmail.com
          </a>
        </div>
      </div>

      {/* 📌 전화번호 복사 완료 토스트 팝업 */}
      <div 
        className={`absolute bottom-[10vh] left-1/2 -translate-x-1/2 bg-gray-900/80 backdrop-blur-sm text-white px-[1.5vw] py-[1vh] rounded-full text-[clamp(12px,1vw,16px)] shadow-xl transition-all duration-300 pointer-events-none z-50 ${
          showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        ✅ 복사 완료
      </div>

      {/* 우측 하단 뒤로가기 버튼 */}
      <BackButton />
    </div>
  );
}