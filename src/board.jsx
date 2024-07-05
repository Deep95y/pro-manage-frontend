import Sidebar from './sidebar';
import React, { useState, useEffect } from "react";
import "./index.css";
import Model from './model'
import Modal from "react-modal";
import Cardpopup from './cardpopup';
import { Container, Row, Col } from 'react-bootstrap'
import axios from "axios";
import { FaUser } from 'react-icons/fa';
import Share from './share';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

const Board = ({}) => {

  const [counter, setCounter] = useState(1);
  const [checkcount, setCheckcount] = useState(0);
  const [check, setCheck] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showAddPeople, setShowAddPeople] = useState(false);
  const [showAddemail, setShowAddemail] = useState(false);
  const [visiblePopupId, setVisiblePopupId] = useState(null);
  const [todo, setTodo] = useState([]);
  const [backlog, setBacklog] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [done, setDone] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
  const [period, setPeriod] = useState('today');
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const userData = JSON.parse(window.localStorage.getItem("userInfo"));


  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.90)',
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      background: "transparent",
      margin: 0,
      padding: 0,
      border: "none",
      outline: "none",
      position: "fixed",
      boxSizing: "border-box",
      overflow: "hidden",
    },
  };


  Modal.setAppElement('#root');

  useEffect(() => {
    fetchTasks(period);
  }, [period]);

  const fetchTasks = async (selectedPeriod) => {
    try {
      if (selectedPeriod == ""){
        selectedPeriod = "today";
      }
      const token = localStorage.getItem('token');

      const url = `${import.meta.env.VITE_API_URL}/task/taskByDate?period=${selectedPeriod}`;
      axios.defaults.headers.common["Authorization"] = token;   

      const response = await axios.get(url);  

      setTasks(response.data);
      categorizeTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  const categorizeTasks = (tasks) => {
    const todoTasks = tasks.filter(task => task.State === 'todo');
    const backlogTasks = tasks.filter(task => task.State === 'backlog');
    const inProgressTasks = tasks.filter(task => task.State === 'inprogress');
    const doneTasks = tasks.filter(task => task.State === 'done');

    setTodo(todoTasks);
    setBacklog(backlogTasks);
    setInprogress(inProgressTasks);
    setDone(doneTasks);
  };


  // const getStateData = (state) => {

  //   const token = localStorage.getItem("token");

  //   axios.get(`${import.meta.env.VITE_API_URL}/task/getByState?State=${state}`, { headers: { Authorization: token } })
  //     .then((res) => {
  //       if (state === "todo") {
  //         setTodo(res.data);
  //       }

  //       if (state === "inprogress") {
  //         setInprogress(res.data)
  //       }

  //       if (state === "done") {
  //         setDone(res.data)
  //       }

  //       if (state === "backlog") {
  //         setBacklog(res.data)
  //       }
  //     }

  //     )
  //     .catch((error) => (console.log(error)));
  // }

  const [cardCollapse, setCardCollapse] = useState(true);
  const [cardCollapse2, setCardCollapse2] = useState(true);
  const [cardCollapse3, setCardCollapse3] = useState(true);
  const [cardCollapse4, setCardCollapse4] = useState(true);


  const cardCollapsebacklog = (id) => {
    setCardCollapse(!cardCollapse);
  };

  const cardCollapsetodo = (id) => {
    setCardCollapse2(!cardCollapse2);
  };

  const cardCollapseprogress = (id) => {
    setCardCollapse3(!cardCollapse3);
  };

  const cardCollapsedone = (id) => {
    setCardCollapse4(!cardCollapse4);
  };


  const handleOpen = () => {
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
    fetchTasks(period)
  };

  const handleOpenAddpeople = () => {
    setShowAddPeople(true);

  };

  const handleCloseAddpeople = () => {
    setShowAddPeople(false);
  };



  const handleCardPopup = (id) => {
    setVisiblePopupId(prevId => (prevId === id ? null : id));

  };


  const handleCheck = (checkStatus, id, taskIndex) => {
    
    const updateData = {
      "checkStatus": checkStatus,
      "id": id,
      "taskIndex" : taskIndex
    }
    axios.patch(`${import.meta.env.VITE_API_URL}/task/updateTaskById`, updateData)

      .then((res) => {
        fetchTasks(period);
      }
      )
      .catch((error) => (console.log(error)));


    if (checkStatus === true) {
      setCheckcount(checkcount + 1);
    }
    if (checkStatus === false) {
      setCheckcount(checkcount - 1);
    }
  };


  const updateState = (state, id) => {
    const updateData = {
      "state": state,
      "id": id
    }
    axios.patch(`${import.meta.env.VITE_API_URL}/task/updateStateById`, updateData)

      .then((res) => {
        fetchTasks(period);
      }
      )
      .catch((error) => (console.log(error)));
  }


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

  const currentDate = new Date();

  const getFormattedDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
  
    const getDayWithSuffix = (day) => {
      if (day > 3 && day < 21) return `${day}th`;
      switch (day % 10) {
        case 1: return `${day}st`;
        case 2: return `${day}nd`;
        case 3: return `${day}rd`;
        default: return `${day}th`;
      }
    };
  
    const dayWithSuffix = getDayWithSuffix(day);
  
    return `${dayWithSuffix} ${month}, ${year}`;
  };
  const formattedDate = getFormattedDate(currentDate);

  return (
    <>
      <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'row' }}>
        <div style={{ borderRightStyle: 'inset', width: '200px', borderRight: '2px solid #EDF5FE' }}><Sidebar /></div>
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '30px', marginTop: '20px' }}>


            <div style={{ display: 'flex', flexDirection: 'column'}}>
              <div>
            {token && (
                <div><h1 style={{ color: 'black',marginLeft:'14px',fontFamily:'sans-serif'}}>Welcome!{userData.Name}</h1></div>
              )}
            </div>
              <div style={{ display: 'flex', flexDirection: 'row',marginTop:'30px' }}>

                <div style={{ fontSize: '25px', fontWeight: 'bold',fontFamily:'sans-serif',marginLeft:'20px' }}>Board</div>

                <div style={{ marginLeft: '15px',marginTop:'6px' }}><FaUser style={{ fontSize: '15px', color: '#707070' }} /></div>
                <div style={{ cursor: 'pointer', color: '#707070', marginLeft: '7px',marginTop:'5px',fontFamily:'sans-serif' }} onClick={handleOpenAddpeople}>Add People</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{position:'absolute',marginLeft:'57%',color:'#707070'}}>{formattedDate}</div>
              <div style={{ position: 'absolute', marginLeft: '57%', marginTop: '60px' }}>
                <select className="select" value={period} onChange={handlePeriodChange}>This week
                  <option value="today">Today</option>
                  <option value="week">This week</option>
                  <option value="month">This month</option>
                </select>
              </div>
            </div></div>
          <div style={{ display: 'flex', flexDirection: 'row', marginTop: '40px', marginLeft: '50px' }}>
            <div style={{ background: '#EEF2F5', height: '580px', width: '350px', overflowY: 'scroll',borderRadius:'10px' }}>
             <div style={{display:'flex',flexDirection:'row'}}>
              <div style={{ marginTop: '20px', marginLeft: '20px',fontWeight:'bold' }}>Backlog</div>
              <div onClick={cardCollapsebacklog} style={{position:'absolute', marginLeft:'21%',marginTop:'20px'}}><img src="minmax.png" style={{ height: '20px', width: '20px'}}
                {...cardCollapse ? 'Expand' : 'Collapse'} /> </div>
              </div>

              <Container style={{}}>
                {backlog.length ? backlog.map((each, index) => (
                  <div key={each._id} style={{ height: '300px', width: '290px', background: 'white', borderRadius: '10px', paddingLeft: '10px', paddingTop: '20px', overflowY: 'initial', border: '3px solid #EDF5FE', marginTop: '20px', marginLeft: '20px' }}>
                    <div style={{ fontSize: '20px', cursor: 'pointer', color: 'black', float: 'right', paddingRight: '10px',marginBottom:'10px' }} onClick={() => handleCardPopup(each._id)}>...</div>
                    {visiblePopupId === each._id && (
                      <div style={{ marginLeft: '16%', marginTop: '3%', position: 'absolute' }}>
                        <Cardpopup id={each._id} fetchTasks={fetchTasks} period={period}/>
                      </div>
                    )}

                    <div style={{display:'flex', flexDirection:'row'}}>
                     
                    <div
                        style={{
                          height: '10px',
                          width: '10px',
                          background: getColorByPriority(each.Priority),
                          borderRadius: '20px',
                          borderStyle: 'none',
                          marginTop: '6px',
                          top: '10%',
                         
                          
                        }}></div><div style={{marginLeft:'10px'}}>{each.Priority}</div>
                        {each.AssignToEmail && (
                        <div style={{height:'40px',width:'40px',borderRadius:'20px',background:'lightpink',borderStyle:'none',marginLeft:'120px',textAlign:'center',position:'absolute'}}><p>{(each.AssignToEmail).slice(0,2).toUpperCase()}</p></div>
                        )}
                        </div>
                    <div><h2>{each.Title}</h2></div>
                    <div onClick={cardCollapsebacklog} style={{ cursor: 'pointer', float: 'right',height:'25px',width:'25px',background:'#EEECEC',marginRight:'10px',borderRadius:'6px' }}>
        {cardCollapse ? <FaChevronUp style={{ height: '15px', width: '15px',marginLeft:'5px',marginTop:'5px',color:'grey' }} /> : <FaChevronDown style={{ height: '15px', width: '15px',marginLeft:'5px',color:'grey',marginTop:'5px' }} />}
      </div>

                    <div className='check' style={{fontSize:'18px',fontWeight:'bold',fontFamily:'sans-serif'}}>Checklist({checkcount}/{each.Tasks.length})</div>


                    {!cardCollapse &&
                      <div>
                        {each.Tasks.map((task, taskIndex) => (
                          <div key={task._id} style={{ display: 'flex', flexDirection: 'row', marginTop: '10px', height: '30px', width: '200px', borderRadius: '10px', border: '2px solid #EDF5FE' }}>
                            <div>
                              <input
                                type="checkbox"
                                style={{ marginLeft: '10px', background: '#17A2B8', height: '15px', width: '15px', borderRadius: '10px',marginTop:'7px' }}
                                onChange={(e) => handleCheck(e.target.checked, each._id, taskIndex)}
                                checked={task.status}
                              /></div>
                            <div style={{ height: '20px', width: '150px', background: 'white', borderColor: 'black', marginTop:'5px',marginLeft:'5px' }}>{task.task} - {task.status}</div></div>
                    
                        ))}
                      </div>}
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10%' }}>
                      <button type="button" style={{ height: '30px', width: '60px', borderRadius: '8px', background: '#CF3636', color: 'white', borderStyle: 'none',fontFamily:'sans-serif' }}>{formatDate(each.DueDate)}</button>
                      <button type="submit" style={{ height: '30px', width: '70px', background: '#EEF2F5', color: 'grey', borderRadius: '6px', borderStyle: 'none', marginLeft: '5px',fontFamily:'sans-serif' }} onClick={() => updateState("todo", each._id)}>To-do</button>
                      <button type="submit" style={{ height: '30px', width: '70px', background: '#EEF2F5', color: 'grey', borderRadius: '6px', borderStyle: 'none', marginLeft: '5px',fontFamily:'sans-serif' }} onClick={() => updateState("inprogress", each._id)}>Progress</button>
                      <button type="submit" style={{ height: '30px', width: '70px', background: '#EEF2F5', color: 'grey', borderRadius: '6px', borderStyle: 'none', marginLeft: '5px',fontFamily:'sans-serif' }} onClick={() => updateState("done", each._id)}>Done</button></div>
                  </div>


                )) : null}
              </Container>


            </div>
            <div style={{ background: '#EEF2F5', height: '580px', width: '350px', marginLeft: '25px', overflowY: 'scroll', display: 'flex', flexDirection: 'column',borderRadius:'10px'  }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ marginLeft: '20px', marginTop: '20px',fontWeight:'bold' }}>To-do</div>
                <div style={{ marginLeft: '70%' }} onClick={cardCollapsetodo}><img src="minmax.png" style={{ height: '20px', width: '20px', marginTop: '20px' }}   
                {...cardCollapse2 ? 'Expand' : 'Collapse'}/></div>

                <div onClick={handleOpen} style={{ position: 'absolute', fontSize: '30px', marginLeft: '18%', cursor: 'pointer', marginTop: '15px' }}>+</div>
              </div>
              <Container style={{}}>
                {todo.length ? todo.map((each, index) => (
                  <div key={each._id} style={{ height: '300px', width: '290px', background: 'white', borderRadius: '10px', paddingLeft: '10px', overflowY: 'hidden', border: '2px solid #EDF5FE', marginTop: '20px', marginLeft: '28px' }}>
                    <div style={{ fontSize: '20px', cursor: 'pointer', color: 'black', float: 'right', paddingRight: '10px' }} onClick={() => handleCardPopup(each._id)}>...</div>
                    {visiblePopupId === each._id && (
                      <div style={{ marginLeft: '16%', marginTop: '3%', position: 'absolute' }}>
                        <Cardpopup id={each._id} fetchTasks={fetchTasks} period={period}/>
                      </div>
                    )}
                     <div style={{display:'flex', flexDirection:'row'}}>
                     
                     <div
                         style={{
                           height: '10px',
                           width: '10px',
                           background: getColorByPriority(each.Priority),
                           borderRadius: '20px',
                           borderStyle: 'none',
                           marginTop: '15px',
                          
                          
                           
                         }}></div><div style={{marginLeft:'10px',marginTop:'10px'}}>{each.Priority}</div>
                         {each.AssignToEmail && (
                         <div style={{height:'40px',width:'40px',borderRadius:'20px',background:'lightpink',borderStyle:'none',marginLeft:'20px',textAlign:'center',marginTop:'10px'}}><p>{(each.AssignToEmail).slice(0,2).toUpperCase()}</p></div>
                         )}
                         </div>
                    <div><h2>{each.Title}</h2></div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <div className='check' style={{fontSize:'18px',fontWeight:'bold',fontFamily:'sans-serif'}}>Checklist({checkcount}/{each.Tasks.length})</div>
                      <div onClick={cardCollapsetodo} style={{ cursor: 'pointer', float: 'right',height:'25px',width:'25px',background:'#EEECEC',borderRadius:'6px',display:'flex',marginLeft:'40%' }}>
        {cardCollapse2 ? <FaChevronUp style={{ height: '15px', width: '15px',marginLeft:'5px',marginTop:'5px',color:'grey' }} /> : <FaChevronDown style={{ height: '15px', width: '15px',marginLeft:'5px',marginTop:'5px',color:'grey'}} />}
      </div>
                    </div>
                   

                    {!cardCollapse2 &&
                      <div>
                        {each.Tasks.map((task, taskIndex) => (
                          <div key={task._id} style={{ display: 'flex', flexDirection: 'row', marginTop: '10px', height: '30px', width: '200px', borderRadius: '10px', border: '2px solid #EDF5FE' }}>
                            <div><input type="checkbox"
                              style={{ marginLeft: '10px', background: '#17A2B8', height: '15px', width: '15px', borderRadius: '10px',marginTop:'7px' }}
                              onChange={(e) => handleCheck(e.target.checked, each._id, taskIndex)}
                              checked={task.status}>
                            </input></div>
                            <div style={{ height: '20px', width: '150px', background: 'white', borderColor: 'black',marginTop:'5px',marginLeft:'5px'}}>{task.task} - {task.status}</div></div>
                      
                        ))}
                      </div>}
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10%' }}>
                      <button type="button" style={{ height: '30px', width: '60px', borderRadius: '8px', background: '#CF3636', color: 'white', borderStyle: 'none',fontFamily:'sans-serif' }}>{formatDate(each.DueDate)}</button>
                      <button type="submit" style={{ height: '30px', width: '70px', background: '#EEF2F5', color: 'grey', borderRadius: '6px', borderStyle: 'none', marginLeft: '5px',fontFamily:'sans-serif' }} onClick={() => updateState("backlog", each._id)}>Backlog</button>
                      <button type="submit" style={{ height: '30px', width: '70px', background: '#EEF2F5', color: 'grey', borderRadius: '6px', borderStyle: 'none', marginLeft: '5px',fontFamily:'sans-serif' }} onClick={() => updateState("inprogress", each._id)}>Progress</button>
                      <button type="submit" style={{ height: '30px', width: '70px', background: '#EEF2F5', color: 'grey', borderRadius: '6px', borderStyle: 'none', marginLeft: '5px',fontFamily:'sans-serif' }} onClick={() => updateState("done", each._id)}>Done</button></div>
                  </div>


                )) : null}
              </Container>
            </div>
            <div style={{ background: '#EEF2F5', height: '580px', width: '350px', marginLeft: '25px', overflowY: 'scroll',borderRadius:'10px'}}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ marginLeft: '20px', marginTop: '20px',fontWeight:'bold' }}>In-progress</div>
                <div style={{ marginLeft: '60%', marginTop: '20px' }} onClick={cardCollapseprogress}><img src="minmax.png" style={{ height: '20px', width: '20px' }}  
                {...cardCollapse3 ? 'Expand' : 'Collapse'} /></div>
              </div>

              <Container style={{}}>
                {inprogress.length ? inprogress.map((each, index) => (
                  <div key={each._id} data={each} style={{ height: '300px', width: '290px', background: 'white', borderRadius: '10px', paddingLeft: '10px', paddingTop: '10px', overflowY: 'hidden', marginTop: '20px', marginLeft: '28px' }}>
                    <div style={{ fontSize: '20px', cursor: 'pointer', color: 'black', float: 'right', paddingRight: '10px' }} onClick={() => handleCardPopup(each._id)}>...</div>
                    {visiblePopupId === each._id && (
                      <div style={{ marginLeft: '16%', marginTop: '3%', position: 'absolute' }}>
                        <Cardpopup id={each._id} fetchTasks={fetchTasks} period={period}/>
                      </div>
                    )}

                <div style={{display:'flex', flexDirection:'row'}}>
                     
                     <div
                         style={{
                           height: '10px',
                           width: '10px',
                           background: getColorByPriority(each.Priority),
                           borderRadius: '20px',
                           borderStyle: 'none',
                           marginTop: '6px',
                           top: '10%',
                          
                           
                         }}></div><div style={{marginLeft:'10px'}}>{each.Priority}</div>
                         {each.AssignToEmail && (
                         <div style={{height:'40px',width:'40px',borderRadius:'20px',background:'lightpink',borderStyle:'none',marginLeft:'20px',textAlign:'center'}}><p>{(each.AssignToEmail).slice(0,2)}</p></div>
                         )}
                         </div>
                    <div><h2>{each.Title}</h2></div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <div className='check' style={{fontSize:'18px',fontWeight:'bold',fontFamily:'sans-serif'}}>Checklist({checkcount}/{each.Tasks.length})</div>
                   
                <div onClick={cardCollapseprogress} style={{ cursor: 'pointer', float: 'right',height:'25px',width:'25px',background:'#EEECEC',borderRadius:'6px',display:'flex',marginLeft:'40%' }}>
                        {cardCollapse3 ? <FaChevronUp style={{ height: '15px', width: '15px',marginLeft:'5px',marginTop:'5px',color:'grey' }} /> : <FaChevronDown style={{ height: '15px', width: '15px',marginLeft:'5px',marginTop:'5px',color:'grey'}} />}
                      </div>

                    </div>
                    {!cardCollapse3 &&
                      <div>
                        {each.Tasks.map((task, taskIndex) => (
                          <div key={task._id} style={{ display: 'flex', flexDirection: 'row', marginTop: '10px', height: '30px', width: '200px', borderRadius: '10px', border: '2px solid #EDF5FE' }}>
                            <div><input type="checkbox"
                              style={{ marginLeft: '10px', background: '#17A2B8', height: '15px', width: '15px', borderRadius: '10px',marginTop:'6px' }}
                              onChange={(e) => handleCheck(e.target.checked, each._id,taskIndex)}
                              checked={task.status}>
                            
                            </input></div>
                            <div style={{ height: '20px', width: '150px', background: 'white', borderColor: 'black',marginTop:'5px',marginLeft:'5px' }}>{task.task} - {task.status}</div></div>
                       
                        ))}
                      </div>}
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10%' }}>
                      <button type="button" style={{ height: '30px', width: '60px', borderRadius: '8px', background: '#CF3636', color: 'white', borderStyle: 'none' }}>{formatDate(each.DueDate)}</button>
                      <button type="submit" style={{ height: '30px', width: '70px', background: '#EEF2F5', color: 'grey', borderRadius: '6px', borderStyle: 'none', marginLeft: '5px',fontFamily:'sans-serif' }} onClick={() => updateState("backlog", each._id)}>Backlog</button>
                      <button type="submit" style={{ height: '30px', width: '70px', background: '#EEF2F5', color: 'grey', borderRadius: '6px', borderStyle: 'none', marginLeft: '5px',fontFamily:'sans-serif' }} onClick={() => updateState("todo", each._id)}>To-do</button>
                      <button type="submit" style={{ height: '30px', width: '70px', background: '#EEF2F5', color: 'grey', borderRadius: '6px', borderStyle: 'none', marginLeft: '5px',fontFamily:'sans-serif' }} onClick={() => updateState("done", each._id)}>Done</button></div>
                  </div>


                )) : null}
              </Container>
            </div>
            <div style={{ background: '#EEF2F5', height: '585px', width: '350px', marginLeft: '25px', overflowY: 'scroll',borderRadius:'10px',borderBottomLeftRadius:'10px' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ marginLeft: '20px', marginTop: '20px',fontWeight:'bold' }}>Done</div>
                <div style={{ marginLeft: '60%', marginTop: '20px' }} onClick={cardCollapsedone} ><img src="minmax.png" style={{ height: '20px', width: '20px' }}   
                {...cardCollapse4 ? 'Expand' : 'Collapse'} /></div>
              </div>
              <Container style={{}}>
                {done.length ? done.map((each, index) => (
                  <div key={each._id} style={{ height: '300px', width: '290px', background: 'white', borderRadius: '10px', paddingLeft: '10px', paddingTop: '10px', overflowY: 'hidden', border: '2px solid #EDF5FE', marginTop: '20px', marginLeft: '30px' }}>
                    <div style={{ fontSize: '20px', cursor: 'pointer', color: 'black', float: 'right', paddingRight: '10px' }} onClick={() => handleCardPopup(each._id)}>...</div>
                    {visiblePopupId === each._id && (
                      <div style={{ marginLeft: '16%', marginTop: '3%', position: 'absolute' }}>
                        <Cardpopup id={each._id} fetchTasks={fetchTasks} period={period}/>
                      </div>
                    )}
                   <div style={{display:'flex', flexDirection:'row'}}>
                     
                     <div
                         style={{
                           height: '10px',
                           width: '10px',
                           background: getColorByPriority(each.Priority),
                           borderRadius: '20px',
                           borderStyle: 'none',
                           marginTop: '6px',
                           top: '10%',
                          
                           
                         }}></div><div style={{marginLeft:'10px'}}>{each.Priority}</div>
                         {each.AssignToEmail && (
                         <div style={{height:'40px',width:'40px',borderRadius:'20px',background:'lightpink',borderStyle:'none',marginLeft:'20px'}}>{(each.AssignToEmail).slice(0,2).toUppercase()}</div>
                         )}
                         </div>
                    <div><h2>{each.Title}</h2></div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <div className='check' style={{fontSize:'18px',fontWeight:'bold',fontFamily:'sans-serif'}}>Checklist({checkcount}/{each.Tasks.length})</div>
                        
              <div onClick={cardCollapsedone} style={{ cursor: 'pointer', float: 'right',height:'25px',width:'25px',background:'#EEECEC',borderRadius:'6px',display:'flex',marginLeft:'40%' }}>
                                      {cardCollapse4 ? <FaChevronUp style={{ height: '15px', width: '15px',marginLeft:'5px',marginTop:'5px',color:'grey' }} /> : <FaChevronDown style={{ height: '15px', width: '15px',marginLeft:'5px',marginTop:'5px',color:'grey'}} />}
                                    </div>

                    </div>

                    {!cardCollapse4 &&
                      <div>
                        {each.Tasks.map((task, taskIndex) => (
                          <div key={task._id} style={{ display: 'flex', flexDirection: 'row', marginTop: '10px', height: '30px', width: '200px', borderRadius: '10px', border: '2px solid #EDF5FE' }}>
                            <div><input type="checkbox"
                              style={{ marginLeft: '9px', background: '#17A2B8', height: '15px', width: '15px', borderRadius: '10px',marginTop:'8px' }}
                              onChange={(e) => handleCheck(e.target.checked, each._id, taskIndex)}
                              checked={task.status}>
                            
                            </input></div>
                            <div style={{ height: '20px', width: '150px', background: 'white', borderColor: 'black',marginTop:'5px',marginLeft:'8px' }}>{task.task} - {task.status}</div></div>
                    
                        ))}
                      </div>}
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10%' }}>
                      <button type="button" style={{ height: '30px', width: '60px', borderRadius: '8px', background: '#63C05B', color: 'white', borderStyle: 'none',fontFamily:'sans-serif' }}>{formatDate(each.DueDate)}</button>
                      <button type="submit" style={{ height: '30px', width: '70px', background: '#EEF2F5', color: 'grey', borderRadius: '6px', borderStyle: 'none', marginLeft: '5px',fontFamily:'sans-serif' }} onClick={() => updateState("backlog", each._id)}>Backlog</button>
                      <button type="submit" style={{ height: '30px', width: '70px', background: '#EEF2F5', color: 'grey', borderRadius: '6px', borderStyle: 'none', marginLeft: '5px',fontFamily:'sans-serif', }} onClick={() => updateState("inprogress", each._id)}>Progress</button>
                      <button type="submit" style={{ height: '30px', width: '70px', background: '#EEF2F5', color: 'grey', borderRadius: '6px', borderStyle: 'none', marginLeft: '5px',fontFamily:'sans-serif' }} onClick={() => updateState("todo", each._id)}>To-do</button></div>
                  </div>


                )) : null}
              </Container>


            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showPopup}
        onRequestClose={handleClose}
        style={customStyles}

      >

        <Model

          handleClose={handleClose} todo={todo}
        />

      </Modal>


      <Modal
        isOpen={showAddPeople}
        onRequestClose={handleCloseAddpeople}
        style={customStyles}
      >
        <Share handleCloseAddpeople={handleCloseAddpeople} />
      </Modal>


    </>
  );
}

export default Board;
