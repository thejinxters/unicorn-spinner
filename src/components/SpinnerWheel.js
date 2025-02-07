import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

const spin = (degrees) => keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(${degrees}deg);
  }
`;

const WheelContainer = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  margin: 40px auto;
`;

const UnicornSpinner = styled.div`
  width: 240px;
  height: 240px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center;
  ${props => props.$spinning ? css`
    animation: ${spin(props.$degrees)} 3s cubic-bezier(0.2, 0.8, 0.3, 1) forwards;
  ` : css`
    transform: translate(-50%, -50%) rotate(${props.$currentRotation}deg);
  `}

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    /* Adjust rotation to make horn point right */
    transform: rotate(-90deg);
  }
`;

const NameCircle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const Name = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: 0 0;
  transform: ${props => `
    rotate(${props.$angle}deg)
    translateX(${props.$radius}px)
    rotate(-${props.$angle}deg)
    translate(-50%, -50%)
  `};
  font-size: 24px;
  color: #ff69b4;
  font-weight: bold;
  text-align: center;
  width: 120px;
  user-select: none;
`;

const SpinButton = styled.button`
  background-color: #ff69b4;
  color: white;
  border: none;
  padding: 12px 40px;
  border-radius: 25px;
  font-size: 24px;
  cursor: pointer;
  margin: 20px 0;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #ff1493;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const Winner = styled.div`
  font-size: 32px;
  color: #ff69b4;
  margin-top: 20px;
  font-weight: bold;
`;

function SpinnerWheel({ names, isSpinning, winner, onSpin, onSelectWinner }) {
  const [spinDegrees, setSpinDegrees] = useState(0);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [targetWinner, setTargetWinner] = useState(null);
  
  useEffect(() => {
    if (isSpinning) {
      const newWinner = names[Math.floor(Math.random() * names.length)];
      setTargetWinner(newWinner);
      setTimeout(() => {
        onSelectWinner(newWinner);
      }, 3000);
    }
  }, [isSpinning, names, onSelectWinner]);

  useEffect(() => {
    if (isSpinning && targetWinner) {
      const winnerIndex = names.indexOf(targetWinner);
      const baseRotation = 1800; // 5 full rotations
      const anglePerName = winnerIndex * 360 / names.length;
      
      // Names start at top and go clockwise
      // We need to rotate counterclockwise to point at the winner
      // Since horn points right (0°), we need -90° to point at top first
      const targetAngle = anglePerName + 145;
      const newDegrees = baseRotation + targetAngle - (currentRotation % 360);

      setCurrentRotation(prev => prev + newDegrees);
      setSpinDegrees((currentRotation % 360)+ newDegrees);
    }
  }, [isSpinning, targetWinner, names, currentRotation]);

  console.log('Render values:', {
    spinDegrees,
    currentRotation,
    isSpinning,
    $spinning: isSpinning,
    winner
  });

  const radius = 200;

  return (
    <div>
      <WheelContainer>
        <NameCircle>
          {names.map((name, index) => {
            // Position names clockwise starting from top
            const angle = (index * 360 / names.length);
            return (
              <Name 
                key={index} 
                $angle={angle} 
                $radius={radius}
              >
                {name}
              </Name>
            );
          })}
        </NameCircle>
        <UnicornSpinner 
          $spinning={isSpinning} 
          $degrees={spinDegrees}
          $currentRotation={currentRotation}
        >
          <img 
            src="/unicorn.webp" 
            alt="Unicorn Spinner"
          />
        </UnicornSpinner>
      </WheelContainer>
      <SpinButton onClick={onSpin} disabled={isSpinning || names.length < 2}>
        {isSpinning ? 'Spinning...' : 'Spin!'}
      </SpinButton>
      {winner && <Winner>Winner: {winner}! 🎉</Winner>}
    </div>
  );
}

export default SpinnerWheel; 
