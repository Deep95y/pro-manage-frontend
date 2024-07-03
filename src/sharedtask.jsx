import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const Sharedtask = ({handleCheck}) => {
  const { id } = useParams();
  const [getData, setGetData] = useState({});
 
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

  return (

<div style={{ height: '400px', width: '500px', display: 'flex', margin: 'auto', border: '4px solid #EDF5FE', flexDirection: 'column', marginTop:'5%',overflowY:'scroll' }}>
  {getData && (
    <>
      <div style={{marginLeft:'10%',marginTop:'10%'}}>{getData.Priority}</div><br/>
      <div style={{marginLeft:'10%',marginTop:'10px',fontSize:'30px',fontWeight:'bold'}}>{getData.Title}</div><br/>
      <div style={{marginLeft:'10%',marginTop:'10px',fontSize:'20px'}}>Checklist({getData.Tasks ? `${getData.checkcount}/${getData.Tasks.length}` : '0/0'})</div><br/>
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
      {getData.Date && (
      <div style={{display:'flex',flexDirection:'row',marginLeft:'10%',marginTop:'10%'}}>
        <div style={{marginTop:'9px'}}>Due Date</div>
        <div style={{height:'40px',width:'100px',background:'#CF3636',color:'white',borderRadius:'12px',borderStyle:'none',marginLeft:'15px',textAlign:'center'}}><p style={{marginTop:'10px'}}>{getData.Date}</p></div>
      </div>
      )}
    </>
  )}
</div>

  );
}

export default Sharedtask;
