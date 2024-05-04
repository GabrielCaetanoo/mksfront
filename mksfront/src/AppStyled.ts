import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CarrinhoMenuProps {
  produtos: string[]; // Array de strings para os produtos
  total: number; // Número para o total do carrinho
  onClose: () => void; // Função sem argumentos e sem valor de retorno
}

const calculateCarrinhoMenuHeight = () => {
  const headerHeight = 90; // Altura do cabeçalho
  const footerHeight = 36; // Altura do rodapé
  const totalHeight = window.innerHeight; // Altura total da janela
  return totalHeight - headerHeight - footerHeight + "px";
};

export const Container = styled.div`
  width: 100%;
  height: 70px;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: rgb(15, 82, 186);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

export const Header = styled.div`
  height: 80px;
  z-index: -1;
  color: white;
  left: 0;
  right: 0;
  position: fixed;
  display: flex;
  align-items: center;
  padding-left: 20px;
`;

export const TextoEsquerda = styled.div`
    margin-right: auto;
    font-size: 20px;
    font-family: Arial;
`;

export const Carrinho = styled.div`
  margin-right: 20px; /* Distância da margem direita */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 100px;
  width: 50px; /* Defina o tamanho do carrinho */
  height: 50px; /* Defina o tamanho do carrinho */
  background-color: white; /* Defina a cor do fundo do carrinho */
  color: black; /* Defina a cor do ícone do carrinho */
  border-radius: 30%; /* Cria um formato de círculo para o carrinho */
  cursor: pointer;
`;

export const Footer = styled.footer`
  background: rgb(238, 238, 238);
  color: black;
  padding: 3px;
  height: 20px;
  font-size: 16px;
  width: 100%; /* Ocupa toda a largura da div */
  text-align: center;
  margin-top: auto; /* O rodapé ficará na parte inferior */
  margin-bottom: 0; /* Remove a margem na parte inferior */
`;
export const ItemCompra = styled.div`
width: 250px; /* Largura dos itens de compra */
height: 250px; /* Altura dos itens de compra */
background-color: white; /* Cor de fundo dos itens de compra */
border-radius: 20px; /* Bordas arredondadas */
margin: 20px; /* Espaçamento entre os itens de compra */
padding: 20px; /* Espaçamento interno dos itens de compra */
display: flex;
flex-direction: column;
align-items: center;
`;

// Componente para o contêiner central
export const Centro = styled.div`
  height: 690px;
  min-height: 90vh;
  z-index: -1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  text-align: center;
  background-color: rgb(249, 249, 249);
`;

export const LinhaItensCompra = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  width: 100%; /* Largura total */
`;

export const BotaoCompra = styled.button`
  margin-top: px; /* Adicione um espaçamento maior para mover o botão para baixo */
  width: 290px; /* Ocupa toda a largura do contêiner */
  background-color: rgb(15, 82, 186); /* Cor de fundo do botão */
  border: none; /* Removendo a borda */
  color: white; /* Cor do texto */
  padding: 10px 30px; /* Espaçamento interno */
  text-align: center; /* Alinhamento do texto */
  text-decoration: none; /* Removendo sublinhado */
  font-size: 18px; /* Tamanho da fonte */
  cursor: pointer; /* Mudar cursor ao passar por cima */
  border-radius: 0 0 20px 20px; /* Bordas arredondadas apenas na parte inferior */
`;

  
export const CarrinhoMenuContainer = styled.div`
position: fixed;
top: 0;
right: 0;
width: 500px; /* Define a largura do contêiner para ocupar metade da largura da tela */
max-height: calc(100vh - 50px); /* Altura máxima igual à altura da janela menos o espaço do cabeçalho */
background-color: rgb(15, 82, 186);
box-sizing: border-box;
box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
z-index: 9999;
color: white;
overflow-y: auto;

h2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  font-size: 30px;
  font-family: bold;
}
`;

export const BotaoCompra2Background = styled.div`
width: 100%;
background-color: rgb(15, 82, 186); /* Cor de fundo do botão */
border: none; /* Removendo a borda */
color: white; /* Cor do texto */
text-align: center; /* Alinhamento do texto */
text-decoration: none; /* Removendo sublinhado */
font-size: 30px; /* Tamanho da fonte */
cursor: pointer; /* Mudar cursor ao passar por cima */
border-radius: 0 0 30px 30px; /* Bordas arredondadas apenas na parte inferior */
display: flex; /* Para usar gap */
justify-content: center; /* Centraliza o conteúdo horizontalmente */
align-items: center; /* Centraliza o conteúdo verticalmente */
`;

export const BotaoCompra2 = styled.button`
width: 100%;
padding: 50px; /* Aumentei o padding para melhorar a aparência */
background-color: black;
color: white;
border: none;
cursor: pointer;
font-weight: bold;
font-size: 30px;
border-radius: 0; /* Removi a borda do botão */
flex-grow: 1; /* Para ocupar todo o espaço disponível na div */
outline: none; /* Remover a borda de foco */
`;

export const ProdutoCarrinho2 = styled.div`
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 5px;
  display: flex;
  gap: 20px;
  
  

  img {
    
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }

  div {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  h3 {
    margin: 0;
    color: black;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  p {
    color: black;
    margin: 0;
    font-size: 12px;
  }
`;

export const BotaoExcluir = styled.button`
background-color: black;
color: white;
border: none;
border-radius: 60px;
padding: 6px 10px;
cursor: pointer;
`;