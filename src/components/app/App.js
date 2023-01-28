import { useState, useEffect} from "react";
import AppHeader from "../AppHeader/AppHeader";
import NavPanel from "../NavPanel/NavPanel";
import MovieList from "../MoviesList/MoviesList";
import MovieCard from "../MovieCard/MovieCard";

import s from "./style.module.scss";

function App() {
  const [isDarkTheme, setDarkTheme] = useState(false);
  const [isSelectedMovie, setSelectedMovie] = useState(null);
  const [sortTerm, setSortTerm] = useState("");
  const [initialValue, setInitial] = useState(-1);
  const [isReset, setReset] = useState(false);
  const [ isResetFilters, setResetFilters] = useState(false);
  const [childRef, setChildRef] = useState(null);
  const [isDisabled, setDisabled] = useState(false);

  useEffect(() => {
    if(isResetFilters) {
      setReset(false);
      setResetFilters(false);
    }
  }, [initialValue]);

  useEffect(() => {
    if(childRef) {
      setDisabled(true);
    }
  }, [childRef]);

  const handleClick = () => {
    setDarkTheme(!isDarkTheme);
  };

  const handleSelected = (id) => {
    setSelectedMovie(id);
  };

  const handleBack = () => {
    setSelectedMovie(null);
  };

  const setSortValue = (str) => {
    setSortTerm(str);
  };

  const setInitialValue = (i) => {
    setInitial(i);
  };

  const resetFilters = () => {
    setSortTerm(null);
    setReset(true)
    setResetFilters(true);
    setInitial(-1);
    setDisabled(false)
  }

  return (
    <div
      className={s.app_body}
      style={
        isDarkTheme
          ? {
              backgroundColor: "#302e38",
              color: "#fff",
            }
          : {
              backgroundColor: "#fff",
              color: "#000",
            }
      }
    >
      <div className={s.wrapper}>
        <AppHeader handleClick={handleClick} />
          <NavPanel
            setSortValue={setSortValue}
            setInitialValue={setInitialValue}
            resetFilters={resetFilters}
            isDisabled={isDisabled}
            isReset={isReset}
          />
        {isSelectedMovie ? (
          <MovieCard selectedMovie={isSelectedMovie} handleBack={() => {
            handleBack();
            resetFilters();
          }} />
        ) : (
            <MovieList
              handleSelect={handleSelected}
              sortProp={sortTerm}
              initialValue={initialValue}
              setRef={setChildRef}   
              isReset={isReset}         
            />
        )}
      </div>
    </div>
  );
}

export default App;
