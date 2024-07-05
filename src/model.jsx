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
      height: '1.875rem',
      width: '9.375rem',
      borderRadius: '.5rem',
      border: '.0625rem solid #E2E2E2',
      background:  `${isSelected ? '#EEECEC' : 'white'}`,
      color: 'grey',
      fontFamily: 'sans-serif',
      marginLeft: '.625rem',
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
          height: '31.25rem',
          width: '39.375rem',
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
        <div style={{ marginLeft: '1.25rem' }}>
          <input
            type="text"
            placeholder="Enter Task Title"
            style={{ height: '2.1875rem', width: '33.75rem', borderRadius: '.5rem', border: '.1875rem solid #EDF5FE',position:'relative'}}
            onChange={(e) =>
              setFormvalue({
                ...formValue,
                Title: e.target.value,
              })
            }
            value={formValue.Title}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: "row", marginTop: '1.25rem' }}>
          <div style={{ marginLeft:'1.25rem',marginTop:'.1875rem',fontWeight:'bold' }}>Select priority:</div>
          <div style={{  }}>
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

    <div style={{marginTop:'1.25rem'}}>
  {todo.length ? (
    <>
      <label htmlFor="dropdown" style={{ marginLeft: '1.25rem', fontWeight: 'bold' }}>
        Assign to:
      </label>
      <select
        id="dropdown"
        name="dropdown"
        style={{ height: '2.1875rem', width: '28.75rem', border: '.1875rem solid #EDF5FE', borderRadius: '.5rem', marginLeft: '.625rem' }}
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
          <div className="check" style={{ marginLeft: '1.25rem', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1.25rem' }}>Checklist({checkcount}/{counter})</div>
          {Array.from(Array(counter)).map((_, index) => (
            <div style={{ marginLeft: '.625rem', display: 'flex', marginTop: '.625rem' }} key={index}>
              <div style={{ }}>
                <input
                  type="checkbox"
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
              <div style={{ }}>
                <input
                  type="text"
                  placeholder="Add Text Here"
                  style={{ height: '1.875rem', width: '31.25rem', borderRadius: '.5rem', border: '.125rem solid #EDF5FE', textAlign: 'center' }}
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
              <div style={{ marginTop: '.5625rem' }}>
                <img
                  src="binimg.png"
                  style={{ height: '.9375rem', width: '.9375rem' }}
                  onClick={() => handleDelete(index)}
                  alt="Delete"
                />
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginLeft: '1.875rem', marginTop: '.625rem', cursor: 'pointer', color: 'grey', fontSize: '1.25rem' }} onClick={handleAddDiv}>+ Add New</div>
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
                style={{ height: '2.1875rem', width: '10.625rem', marginLeft: '1.875rem', marginTop: '18%', borderRadius: '.5rem', borderStyle: 'none', border: '.125rem solid #EDF5FE',textAlign:'center',fontFamily:'sans-serif',fontSize:'1.25rem' }}
              />
            }
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

export default Model;