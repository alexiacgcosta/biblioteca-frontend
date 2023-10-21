import {useEffect , useState} from 'react'
import Header from '../../components/Header/Header'
import "./index.scss"
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros'
import { useParams } from 'react-router-dom'
import { LivrosService } from '../../api/LivrosService'

const LivrosEdicao = () => {  
  
  let {livroId} = useParams();

  const [livro, setLivro] = useState([])

  async function getLivro(){
    const {data} = await LivrosService.getLivro(livroId);
    setLivro(data)
  }

  async function editLivro(){
    const body = {
        _id:Number(livro._id),
        title:livro.title,
        numberPages: Number(livro.numberPages),
        ISBN: livro.ISBN,
        publishCia: livro.publishCia
      }
      console.log(livro)
    if(livro._id!=undefined && livro._id!='' && livro.title!=undefined && livro.title!='' && livro.numberPages!=undefined && livro.numberPages!='' && livro.ISBN !=undefined && livro.ISBN !='' && livro.publishCia !=undefined && livro.publishCia !=''){
      await LivrosService.updateLivro(Number(livro.id),body)
      .then(({data})=>{
        alert(data.mensagem)
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
              <label>Id</label>
              <input type="text" disabled  onChange={(event)=>{ setLivro({...livro, _id: event.target.value})}} value={livro._id || ''} placeholder={livro._id}></input>
            </div>
            <div className='form-group'>
              <label>Titulo</label>
              <input type="text" onChange={(event)=>{ setLivro({...livro, title: event.target.value})}} value={livro.title || ''} ></input>
            </div>
            <div className='form-group'>
              <label>Número de Páginas</label>
              <input type="text"  onChange={(event)=>{ setLivro({...livro, numberPages: event.target.value})}} value={livro.numberPages || ''}></input>
            </div>
            <div className='form-group'>
              <label>ISBN</label>
              <input type="text"  onChange={(event)=>{ setLivro({...livro, ISBN: event.target.value})}} value={livro.ISBN || ''}></input>
            </div>
            <div className='form-group'>
              <label>Editora</label>
              <input type="text" onChange={(event)=>{ setLivro({...livro, publishCia: event.target.value})}} value={livro.publishCia || ''}></input>
            </div> 
            <div className='form-group'>
              <button onClick={()=>{
              editLivro()
            }}>Atualizar Livro</button>  
            </div>                   
          </form>
          </div>        
    </div>
  </>)
  
}

export default LivrosEdicao