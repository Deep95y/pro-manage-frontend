import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './sidebar';

const Analytics = () => {
  const [counthigh, setCounthigh] = useState(null);
  const [countlow, setCountlow] = useState(null);
  const [countmedium, setCountmedium] = useState(null);

  const[counttodo, setCounttodo] = useState(null);
  const[countdone, setCountdone] = useState(null);
  const[countbacklog, setCountbacklog] = useState(null);
  const[countprogress, setCountprogress] = useState(null); 

  useEffect(() => {
    const getCountByPriority = (priority) => {
      axios.get(`${import.meta.env.VITE_API_URL}/task/countpriority?priority=${priority}`)
        .then((res) => {
          const count = res.data.count; // Assuming the response data has a 'count' property
          if (priority === "High priority") {
            setCounthigh(count);
          } else if (priority === "Low priority") {
            setCountlow(count);
          } else if (priority === "Medium priority") {
            setCountmedium(count);
          }
        })
        .catch((error) => console.log(error));
    };

    getCountByPriority("High priority");
    getCountByPriority("Low priority");
    getCountByPriority("Medium priority");
  }, []);

  useEffect(() => {
    const getCountByData = (state) => {
      axios.get(`${import.meta.env.VITE_API_URL}/task/countstate?state=${state}`)
        .then((res) => {
          const count = res.data.count; 
          if (state === "todo") {
            setCounttodo(count);
          } else if (state === "done") {
            setCountdone(count);
          } else if (state === "inprogress") {
            setCountprogress(count);
          } else if (state === "backlog") {   
            setCountbacklog(count);
          }
        })
        .catch((error) => console.log(error));
    };

    getCountByData("todo");
    getCountByData("done");
    getCountByData("inprogress");
    getCountByData("backlog");
  }, []);


  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'row' }}>
      <div style={{ borderRightStyle: 'inset', width: '200px', borderRight: '1px solid #EDF5FE' }}>
        <Sidebar />
      </div>
      <h1 style={{ marginLeft: '80px', marginTop: '40px' }}>Analytics</h1>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'row', position: 'absolute', marginLeft: '20%', marginTop: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', height: '400px', width: '800px', marginTop: '90px' }}>
          <div style={{ height: '200px', width: '400px', background: '#F9FCFF' }}>
            <ul>  
              <li>Backlog-task ---------- {countbacklog}</li><br />
              <li>To-do task ---------- {counttodo}</li><br />
              <li>In-Progress task ---------- {countprogress}</li><br />
              <li>Completed task ---------- {countdone}</li>
            </ul>
          </div>
          <div style={{ height: '200px', width: '400px', background: '#F9FCFF' }}>
            <ul>
              <li>Low-priority ---------- {countlow}</li><br />
              <li>High-priority ---------- {counthigh}</li><br />
              <li>Moderate-priority ---------- {countmedium}</li><br />
              <li>Due-date task ---------- 0</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
