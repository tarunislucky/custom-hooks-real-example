import Section from '../UI/Section';
import TaskForm from './TaskForm';

import useHttp from '../../hooks/use-http';

const NewTask = (props) => {
  const { isLoading, error, sendRequest: postNewTask } = useHttp();
  // adds a new task to UI, not API
  const addNewTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  }

  const enterTaskHandler = (taskText) => {
    postNewTask({
      url: 'https://react-http-485a4-default-rtdb.firebaseio.com/tasks.json',
      method: 'POST',
      body: { text: taskText },
      headers: {
        'Content-Type': 'application/json',
      }
      // the below bind() will create a new function with same body as addNewTask, then set the this keyword inside that function to null, and set it's first argument 
      // whatever is passed further will be added as 2nd argument
    }, addNewTask.bind(null, taskText));
  }
  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
