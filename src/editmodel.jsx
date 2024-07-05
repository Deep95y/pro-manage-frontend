import './index.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardEdit from './authedit';
import Swal from 'sweetalert2';

const EditModel = ({ handleClose, id }) => {
  const [Status, setStatus] = useState("unchecked");
  const [counter, setCounter] = useState(1);
  const [checkcount, setCheckcount] = useState(0);
  const [checked, setChecked] = useState(false);
  const [getusers, setGetusers] = useState([]);
  const [taskID, settaskID] = useState(id);
  const [formValue, setFormvalue] = useState({
    Title: "",
    Tasks: [{ task: "", status: checked }],
    Priority: "",
    AssignToEmail: "",
    DueDate: ""
  });

  useEffect(() => {
    getAdddetails();
  }, []);

  const navigate = useNavigate();

  const getAdddetails = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/users/getAdduser`)
      .then((res) => {
        setGetusers(res.data);
      });
  }

  const getTaskdetails = (id) => {
    const AddJobLink = `${import.meta.env.VITE_API_URL}/task/getitems?id=${id}`; 
    axios.get(AddJobLink)
      .then(response => {
        const data = response.data;
        setFormvalue(data);
        setCounter(data.Tasks.length);
        setCheckcount(data.Tasks.filter(task => task.status).length);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }

  useEffect(() => {
    getTaskdetails(taskID);
  }, []);


  const handleSave = (e) => {
    e.preventDefault();
    if (
      !formValue.Title ||
      !formValue.Tasks ||
      !formValue.Priority ||
      !formValue.DueDate
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Enter all input fields.',
      });
      return;
    } else {
      CardEdit({ formValue, id }); 
      handleClose();
    }
  };

  const handleCheck = (checkStatus) => {
    if (checkStatus) {
      setCheckcount(checkcount + 1);
    } else {
      setCheckcount(checkcount - 1);
    }
  };

  const handleDelete = (index) => {
    setFormvalue((prevState) => {
      const updatedTask = [...prevState.Tasks];
      updatedTask.splice(index, 1);
      return { ...prevState, Tasks: updatedTask };
    });
    setCounter(counter - 1);
  };

  const handleAddDiv = () => {
    setCounter(counter + 1);
    setFormvalue((prevState) => ({
      ...prevState,
      Tasks: [...prevState.Tasks, { task: "", status: false }],
    }));
  };

  const handleCancel = () => {
    window.location.reload();
  };

  const handleButtonClick = (priority) => {
    setFormvalue({ ...formValue, Priority: priority });
  };

  const getButtonStyle = (priority) => {
    const isSelected = formValue.Priority === priority;
    return {
      height: '1.875rem',
      width: '9.375rem',
      borderRadius: '.5rem',
      border: '.0625rem solid #E2E2E2',
      background:  `${isSelected ? '#EEECEC' : 'white'}`,
      color: 'grey',
      fontFamily: 'sans-serif',
      marginLeft: '.3125rem',
      position: 'relative',
    };
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  
  };

  return (
    <>
      <div className="scrollbar"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '31.25rem',
          width: '40.625rem',
          background: 'white',
          margin: 'auto',
          overflowY: 'scroll',
          scrollbarWidth: 'thin',
          msScrollbarShadowColor: 'lightskyblue',
          borderRadius: '.9375rem',
        }}
      >
        <h2 className="title" style={{ marginLeft: '1.25rem' }}>Title</h2>
        <br />
        <div style={{ marginLeft: '1.25rem',position:'absolute',marginTop:'10%' }}>
          <input
            type="text"
            placeholder="Enter Task Title"
            style={{ height: '2.1875rem', width: '31.25rem', borderRadius: '.5rem', border: '.1875rem solid #EDF5FE' }}
            onChange={(e) =>
              setFormvalue({
                ...formValue,
                Title: e.target.value,
              })
            }
            value={formValue.Title}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: "row", marginTop: '2.5rem' }}>
          <div className="modal" style={{ marginLeft: '1.25rem',marginTop:'.4375rem',fontWeight:'bold' }}>Select priority:</div>
          <div style={{ marginLeft: '.625rem' }}>
          <button
        type="button"
        style={getButtonStyle('High priority')}
        onClick={() => handleButtonClick('High priority')}
      >
        <div style={{ marginLeft: '.9375rem'}}>
          HIGH PRIORITY
        </div>
        <div
          style={{
            height: '.625rem',
            width: '.625rem',
            background: '#FF2473',
            borderRadius: '1.25rem',
            borderStyle: 'none',
            marginTop: '.375rem',
            position: 'absolute',
            top: '10%',
            
          }}
        ></div>
      </button>
          </div>
          <div style={{ marginLeft: '.625rem' }}>
          <button
        type="button"
        style={getButtonStyle('Medium priority')}
        onClick={() => handleButtonClick('Medium priority')}
      >
        <div style={{ marginLeft: '.9375rem', marginTop: '.1875rem' }}>
          MEDIUM PRIORITY
        </div>
        <div
          style={{
            height: '.625rem',
            width: '.625rem',
            background: '#18B0FF',
            borderRadius: '1.25rem',
            borderStyle: 'none',
            marginTop: '.3125rem',
            position: 'absolute',
            top: '20%',
            
          }}
        ></div>
      </button>
          </div>
          <div style={{ marginLeft: '.625rem' }}>
          <button
        type="button"
        style={getButtonStyle('Low priority')}
        onClick={() => handleButtonClick('Low priority')}
      >
        <div style={{ marginLeft: '.9375rem' }}>LOW PRIORITY</div>
        <div
          style={{
            height: '.625rem',
            width: '.625rem',
            background: '#63C05B',
            borderRadius: '1.25rem',
            borderStyle: 'none',
            position: 'absolute',
            top: '30%',
           
          }}
        ></div>
      </button>
          </div>
        </div>
        <div>

        <label htmlFor="dropdown" style={{marginLeft:'1.25rem',marginTop:'1.25rem',fontWeight:'bold'}}>Assign to:</label>
        <select 
          id="dropdown" 
          name="dropdown" 
          style={{
            height: '2.1875rem',
            width: '27.5rem',
            border: '.1875rem solid #EDF5FE',
            borderRadius: '.5rem',
            marginLeft: '.625rem',
            marginTop:'1.25rem'
          }}
          onChange={(e) => setFormvalue({ ...formValue, AssignToEmail: e.target.value })}
          value={formValue.AssignToEmail || ''}
        >
          <option value="" disabled>Select an option</option>
          {getusers.length ? 
            getusers.map((each, index) => (
              <option value={each} key={index}  className="option"
              onClick={() => handleOptionClick(each)}><div style={{height:'1.25rem',width:'1.25rem',borderRadius:'1.25rem',background:'lightpink',borderStyle:'none'}}></div>{each}</option>
            ))
            : <option value="" disabled>No options available</option>
          }
        </select>



          <div className="check" style={{ marginLeft: '1.25rem', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1.25rem' }}>Checklist({checkcount}/{counter})</div>
          {formValue.Tasks.map((task, index) => (
            <div style={{ marginLeft: '.625rem', display: 'flex', marginTop: '.625rem' }} key={index}>
              <div style={{ }}>
                <input
                  type="checkbox"
                  checked={task.status === 'true' || task.status === true}
                  style={{ marginLeft: '1.25rem', marginTop: '.625rem' }}
                  onChange={(e) => {
                    const newStatus = e.target.checked;
                    setFormvalue((prevState) => {
                      const updateTask = [...prevState.Tasks];
                      updateTask[index] = { ...updateTask[index], status: newStatus };
                      return { ...prevState, Tasks: updateTask };
                    });
                    handleCheck(e.target.checked);
                  }}
                />
              </div>
              <div style={{}}>
                <input
                  type="text"
                  placeholder="Add Text Here"
                  value={task.task}
                  style={{ height: '1.875rem', width: '25rem', borderRadius: '.5rem', border: '.125rem solid #EDF5FE', textAlign: 'center' }}
                  onChange={(e) => {
                    const newTask = e.target.value;
                    setFormvalue((prevState) => {
                      const updateTask = [...prevState.Tasks];
                      updateTask[index] = { ...updateTask[index], task: newTask };
                      return { ...prevState, Tasks: updateTask };
                    });
                  }}
                  
                />
              </div>
              <div style={{}}>
                <img
                  src="binimg.png"
                  style={{ height: '.9375rem', width: '.9375rem',marginTop:'.4375rem' }}
                  onClick={() => handleDelete(index)}
                  alt="Delete"
                />
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginLeft: '1.875rem', marginTop: '.625rem', cursor: 'pointer', color: 'grey', fontSize: '1.25rem' }} onClick={handleAddDiv}>+ Add New</div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '5%' }}>
          <div>
            <input
              type="date"
              id="date"
              style={{ height: '2.1875rem', width: '10.625rem', marginLeft: '1.875rem', marginTop: '18%', borderRadius: '.5rem', borderStyle: 'none', border: '.125rem solid #EDF5FE' }}
              onChange={(e) =>
                setFormvalue({
                  ...formValue,
                  DueDate: e.target.value,
                })
              }
              value={formValue.DueDate}
            />
          </div>
          <div style={{ marginTop: '1.875rem', marginLeft: '4.375rem' }}>
            <button
              type="button"
              style={{ height: '2.1875rem', width: '8.125rem', borderRadius: '.5rem', background: 'white', color: '#CF3636', border: '.0625rem solid #CF3636', marginTop: '.625rem', fontWeight: 'bold' }}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
          <div style={{ marginTop: '1.875rem', marginLeft: '1.875rem' }}>
            <button
              type="button"
              style={{ height: '2.1875rem', width: '8.125rem', borderRadius: '.5rem', background: '#17A2B8', color: 'white', borderStyle: 'none', marginTop: '.625rem', fontWeight: 'bold', fontSize: '.9375rem' }}
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditModel;