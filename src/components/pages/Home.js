import LinkButton from '../layout/LinkButton'
import styles from './Home.module.css'
import './Home.module.css'
// import savings from '../../img/savings.svg'

function Home(){

    return(

        <section className={styles.home_conteiner}>
            <h1>Bem-Vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar seus projetos agora mesmo! </p>
            <LinkButton to="/newproject" text="Novo Projeto"/>
        </section>    
    )
}

export default Home