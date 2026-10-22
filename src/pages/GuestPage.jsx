import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import saveBtnImg from '../assets/enterButton.jpg';
import './GuestPage.css';

export default function GuestPage() {
  // 닉네임(10자 제한) 및 본문(50자 제한) 상태 관리
  const [nickname, setNickname] = useState('');
  const [comment, setComment] = useState('');
  
  // 방명록 히스토리 리스트 (localStorage 연동)
  const [historyList, setHistoryList] = useState([]);

  // 로컬스토리지 데이터 로드
  useEffect(() => {
    const savedData = localStorage.getItem('guestbookHistory_v2');
    if (savedData) {
      try {
        setHistoryList(JSON.parse(savedData));
      } catch (e) {
        console.error("데이터 파싱 에러:", e);
      }
    }
  }, []);

  // 저장 처리 (닉네임 + 본문 한 세트)
  const handleSave = (e) => {
    e.preventDefault();
    
    if (!nickname.trim() || !comment.trim()) {
      alert('닉네임과 본문을 모두 입력해주세요!');
      return;
    }

    const newEntry = {
      id: Date.now(),
      nickname: nickname.trim(),
      comment: comment.trim(),
    };

    // 최신 순으로 상단에 노출되도록 배치
    const updatedList = [newEntry, ...historyList];
    setHistoryList(updatedList);
    localStorage.setItem('guestbookHistory_v2', JSON.stringify(updatedList));

    // 입력창 초기화
    setNickname('');
    setComment('');
    alert('✅ 방명록이 등록되었습니다.');
  };

  return (
    <div className="guest-page-container relative w-screen min-h-screen">
      
      {/* 화면 전체 중앙 정렬 메인 영역 (PC: 좌/우, 700px 이하: 상/하) */}
      <div className="guest-content-wrapper ">
        
        {/* ==================== 1. History 영역 (좌측 / 700px 이하 하단) ==================== */}
        <div className="guest-card-box guest-history-section">
          <h2 className="w-full text-center font-bold text-gray-800 text-[clamp(12px,1.2vw,18px)] mb-2 shrink-0">
            방명록 목록
          </h2>

          <div className="guest-history-list">
            {historyList.length > 0 ? (
              historyList.map((item) => (
                <div key={item.id} className="guest-history-item">
                  <div className="guest-history-nickname">{item.nickname}</div>
                  <div className="guest-history-comment">{item.comment}</div>
                </div>
              ))
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-[13px]">
                첫 방명록을 남겨보세요!
              </div>
            )}
          </div>
        </div>

        {/* ==================== 2. Write 영역 (우측 / 700px 이하 상단) ==================== */}
        <div className="guest-card-box guest-write-section">
          <h2 className="w-full text-center font-bold text-gray-800 text-[clamp(12px,1.2vw,18px)] mb-2 shrink-0">
            방명록 작성하기
          </h2>

          <form onSubmit={handleSave} className="guest-form">
            {/* 닉네임 입력란 (한 줄 input / 10자 제한) */}
            <input
              type="text"
              value={nickname}
              maxLength={10}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임 (최대 10자)"
              className="guest-input-single text-gray-800 placeholder:text-gray-400"
            />

            {/* 본문 입력란 (textarea / 50자 제한) */}
            <textarea
              value={comment}
              maxLength={50}
              onChange={(e) => setComment(e.target.value)}
              placeholder="하고싶은 한 마디 ! (최대 50자)"
              className="guest-input-multi text-gray-800 placeholder:text-gray-400"
            />

            {/* 저장하기 버튼 (기존 css/스타일 유지) */}
            <button
              type="submit"
              className="h-[36px] w-auto max-w-full flex items-center justify-center cursor-pointer transition-opacity hover:opacity-80 active:scale-95 mt-1"
            >
              <img 
                src={saveBtnImg} 
                alt="저장하기" 
                className="h-full w-auto object-contain aspect-[180/72] rounded-[10px]"
              />
            </button>
          </form>
        </div>

      </div>

      {/* 우측 하단 뒤로가기 버튼 */}
      <BackButton />
    </div>
  );
}