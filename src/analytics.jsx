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
      <h2 style={{ marginLeft: '80px', marginTop: '40px',fontFamily:'sans-serif' }}>Analytics</h2>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'row', position: 'absolute', marginLeft: '25%', marginTop: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', height: '400px', width: '800px', marginTop: '90px' }}>
          <div style={{ height: '200px', width: '400px', background: '#F9FCFF',display:'flex',flexDirection:'column' }}>
           
          <div style={{display:'flex', flexDirection:'row',marginLeft:'40px',marginTop:'30px'}}> <div style={{height:'10px',width:'10px',borderRadius:'20px',borderStyle:'none',background:'#90C4CC',marginTop:'5px'}}></div><div style={{marginLeft:'10px',fontSize:'20px'}}>Backlog-task</div>  <div style={{marginLeft:'190px',fontWeight:'bold',fontSize:'20px'}}>{countbacklog}</div> </div>
          <div style={{display:'flex', flexDirection:'row',marginLeft:'40px',marginTop:'20px'}}> <div style={{height:'10px',width:'10px',borderRadius:'20px',borderStyle:'none',background:'#90C4CC',marginTop:'5px'}}></div><div style={{marginLeft:'10px',fontSize:'20px'}}>To-do task</div>  <div style={{marginLeft:'210px',fontWeight:'bold',fontSize:'20px'}}>{counttodo}</div> </div>
          <div style={{display:'flex', flexDirection:'row',marginLeft:'40px',marginTop:'20px'}}> <div style={{height:'10px',width:'10px',borderRadius:'20px',borderStyle:'none',background:'#90C4CC',marginTop:'5px'}}></div><div style={{marginLeft:'10px',fontSize:'20px'}}>In-Progress task </div>  <div style={{marginLeft:'167px',fontWeight:'bold',fontSize:'20px'}}>{countprogress}</div> </div>
          <div style={{display:'flex', flexDirection:'row',marginLeft:'40px',marginTop:'20px'}}> <div style={{height:'10px',width:'10px',borderRadius:'20px',borderStyle:'none',background:'#90C4CC',marginTop:'5px'}}></div><div style={{marginLeft:'10px',fontSize:'20px'}}>Completed task</div>  <div style={{marginLeft:'172px',fontWeight:'bold',fontSize:'20px'}}>{countdone}</div> </div>

          </div>
          <div style={{ height: '200px', width: '400px', background: '#F9FCFF',marginLeft:'30px',display:'flex',flexDirection:'column'  }}>
          
           <div style={{display:'flex', flexDirection:'row',marginLeft:'40px',marginTop:'30px'}}> <div style={{height:'10px',width:'10px',borderRadius:'20px',borderStyle:'none',background:'#90C4CC',marginTop:'5px'}}></div><div style={{marginLeft:'10px',fontSize:'20px'}}>Low-priority</div>  <div style={{marginLeft:'193px',fontWeight:'bold',fontSize:'20px',}}> {countlow}</div> </div>
          <div style={{display:'flex', flexDirection:'row',marginLeft:'40px',marginTop:'20px'}}> <div style={{height:'10px',width:'10px',borderRadius:'20px',borderStyle:'none',background:'#90C4CC',marginTop:'5px'}}></div><div style={{marginLeft:'10px',fontSize:'20px'}}>High-priority</div>  <div style={{marginLeft:'190px',fontWeight:'bold',fontSize:'20px'}}>{counthigh}</div> </div>
          <div style={{display:'flex', flexDirection:'row',marginLeft:'40px',marginTop:'20px'}}> <div style={{height:'10px',width:'10px',borderRadius:'20px',borderStyle:'none',background:'#90C4CC',marginTop:'5px'}}></div><div style={{marginLeft:'10px',fontSize:'20px'}}>Moderate-priority  </div>  <div style={{marginLeft:'153px',fontWeight:'bold',fontSize:'20px'}}>{countmedium}</div> </div>
          <div style={{display:'flex', flexDirection:'row',marginLeft:'40px',marginTop:'20px'}}> <div style={{height:'10px',width:'10px',borderRadius:'20px',borderStyle:'none',background:'#90C4CC',marginTop:'5px'}}></div><div style={{marginLeft:'10px',fontSize:'20px'}}>Due-date task</div>  <div style={{marginLeft:'185px',fontWeight:'bold',fontSize:'20px'}}>0</div> </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
