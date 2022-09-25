import React, { useState } from 'react';
import '../assets/css/Input.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

function Input() {
  const [task,setTask] =useState('');

  const handleSubmit = () => {
    window.location.reload(false);

    let taskData = {
        "task" : task
    }
    axios.post("http://localhost:8000/api/data",taskData)
    .then( response => console.log("Post response is",response))
    .catch( err => console.log("Post Error",err))
  }







  return (
    <>
      <form  onSubmit={handleSubmit}>
        <div className="section">
          <input type="text" required placeholder="Task"  value={task}  onChange={(e) => setTask(e.target.value)}/>
          <span><FontAwesomeIcon icon={faAdd}  onClick={handleSubmit} ></FontAwesomeIcon> </span>
        </div>
      </form>
  </>
  )
}

export default Input