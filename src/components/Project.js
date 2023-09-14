import React, { useContext, useEffect, useState } from "react";
import RenameProject from "./RenameProject";
import { Pencil, X, XCircle } from "react-bootstrap-icons";
import Modal from "./Modal";
import { TodoContext } from "../context";
import firebase from "../firebase";
import {useTransition, useSpring, animated  } from "react-spring";

const Project = ({ project, edit }) => {
  const { defaultProject, selectedProject, setSelectedProject } =
    useContext(TodoContext);
  const [showModal, setShowModal] = useState(false);
  const fadeIn = useSpring({
    from: { marginTop: "-12px", opacity: 0 },
    to: { marginTop: "0px", opacity: 1 },
  });
  const btnTransition = useTransition(edit, {
    from : { opacity : 0, right : '-20px' },
    enter : { opacity : 1, right : '0px' },
    leave : { opacity : 0, right : '-20px' }
})
  const deleteProject = (project) => {
    firebase
      .firestore()
      .collection("projects")
      .doc(project.id)
      .delete()
      .then(() => {
        firebase
          .firestore()
          .collection("todos")
          .where("projectName", "==", project.name)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
            });
          });
      })
      .then(() => {
        if (selectedProject === project.name) {
          setSelectedProject(defaultProject);
        }
      });
  };
  // useEffect(() => {
  //   transRef.start();

  // },[d])
  return (
    <animated.div style={fadeIn} className="project">
      <div
        className="project-name"
        onClick={() => setSelectedProject(project.name)}
      >
        {project.name}
      </div>
      <div className="project-actions">
        {
          btnTransition((props,editProject) => 
            editProject ? 
              <animated.div style={{...props}} className="project-btn">
                <span className="project-edit" onClick={() => setShowModal(true)}>
                  <Pencil size={13} />
                </span>
                <span
                  className="project-delete"
                  onClick={() => deleteProject(project)}
                >
                  <X size={18} />
                </span>
              </animated.div>
             : 
               project.numOfTodos === 0 ? "" :
              <animated.div style={{...props}} className="project-total">{project.numOfTodos}</animated.div>
            
          )
        }
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <RenameProject
          project={project}
          setShowModal={setShowModal}
        >

        </RenameProject>
      </Modal>
    </animated.div>
  );
};

export default Project;
