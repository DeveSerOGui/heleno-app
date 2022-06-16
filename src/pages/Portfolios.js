import Topo from "../components/topo/topo";
import RodaPe from "../components/footer/footer";
import ProjetoCard from "../components/CardProjetos/ProjetoCard";
import arquivo from "../projetos.json";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const Projetos = () => {
    const [dados, setDados] = useState(arquivo);
    const [parametros, setParametros] = useSearchParams();
    const entrada = useRef();


    const filtra = (dados) => {
        const parametro = parametros.get("busca");

        if (!parametro) {
            return dados;

        } else {
            const filtrados = dados.filter(
                (e) => e.titulo.toLowerCase().includes(parametro.toLocaleLowerCase()) || e.tecnologias.toLowerCase().includes(parametro.toLocaleLowerCase()) ||
                        e.participantes.toLowerCase().includes(parametro.toLocaleLowerCase())
            );
            return filtrados;
        }
       
    }


    useEffect(() => {
        const dadosFiltrados = filtra(arquivo);     
        setDados(dadosFiltrados);

    });

    return (
        <div>
            <Topo/>
            <form onSubmit={(e) => {
                e.preventDefault();
                setParametros({"busca": `${entrada.current.value}`})
                }}>
                <input 
                    type="text"
                    ref={entrada}
                    />
                <button type='submit'>Pesquisar</button>
            </form>
            <div className="ContainerCard">
                {
                        dados.map( (p, ind) => (
                            <ProjetoCard
                                    key = { ind }
                                    fotoProjeto = {p.fotoProjeto}
                                    titulo = {p.titulo}
                                    tecnologias = {p.tecnologias}
                                    participantes = {p.participantes}
                            />
                        ))
                    }
            </div>
            <RodaPe/>
        </div>
    )
}

export default Projetos;
