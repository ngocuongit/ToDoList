import './App.scss';
import AddNewTodo from './components/AddNewTodo';
import Main from './components/Main';
import Projects from './components/Projects';
import Sidebar from './components/Sidebar';
import User from './components/User';
import Calendar from './components/Calendar';
import Todos from './components/Todos';
import Next7Days from './components/Next7Days';
import EditTodo from './components/EditToDo';
function App() {
  return (
    <div className="App">
      <Sidebar>
        <User/>
        <AddNewTodo/>
        <Calendar/>
        <Projects/>
      </Sidebar>
      <Main>
        <Todos/>
        <EditTodo/>
      </Main>
    </div>
  );
}

export default App;
