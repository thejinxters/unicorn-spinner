import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px auto;
  max-width: 400px;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  background-color: #fff;
  border: 1px solid #ff69b4;
  border-radius: 25px;
`;

const RemoveButton = styled.button`
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 15px;
  cursor: pointer;
  
  &:hover {
    background-color: #cc0000;
  }
`;

function NameList({ names, onRemove }) {
  return (
    <List>
      {names.map((name, index) => (
        <ListItem key={index}>
          {name}
          <RemoveButton onClick={() => onRemove(index)}>✕</RemoveButton>
        </ListItem>
      ))}
    </List>
  );
}

export default NameList; 
