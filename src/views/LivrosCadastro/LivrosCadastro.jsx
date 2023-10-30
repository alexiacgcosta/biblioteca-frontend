import {useState} from 'react'
import Header from '../../components/Header/Header'
import "./index.scss"
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros'
import { LivrosService } from '../../api/LivrosService'

const LivrosCadastro = () => {
  
  const [livro, setLivro] = useState([])

  async function createLivro(){
    const body = {
        title:livro.title,
        numberPages: Number(livro.numberPages),
        ISBN: livro.ISBN,
        publishCia: livro.publishCia
      }
      console.log(livro);
      console.log(body);
      if(livro.title!=undefined && livro.title!='' && livro.numberPages!=undefined && livro.numberPages!='' && livro.ISBN!=undefined && livro.ISBN!='' && livro.publishCia!=undefined && livro.publishCia!='')
      {
      await LivrosService.createLivro(body)
      .then((response)=>{
        console.log(response);
        document.getElementById('formulario').reset
      })
      .catch(({response:{status,statusMensagem}})=>{
        console.log(`${status} - ${statusMensagem}`)      
      });
    }
    
    
  }

  return (
  <>
    <Header/>    
    <SubmenuLivros/>
    <div className='livrosCadastro'>
        <h1>Cadastro de Livros</h1>
        <div>
          <form id="formulario">
          <div className='form-group'>
            <label>Titulo
            <input type="text" id='title' name='title' required onChange={(event)=>{ setLivro({...livro, title: event.target.value})}}></input></label>
          </div>
          <div className='form-group'>
            <label>Número de Páginas
            <input type="text" id='numberPages' name='numberPages' required onChange={(event)=>{ setLivro({...livro, numberPages: event.target.value})}}></input></label>
          </div>
          <div className='form-group'>
            <label>ISBN
            <input type="text" id='ISBN' name='ISBN' required onChange={(event)=>{ setLivro({...livro, ISBN: event.target.value})}}></input></label>
          </div>
          <div className='form-group'>
            <label >Editora
            <input type="text" id='publishCia' name='publishCia' required onChange={(event)=>{ setLivro({...livro, publishCia: event.target.value})}}></input></label>
          </div> 
          <div className='form-group'>
            <button onClick={createLivro()}>Cadastrar Livro</button>  
          </div>         
          </form>
        </div>
    </div>
  </>)
  
}

export default LivrosCadastro