import React from 'react';
import { useNavigate } from 'react-router-dom';
import backButtonImg from '../assets/BackButton.png';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')}
      className="absolute bottom-[50px] right-[50px]
                 w-[clamp(90px,12.5vw,180px)] h-[clamp(36px,5vw,72px)]
                 active:scale-95 transition-transform duration-150 
                 cursor-pointer z-10 border-none bg-transparent p-0"
    >
      <img 
        src={backButtonImg} 
        alt="Back" 
        className="h-[48px] w-auto drop-shadow-md rounded-[10px]" 
      />
    </button>
  );
}