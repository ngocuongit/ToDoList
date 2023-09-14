
import React, { useState } from 'react'
import ProjectForm from './ProjectForm'
import { Plus } from 'react-bootstrap-icons'
import Modal from './Modal'
import firebase from '../firebase'

const AddNewProject = () => {

  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState('');

  const handleSubmit = (e) =>{
    e.preventDefault();

    if(projectName){
      const projectsRef = firebase.firestore().collection('projects');

      projectsRef.where('name', '==', projectName)
      .get()
      .then(querySnapshot => {
        if(querySnapshot.empty){
          projectsRef.add({
            name: projectName
          })
        }
        else{
          alert('Project already exists')
        }
      })

      setShowModal(false);
      setProjectName('')
    }
  }
  return (
    <div className='addNewProject'>
      <div className="addNewProject-add">
        <span onClick={() => setShowModal(true)}>
          <Plus size={20}/>
        </span>
      </div>
      <Modal showModal = {showModal} setShowModal = {setShowModal}>
        <ProjectForm 
          handleSubmit={handleSubmit}
          heading = 'New Project'
          value={projectName}
          setValue={setProjectName}
          setShowModal={setShowModal}
          confirmBtnText= '+ Add Project'
        />
      </Modal>
    </div>
  )
}

export default AddNewProject