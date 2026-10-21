import React from 'react';
import BackButton from '../components/BackButton';
import experbg from '../assets/experience-bg.jpg';

export default function ExperPage() {
  return (
    /* 1. 전체 화면 배경 및 중앙 정렬 */
    <div 
      /* w-screen h-screen으로 브라우저 가장자리에 딱 붙게 설정 */
      className="relative w-screen h-screen pt-[120px] pb-[120px] px-[80px] overflow-hidden"
      style={{ 
        backgroundImage: `url(${experbg})`,
        /* 이미지 비율을 무시하고 화면 전체(100% 100%)에 꽉 채움 */
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* 화면 내용 영역 */}
      {/* 🚧 공사 안내판 메인 박스 (반응형 비율 적용) */}
      <div className="relative w-full max-w-[550px] bg-blue-900 border-[6px] border-blue-950 rounded-lg shadow-2xl p-6 md:p-8 text-white flex flex-col justify-between">
        
        {/* 상단 타이틀 */}
        <div className="text-center bg-blue-950 py-3 rounded border border-blue-700 shadow-inner">
          <h1 className="text-3xl md:text-4xl font-black text-yellow-300 tracking-wider">
            🚨 공 사 안 내 🚨
          </h1>
        </div>

        {/* 안내 문구 */}
        <div className="my-4 text-center bg-white text-red-600 font-bold p-3 rounded text-xs md:text-sm shadow-md leading-relaxed">
          공사기간에 불편함이 있더라도 양해를 부탁드리며<br />
          공사를 안전하게 실시하겠습니다.
        </div>

        {/* 상세 공사 정보 테이블 형식 */}
        <div className="flex flex-col gap-2.5 my-2">
          <div className="flex items-center bg-blue-950 rounded p-2 border border-blue-800">
            <span className="bg-blue-700 text-yellow-300 font-bold px-3 py-1 rounded text-xs md:text-sm min-w-[90px] text-center shadow">공 사 명</span>
            <span className="ml-4 text-xs md:text-sm font-medium text-gray-100">내용 정비 및 페이지 개설 공사</span>
          </div>

          <div className="flex items-center bg-blue-950 rounded p-2 border border-blue-800">
            <span className="bg-blue-700 text-yellow-300 font-bold px-3 py-1 rounded text-xs md:text-sm min-w-[90px] text-center shadow">공사기간</span>
            <span className="ml-4 text-xs md:text-sm font-medium text-yellow-200">2026년 10월 22일 부터 11월 22일 까지</span>
          </div>

          <div className="flex items-center bg-blue-950 rounded p-2 border border-blue-800">
            <span className="bg-blue-700 text-yellow-300 font-bold px-3 py-1 rounded text-xs md:text-sm min-w-[90px] text-center shadow">공사주관</span>
            <span className="ml-4 text-xs md:text-sm font-medium text-gray-100">(주)수정상사</span>
          </div>

          <div className="flex items-center bg-blue-950 rounded p-2 border border-blue-800">
            <span className="bg-blue-700 text-yellow-300 font-bold px-3 py-1 rounded text-xs md:text-sm min-w-[90px] text-center shadow">시공업체</span>
            <span className="ml-4 text-xs md:text-sm font-medium text-gray-100">수정건설</span>
          </div>

          <div className="flex items-center bg-blue-950 rounded p-2 border border-blue-800">
            <span className="bg-blue-700 text-yellow-300 font-bold px-3 py-1 rounded text-xs md:text-sm min-w-[90px] text-center shadow">현장대리인</span>
            <span className="ml-4 text-xs md:text-sm font-medium text-gray-100">이수정</span>
          </div>

          <div className="flex items-center bg-blue-950 rounded p-2 border border-blue-800">
            <span className="bg-blue-700 text-yellow-300 font-bold px-3 py-1 rounded text-xs md:text-sm min-w-[90px] text-center shadow">공사감독관</span>
            <span className="ml-4 text-xs md:text-sm font-medium text-gray-100">Gemini</span>
          </div>
        </div>

        {/* 하단 마스코트 캐릭터 센스 공간 (이모지로 대체해서 찰떡 구현) */}
        <div className="flex justify-end items-center mt-2 pr-2">
          <div className="text-right">
            <span className="text-2xl animate-bounce inline-block">👷‍♀️</span>
            <p className="text-[10px] text-blue-300">안전제일</p>
          </div>
        </div>

      </div>

      {/* 우측 하단 뒤로가기 버튼 */}
      <BackButton />
    </div>
  );
}