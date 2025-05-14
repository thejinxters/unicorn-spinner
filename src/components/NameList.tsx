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

const RemoveAllButton = styled.button`
  background-color: #ff4757;
  color: white;
  border: none;
  padding: 12px 40px;
  border-radius: 25px;
  font-size: 24px;
  cursor: pointer;
  margin: 20px 0;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #ff6b81;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

interface NameListProps {
  names: string[];
  onRemove: (index: number) => void;
  onRemoveAll: () => void;
}

function NameList({ names, onRemove, onRemoveAll }: NameListProps) {
  return (
    <div>
      <List>
        {names.map((name, index) => (
          <ListItem key={index}>
            {name}
            <RemoveButton onClick={() => onRemove(index)}>✕</RemoveButton>
          </ListItem>
        ))}
      </List>
      {names.length > 0 && (
        <RemoveAllButton onClick={onRemoveAll}>
          Remove All
        </RemoveAllButton>
      )}
    </div>
  );
}

export default NameList; 
