import React,{useContext, useEffect, useRef} from 'react'
import { TodoContext } from '../context';

const Sidebar = ({children}) => {
  const sidebarRef = useRef();
  const {setSelectedTodo} = useContext(TodoContext)

  const handleClick =(e) => {
      if(e.target === sidebarRef.current || sidebarRef.current.contains(e.target)) {
        setSelectedTodo(undefined)
      }
  }
  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)
  })
  return (
    <div className='sidebar' ref={sidebarRef}>
      {children}
    </div>
  )
}

export default Sidebar