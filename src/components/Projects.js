import React, { useState, useContext } from 'react'
import AddNewProject from './AddNewProject'
import Project from './Project'
import { CaretUp, Palette, PencilFill } from 'react-bootstrap-icons'
import { TodoContext } from '../context'
import {useSpring, animated} from 'react-spring'

const Projects = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [edit, setEdit] = useState(false);
  const colorEdit = edit ? '#1EC94C': '#000000';

  const animationSpin = useSpring({
        transform: showMenu ? 'rotate(0deg)' : 'rotate(180deg)',
        config: {friction: 10}
  })
  const animationMenu = useSpring({
    display: showMenu ? 'block' : 'none',
    lineHeight: showMenu ? 1.2 : 0

  })
 
  const {projects} = useContext(TodoContext)
  return (
    <div className='projects'>
        <div className="projects-top">
          <div className="projects-title">
            <Palette size={18}/>
            <p>Projects</p>
          </div>
          <div className="projects-actions">
            {  projects.length > 0 && 
              <span className='projects-edit' onClick={ () => setEdit(!edit)}>
                <PencilFill size={13} color= {colorEdit}/>
                </span>
              }
            <AddNewProject/>
            <animated.span style={animationSpin} onClick={() => setShowMenu(!showMenu)}><CaretUp size={20}/></animated.span>
          </div>
        </div>
        <animated.div  style={animationMenu} className="projects-content">
          { projects.map(project => 
            <Project
              project={project}
              key = { project.id}
              edit = {edit}
            />
          )}
        </animated.div>
      </div>
  )
}

export default Projects