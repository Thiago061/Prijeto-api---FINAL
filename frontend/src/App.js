import GlobalStyle from "./styles/global.js";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid.js";
import { useEffect, useState } from "react";
import axios from "axios"; 
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 


const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 5px;
  font-size: 2.5rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  color: #7f8c8d;
  text-align: center;
  font-size: 1.1rem;
  margin-bottom: 30px;
`;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080"); 
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error("Erro ao carregar usuários!"); 
    }
  };

  useEffect(() => {
    getUsers(); 
  }, []);

  return (
    <>
      <Container>  
        <Title>CADASTRO DE USUÁRIOS</Title>
        <Subtitle>Sistema de Gerenciamento de Usuários</Subtitle>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />  
        <Grid users={users} setOnEdit={setOnEdit} setUsers={setUsers} getUsers={getUsers} /> 
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />  
      <GlobalStyle />  
    </>
  );
}

export default App;