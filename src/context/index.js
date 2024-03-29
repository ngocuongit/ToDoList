import React, {createContext, useState}from "react";
import {useTodos, useProjects, useFilterTodos,useProjectsWithStats} from '../hooks'

const TodoContext = createContext();


function TodoContextProvider({children}){

    const defaultProject = 'Today'
    const [selectedProject, setSelectedProject] = useState(defaultProject)
    const [selectedTodo, setSelectedTodo] = useState(undefined)
    
    const todos = useTodos();
    const projects = useProjects();
    const projectsWithStats = useProjectsWithStats(projects,todos);
    const filterTodos = useFilterTodos(todos,selectedProject);
    return (
        <TodoContext.Provider
            value={
               { 
                defaultProject,
                selectedProject,
                setSelectedProject,
                todos: filterTodos,
                projects: projectsWithStats,
                selectedTodo,
                setSelectedTodo,
                }
            }
        >
            {children}
        </TodoContext.Provider>

    )
}

export  {TodoContextProvider, TodoContext}