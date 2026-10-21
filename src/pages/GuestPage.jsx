import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import guestbook from '../assets/guestbook-bg.png';
import saveBtnImg from '../assets/enterButton.jpg';
import failImg from '../assets/failImg.jpg';

export default function GuestPage() {
  // 텍스트 입력값 상태 관리
  const [character, setCharacter] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  
  // 저장된 방명록 히스토리 리스트 (localStorage 연동)
  const [historyList, setHistoryList] = useState([]);

  // 페이지 진입 시 localStorage에 저장된 방명록 불러오기
  useEffect(() => {
    const savedData = localStorage.getItem('guestbookHistory');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setHistoryList(parsed);
      } catch (e) {
        console.error("데이터 파싱 에러:", e);
      }
    }
  }, []);

  // AI 이미지 생성 API 호출 함수 (Hugging Face Stable Diffusion + Line Art 프롬프트 조합)
  const generateCharacterImage = async (promptText) => {

    // 하찮고 귀여운 알록달록 웹툰 캐릭터 스타일
    const styledPrompt = `simple doodle art, colorful background, flat vector, minimalist lines, funny and cute, ${promptText}`;
    
    try {
      // 💡 외부 허깅페이스 대신 우리 서버(Vercel Function)로 요청
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: styledPrompt }),
      });

      if (!response.ok) {
        throw new Error('앗! 이미지 생성 실패..');
      }

      // 이미지 바이너리 데이터를 Blob 형태로 변환 후 가상 URL 생성
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("API Error:", error);
      alert("기본 이미지 사용할게요..ㅇ");
      return null;
    }
  };

  // 저장 버튼 클릭 이벤트
  const handleSave = async (e) => {
    e.preventDefault();
    if (!character.trim() || !comment.trim()) {
      alert('모든 항목을 입력해주세요!');
      return;
    }

    setLoading(true);
    alert('방명록 읽어보는 중...');

    // 1. AI API를 통해 이미지 생성
    const imageUrl = await generateCharacterImage(character);

    // 2. 새로운 방명록 데이터 세트 생성
    const newEntry = {
      id: Date.now(),
      characterDesc: character,
      comment: comment,
      image: imageUrl || failImg , // 실패 시 대체 이미지
    };

    // 최신 글이 맨 앞(0번 인덱스)에 오도록 추가
    const updatedList = [newEntry, ...historyList];
    setHistoryList(updatedList);
    // 4. 새로고침해도 유지되도록 localStorage에 저장
    localStorage.setItem('guestbookHistory', JSON.stringify(updatedList));

    // 입력창 초기화 및 로딩 해제
    setCharacter('');
    setComment('');
    setLoading(false);
    alert('✅ 방명록 등록 완료');
    // TODO: API 연동 및 상태 업데이트 로직 추가 위치
  };

  const hasHistory = historyList && historyList.length > 0;
  const count = historyList.length;

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden py-[13.33vh] px-[10.00vw]"
      style={{ 
        backgroundImage: `url(${guestbook})`,
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* 📌 메인 컨텐츠 컨테이너: 좌우 영역 배치 */}
      <div className="w-full h-full relative flex items-center justify-between">
        
        {/* ==================== 1. Write 영역 (420x594 비율) ==================== */}
        <div 
          className="flex flex-col items-center justify-between p-[2vw] overflow-y-auto"
          style={{
            width: '29.17%',   /* 1440 기준 420px */
            height: '77.0%',   /* 900 기준 594px */
            marginTop: '17vh',
          }}
        >
          {/* 타이틀 */}
          <h2 className="w-full text-center font-bold text-gray-800 text-[clamp(10px,1.5vw,25px)] truncate">
            방명록 작성하기
          </h2>

          {/* Form 입력 영역 (세로 균등 분배) */}
          <form 
            onSubmit={handleSave}
            className="w-full h-full flex flex-col justify-between items-center my-auto py-[1vh]"
          >
            {/* character 입력박스 */}
            <textarea
              value={character}
              onChange={(e) => setCharacter(e.target.value)}
              placeholder="캐릭터 만들기 ex. 안경, 단발머리, 주근깨, 웃는 표정"
              className="w-full h-[32%] p-[1vw] focus:outline-none focus:ring-1 focus:ring-gray-200 resize-none text-[clamp(6px,1.0vw,14px)] text-gray-800 placeholder:text-gray-400"
            />

            {/* comment 입력박스 */}
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="하고싶은 한 마디 !"
              className="w-full h-[32%] p-[1vw] focus:outline-none focus:ring-1 focus:ring-gray-200 resize-none text-[clamp(6px,1.0vw,14px)] text-gray-800 placeholder:text-gray-400 "
            />

            {/* [저장하기] 이미지 버튼 */}
            <button
              type="submit"
              disabled={loading}
              className={`h-[15%] w-auto max-w-full flex items-center justify-center cursor-pointer transition-opacity ${
                    loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80 active:scale-95'
                }`}
            >
              <img 
                src={saveBtnImg} 
                alt="저장하기" 
                className="h-full w-auto object-contain aspect-[180/72] rounded-[10px]"
              />
            </button>
          </form>
        </div>


        {/* ==================== 2. History 영역 (677x500 비율) ==================== */}
        <div 
          className="flex items-center justify-between p-[0.5vw] overflow-hidden"
          style={{
            width: '57.00%',   /* 1440 기준 677px */
            height: '65.56%',  /* 900 기준 500px */
            gap: '12.00%',   /* 900 기준 594px */
            marginTop: '-12vh',     /* 677 기준 77px 간격 */
          }}
        >
          {/* ----- History Left (최신 1번째 방명록) ----- */}
          {hasHistory && (
            <div className="w-[44.31%] h-full flex flex-col items-center justify-between bg-neutral-100 p-[1vw] rounded-[0.8vw] overflow-y-auto">
              {/* 이미지 영역: 200x200 정사각형 비율 (aspect-square) */}
              <div className="w-[50%] aspect-square flex items-center justify-center overflow-hidden shrink-0">
                <img src={historyList[0].image} alt="캐릭터" className="w-full h-full object-contain" />
              </div>
              {/* Comment 영역: 초과 시 스크롤 가능 (overflow-y-auto) */}
              <div className="w-full flex-1 flex items-center justify-center text-center p-[0.5vw] text-[clamp(8px,1vw,14px)] text-gray-700 overflow-y-auto break-all">
                {historyList[0].comment}
              </div>
            </div>
          )}

          {/* ----- History Right (최신 2번째 방명록 또는 빈 상태 안내) ----- */}
          <div className="w-[44.31%] h-full flex flex-col items-center justify-between bg-neutral-100 p-[1vw] rounded-[0.8vw] overflow-y-auto">
            {count >= 2 ? (
              <>
                <div className="w-[50%] aspect-square flex items-center justify-center overflow-hidden shrink-0">
                  <img src={historyList[1].image} alt="캐릭터" className="w-full h-full object-contain" />
                </div>
                <div className="w-full flex-1 flex items-center justify-center text-center p-[0.5vw] text-[clamp(8px,1vw,14px)] text-gray-700 overflow-y-auto break-all">
                  {historyList[1].comment}
                </div>
              </>
            ) : count === 1 ? (
              <div className="w-full h-full flex items-center justify-center text-[clamp(8px,1vw,14px)] text-gray-400 font-medium">
                추가 방문록 대기 중
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-center text-[clamp(8px,1vw,14px)] text-gray-400 font-medium">
                등록된 방문록이 없어요.
              </div>
            )}
          </div>

        </div>

      </div>

      {/* 우측 하단 뒤로가기 버튼 */}
      <BackButton />
    </div>
  );
}