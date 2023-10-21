import axios from "axios";

const BASE_URL = "https://bibllioteca-backend.vercel.app/livros"

export class LivrosService{


    static getLivros(){
        return axios.get(BASE_URL+'/obter/livro');
    }

    static getLivro(id){
        return axios.get(`${BASE_URL}/livros/${id}`);
    }

    static createLivro(body){
        return axios.post(`${BASE_URL}/cadastrar`,body);
    }

    static updateLivro(id,body){
        return axios.put(`${BASE_URL}/editar/${id}`,body);
    }

    static deleteLivro(id){
        return axios.delete(`${BASE_URL}/deletar/${id}`);
    }
    
}