package br.com.api.produtos.servico;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.api.produtos.modelo.ProdutoModelo;
import br.com.api.produtos.modelo.RespostaModelo;
import br.com.api.produtos.repositorio.ProdutoRepositorio;

@Service
public class ProdutoServico {
    @Autowired
    private ProdutoRepositorio pr;

    @Autowired
    // feedback caso esteja faltando alguma coisa
    private RespostaModelo rm;

    // Método para listar todos os produtos
    public Iterable<ProdutoModelo> listar(){
        return pr.findAll();
    }

    // Método para cadastrar ou alterar produtos
    public ResponseEntity<?> cadastrarOUalterar(ProdutoModelo pm, String acao){

        if(pm.getNome().equals("")){
            rm.setMensagem("É obrigatório o produto ter um nome");
            return new ResponseEntity<RespostaModelo>(rm,HttpStatus.BAD_REQUEST);
        }
        else if(pm.getMarca().equals("")){
            rm.setMensagem("É obrigatório o produto ter uma marca");
            return new ResponseEntity<RespostaModelo>(rm,HttpStatus.BAD_REQUEST);
        }
        else{
            if(acao.equals("cadastrar")){
                // Método save pode ser usado tanto para cadastrar quanto para alterar
                // Aqui usando para cadastrar
                return new ResponseEntity<ProdutoModelo>(pr.save(pm), HttpStatus.CREATED);
            }
            else{
                // Método save pode ser usado tanto para cadastrar quanto para alterar
                // Aqui usando para alterar
                return new ResponseEntity<ProdutoModelo>(pr.save(pm), HttpStatus.OK);
            }
        }
    }

    // Método para remover produtos
    public ResponseEntity<RespostaModelo> remover(long codigo){
        pr.deleteById(codigo);
        
        rm.setMensagem("O produto foi removido com sucesso!");
        return new ResponseEntity<RespostaModelo>(rm,HttpStatus.OK);
    }
}
