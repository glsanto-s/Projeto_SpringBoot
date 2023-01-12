import React from 'react';

// import { Container } from './styles';

function Formulario({botao , eTeclado, cadastrar, obj, cancelar, remover, alterar}) {
  return(
    <>
        <form>
            <input type="text" value={obj.nome} onChange={eTeclado} name="nome" placeholder='Nome' className='form-control'/>
            <input type="text" value={obj.marca} onChange={eTeclado} name="marca" placeholder='Marca' className='form-control'/>

            {
                botao?<input type="button" onClick={cadastrar} value="Cadastrar" className='btn btn-customized'/>
                :
                <div>
                    <input type="button" onClick={alterar} value="Alterar" className='btn btn-outline-primary'/>
                    <input type="button" onClick={remover} value="Remover" className='btn btn-outline-warning'/>
                    <input type="button" onClick={cancelar} value="Cancelar" className='btn btn-outline-danger'/>
                </div>
            }
        </form>
    </>
  )
}

export default Formulario;