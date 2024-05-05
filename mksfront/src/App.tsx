import { useEffect, useState } from "react";
import axios from 'axios';
import { faClose, faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Container, Header, TextoEsquerda, Carrinho, Footer, ItemCompra, Centro, LinhaItensCompra, BotaoCompra, BotaoCompra2, CarrinhoMenuContainer, BotaoCompra2Background, BotaoExcluir, ProdutoCarrinho2 } from './AppStyled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Produto {
  id: number;
  name: string;
  description: string;
  photo: string;
  price: number;
  comprado: boolean;
  quantidade: number; 
}

// Componente para exibir cada item no carrinho
const ProdutoCarrinho: React.FC<{ produto: Produto; onExcluir: (produtoId: number) => void; onIncrementar: (produtoId: number) => void; onDecrementar: (produtoId: number) => void; }> = ({ produto, onExcluir, onIncrementar, onDecrementar }) => {
  return (
    <div>
      <ProdutoCarrinho2>
        <img src={produto.photo} alt={produto.name} />
        <h3>{produto.name}</h3>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="quantidade-btn" onClick={() => onDecrementar(produto.id)}>-</button>
          <p style={{ margin: '0 10px' }}>{produto.quantidade}</p>
          <button className="quantidade-btn" onClick={() => onIncrementar(produto.id)}>+</button>
        </div>
        <p>Preço: ${produto.price}</p>
        <BotaoExcluir onClick={() => onExcluir(produto.id)}>
          <FontAwesomeIcon icon={faTimes} /> {/* Ícone de excluir */}
        </BotaoExcluir>
      </ProdutoCarrinho2>
    </div>
  );
};

const App: React.FC = () => {
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=8&sortBy=id&orderBy=DESC');
        const produtosData: Produto[] = response.data.products.map((produto: any) => ({ ...produto, comprado: false, price: parseFloat(produto.price), quantidade: 1 }));
        setProdutos(produtosData);
        const totalInicial = produtosData.reduce((acc, produto) => {
          if (produto.comprado) {
            return acc + produto.price;
          }
          return acc;
        }, 0);
      } catch (error) {
        console.error('Erro ao buscar os produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleOpenCarrinho = () => {
    setCarrinhoAberto(true);
  };

  const handleCloseCarrinho = () => {
    setCarrinhoAberto(false);
  };

  const handleIncrementQuantidade = (produtoId: number) => {
    const novosProdutos = produtos.map(produto => {
      if (produto.id === produtoId && produto.comprado) {
        return { ...produto, quantidade: produto.quantidade + 1 };
      }
      return produto;
    });
    setProdutos(novosProdutos);

    // Recalcular o preço total
    const totalAtualizado = novosProdutos
      .filter(produto => produto.comprado)
      .reduce((acc, produto) => acc + produto.price * produto.quantidade, 0);
    setTotal(totalAtualizado);
  };

  const handleDecrementQuantidade = (produtoId: number) => {
    const novosProdutos = produtos.map(produto => {
      if (produto.id === produtoId && produto.comprado && produto.quantidade > 1) {
        return { ...produto, quantidade: produto.quantidade - 1 };
      }
      return produto;
    });
    setProdutos(novosProdutos);

    // Recalcular o preço total
    const totalAtualizado = novosProdutos
      .filter(produto => produto.comprado)
      .reduce((acc, produto) => acc + produto.price * produto.quantidade, 0);
    setTotal(totalAtualizado);
  };

  const handleCompra = (produtoIndex: number) => {
    const novosProdutos = [...produtos];
    novosProdutos[produtoIndex].comprado = true;
    setProdutos(novosProdutos);

    // Recalcular o total ao adicionar um produto
    const totalAtualizado = novosProdutos
      .filter(produto => produto.comprado)
      .reduce((acc, produto) => acc + produto.price * produto.quantidade, 0);

    setTotal(totalAtualizado);
  };

  const handleExcluir = (produtoId: number) => {
    // Encontrar o produto que será excluído
    const produtoExcluido = produtos.find(produto => produto.id === produtoId);
    
    // Se o produto existir e estiver marcado como comprado, atualizar o estado dos produtos
    if (produtoExcluido && produtoExcluido.comprado) {
      const novosProdutos = produtos.map(produto => {
        if (produto.id === produtoId) {
          return { ...produto, comprado: false }; // Altera para 'comprado: false' ao invés de remover
        }
        return produto;
      });
  
      // Recalcular o preço total, excluindo o preço do produto excluído
      const totalAtualizado = novosProdutos
        .filter(produto => produto.comprado)
        .reduce((acc, produto) => acc + produto.price * produto.quantidade, 0);
    
      setProdutos(novosProdutos);
      setTotal(totalAtualizado);
    }
  };

  return (
    <>
      <Container>
        <Header>
          <TextoEsquerda>
            <span style={{ fontWeight: 'bold', fontSize: '30px' }}>MKS</span> Sistemas
          </TextoEsquerda>
          <Carrinho onClick={handleOpenCarrinho}>
            <FontAwesomeIcon icon={faShoppingCart} />
          </Carrinho>
        </Header>
      </Container>

      <Centro>
        <LinhaItensCompra>
          {/* Primeira linha de produtos */}
          {produtos.slice(0, 4).map((produto, index) => (
            <ItemCompra key={index}>
              <div>
                {produto && (
                  <>
                    <img src={produto.photo} alt={produto.name} style={{ maxWidth: '100%', maxHeight: '50px', display: 'block', margin: '0 auto' }} />
                    <h3>{produto.name}</h3>
                    <p style={{ backgroundColor: 'rgb(55,55,55)', color: 'white', padding: '2px', borderRadius: '5px', display: 'inline-block', border: '2px solid white' }}>Preço: ${produto.price}</p>
                    <p>{produto.description}</p>
                    <BotaoCompra onClick={() => handleCompra(index)}>
                      <FontAwesomeIcon icon={faShoppingCart} /> COMPRAR
                    </BotaoCompra>
                  </>
                )}
              </div>
            </ItemCompra>
          ))}
        </LinhaItensCompra>

        <LinhaItensCompra>
          {/* Segunda linha de produtos */}
          {produtos.slice(4, 8).map((produto, index) => (
            <ItemCompra key={index}>
              <div>
                {produto && (
                  <>
                    <img src={produto.photo} alt={produto.name} style={{ maxWidth: '100%', maxHeight: '60px', display: 'block', margin: '0 auto' }} />
                    <h3>{produto.name}</h3>
                    <p>{produto.description}</p>
                    <p style={{ backgroundColor: 'rgb(55,55,55)', color: 'white', padding: '2px', borderRadius: '5px', display: 'inline-block', border: '2px solid white' }}>Preço: ${produto.price}</p>
                    <BotaoCompra onClick={() => handleCompra(index + 4)}>
                      <FontAwesomeIcon icon={faShoppingCart} /> COMPRAR
                    </BotaoCompra>
                  </>
                )}
              </div>
            </ItemCompra>
          ))}
        </LinhaItensCompra>

        {/* Carrinho de compras */}
        {carrinhoAberto && (
          <CarrinhoMenuContainer>
            <h2>
              Carrinho <br /> de Compras
              <FontAwesomeIcon
                icon={faClose}
                onClick={handleCloseCarrinho}
                style={{
                  cursor: "pointer",
                  color: "white",
                  border: "1px solid black",
                  borderRadius: "50%",
                  padding: "5px",
                  backgroundColor: "black",
                }}
              />
            </h2>
            <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
              {produtos
                .filter((produto) => produto.comprado)
                .map((produto, index) => (
                  <ProdutoCarrinho
                    key={index}
                    produto={produto}
                    onExcluir={handleExcluir}
                    onIncrementar={handleIncrementQuantidade}
                    onDecrementar={handleDecrementQuantidade}
                  />
                ))}
            </ul>
            <div style={{ fontSize: "35px" }}>Total: ${total.toFixed(2)}</div>
            <div className="bottomButtonContainer">
              <BotaoCompra2 onClick={handleCloseCarrinho}>Finalizar Compra</BotaoCompra2>
            </div>
          </CarrinhoMenuContainer>
        )}
      </Centro>

      <Footer>MKS Sistemas &copy; Todos os direitos reservados.</Footer>
    </>
  );
};

export default App;