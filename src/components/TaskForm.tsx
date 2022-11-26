import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import styles from "./TaskForm.module.css"
import { ITask } from '../interfaces/Task';
import TaskList from './TaskList';

interface Props {
    btnText: string
    taskList: ITask[]
    setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>
    task?: ITask | null
    handleUpdate?(id: number, title: string, descricao: string): void
}

const TaskForm = ({ btnText, taskList, setTaskList, task, handleUpdate }: Props) => {

    const [id, setId] = useState<number>(0)
    const [title, setTitle] = useState<string>("")
    const [descricao, setDescricao] = useState<string>("")

    useEffect(() => {

        if(task) {
            setId(task.id)
            setTitle(task.title)
            setDescricao(task.descricao)
        }

    }, [task])

    const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        if (handleUpdate) {
            handleUpdate(id, title, descricao)
            
        } else {
            const id = Math.floor(Math.random() * 1000)
            const newTask: ITask = {id, title, descricao}
            setTaskList!([...taskList, newTask])
            setTitle("")
            setDescricao("")
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "title") {
            setTitle(e.target.value)
        } else {
            setDescricao(e.target.value)
        }
    }

  return (
    <form onSubmit={addTaskHandler} className={styles.form}>
        <div className={styles.input_container}>
            <label htmlFor='title'>Título:</label>
            <input type="text" name="title" placeholder="Título da tarefa" onChange={handleChange} value={title}></input>
        </div>
        <div className={styles.input_container}>
            <label htmlFor='descricao'>Descrição:</label>
            <input type="text" name="descricao" placeholder="Descrição da tarefa" onChange={handleChange} value={descricao}></input>
        </div>
        <input type="submit" value={btnText}></input>
    </form> 
    )
}

export default TaskForm