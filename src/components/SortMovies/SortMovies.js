import { useState, useEffect } from "react";

import Data from "../../services/data";
import Dropdown from "react-dropdown";


import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { GrPowerReset } from 'react-icons/gr'
import s from "./style.module.scss";

const SortMovies = ({setSortValue, setInitialValue, resetFilters, isReset, isDisabled}) => {

  const [selectValue, setSelectValue] = useState(["Ano", 'País', 'Gênero']);

    const data = (new Data).getData();

    let years = [...new Set(data.map((item) => item.year))];
    let countries = [...new Set((data.map((item) => item.country)).flat())];
    let genres = [...new Set((data.map((item) => item.genre)).flat())];

      useEffect(() => {
          setSelectValue(["Ano", 'País', 'Gênero']);
      }, [isReset])

      const reset = (arr, ind, str) => {
        arr.splice(ind, 1, str);
        return arr;
      }

  const DropDown = (optionsArray, i) => {

    const defaultValue = optionsArray[0];
    return (
      <Dropdown
        className={s.select}
        controlClassName={s.control}
        options={optionsArray.slice(1, optionsArray.length)}
        menuClassName={s.menu}
        placeholder={defaultValue}
        value={'' + defaultValue}
        arrowClosed={<MdKeyboardArrowDown size={"30px"} />}
        arrowOpen={isDisabled ? null : <MdKeyboardArrowUp />}
        disabled = {isDisabled ? true : false}
        onChange={(value) => {
            if (isReset) {
              setSelectValue(["Ano", 'País', 'Gênero'])
              setInitialValue(-1);
            } else {
              setSelectValue(reset(selectValue, i, value.label));
              setInitialValue(i);
            };
            setSortValue(value.value)
            }
        }
      />
    );
  };

    return (
      <div className={s.container}>
        {DropDown([selectValue[0], ...years.sort()], 0)}
        {DropDown([selectValue[1], ...countries.sort()], 1)}
        {DropDown([selectValue[2], ...genres.sort()], 2)}
          <button className={s.resetFilters}
          onClick={resetFilters}
          >
            <GrPowerReset/>
          </button>
      </div>
    )

};

export default SortMovies;
