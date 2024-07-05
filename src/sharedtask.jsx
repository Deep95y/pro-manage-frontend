import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const Sharedtask = ({handleCheck}) => {
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

<div style={{ height: '400px', width: '500px', display: 'flex', margin: 'auto', border: '4px solid #EDF5FE', flexDirection: 'column', marginTop:'5%',overflowY:'scroll',borderRadius:'12px' }}>
  {getData && (
    <>
    <div style={{display:'flex',flexDirection:'row'}}>
    <div
                        style={{
                          height: '10px',
                          width: '10px',
                          background: getColorByPriority(getData.Priority),
                          borderRadius: '20px',
                          borderStyle: 'none',
                          marginTop: '11%',
                     marginLeft:'10%'
                         
                          
          }}></div>
      <div style={{marginTop:'10%',marginLeft:'10px'}}>{getData.Priority}</div></div><br/>
      <div style={{marginLeft:'10%',marginTop:'10px',fontSize:'30px',fontWeight:'bold'}}>{getData.Title}</div><br/>
      <div style={{marginLeft:'10%',marginTop:'10px',fontSize:'20px'}}>Checklist ({getData.Tasks ? `${getData.checkcount}/${getData.Tasks.length}` : '0/0'})</div><br/>
      <div style={{marginLeft:'8%'}}>
        {getData.Tasks && getData.Tasks.map((task) => (
          <div key={task._id} style={{ display: 'flex', flexDirection: 'row',marginTop:'10px',height:'30px',width:'400px',borderRadius:'10px',border: '2px solid #EDF5FE'}}>
            <div>
              <input
                type="checkbox"
                style={{ marginLeft: '25px', background:'#17A2B8',marginTop:'9px',borderRadius:'10px' }}
              />
            </div>
            <div style={{marginTop:'5px',marginLeft:'10px' }}>
              {task.task} - {task.status}
            </div>
          </div>
        ))}
      </div>
      {getData.DueDate && (
      <div style={{display:'flex',flexDirection:'row',marginLeft:'10%',marginTop:'10%'}}>
        <div style={{marginTop:'9px',fontFamily:'sans-serif',fontWeight:'bold'}}>Due Date</div>
        <div style={{height:'35px',width:'70px',background:'#CF3636',color:'white',borderRadius:'12px',borderStyle:'none',marginLeft:'15px',textAlign:'center'}}><p style={{marginTop:'10px'}}>{formatDate(getData.DueDate)}</p></div>
      </div>
      )}
    </>
  )}
</div>

  );
}

export default Sharedtask;
