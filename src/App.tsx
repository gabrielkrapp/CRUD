import React, { useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import styles from "./App.module.css"
import TaskForm from "./components/TaskForm"
import TaskList from './components/TaskList';
import { ITask } from './interfaces/Task';
import Modal from './components/Modal';

function App() {

  const [taskList, setTaskList] = useState<ITask[]>([])
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter((task) => {
        return task.id !== id
      })
    )
  }

  const editTask = (task: ITask): void => {
    hideOrShowModal(true)
    setTaskToUpdate(task)
  }

  const updateTask = (id: number, title: string, descricao: string) => {
    const updatedTask: ITask = {id, title, descricao}
    const updatedItems = taskList.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task
    })

    setTaskList(updatedItems)

    hideOrShowModal(false)
  }

  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector("#modal")
    if (display) {
      modal!.classList.remove("hide")
    } else {
      modal!.classList.add("hide")
    }
  }

  return (
    <div>
      <Modal children={<TaskForm btnText='Editar tarefa' taskList={taskList}  task={taskToUpdate} handleUpdate={updateTask} />}></Modal>
      <Header></Header>
      <main className={styles.main}>
        <div>
          <h2>O que você vai fazer ?</h2>
          <TaskForm btnText="Criar tarefa" taskList={taskList} setTaskList={setTaskList}></TaskForm>
        </div>
        <div>
          <h2>Suas tarefas:</h2>
          <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask}></TaskList>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
