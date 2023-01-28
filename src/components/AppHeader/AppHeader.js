import s from './style.module.scss';

const AppHeader = ({handleClick}) => {

    return (
        <header className={s.header}>
            <h1 className={s.title}>
                Meus filmes favoritos
            </h1>
            <div className={s.theme}>
                Escuro
                <span className={s.togglePill}>
                    <input type="checkbox" id="pill1" 
                    onChange={handleClick}/>
                    <label htmlFor="pill1"></label>
                </span>
            </div>
        </header>
    )
}

export default AppHeader;