import React,{useState, useContext, useEffect} from 'react'
import Modal from './Modal';

import TodoForm from './TodoForm';
import { TodoContext } from '../context';
import { calendarItems } from '../constant';
import firebase from '../firebase'
import moment from 'moment/moment';
import randomColor from 'randomcolor';


const AddNewTodo = () => {
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState('');
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [todoProject, setTodoProject] = useState();
  const {projects, selectedProject} = useContext(TodoContext)

  const handleSubmit = (e) =>{
    e.preventDefault();

    if(text && !calendarItems.includes(todoProject)){
      firebase
        .firestore()
        .collection('todos')
        .add(
          {
            text: text,
            date: moment(day).format('MM/DD/YYYY'),
            time: moment(time).format('hh:mm A'),
            day: moment(day).format('d'),
            checked: false,
            color: randomColor(),
            projectName: todoProject
          }
        )
        setShowModal(false);
        setText('')
        setDay(new Date());
        setTime(new Date());
    }

  }
  useEffect(() => {
    setTodoProject(selectedProject);
  },[selectedProject])

  // const projects = [
  //   {id: 1, name: "personal", numOfTodos:0},
  //   {id: 2, name: "work", numOfTodos:2},
  //   {id: 3, name: "other", numOfTodos:2},
  // ];
   
  return (
    <div className='add-todo'>
      
      <div className='add-todo-btn'>
        <button onClick={() => setShowModal(true)}>
          + New Todo
        </button>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <TodoForm 
          handleSubmit={handleSubmit}
          heading = "Add new to do"
          text={text}
          setText={setText}
          day={day}
          setDay={setDay}
          time={time}
          setTime={setTime}
          todoProject={todoProject}
          setTodoProject={setTodoProject}
          projects={projects}
          showButtons="+Add new todo"
          setShowModal ={setShowModal}
          isEdit= {false}
        />
      </Modal>
    </div>
  )
}

export default AddNewTodo