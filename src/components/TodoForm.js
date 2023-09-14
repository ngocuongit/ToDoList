import React, { useContext,  useState } from 'react'
import {Bell , CalendarDay,Clock, Palette, X} from 'react-bootstrap-icons'
import {DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";


import { TodoContext } from '../context';

const TodoForm = ({
    handleSubmit,
    heading = false,
    text, setText,
    day, setDay,
    time, setTime,
    todoProject, setTodoProject,
    projects,
    showButtons,
    setShowModal=false,
    isEdit =false
}) => {
  const { setSelectedTodo} = useContext(TodoContext)
  function  handleCancel(e){
    // e.preventDefault();
    if(isEdit){
      setSelectedTodo(undefined);
    } else{
      setShowModal(false);
    }
  }
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <form onSubmit={handleSubmit} className='todo-form'>
            <h3>{heading}</h3>
            <input
              type='text'
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder='Todo.....'
              autoFocus
            />
            <div className="todo-form-remind">
              <div className='todo-form-title'>
                <Bell/>
                <p>Remind Me!</p>
              </div>
            </div>
            <div className="todo-form-date">
             <div className='todo-form-title'>
                <CalendarDay/>
                <p>Choose a day</p>
             </div>
                <DatePicker 
                  value={day}
                  onChange={(day) => setDay(day)}
                />
            </div>
            <div className="todo-form-time">
              <div className='todo-form-title'>
                <Clock/>
                <p>Choose a time</p>
              </div>
                <TimePicker
                  value={time}
                  onChange={(time) => setTime(time)}
                />
            </div>
            <div className="todo-form-projects">
              <div className='todo-form-title'>
                <Palette/>
                <p>Choose a project</p>
              </div>
              <div className="todo-form-projects-list">
                { 
                  projects.length > 0 ?
                    projects.map(project => 
                      <div 
                        className={`todo-form-projects-name ${todoProject === project.name ? "active" : ""} ` }
                        key={project.id}
                        onClick={() => setTodoProject(project.name)}
                      >
                      {project.name}
                      </div>
                    )
                    : 
                    <div style={{color: '#ff0000'}}>
                      Please add a project before proceeding...
                    </div>
                  }
              </div>
            </div>
            {
                
                <div>
                    <div className="todo-form-cancel" onClick={(e) => handleCancel()}>
                    <X size={40}/>
                    </div>
                    <div className="todo-form-confirm">
                    <button>{showButtons}</button>
                    </div>
                 </div>
            }
          </form>
        </MuiPickersUtilsProvider>
  )
}

export default TodoForm