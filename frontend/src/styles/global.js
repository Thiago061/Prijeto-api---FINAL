// Global.js
import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'poppins', sans-serif;
  }

  body {
    width: 100vw;
    min-height: 100vh; /* Garante altura mínima */
    /* ✅ REMOVIDO: height: 100vh; */
    display: flex;
    align-items: flex-start; 
    justify-content: center;
    background-color: #f2f2f2;
    padding: 20px 0; /* Ajuste para não ter padding lateral excessivo e manter o centralizado */
    box-sizing: border-box;
  }
`;
export default Global;