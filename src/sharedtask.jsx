import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Sharedtask.css';

const Sharedtask = ({ handleCheck }) => {
  const { id } = useParams();
  const [getData, setGetData] = useState({});
  console.log(getData.DueDate);

  useEffect(() => {
    const getDatabyId = () => {
      axios.get(`${import.meta.env.VITE_API_URL}/task/getitems?id=${id}`)
        .then((res) => {
          setGetData(res.data);
        })
        .catch((error) => console.log(error));
    };

    getDatabyId();
  }, [id]);

  const getColorByPriority = (priority) => {
    switch (priority) {
      case 'High priority':
        return '#FF2473'; // Pink
      case 'Medium priority':
        return '#18B0FF';    // Blue
      case 'Low priority':
        return '#63C05B';   // Green
      default:
        return 'grey';    // Default color if no match
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'long' };
    const month = new Intl.DateTimeFormat('en-US', options).format(date);
    const day = date.getDate();

    const ordinalSuffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    return `${month} ${day}${ordinalSuffix(day)}`;
  }

  return (
    <div className="container">
      {getData && (
        <>
          <div className="priority-container">
            <div
              className="priority-dot"
              style={{ background: getColorByPriority(getData.Priority) }}
            ></div>
            <div className="priority-text">{getData.Priority}</div>
          </div>
          <br />
          <div className="title">{getData.Title}</div>
          <br />
          <div className="checklist">Checklist ({getData.Tasks ? `${getData.checkcount}/${getData.Tasks.length}` : '0/0'})</div>
          <br />
          <div className="task-container">
            {getData.Tasks && getData.Tasks.map((task) => (
              <div key={task._id} className="task">
                <div>
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={() => handleCheck(task._id)}
                  />
                </div>
                <div className="task-text">
                  {task.task} - {task.status}
                </div>
              </div>
            ))}
          </div>
          {getData.DueDate && (
            <div className="due-date-container">
              <div className="due-date-label">Due Date</div>
              <div className="due-date-value">
                <p className="due-date-text">{formatDate(getData.DueDate)}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Sharedtask;
