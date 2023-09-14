import { useState, useEffect } from "react";
import firebase from '../firebase'
import moment from "moment";
// import { collection,  getDocs, } from 'firebase/firestore'


export function  useTodos() {

    const [todos, setTodos] = useState([]);
    // const todoCollectionRef = collection(db,"todos");

    useEffect(() => {
        // const  unsubscribe = async () =>  {
        //     try{
        //         const data = await  getDocs(todoCollectionRef);
        //         const filteredData = data.docs.map((doc) => ({
        //             id: doc.id,
        //             ...doc.data()
        //         }))
        //         // console.log(filteredData)
        //         setTodos(filteredData);
        //     }
        //     catch(err){
        //         console.error(err)
        //     }
                     
        // }      
        let unsubscribe = firebase.firestore().collection('todos').onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => {

                    return {
                        id: doc.id,
                        ...doc.data()
                    }   
                })
                setTodos(data)
        })
        return () => unsubscribe();
    }, []);

    return todos;
}

export function useProjects() {

    const [projects, setProjects] = useState([])

    useEffect(() =>{
       
      
        let unsubscribe = firebase.firestore().collection('projects').onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => { 
                    return {
                        id: doc.id,
                        name: doc.data().name,
                    }   
                })
                setProjects(data)
                console.log(data)
        })
        return () => unsubscribe();
           
    },[])
    return projects;
}

export function useFilterTodos(todos,selectedProjects) {
    const [filteredTodos, setFilteredTodos] = useState([])

    useEffect(() => {
        let data;
        const todayDateFormat = moment().format('MM/DD/YYYY');
    
        if(selectedProjects === 'Today'){
            data = todos.filter(todo => todo.date ===todayDateFormat)
        }
        else if(selectedProjects === 'Next 7 days'){
            data =todos.filter(todo => {
                const todoDate = moment(todo.date, 'MM/DD/YYYY');
                const todayDate = moment(todayDateFormat, 'MM/DD/YYYY');
    
                const diffDays = todoDate.diff(todayDate,'days');
    
                return diffDays >=0 && diffDays <7
            })
            
        }else if(selectedProjects === 'All days'){
            data = todos;  
        }
        else {
            data = todos.filter(todo => todo.projectName === selectedProjects)
        }
    
        setFilteredTodos(data)
    },[todos, selectedProjects]) 

    return filteredTodos
}
export function useProjectsWithStats(projects,todos){
    const [projectsWithStats, setProjectsWithStats] = useState([]);
    

    useEffect(() => {
        const data = projects.map((project) =>{
            return {
                numOfTodos : todos.filter(todo => todo.projectName === project.name && !todo.checked).length,
                ...project
            }
        })
        setProjectsWithStats(data)
    },[projects,todos]);

    return projectsWithStats
}