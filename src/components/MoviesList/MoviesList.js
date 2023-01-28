import { useState, useEffect, useRef } from "react";
import Data from "../../services/data";

import s from "./style.module.scss";

const MovieList = ({ handleSelect, sortProp, initialValue, setRef, isReset}) => {
  const data = new Data().getData();

  const ref = useRef(null);

  const NotFound = () => {
    return (
      <div className={s.container} ref={ref}>
          <h1>Nada foi encontrado de acordo com sua solicitação.</h1>
          <h2>Atualize seus filtros.</h2>
      </div>
    )
  }

  const [moviesList, setMoviesList] = useState(data);
  const [sortParamss, setSortParams] = useState([null, null, null]);

  useEffect(() => {
    if (initialValue === -1) {
      setMoviesList(data);
    } 
  }, [initialValue]);

  useEffect(() => {

    if (initialValue === 0) {
      setSortParams([sortParamss[0] = sortProp, sortParamss[1], sortParamss[2]])
    } else if (initialValue === 1) {
      setSortParams([sortParamss[0], sortParamss[1] = sortProp, sortParamss[2]])
    } else if (initialValue === 2) {
      setSortParams([sortParamss[0], sortParamss[1], sortParamss[2] = sortProp])
    } else if (initialValue === -1) {
      setMoviesList(data);
      setSortParams([null, null, null]);
    }
      setMoviesList(sortMovies());
  }, [sortProp]);

  useEffect(() => {
    if(moviesList.length === 0) {
      setRef(ref.current);
    }
  }, [moviesList])

  useEffect(() => {
    if (isReset) {
      setMoviesList(data);
      setSortParams([null, null, null]);
    }
  }, [isReset])

  const movieListItems = (arr) => {
    const elements = arr.map((item) => {
      return (
        <li
          key={item.id}
          className={s.item}
          onClick={() => handleSelect(item.id)}
        >
          <img src={require(`../../${item.srcImg}`)} alt="poster" />
          <div className={s.name}>
            <p>{item.name}</p>
            <p className={s.small}>
              Country:{" "}
              {item.country.length > 1 ? item.country.join(", ") : item.country}
            </p>
            <p className={s.small}>Year: {item.year}</p>
            <p className={s.small}>Director: {item.director}</p>
          </div>
        </li>
      );
    });

    return (
      <ul className={s.flex}>
          {moviesList.length === 0 ? NotFound() : null}
        {elements}
      </ul>)
  };

  const sortMovies = () => {
    let valuesArr= data.map(item => [item.year, ...item.country, ...item.genre].filter(value => sortParamss.indexOf(value) > -1));

    let indArr1 = valuesArr.map((item, ind) => item.length === 3 ? ind : null).filter(ind => ind);
    let indArr2 = valuesArr.map((item, ind) => item.length === 2 ? ind : null).filter(ind => ind);
    let indArr3 = valuesArr.map((item, ind) => item.length === 1 ? ind : null).filter(ind => ind);

    let result1 = data.map((item, ind) => indArr1.indexOf(ind) > -1 ? item : null).filter(item => item);
    let result2 = data.map((item, ind) => indArr2.indexOf(ind) > -1 ? item : null).filter(item => item)
    let result3 = data.map((item, ind) => indArr3.indexOf(ind) > -1 ? item : null).filter(item => item)

    if (sortParamss.filter(s => s).length === 0) {
      return data
    } else if (result1.length === 0 && sortParamss.filter(s => s).length === 3) {
      return [];
    } else if (result1.length > 0 && sortParamss.filter(s => s).length === 3) {
      return result1
    } else if (result2.length > 0 && sortParamss.filter(s => s).length === 2) {
      return result2
    } else if (result3.length > 0 && sortParamss.filter(s => s).length === 1) {
      return result3
    } 
  };

  return (
      <div className={s.container}>
        {movieListItems(moviesList)}
      </div>
  );
};


export default MovieList;
