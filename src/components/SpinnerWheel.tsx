import { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

const spin = (degrees: number) => keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(${degrees}deg);
  }
`;

const WheelContainer = styled.div`
  --wheel-size: min(500px, calc(100vw - 48px));
  position: relative;
  width: var(--wheel-size);
  height: var(--wheel-size);
  margin: 40px auto;
`;

const UnicornSpinner = styled.div<{ $spinning: boolean; $degrees: number; $currentRotation: number; $duration: number }>`
  width: calc(var(--wheel-size) * 0.48);
  height: calc(var(--wheel-size) * 0.48);
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center;
  ${props => props.$spinning ? css`
    animation: ${spin(props.$degrees)} ${props.$duration}ms cubic-bezier(0.2, 0.8, 0.3, 1) forwards;
  ` : css`
    transform: translate(-50%, -50%) rotate(${props.$currentRotation}deg);
  `}

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
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

const Name = styled.div<{ $angle: number }>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: 0 0;
  transform: ${props => `
    rotate(${props.$angle}deg)
    translateX(calc(var(--wheel-size) * 0.4))
    rotate(-${props.$angle}deg)
    translate(-50%, -50%)
  `};
  font-size: clamp(14px, calc(var(--wheel-size) * 0.048), 24px);
  color: #ff69b4;
  font-weight: bold;
  text-align: center;
  width: calc(var(--wheel-size) * 0.24);
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

interface SpinnerWheelProps {
  names: string[];
  isSpinning: boolean;
  winner: string | null;
  onSpin: () => void;
  onSelectWinner: (winner: string) => void;
  spinDuration: number;
}

function SpinnerWheel({ names, isSpinning, winner, onSpin, onSelectWinner, spinDuration }: SpinnerWheelProps) {
  const [spinDegrees, setSpinDegrees] = useState<number>(0);
  const [currentRotation, setCurrentRotation] = useState<number>(0);
  const rotationRef = useRef<number>(currentRotation);

  useEffect(() => {
    if (!isSpinning) return;

    const newWinner = names[Math.floor(Math.random() * names.length)];
    const winnerIndex = names.indexOf(newWinner);
    const baseRotation = 1800; // 5 full rotations
    const anglePerName = winnerIndex * 360 / names.length;

    const targetAngle = anglePerName + 145;
    const rotation = rotationRef.current;

    const newDegrees = baseRotation + targetAngle - (rotation % 360);
    setSpinDegrees((rotation % 360) + newDegrees);
    setCurrentRotation((rotation % 360) + newDegrees);

    setTimeout(() => {
      onSelectWinner(newWinner);
    }, spinDuration);
  }, [isSpinning, names, onSelectWinner, spinDuration]);

  return (
    <div>
      <WheelContainer>
        <NameCircle>
          {names.map((name, index) => {
            const angle = (index * 360 / names.length);
            return (
              <Name
                key={index}
                $angle={angle}
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
          $duration={spinDuration}
        >
          <img
            src={`${import.meta.env.BASE_URL}unicorn.webp`}
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
