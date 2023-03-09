import styles from '../project/ProjectsCards.module.css'

import { BsFillTrashFill } from 'react-icons/bs'

function ServiceCard({ id, name, cost, description, handleRemove }){
    
    const remove =(e) => {
        e.preventDefault()
        handleRemove(id, cost)
    }

    return(
        <div className={styles.project_cards}>
            <h4>{name}</h4>

            <p> <span>Custo Toral: </span>R$ {cost} </p>

            <p> {description} </p>

            <div className={styles.project_cards_actions}>
                <button onClick={remove}> <BsFillTrashFill /> Excluir </button>
            </div>
        </div>
    )
}

export default ServiceCard