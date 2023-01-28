import SortMovies from '../SortMovies/SortMovies';

import s from './style.module.scss';

const NavPanel = ({setSortValue, setInitialValue, resetFilters , isReset, isDisabled}) => {

    return (
        <div className={s.container}>
            <SortMovies setSortValue={setSortValue} setInitialValue={setInitialValue} resetFilters={resetFilters}
            isReset={isReset} isDisabled={isDisabled}/>
        </div>
    )
}

export default NavPanel;