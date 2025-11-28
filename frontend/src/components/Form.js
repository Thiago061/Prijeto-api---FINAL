import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 15px; /* Espaçamento maior entre os itens */
  flex-wrap: wrap;
  background-color: #fff;
  padding: 30px; /* Padding maior */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.08); /* Sombra suave */
  border-radius: 10px; /* Bordas arredondadas */
  max-width: 900px; /* Alinhado com a tabela */
  margin: 30px auto;
  justify-content: center; /* Centraliza os itens do formulário */

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; /* Permite que os inputs ocupem o espaço disponível */
  min-width: 150px; /* Largura mínima para inputs em telas pequenas */

  @media (max-width: 480px) {
    min-width: 100%; /* Ocupa largura total em telas muito pequenas */
  }
`;

const Input = styled.input`
  width: 100%; /* Ocupa a largura total da InputArea */
  padding: 12px 15px; /* Padding maior */
  border: 1px solid #ced4da; /* Borda mais suave */
  border-radius: 8px; /* Bordas arredondadas */
  height: 45px; /* Altura padrão maior */
  font-size: 1rem; /* Tamanho da fonte */
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus {
    border-color: #007bff; /* Borda azul ao focar */
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); /* Sombra suave ao focar */
    outline: none;
  }
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: 500; /* Texto mais encorpado */
  color: #343a40; /* Cor de texto */
  font-size: 0.95rem;
`;

const Button = styled.button`
  padding: 12px 25px; 
  cursor: pointer;
  border-radius: 8px; 
  border: none;
  background-color: #007bff; 
  color: white;
  height: 45px; 
  font-size: 1rem; 
  font-weight: 600;
  transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  /* ✅ AFASTAMENTO E ALINHAMENTO */
  margin-top: 25px; 
  margin-left: 15px; 

  &:hover {
    background-color: #0056b3; 
    box-shadow: 0 4px 10px rgba(0, 123, 255, 0.2);
  }
  &:active {
    background-color: #004085;
  }
`;

const Form = ({ onEdit, setOnEdit, getUsers }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;
      user.nome.value = onEdit.nome;
      user.email.value = onEdit.email;
      user.telefone.value = onEdit.telefone;
      user.data_nascimento.value = onEdit.data_nascimento ? onEdit.data_nascimento.split("T")[0] : "";
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.email.value ||
      !user.telefone.value ||
      !user.data_nascimento.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    const userData = {
      nome: user.nome.value,
      email: user.email.value,
      telefone: user.telefone.value,
      data_nascimento: user.data_nascimento.value, 
    };

    try {
      if (onEdit) {
        await axios.put("http://localhost:8080/" + onEdit.id_usuarios, userData); 
        toast.success("Editado com sucesso!");
      } else {
        await axios.post("http://localhost:8080", userData);
        toast.success("Criado com sucesso!");
      }
    } catch (error) {
      const msg = error.response?.data || "Erro ao salvar!";
      toast.error(msg);
    }

    
    user.nome.value = "";
    user.email.value = "";
    user.telefone.value = "";
    user.data_nascimento.value = "";

    setOnEdit(null);
    getUsers(); 
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="telefone" /> 
      </InputArea>
      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input name="data_nascimento" type="date" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;