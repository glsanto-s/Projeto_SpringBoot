import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Components/Formulario';
import Tabela from './Components/Tabela';

function App() {

  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const produto = {
    codigo : 0,
    nome : "",
    marca: ""
  }
  const [objProduto, setObjProduto] = useState(produto);

  useEffect(()=>{
    fetch("http://localhost:8080/listar")
    .then(retorno => retorno.json())
    .then(retorno_convertido => setProdutos(retorno_convertido));
  }, [] );


  const aoDigitar = (e) =>{
    setObjProduto({...objProduto, [e.target.name]:e.target.value});
    // console.log(e.target.value);
  }


  // Cadastrar
  const cadastrarProd = () => {
    fetch('http://localhost:8080/cadastrar', {
      method: 'POST',
      body: JSON.stringify(objProduto),
      headers:{
        'Content-type': 'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      }
      else{
        setProdutos([...produtos, retorno_convertido]);
        alert("Produto cadastrado com sucesso!");

        limparProd();
      }
    });
  }

  // Alterar
  const alterarProd = () => {
    fetch('http://localhost:8080/alterar', {
      method: 'PUT',
      body: JSON.stringify(objProduto),
      headers:{
        'Content-type': 'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {

      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      }
      else{
        alert("Produto alterado com sucesso!");

        // Cópia do vetor de produtos
        let vetorTemp = [...produtos];

        // Indice
        let indice = vetorTemp.findIndex((p) => {
          return p.codigo === objProduto.codigo;
        });

        // Alterar vetortemp
        vetorTemp[indice] = objProduto;

        // Atualizar o vetor dos produtos
        setProdutos(vetorTemp);

        
        limparProd();
      }
    });
  }

  // Remover
  const removerProd = () => {
    fetch('http://localhost:8080/remover/'+objProduto.codigo, {
      method: 'delete',
      headers:{
        'Content-type': 'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      alert(retorno_convertido.mensagem);

      // Cópia do vetor de produtos
      let vetorTemp = [...produtos];

      // Indice
      let indice = vetorTemp.findIndex((p) => {
        return p.codigo === objProduto.codigo;
      });

      // Remover vetortemp
      vetorTemp.splice(indice, 1);

      // Atualizar o vetor dos produtos
      setProdutos(vetorTemp);

      // Limpar 
      limparProd();
    });
  }

  // Limpar ou Cancelar
  const limparProd = () => {
    setObjProduto(produto);
    setBtnCadastrar(true); //deixa o botão visível novamente
  }


  // Selecionar
  const selecionarProd = (indice) => {
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);
  }

  return (
    <div>
        <Formulario botao={btnCadastrar} eTeclado={aoDigitar} cadastrar={cadastrarProd} obj={objProduto}
        cancelar={limparProd} remover={removerProd} alterar={alterarProd}/>
        <Tabela vetor={produtos} selecionar={selecionarProd}/>
        <center><p>By Gyo Lima</p></center>
    </div>
  );
}

export default App;
