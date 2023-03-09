import { Link } from 'react-router-dom'

import styles from './LinkButton.module.css'

function LinkButton({ to, text }){

    return(
        <Link className={styles.button_criar_projeto} to = {to}>
            {text}
        </Link>
    )
}

export default LinkButton