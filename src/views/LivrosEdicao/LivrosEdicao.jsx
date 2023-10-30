import {useEffect , useState} from 'react'
import Header from '../../components/Header/Header'
import "./index.scss"
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros'
import { useParams } from 'react-router-dom'
import { LivrosService } from '../../api/LivrosService'

const LivrosEdicao = () => {  
  let {livroId} = useParams();
  
  const [livro, setLivro] = useState([]);
  

  const body = {
    title:livro.title,
    numberPages: Number(livro.numberPages),
    ISBN: livro.ISBN,
    publishCia: livro.publishCia
  }
  
  async function getLivro(){
    const {data} = await LivrosService.getLivro(livroId);
    console.log(data.resposta);
    setLivro(data.resposta)
  }

  async function editLivro(livroId){
    
    if( livro.title!=undefined && livro.title!='' && livro.numberPages!=undefined && livro.numberPages!='' && livro.ISBN !=undefined && livro.ISBN !='' && livro.publishCia !=undefined && livro.publishCia !=''){
      await LivrosService.updateLivro(livroId,body)
      .then(({data})=>{
        console.log(data.status);
      })
      .catch(({response:{data,status}})=>{
        alert(`${status} - ${data}`)
      });
    }  

  }

  useEffect(() => {
    getLivro()    
  }, [])  

  return (
  <>
    <Header/>    
    <SubmenuLivros/>
    <div className='livrosCadastro'>
        <h1>Edição de Livros</h1>
        <div>
          <form id="formulario">
            <div className='form-group'>
              <label>Id
              <input type="text" placeholder={livroId}></input></label>
            </div>
            <div className='form-group'>
              <label>Titulo
              <input type="text" onChange={(event)=>{ setLivro({...livro, title: event.target.value})}} value={livro.title || ''} ></input></label>
            </div>
            <div className='form-group'>
              <label>Número de Páginas
              <input type="text"  onChange={(event)=>{ setLivro({...livro, numberPages: event.target.value})}} value={livro.numberPages || ''}></input></label>
            </div>
            <div className='form-group'>
              <label>ISBN
              <input type="text"  onChange={(event)=>{ setLivro({...livro, ISBN: event.target.value})}} value={livro.ISBN || ''}></input></label>
            </div>
            <div className='form-group'>
              <label>Editora
              <input type="text" onChange={(event)=>{ setLivro({...livro, publishCia: event.target.value})}} value={livro.publishCia || ''}></input></label>
            </div> 
            <div className='form-group'>
              <button onClick={
              editLivro(livroId, livro)
            }>Atualizar Livro</button>  
            </div>                   
          </form>
          </div>        
    </div>
  </>)
  
}

export default LivrosEdicao