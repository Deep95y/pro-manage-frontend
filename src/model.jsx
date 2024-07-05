import './index.css';
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardCreate from './authcreate';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';


const Model = ({ handleClose, todo }) => {
  const [Status, setStatus] = useState("unchecked");
  const [counter, setCounter] = useState(1);
  const [checkcount, setCheckcount] = useState(0);
  const [checked, setChecked] = useState(false);
  const [getusers, setGetusers] = useState([]);
  const [formValue, setFormvalue] = useState({
    Title: "",
    Tasks: [{ task: "", status: checked }],
    Priority: "",
    AssignTo: "",
    AssignToEmail:"",
    DueDate: new Date(),
  });
  

  const navigate = useNavigate();

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
      CardCreate({ formValue }); 
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
      height: '30px',
      width: '150px',
      borderRadius: '8px',
      border: '1px solid #E2E2E2',
      background:  `${isSelected ? '#EEECEC' : 'white'}`,
      color: 'grey',
      fontFamily: 'sans-serif',
      marginLeft: '10px',
      position: 'relative',
    };
  };

  useEffect(() => {
    getAdddetails();
  }, []);

  const getAdddetails = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/users/getAdduser`)
      .then((res) => {
        setGetusers(res.data);
      });
  }


  return (
    <>
      <div className="scrollable-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '500px',
          width: '630px',
          background: 'white',
          margin: 'auto',
          overflowY: 'scroll',
          scrollbarWidth: 'thin',
           msScrollbarShadowColor: 'lightskyblue',
           borderRadius: '15px',
          
        }}
      >
        <h2 className="title" style={{ marginLeft: '20px' }}>Title</h2>
        <br />
        <div style={{ marginLeft: '20px' }}>
          <input
            type="text"
            placeholder="Enter Task Title"
            style={{ height: '35px', width: '540px', borderRadius: '8px', border: '3px solid #EDF5FE',position:'relative'}}
            onChange={(e) =>
              setFormvalue({
                ...formValue,
                Title: e.target.value,
              })
            }
            value={formValue.Title}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: "row", marginTop: '20px' }}>
          <div style={{ marginLeft:'20px',marginTop:'3px',fontWeight:'bold' }}>Select priority:</div>
          <div style={{  }}>
         <button
        type="button"
        style={getButtonStyle('High priority')}
        onClick={() => handleButtonClick('High priority')}
      >
        <div style={{ marginLeft: '15px'}}>
          HIGH PRIORITY
        </div>
        <div
          style={{
            height: '10px',
            width: '10px',
            background: '#FF2473',
            borderRadius: '20px',
            borderStyle: 'none',
            marginTop: '6px',
            position: 'absolute',
            top: '10%',
            
          }}
        ></div>
      </button>

      <button
        type="button"
        style={getButtonStyle('Medium priority')}
        onClick={() => handleButtonClick('Medium priority')}
      >
        <div style={{ marginLeft: '15px', marginTop: '3px' }}>
          MEDIUM PRIORITY
        </div>
        <div
          style={{
            height: '10px',
            width: '10px',
            background: '#18B0FF',
            borderRadius: '20px',
            borderStyle: 'none',
            marginTop: '5px',
            position: 'absolute',
            top: '20%',
            
          }}
        ></div>
      </button>

      <button
        type="button"
        style={getButtonStyle('Low priority')}
        onClick={() => handleButtonClick('Low priority')}
      >
        <div style={{ marginLeft: '15px' }}>LOW PRIORITY</div>
        <div
          style={{
            height: '10px',
            width: '10px',
            background: '#63C05B',
            borderRadius: '20px',
            borderStyle: 'none',
            position: 'absolute',
            top: '30%',
           
          }}
        ></div>
      </button>
    </div>
    </div>

    <div style={{marginTop:'20px'}}>
  {todo.length ? (
    <>
      <label htmlFor="dropdown" style={{ marginLeft: '20px', fontWeight: 'bold' }}>
        Assign to:
      </label>
      <select
        id="dropdown"
        name="dropdown"
        style={{ height: '35px', width: '460px', border: '3px solid #EDF5FE', borderRadius: '8px', marginLeft: '10px' }}
        onChange={(e) => setFormvalue({ ...formValue, AssignToEmail: e.target.value })}
      >
        <option value="" disabled selected>
          Select an option
        </option>
        {getusers.length ? (
          getusers.map((each, index) => (
            <option value={each} key={index}>
              {each}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No options available
          </option>
        )}
      </select>
    </>
 
  ) : null}

</div>
        <div>
          <div className="check" style={{ marginLeft: '20px', fontSize: '20px', fontWeight: 'bold', marginTop: '20px' }}>Checklist({checkcount}/{counter})</div>
          {Array.from(Array(counter)).map((_, index) => (
            <div style={{ marginLeft: '10px', display: 'flex', marginTop: '10px' }} key={index}>
              <div style={{ }}>
                <input
                  type="checkbox"
                  style={{ marginLeft: '20px', marginTop: '10px' }}
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
              <div style={{ }}>
                <input
                  type="text"
                  placeholder="Add Text Here"
                  style={{ height: '30px', width: '500px', borderRadius: '8px', border: '2px solid #EDF5FE', textAlign: 'center' }}
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
              <div style={{ marginTop: '9px' }}>
                <img
                  src="binimg.png"
                  style={{ height: '15px', width: '15px' }}
                  onClick={() => handleDelete(index)}
                  alt="Delete"
                />
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginLeft: '30px', marginTop: '10px', cursor: 'pointer', color: 'grey', fontSize: '20px' }} onClick={handleAddDiv}>+ Add New</div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10%' }}>
          <div>
            {/* <input
              type="date"
              id="date"
              
              style={{ height: '35px', width: '170px', marginLeft: '30px', marginTop: '18%', borderRadius: '8px', borderStyle: 'none', border: '2px solid #EDF5FE' }}
           
              onChange={(e) =>
                setFormvalue({
                  ...formValue,
                  DueDate: e.target.value,
                })
              }
               value={formValue.DueDate}
            
            /> */}
           
          <DatePicker
            
            selected={formValue.DueDate}
            onChange={(date) => setFormvalue({ ...formValue, DueDate: date })}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
            customInput={
              <input
                name="dueDate"
                style={{ height: '35px', width: '170px', marginLeft: '30px', marginTop: '18%', borderRadius: '8px', borderStyle: 'none', border: '2px solid #EDF5FE',textAlign:'center',fontFamily:'sans-serif',fontSize:'20px' }}
              />
            }
          />
    
          </div>
          <div style={{ marginTop: '30px', marginLeft: '70px' }}>
            <button
              type="button"
              style={{ height: '35px', width: '130px', borderRadius: '8px', background: 'white', color: '#CF3636', border: '1px solid #CF3636', marginTop: '10px', fontWeight: 'bold' }}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
          <div style={{ marginTop: '30px', marginLeft: '30px' }}>
            <button
              type="button"
              style={{ height: '35px', width: '130px', borderRadius: '8px', background: '#17A2B8', color: 'white', borderStyle: 'none', marginTop: '10px', fontWeight: 'bold', fontSize: '15px' }}
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

export default Model;