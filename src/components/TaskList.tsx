import React from 'react'
import styles from "./TaskList.module.css"
import { ITask } from '../interfaces/Task';

interface Props {
  taskList: ITask[]
  handleDelete(id: number): void
  handleEdit(task: ITask): void
}

const TaskList = ({taskList, handleDelete, handleEdit}: Props) => {
  return (
    <>
      {taskList.length > 0 ? (
        taskList.map((task) => (
          <div key={task.id} className={styles.task}>
            <div className={styles.details}>
              <h4>{task.title}</h4>
              <p>Descrição: {task.descricao}</p>
            </div>
            <div className={styles.actions}>
              <i className='bi bi-pencil' onClick={() => handleEdit(task)}></i>
              <i className='bi bi-trash' onClick={() => {handleDelete(task.id)}}></i>
            </div>
          </div>
        ))
      ) : (
        <p>Não há tarefas cadastradas!</p>
      )}
    </>
  )
}

export default TaskList