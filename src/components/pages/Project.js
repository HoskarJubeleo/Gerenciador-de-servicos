
import { parse, v4 as uuidv4 } from 'uuid'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import styles from './Project.module.css'
import ProjectForm from '../project/ProjectForm'

import Loading from '../layout/Loading'
import Conteiner from '../layout/Conteiner'
import Message from '../layout/Message'

import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

function Project() {

  let { id } = useParams()

  const [project, setProject] = useState([])

  const [services, setServices] = useState([])

  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)

  const [ message, setMessage ] = useState()
  const [ type, setType ] = useState()

  useEffect(() => {
    // Para ver o loading
    setTimeout(
      () =>
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            setServices(data.services)
        }),
      1000,
    )
  }, [id])

  function editPost(project) {
    setMessage('')

    // budget validation
    if (project.budget < project.cost) {
        document.body.scrollTop = document.documentElement.scrollTop = 100  
        setMessage(' O Orçamento não pode ser menor que o custo do projeto ')
        setType('error')
        return false
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(project),
    })
    .then((resp) => resp.json())
    .then((data) => {
        setProject(data)
        setShowProjectForm(!showProjectForm)
        document.body.scrollTop = document.documentElement.scrollTop = 100
        setMessage(' Projeto atualizado ')
        setType('success')
    })
  }

  function createService(project) {

    setMessage('')

    // last service
    const lastService = project.services[project.services.length - 1]

    lastService.id = uuidv4()

    const lastServiceCost = lastService.cost

    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

    // maximum value validation
    if (newCost > parseFloat(project.budget)) {
        document.body.scrollTop = document.documentElement.scrollTop = 100
        setMessage(' Orçamento ultrapassado, verifique o valor do serviço ')
        setType('error')
        project.services.pop()
        return false
    }

    // add service cost to project cost total
    project.cost = newCost

    fetch(`http://localhost:5000/projects/${project.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(project),
    })
    .then((resp) => resp.json())
    .then((data) => {
        setServices(data.services)
        setShowServiceForm(!showServiceForm)
        document.body.scrollTop = document.documentElement.scrollTop = 100
        setMessage(' Serviço adicionado ')
        setType('success')
    })
  }


    function removeServices(id, cost){

        setMessage(' ')

        const servicesUpdated = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdated = project

        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectUpdated)
        })
        .then((resp) => resp.json())
        .then((data) => { 
            setProject(projectUpdated) 
            setServices(servicesUpdated) 
        })
        document.body.scrollTop = document.documentElement.scrollTop = 100
        setMessage(' Serviço removido com sucesso ')
        setType('success')
        .catch(err => console.log(err))

    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    } 

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    } 

    return(
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Conteiner customClass="column">

                        { message && <Message type={type} msg={message} />}

                        <div className={styles.deteils_conteiner}>
                            <h1><span>Projeto:</span> {project.name} </h1>

                            <button className={styles.button} onClick={toggleProjectForm}> {!showProjectForm ? 'Editar Projeto' : 'Fechar' } </button>

                            {!showProjectForm ? (
                                    <div className={styles.project_info}>
                                        <p>
                                            <span>Categoria: </span> {project.category.name}
                                        </p>
                                        <p>
                                            <span>Total do Orçamento: </span>R$ {project.budget}
                                        </p>
                                        <p>
                                            <span>Total Utilizado: </span>R$ {project.cost}
                                        </p>
                                    </div>
                                ) : (
                                    <div className={styles.project_info}>
                                        <ProjectForm handleSubmit={editPost} btnText="Concluir Edição" projectData={project} />
                                    </div>
                                ) 
                            }
                        </div>
                        <hr />
                        <div className={styles.service_form_conteiner}>
                            <h1><span>Adicione um Serviço: </span></h1>
                            <button className={styles.button} onClick={toggleServiceForm}> {!showServiceForm ? 'Adicionar Serviço' : 'Fechar' } </button>
                            <div className={styles.project_info}>  
                                {showServiceForm && (
                                    <ServiceForm 
                                        handleSubmit={createService}
                                        btnText= "Adicionar Servico"
                                        projectDate={project}
                                    />
                                )}
                            </div>      
                        </div>
                        <h2>Serviço</h2>
                        <Conteiner customClass="start" >
                            {services.length > 0 &&
                                services.map((service) => (
                                    <ServiceCard
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        key={service.id}
                                        handleRemove={removeServices}
                                    />
                            ))}
                            {services.length === 0 && <p>Não há serviços cadastrados.</p>}
                        </Conteiner>                        
                    </Conteiner>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}

export default Project