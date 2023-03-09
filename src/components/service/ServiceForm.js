import { useState } from 'react'

import styles from '../project/ProjectForm.module.css'

import Inputs from '../form/Inputs'
import SubmitButton from '../form/SubmitButton'


function ServiceForm({ handleSubmit, btnText, projectDate }){

    const [service, setServece] = useState({ })

    function submit(e){
        e.preventDefault()
        projectDate.services.push(service)
        handleSubmit(projectDate)
    }

    function handleChange(e){
        setServece({ ...service, [e.target.name] : e.target.value})
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Inputs type="text" text="Nome do serviço" name="name" placeholder="Insira o nome do serviço" handleOnChange={handleChange}/>

            <Inputs type="number" text="Custo do serviço" name="cost" placeholder="Insira o valor total" handleOnChange={handleChange}/>
            
            <Inputs type="text" text="Descrição do serviço" name="description" placeholder="Escreva o serviço" handleOnChange={handleChange}/>
        
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ServiceForm