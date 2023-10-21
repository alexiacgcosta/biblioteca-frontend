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
      
      if(livro.title!=undefined && livro.title!='' && livro.numberPages!=undefined && livro.numberPages!='' && livro.ISBN !=undefined && livro.ISBN !='' && livro.publishCia !=undefined && livro.publishCia !=''){
      await LivrosService.createLivro(body)
      .then((response)=>{
        console.log(body);
        console.log(response)
        alert(response.data)
        document.getElementById('formulario').reset
      })
      .catch(({response:{data,status}})=>{
        alert(`${status} - ${data}`)      
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
            <label>Titulo</label>
            <input type="text" id='titulo' required onChange={(event)=>{ setLivro({...livro, title: event.target.value})}}></input>
          </div>
          <div className='form-group'>
            <label>Número de Páginas</label>
            <input type="text" id='num' required onChange={(event)=>{ setLivro({...livro, numberPages: event.target.value})}}></input>
          </div>
          <div className='form-group'>
            <label>ISBN</label>
            <input type="text" id='isbn' required onChange={(event)=>{ setLivro({...livro, ISBN: event.target.value})}}></input>
          </div>
          <div className='form-group'>
            <label>Editora</label>
            <input type="text" id='editora' required onChange={(event)=>{ setLivro({...livro, publishCia: event.target.value})}}></input>
          </div> 
          <div className='form-group'>
            <button onClick={()=>{
              createLivro()
            }}>Cadastrar Livro</button>  
          </div>         
          </form>
        </div>
    </div>
  </>)
  
}

export default LivrosCadastro