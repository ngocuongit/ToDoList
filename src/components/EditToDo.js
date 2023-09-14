import React, {useContext, useEffect, useState} from 'react'
import TodoForm from './TodoForm'
import { TodoContext } from '../context';
import moment from 'moment';
import firebase from '../firebase'

const EditToDo = () => {
  const [text, setText] = useState('');
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [todoProject, setTodoProject] = useState();
  const {projects, selectedTodo, setSelectedTodo} = useContext(TodoContext)

  useEffect(() =>{
    if(selectedTodo){
      setText(selectedTodo.text);
      setDay(moment(selectedTodo.date,"MM/DD/YYYY"))
      setTime(moment(selectedTodo.time,"hh:mm A"));
      setTodoProject(selectedTodo.projectName)
    }
  
  },[selectedTodo])
   const handleSubmit = (e) =>{
    e.preventDefault();

    firebase.firestore().collection('todos').doc(selectedTodo.id).update({
      text,
      date: moment(day).format('MM/DD/YYYY'),
      time: moment(time).format('hh:mm A'),
      day: moment(day).format('d'),
      projectName: todoProject

    })

    setSelectedTodo(undefined)
  }
  return (
    <div>
      {
        selectedTodo && 
        <div className='edit'>
        <h3 className="edit-title">Edit Todo</h3>
        <div className="edit-container">
          <TodoForm 
             handleSubmit={handleSubmit}
             text={text}
             setText={setText}
             day={day}
             setDay={setDay}
             time={time}
             setTime={setTime}
             todoProject={todoProject}
             setTodoProject={setTodoProject}
             projects={projects}
             showButtons='update'
             isEdit = {true}/>
        </div>
      </div>
      }
    </div>
  )
}

export default EditToDo