import React, { useContext, useState } from 'react'
import { ArrowClockwise, CheckCircleFill, Circle, Trash } from 'react-bootstrap-icons'
import firebase from '../firebase'
import moment from 'moment'
import { TodoContext } from '../context'

const Todo = ({todo}) => {

  const [hoverText, setHoverText] = useState(false)
  const {selectedTodo, setSelectedTodo} = useContext(TodoContext)

   const  deleteTodo =(todo) =>{
      firebase
              .firestore()
              .collection('todos')
              .doc(todo.id)
              .delete()
  }
  const handleDeleteTodo = (todo) =>{
      deleteTodo(todo);
      if(selectedTodo === todo){
        setSelectedTodo(undefined);
      }
  }
  const handleCheckTodo = (todo) =>{
    firebase
              .firestore()
              .collection('todos')
              .doc(todo.id)
              .update({
                checked: !todo.checked
              })
  }
  const handleRepeatTodo = (todo) => {

    const nextDay = moment(todo.date,'MM/DD/YYYY').add(1, 'days');

    const repeatedTodo = {
      ...todo,
      checked: false,
      date: nextDay.format('MM/DD/YYYY'),
      day: nextDay.format('d')
    }

    delete repeatedTodo.id;

    firebase.firestore().collection('todos').add(repeatedTodo)

  }
  return (
    <div className="todo">
      <div className="todo-container" 
        onMouseEnter={() => setHoverText(true)}
        onMouseLeave={() => setHoverText(false)
        
        }
      >
        <div className="todo-checked"
          onClick={() => handleCheckTodo(todo)}
        >
          {
            todo.checked ? 
              <span className='checked'>
                <CheckCircleFill color='#bebebe'/>
              </span>
              :
              <span className="unChecked">
                <Circle color={todo.color}/>
              </span>

          }
        </div>
        <div className="todo-content"
          onClick={() => setSelectedTodo(todo)}
        >
          <p>{todo.text}</p>
          <span>{todo.time} - {todo.projectName}</span>
          <div className={`line ${todo.checked ? 'line-though' : ''}`}></div>

        </div>
        <div className='todo-actions'>
          {todo.checked &&  
            <span className="todo-repeat"
              onClick={() => handleRepeatTodo(todo)}
            >
            <ArrowClockwise/>
          </span>}
          {(todo.checked ||hoverText) && 
            <span className='todo-delete'
              onClick={() => handleDeleteTodo(todo)}
            >
            <Trash/>
          </span>}
        </div>
      </div>
    </div>
  )
}

export default Todo