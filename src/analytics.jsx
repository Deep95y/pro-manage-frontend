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
      <div style={{ borderRightStyle: 'inset', width: '12.5rem', borderRight: '.0625rem solid #EDF5FE' }}>
        <Sidebar />
      </div>
      <h2 style={{ marginLeft: '5rem', marginTop: '2.5rem',fontFamily:'sans-serif' }}>Analytics</h2>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'row', position: 'absolute', marginLeft: '25%', marginTop: '1.25rem' }}>
        <div style={{ display: 'flex', flexDirection: 'row', height: '25rem', width: '50rem', marginTop: '5.625rem' }}>
          <div style={{ height: '12.5rem', width: '25rem', background: '#F9FCFF',display:'flex',flexDirection:'column' }}>
           
          <div style={{display:'flex', flexDirection:'row',marginLeft:'2.5rem',marginTop:'1.875rem'}}> <div style={{height:'.625rem',width:'.625rem',borderRadius:'1.25rem',borderStyle:'none',background:'#90C4CC',marginTop:'.3125rem'}}></div><div style={{marginLeft:'.625rem',fontSize:'1.25rem'}}>Backlog-task</div>  <div style={{marginLeft:'11.875rem',fontWeight:'bold',fontSize:'1.25rem'}}>{countbacklog}</div> </div>
          <div style={{display:'flex', flexDirection:'row',marginLeft:'2.5rem',marginTop:'1.25rem'}}> <div style={{height:'.625rem',width:'.625rem',borderRadius:'1.25rem',borderStyle:'none',background:'#90C4CC',marginTop:'.3125rem'}}></div><div style={{marginLeft:'.625rem',fontSize:'1.25rem'}}>To-do task</div>  <div style={{marginLeft:'13.125rem',fontWeight:'bold',fontSize:'1.25rem'}}>{counttodo}</div> </div>
          <div style={{display:'flex', flexDirection:'row',marginLeft:'2.5rem',marginTop:'1.25rem'}}> <div style={{height:'.625rem',width:'.625rem',borderRadius:'1.25rem',borderStyle:'none',background:'#90C4CC',marginTop:'.3125rem'}}></div><div style={{marginLeft:'.625rem',fontSize:'1.25rem'}}>In-Progress task </div>  <div style={{marginLeft:'10.4375rem',fontWeight:'bold',fontSize:'1.25rem'}}>{countprogress}</div> </div>
          <div style={{display:'flex', flexDirection:'row',marginLeft:'2.5rem',marginTop:'1.25rem'}}> <div style={{height:'.625rem',width:'.625rem',borderRadius:'1.25rem',borderStyle:'none',background:'#90C4CC',marginTop:'.3125rem'}}></div><div style={{marginLeft:'.625rem',fontSize:'1.25rem'}}>Completed task</div>  <div style={{marginLeft:'10.75rem',fontWeight:'bold',fontSize:'1.25rem'}}>{countdone}</div> </div>

          </div>
          <div style={{ height: '12.5rem', width: '25rem', background: '#F9FCFF',marginLeft:'1.875rem',display:'flex',flexDirection:'column'  }}>
          
           <div style={{display:'flex', flexDirection:'row',marginLeft:'2.5rem',marginTop:'1.875rem'}}> <div style={{height:'.625rem',width:'.625rem',borderRadius:'1.25rem',borderStyle:'none',background:'#90C4CC',marginTop:'.3125rem'}}></div><div style={{marginLeft:'.625rem',fontSize:'1.25rem'}}>Low-priority</div>  <div style={{marginLeft:'12.0625rem',fontWeight:'bold',fontSize:'1.25rem'}}> {countlow}</div> </div>
          <div style={{display:'flex', flexDirection:'row',marginLeft:'2.5rem',marginTop:'1.25rem'}}> <div style={{height:'.625rem',width:'.625rem',borderRadius:'1.25rem',borderStyle:'none',background:'#90C4CC',marginTop:'.3125rem'}}></div><div style={{marginLeft:'.625rem',fontSize:'1.25rem'}}>High-priority</div>  <div style={{marginLeft:'11.875rem',fontWeight:'bold',fontSize:'1.25rem'}}>{counthigh}</div> </div>
          <div style={{display:'flex', flexDirection:'row',marginLeft:'2.5rem',marginTop:'1.25rem'}}> <div style={{height:'.625rem',width:'.625rem',borderRadius:'1.25rem',borderStyle:'none',background:'#90C4CC',marginTop:'.3125rem'}}></div><div style={{marginLeft:'.625rem',fontSize:'1.25rem'}}>Moderate-priority  </div>  <div style={{marginLeft:'9.5625rem',fontWeight:'bold',fontSize:'1.25rem'}}>{countmedium}</div> </div>
          <div style={{display:'flex', flexDirection:'row',marginLeft:'2.5rem',marginTop:'1.25rem'}}> <div style={{height:'.625rem',width:'.625rem',borderRadius:'1.25rem',borderStyle:'none',background:'#90C4CC',marginTop:'.3125rem'}}></div><div style={{marginLeft:'.625rem',fontSize:'1.25rem'}}>Due-date task</div>  <div style={{marginLeft:'11.5625rem',fontWeight:'bold',fontSize:'1.25rem'}}>0</div> </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
