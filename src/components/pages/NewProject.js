import { useNavigate  }from 'react-router-dom'

import ProjectForm from '../project/ProjectForm'
import styles from './NewProject.module.css'

function NewProject() {

  const Navigate = useNavigate()

  function createPost(project) {
    // initialize cost and services
    project.cost = 0
    project.services = []

    fetch('http://localhost:5000/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        document.body.scrollTop = document.documentElement.scrollTop = 100;
        Navigate('/projects', { state: {message: ' Projeto criado com sucesso '} })
      })
  }

  return (
        <div className={styles.newproject_conteiner}>
            <h1>Criar Projeto</h1>
            <p className={styles.p_newproject}>Crie seu projeto para adicionar os serviços</p>
            <ProjectForm handleSubmit = {createPost} btnText="Criar Projeto" />
        </div>
    )
}

export default NewProject