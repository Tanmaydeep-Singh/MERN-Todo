import React, { useEffect, useState } from "react";
import "../assets/css/Task.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCheck,
  faPenToSquare,
  faAdd,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Task() {
  // Input
  const [task, setTask] = useState("");
  const [taskId, setTaskId] = useState();
  const [edit, setEdit] = useState(false);

  const handleSubmit = () => {
    window.location.reload(false);

    let taskData = {
      task: task,
    };
    axios
      .post("http://localhost:8000/api/data", taskData)
      .then((response) => console.log("Post response is", response))
      .catch((err) => console.log("Post Error", err));
  };

  // Task
  let [data, rawData] = useState([]);
  let [checked, setChecked] = useState([false]);

  const baseURL = "http://localhost:8000/api/data";

  useEffect(() => {
    const fetchedData = async () => {
      const fetchedData = await axios.get(baseURL).then((response) => {
        console.log(response.data.data);
        rawData(response.data.data);
      });
    };
    fetchedData();
  }, []);

  // Delete
  const deleteTask = (id) => {
    window.location.reload(false);
    console.log("HELLO");
    axios
      .delete(baseURL + "/delete/" + id)
      .then((res) => console.log("Post deleted", res))
      .catch((err) => console.log(err));
  };

  // Update
  const updateTask = (id) => {
    const dataToUpdate = data.find((t) => {
      return t._id === id;
    });
    setEdit(!edit);
    console.log(dataToUpdate.task);
    setTask(dataToUpdate.task);
    setTaskId(id);
  };

  // setUpdateTask
  const setUpdateTask = () => {
    window.location.reload(false);
    let updateData = {
      "task":task
    }
    axios
      .put(baseURL + "/update/" + taskId, updateData)
      .then((res) => console.log("Updated Post", res))
      .catch((err) => console.log(err));
  };

  // Complete
  const completedTask = (id) => {
    let targetClass = ".a" + id;
    console.log("Targeted class is", targetClass);
    const completionStyle = document.querySelector(targetClass);
    completionStyle.classList.toggle("complet");
    console.log(id);
  };

  // console.log("The data array is:", data);
  return (
    <>
      <form >
        <div className="section">
          <input
            type="text"
            required
            placeholder="Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          {edit ? (
            <span>
              <FontAwesomeIcon
                icon={faPenToSquare}
                onClick={() => setUpdateTask()}
              ></FontAwesomeIcon>{" "}
            </span>
          ) : (
            <span>
              <FontAwesomeIcon
                icon={faAdd}
                onClick={handleSubmit}
              ></FontAwesomeIcon>{" "}
            </span>
          )}
        </div>
      </form>

      {/* TASK */}
      {data.map((d) => {
        return (
          <>
            <div key={d._id}>
              <div className={" task " + "a" + d._id}>
                <h2>{d.task}</h2>
                <span onClick={() => updateTask(d._id)}>
                  <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                </span>
                <span onClick={() => deleteTask(d._id)}>
                  {" "}
                  <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                </span>
                <span onClick={() => completedTask(d._id)}>
                  <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                </span>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}

export default Task;
