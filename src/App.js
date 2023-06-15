import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);

  const transformTasks = tasksOObj => {
    const loadedTasks = [];

    for (const taskKey in tasksOObj) {
      loadedTasks.push({ id: taskKey, text: tasksOObj[taskKey].text });
    }

    setTasks(loadedTasks);
  }

  // useHttp is a custom hook that takes a configuration object and a function to handle the results
  // it returns isLoding state, error state, and a function that can be used to send fetch request 
  // the function will also call the handler we earlier passed to useHttp with the result data

  const { isLoading, error, sendRequest: fetchTasks } = useHttp({
    url: 'https://react-http-485a4-default-rtdb.firebaseio.com/tasks.json'
  }, transformTasks);

  useEffect(() => {
    fetchTasks();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
