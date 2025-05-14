import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SpinnerWheel from './components/SpinnerWheel';
import NameInput from './components/NameInput';
import NameList from './components/NameList';

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  color: #ff69b4;
  font-family: 'Arial', sans-serif;
`;

function App() {
  const [names, setNames] = useState<string[]>(() => {
    const savedNames = localStorage.getItem('names');
    return savedNames ? JSON.parse(savedNames) : [];
  });
  const [winner, setWinner] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [spinDuration, setSpinDuration] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem('names', JSON.stringify(names));
  }, [names]);

  const addName = (name: string) => {
    if (name.trim()) {
      setNames([...names, name.trim()]);
    }
  };

  const removeName = (index: number) => {
    const newNames = names.filter((_, i) => i !== index);
    setNames(newNames);
  };

  const getRandomTimeout = () => {
    return Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
  };

  const handleSpin = () => {
    if (names.length < 2) {
      alert('Please add at least 2 names to spin!');
      return;
    }
    
    const newSpinDuration = getRandomTimeout();
    setSpinDuration(newSpinDuration);

    setIsSpinning(true);
    setWinner(null);
    
    setTimeout(() => {
      setIsSpinning(false);
    }, newSpinDuration);
  };

  const handleSetWinner = (selectedWinner: string) => {
    setWinner(selectedWinner);
  };

  const removeAllNames = () => {
    setNames([]);
    setWinner(null);
  };

  return (
    <AppContainer>
      <Title>🦄 Unicorn Name Spinner 🦄</Title>
      <NameInput onAdd={addName} />
      <SpinnerWheel 
        names={names} 
        isSpinning={isSpinning} 
        winner={winner}
        onSpin={handleSpin}
        onSelectWinner={handleSetWinner}
        spinDuration={spinDuration}
      />
      <NameList 
        names={names} 
        onRemove={removeName}
        onRemoveAll={removeAllNames}
      />
    </AppContainer>
  );
}

export default App; 
