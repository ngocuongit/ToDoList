import React, { useContext, useState } from 'react'
import ProjectForm from './ProjectForm'
import firebase from '../firebase'
import {TodoContext} from '../context'

const RenameProject = ({project,setShowModal}) => {
  const {selectedProject,setSelectedProject} = useContext(TodoContext);
  const [newProjectName, setNewProjectName] = useState(project.name)

  const renameProject = (project, newProjectName) => {
    const projectRef = firebase.firestore().collection('projects');
    const todoRef = firebase.firestore().collection('todos');

    const {name: oldProjectName} = project;

    projectRef
        .where('name', '==', newProjectName)
        .get()
        .then( querySnapshot =>{
          if(!querySnapshot.empty){
            alert('Project with the same name already exists')

          }
          else {
            projectRef
                .doc(project.id)
                .update({
                  name: newProjectName
                })
                .then(
                  todoRef
                    .where('projectName', '==',oldProjectName)
                    .get()
                    .then(querySnapshot => {
                      querySnapshot.forEach(doc => {
                        doc.ref.update({
                          projectName: newProjectName
                        })
                      })
                    })
                    .then(() =>{
                      if(selectedProject === oldProjectName){
                        setSelectedProject(newProjectName)
                      }
                    })
                )
          }
        })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    renameProject(project,newProjectName)
    setShowModal(false);    
  }
  return (
    <div>
       <ProjectForm 
          handleSubmit={handleSubmit}
          heading = 'Update Project'
          value={newProjectName}
          setValue={setNewProjectName}
          setShowModal={setShowModal}
          confirmBtnText= 'Confirm'
        />
    </div>
  )
}

export default RenameProject