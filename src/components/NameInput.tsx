import React, { useState } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  margin: 20px 0;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ff69b4;
  border-radius: 25px;
  margin-right: 10px;
  outline: none;
  
  &:focus {
    border-color: #ff1493;
  }
`;

const AddButton = styled.button`
  background-color: #ff69b4;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  
  &:hover {
    background-color: #ff1493;
  }
`;

interface NameInputProps {
  onAdd: (name: string) => void;
}

function NameInput({ onAdd }: NameInputProps) {
  const [name, setName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(name);
    setName('');
  };

  return (
    <InputContainer>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a name..."
        />
        <AddButton type="submit">Add Name</AddButton>
      </form>
    </InputContainer>
  );
}

export default NameInput; 
