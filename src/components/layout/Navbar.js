import {Link} from 'react-router-dom'

import Conteiner from './Conteiner'

import styles from './Navbar.module.css'

function Navbar(){

    return(
    <>
        <nav className={styles.navbar}>
            <Conteiner>
                <ul className={styles.list}>
                    <li className={styles.item}> <Link to="/">Home</Link> </li>
                    <li className={styles.item}> <Link to="/projects">Projetos</Link> </li>
                    <li className={styles.item}> <Link to="/company">Empresa</Link> </li>
                    <li className={styles.item}> <Link to="/contact">Contado</Link> </li>
                </ul>
            </Conteiner>
        </nav>

        <hr className={styles.hr_navbar}/>
    </>    
    )
}

export default Navbar