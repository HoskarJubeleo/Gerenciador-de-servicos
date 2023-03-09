import styles from '../layout/Loading.module.css'
import load_img from '../../img/loading.svg'

function Loading(){
    
    return(
        <div className={styles.loader_conteiner}>
            <img className={styles.loader} src={load_img} alt="Loading" />
        </div>
    )
}

export default Loading