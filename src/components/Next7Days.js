import moment from 'moment';
import React, { useEffect, useState } from 'react'
import Todo from './Todo'

const Next7Days = ({todos}) => {
  const [weekTodos, setWeekTodos] =useState([]);

  useEffect(() => {
    const days = ["0", "1", "2", "3", "4", "5","6"];

    const sortedTodosByDay = days.map(day => {

      return {
        todos: todos.filter((todo) => todo.day === day),
        number: day
      }
    })
    const today = parseInt(moment().format('d'))
    const arrangeDays = sortedTodosByDay.slice(today).concat(sortedTodosByDay.slice(0,today))
    setWeekTodos(arrangeDays);
  },[todos])
  return (
    <div className='next7Day'>
      {
        weekTodos.map(day =>
            <div key={day.number}>
              <div className='next7Day-title'>
                <div className="next7Day-name">
                  {moment(day.number, 'd').format('dddd')}
                  {day.number === moment().format('d') && '(Today)'}
                </div>
                <div className="next7Day-total">
                  ({day.todos.length})
                </div>
              </div>
              <div className="next7Day-todos">
                {
                  day.todos.map(todo =>(
                    <Todo key={todo.id} todo ={todo}/>
                  ))
                }
              </div>
            </div>
          )
      }
    </div>
  )
}

export default Next7Days