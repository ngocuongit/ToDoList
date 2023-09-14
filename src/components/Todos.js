import React, {useContext} from 'react'
import Todo from './Todo'
import Next7Days from './Next7Days'
import {TodoContext} from '../context'

const Todos = () => {

  const {todos,selectedProject} = useContext(TodoContext);

  // const todos = [
  //   {
  //     id: 1,
  //     text: "Coding",
  //     time: "10:10 AM",
  //     date: "06/09/2023",
  //     day: '6',
  //     checked:false,
  //     color: "#000000",
  //     project: 'personal'
  //   },
  //   {
  //     id: 2,
  //     text: "Eating",
  //     time: "10:10 AM",
  //     date: "06/09/2023",
  //     day: '6',
  //     checked:true ,
  //     color: "#000000",
  //     project: 'personal'
  //   }
  // ]
  return (
    <div className='todos'>
      <h3 className='todos-title'> {selectedProject}</h3>
      <div className="todos-list">
        {
          selectedProject === 'Next 7 days' ? <Next7Days todos = {todos}/> : todos.map(todo => 
              <Todo todo= {todo} key={todo.id}/>
            )
        }
      </div>
    </div>
  )
}

export default Todos