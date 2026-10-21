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
      <div className="w-full h-full relative">
        {/* Experience 페이지 컨텐츠를 작성하는 곳 */}
      </div>
      alert('해당 페이지는 준비중입니다 !');

      {/* 우측 하단 뒤로가기 버튼 */}
      <BackButton />
    </div>
  );
}