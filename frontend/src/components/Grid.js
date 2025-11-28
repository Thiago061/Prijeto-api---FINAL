import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";



const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 0px; 
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.08); 
  border-radius: 10px; 
  max-width: 900px; 
  margin: 10px auto; 
  word-break: break-all;
  border-collapse: separate; 
  border-spacing: 0; 
  overflow: hidden; 
`;

export const Thead = styled.thead`
  background-color: #2e75bdff; /* Fundo mais claro para o cabeçalho */
`;
export const Tbody = styled.tbody``;
export const Tr = styled.tr`
  &:nth-of-type(even) {
    background-color: #f2f2f2; 
  }
  &:hover {
    background-color: #e9ecef; 
  }
`;

export const Th = styled.th`
  text-align: left; 
  padding: 15px 20px; 
  border-bottom: 2px solid #dee2e6; 
  color: #343a40; 
  font-weight: 600; 
  font-size: 0.95rem; 
  &:first-child {
    border-top-left-radius: 10px; 
  }
  &:last-child {
    border-top-right-radius: 10px; 
  }

  @media (max-width: 768px) { 
    ${(props) => props.$onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding: 12px 20px; 
  border-bottom: 1px solid #e0e0e0; 
  color: #495057; 
  font-size: 0.9rem; 

  text-align: ${(props) => (props.$alignCenter ? "center" : "left")}; 
  width: ${(props) => (props.$width ? props.$width : "auto")};

  .action-icon {
    font-size: 1.1rem;
    cursor: pointer;
    margin: 0 5px;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: #007bff; 
    }
    &.trash-icon:hover {
      color: #dc3545; 
    }
  }

  @media (max-width: 768px) { 
    ${(props) => props.$onlyWeb && "display: none"}
  }
`;



const Grid = ({ users, setUsers, setOnEdit}) => {
  
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8080/" + id);
      
      const newArray = users.filter((user) => user.id_usuarios !== id); 
      setUsers(newArray);
      
      toast.success("Usuário excluído com sucesso!");
    } catch (error) {
      const msg = error.response?.data || "Erro ao excluir usuário!"; 
      toast.error(msg);
    }
    
    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th $width="20%">Nome</Th>
          <Th $width="25%">Email</Th>
          <Th $width="15%" $onlyWeb>Telefone</Th>
          <Th $width="15%" $onlyWeb>Nascimento</Th> 
          <Th $width="5%"></Th> 
          <Th $width="5%"></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, i) => (
          <Tr key={i}>
            <Td $width="20%">{item.nome}</Td>
            <Td $width="25%">{item.email}</Td>
            <Td $width="15%" $onlyWeb>
              {item.telefone}
            </Td>
            
            
            <Td $width="15%" $onlyWeb>
              {item.data_nascimento ? new Date(item.data_nascimento).toLocaleDateString('pt-BR') : ''}
            </Td>
            
            
            <Td $alignCenter $width="5%">
              <FaEdit 
                onClick={() => handleEdit(item)} 
                className="action-icon" 
                style={{ cursor: "pointer", color: "#6c757d" }} 
              />
            </Td>
            
            
            <Td $alignCenter $width="5%">
              <FaTrash 
                onClick={() => handleDelete(item.id_usuarios)} 
                className="action-icon trash-icon" 
                style={{ cursor: "pointer", color: "#6c757d" }} 
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;