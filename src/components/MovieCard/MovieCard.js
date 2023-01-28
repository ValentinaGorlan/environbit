import Data from '../../services/data'

import {MdArrowBackIosNew} from 'react-icons/md'
import s from './style.module.scss';

const MovieCard = ({selectedMovie, handleBack}) => {

    let data = new Data;

    const getMovieCard = (arr) => {
        const card = arr.map(item => {
            if (item.id == selectedMovie) {
                return (
                    <div key={item.id} className={s.container}>
                        <button 
                        className={s.btnBack}
                        onClick={handleBack}>
                            <MdArrowBackIosNew/>
                            <span>Voltar</span>
                        </button>
                        <div className={s.card}>
                            <img
                            src={require(`../../${item.srcImg}`)}
                            alt="poster"/>
                            <div>
                                <h2>{item.name}</h2>
                                <p><span>Ano: </span>{item.year}</p>
                                <p><span>País: </span>{
                                    item.country.length > 1 ? item.country.join(', ') : item.country
                                }</p>
                                <p><span>Diretor: </span>{item.director}</p>
                                <p><span>Gênero: </span>{
                                    item.genre.length > 1 ? item.genre.join(', ') : item.genre
                                }</p>
                                <p><span>Descrição: </span>{item.description}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        });

        return card;
    }

    return(
        <div>
            {getMovieCard(data.getData())}
        </div>
    )
}

export default MovieCard;