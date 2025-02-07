import React, { useState, useEffect } from 'react';
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
  const [names, setNames] = useState(() => {
    const savedNames = localStorage.getItem('names');
    return savedNames ? JSON.parse(savedNames) : [];
  });
  const [winner, setWinner] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    localStorage.setItem('names', JSON.stringify(names));
  }, [names]);

  const addName = (name) => {
    if (name.trim()) {
      setNames([...names, name.trim()]);
    }
  };

  const removeName = (index) => {
    const newNames = names.filter((_, i) => i !== index);
    setNames(newNames);
  };

  const handleSpin = () => {
    if (names.length < 2) {
      alert('Please add at least 2 names to spin!');
      return;
    }
    
    console.log('Starting spin');
    setIsSpinning(true);
    setWinner(null);
    
    // Winner will be determined by the SpinnerWheel component
    setTimeout(() => {
      console.log('Setting winner after timeout');
      setIsSpinning(false);
    }, 3000);
  };

  // Add a function to set the winner
  const handleSetWinner = (selectedWinner) => {
    setWinner(selectedWinner);
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
      />
      <NameList names={names} onRemove={removeName} />
    </AppContainer>
  );
}

export default App; 
