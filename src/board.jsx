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


  const handleCheck = (checkStatus, id, taskIndex,taskLength) => {
    
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


    if (checkStatus === true && checkcount<= taskLength) {
      setCheckcount(checkcount + 1);
      return
    }
    if (checkStatus === false) {
      setCheckcount(checkcount - 1);
      return
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
        <div style={{ borderRightStyle: 'inset', width: '12.5rem', borderRight: '.125rem solid #EDF5FE' }}><Sidebar /></div>
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '1.875rem', marginTop: '1.25rem' }}>


            <div style={{ display: 'flex', flexDirection: 'column'}}>
              <div>
            {token && (
                <div><h1 style={{ color: 'black',marginLeft:'.875rem',fontFamily:'sans-serif'}}>Welcome!{userData.Name}</h1></div>
              )}
            </div>
              <div style={{ display: 'flex', flexDirection: 'row',marginTop:'1.875rem' }}>

                <div style={{ fontSize: '1.5625rem', fontWeight: 'bold',fontFamily:'sans-serif',marginLeft:'1.25rem' }}>Board</div>

                <div style={{ marginLeft: '.9375rem',marginTop:'.375rem' }}><FaUser style={{ fontSize: '.9375rem', color: '#707070' }} /></div>
                <div style={{ cursor: 'pointer', color: '#707070', marginLeft: '.4375rem',marginTop:'.3125rem',fontFamily:'sans-serif' }} onClick={handleOpenAddpeople}>Add People</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{position:'absolute',marginLeft:'57%',color:'#707070'}}>{formattedDate}</div>
              <div style={{ position: 'absolute', marginLeft: '57%', marginTop: '3.75rem' }}>
                <select className="select" value={period} onChange={handlePeriodChange} style={{borderStyle:'none'}}>This week
                  <option value="today">Today</option>
                  <option value="week">This week</option>
                  <option value="month">This month</option>
                </select>
              </div>
            </div></div>
          <div style={{ display: 'flex', flexDirection: 'row', marginTop: '2.5rem', marginLeft: '3.125rem' }}>
            <div style={{ background: '#EEF2F5', height: '36.25rem', width: '21.875rem', overflowY: 'scroll',borderRadius:'.625rem' }}>
             <div style={{display:'flex',flexDirection:'row'}}>
              <div style={{ marginTop: '1.25rem', marginLeft: '1.25rem',fontWeight:'bold' }}>Backlog</div>
              <div onClick={cardCollapsebacklog} style={{position:'absolute', marginLeft:'21%',marginTop:'1.25rem'}}><img src="minmax.png" style={{ height: '1.25rem', width: '1.25rem'}}
                {...cardCollapse ? 'Expand' : 'Collapse'} /> </div>
              </div>

              <Container style={{}}>
                {backlog.length ? backlog.map((each, index) => (
                  <div key={each._id} style={{ height: '18.75rem', width: '18.125rem', background: 'white', borderRadius: '.625rem', paddingLeft: '.625rem', paddingTop: '1.25rem', overflowY: 'scroll', border: '.1875rem solid #EDF5FE', marginTop: '1.25rem', marginLeft: '1.25rem' }}>
                    <div style={{ fontSize: '1.25rem', cursor: 'pointer', color: 'black', float: 'right', paddingRight: '.625rem',marginBottom:'.625rem' }} onClick={() => handleCardPopup(each._id)}>...</div>
                    {visiblePopupId === each._id && (
                      <div style={{ marginLeft: '16%', marginTop: '3%', position: 'absolute' }}>
                        <Cardpopup id={each._id} fetchTasks={fetchTasks} period={period}/>
                      </div>
                    )}

                    <div style={{display:'flex', flexDirection:'row'}}>
                     
                    <div
                        style={{
                          height: '.625rem',
                          width: '.625rem',
                          background: getColorByPriority(each.Priority),
                          borderRadius: '1.25rem',
                          borderStyle: 'none',
                          marginTop: '.375rem',
                          top: '10%',
                         
                          
                        }}></div><div style={{marginLeft:'.625rem'}}>{each.Priority}</div>
                        {each.AssignToEmail && (
                        <div style={{height:'2.5rem',width:'2.5rem',borderRadius:'1.25rem',background:'lightpink',borderStyle:'none',marginLeft:'7.5rem',textAlign:'center',position:'absolute'}}><p>{(each.AssignToEmail).slice(0,2).toUpperCase()}</p></div>
                        )}
                        </div>
                    <div><h2>{each.Title}</h2></div>
                    <div onClick={cardCollapsebacklog} style={{ cursor: 'pointer', float: 'right',height:'1.5625rem',width:'1.5625rem',background:'#EEECEC',marginRight:'.625rem',borderRadius:'.375rem' }}>
        {cardCollapse ? <FaChevronUp style={{ height: '.9375rem', width: '.9375rem',marginLeft:'.3125rem',marginTop:'.3125rem',color:'grey' }} /> : <FaChevronDown style={{ height: '.9375rem', width: '.9375rem',marginLeft:'.3125rem',color:'grey',marginTop:'.3125rem' }} />}
      </div>

                    <div className='check' style={{fontSize:'1.125rem',fontWeight:'bold',fontFamily:'sans-serif'}}>Checklist({checkcount}/{each.Tasks.length})</div>


                    {!cardCollapse &&
                      <div>
                        {each.Tasks.map((task, taskIndex) => (
                          <div key={task._id} style={{ display: 'flex', flexDirection: 'row', marginTop: '.625rem', height: '1.875rem', width: '12.5rem', borderRadius: '.625rem', border: '.125rem solid #EDF5FE' }}>
                            <div>
                              <input
                                type="checkbox"
                                style={{ marginLeft: '.625rem', background: '#17A2B8', height: '.9375rem', width: '.9375rem', borderRadius: '.625rem',marginTop:'.4375rem' }}
                                onChange={(e) => handleCheck(e.target.checked, each._id, taskIndex,each.Tasks.length)}
                                checked={task.status}
                              /></div>
                            <div style={{ height: '1.25rem', width: '9.375rem', background: 'white', borderColor: 'black', marginTop:'.3125rem',marginLeft:'.3125rem' }}>{task.task} - {task.status}</div></div>
                    
                        ))}
                      </div>}
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '15%' }}>
                      <button type="button" style={{ height: '1.875rem', width: '3.75rem', borderRadius: '.5rem', background: '#CF3636', color: 'white', borderStyle: 'none',fontFamily:'sans-serif' }}>{formatDate(each.DueDate)}</button>
                      <button type="submit" style={{ height: '1.875rem', width: '4.375rem', background: '#EEF2F5', color: 'grey', borderRadius: '.375rem', borderStyle: 'none', marginLeft: '.3125rem',fontFamily:'sans-serif' }} onClick={() => updateState("todo", each._id)}>To-do</button>
                      <button type="submit" style={{ height: '1.875rem', width: '4.375rem', background: '#EEF2F5', color: 'grey', borderRadius: '.375rem', borderStyle: 'none', marginLeft: '.3125rem',fontFamily:'sans-serif' }} onClick={() => updateState("inprogress", each._id)}>Progress</button>
                      <button type="submit" style={{ height: '1.875rem', width: '4.375rem', background: '#EEF2F5', color: 'grey', borderRadius: '.375rem', borderStyle: 'none', marginLeft: '.3125rem',fontFamily:'sans-serif' }} onClick={() => updateState("done", each._id)}>Done</button></div>
                  </div>


                )) : null}
              </Container>


            </div>
            <div style={{ background: '#EEF2F5', height: '36.25rem', width: '21.875rem', marginLeft: '1.5625rem', overflowY: 'scroll', display: 'flex', flexDirection: 'column',borderRadius:'.625rem'  }}> 
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ marginLeft: '1.25rem', marginTop: '1.25rem',fontWeight:'bold' }}>To-do</div>
                <div style={{ marginLeft: '70%' }} onClick={cardCollapsetodo}><img src="minmax.png" style={{ height: '1.25rem', width: '1.25rem', marginTop: '1.25rem' }}   
                {...cardCollapse2 ? 'Expand' : 'Collapse'}/></div>

                <div onClick={handleOpen} style={{ position: 'absolute', fontSize: '1.875rem', marginLeft: '18%', cursor: 'pointer', marginTop: '.9375rem' }}>+</div>
              </div>
              <Container style={{}}>
                {todo.length ? todo.map((each, index) => (
                  <div key={each._id} style={{ height: '18.75rem', width: '18.125rem', background: 'white', borderRadius: '.625rem', paddingLeft: '.625rem', overflowY: 'scroll', border: '.125rem solid #EDF5FE', marginTop: '1.25rem', marginLeft: '1.75rem' }}>
                    <div style={{ fontSize: '1.25rem', cursor: 'pointer', color: 'black', float: 'right', paddingRight: '.625rem' }} onClick={() => handleCardPopup(each._id)}>...</div>
                    {visiblePopupId === each._id && (
                      <div style={{ marginLeft: '16%', marginTop: '3%', position: 'absolute' }}>
                        <Cardpopup id={each._id} fetchTasks={fetchTasks} period={period}/>
                      </div>
                    )}
                     <div style={{display:'flex', flexDirection:'row'}}>
                     
                     <div
                         style={{
                           height: '.625rem',
                           width: '.625rem',
                           background: getColorByPriority(each.Priority),
                           borderRadius: '1.25rem',
                           borderStyle: 'none',
                           marginTop: '.9375rem',
                          
                          
                           
                         }}></div><div style={{marginLeft:'.625rem',marginTop:'.625rem'}}>{each.Priority}</div>
                         {each.AssignToEmail && (
                         <div style={{height:'2.5rem',width:'2.5rem',borderRadius:'1.25rem',background:'lightpink',borderStyle:'none',marginLeft:'1.25rem',textAlign:'center',marginTop:'.625rem'}}><p>{(each.AssignToEmail).slice(0,2).toUpperCase()}</p></div>
                         )}
                         </div>
                    <div><h2>{each.Title}</h2></div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <div className='check' style={{fontSize:'1.125rem',fontWeight:'bold',fontFamily:'sans-serif'}}>Checklist({checkcount}/{each.Tasks.length})</div>
                      <div onClick={cardCollapsetodo} style={{ cursor: 'pointer', float: 'right',height:'1.5625rem',width:'1.5625rem',background:'#EEECEC',borderRadius:'.375rem',display:'flex',marginLeft:'40%' }}>
        {cardCollapse2 ? <FaChevronUp style={{ height: '.9375rem', width: '.9375rem',marginLeft:'.3125rem',marginTop:'.3125rem',color:'grey' }} /> : <FaChevronDown style={{ height: '.9375rem', width: '.9375rem',marginLeft:'.3125rem',marginTop:'.3125rem',color:'grey'}} />}
      </div>
                    </div>
                   

                    {!cardCollapse2 &&
                      <div>
                        {each.Tasks.map((task, taskIndex) => (
                          <div key={task._id} style={{ display: 'flex', flexDirection: 'row', marginTop: '.625rem', height: '1.875rem', width: '12.5rem', borderRadius: '.625rem', border: '.125rem solid #EDF5FE' }}>
                            <div><input type="checkbox"
                              style={{ marginLeft: '.625rem', background: '#17A2B8', height: '.9375rem', width: '.9375rem', borderRadius: '.625rem',marginTop:'.4375rem' }}
                              onChange={(e) => handleCheck(e.target.checked, each._id, taskIndex,each.Tasks.length)}
                              checked={task.status}>
                            </input></div>
                            <div style={{ height: '1.25rem', width: '9.375rem', background: 'white', borderColor: 'black',marginTop:'.3125rem',marginLeft:'.3125rem'}}>{task.task} - {task.status}</div></div>
                      
                        ))}
                      </div>}
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '15%' }}>
                      <button type="button" style={{ height: '1.875rem', width: '3.75rem', borderRadius: '.5rem', background: '#CF3636', color: 'white', borderStyle: 'none',fontFamily:'sans-serif' }}>{formatDate(each.DueDate)}</button>
                      <button type="submit" style={{ height: '1.875rem', width: '4.375rem', background: '#EEF2F5', color: 'grey', borderRadius: '.375rem', borderStyle: 'none', marginLeft: '.3125rem',fontFamily:'sans-serif' }} onClick={() => updateState("backlog", each._id)}>Backlog</button>
                      <button type="submit" style={{ height: '1.875rem', width: '4.375rem', background: '#EEF2F5', color: 'grey', borderRadius: '.375rem', borderStyle: 'none', marginLeft: '.3125rem',fontFamily:'sans-serif' }} onClick={() => updateState("inprogress", each._id)}>Progress</button>
                      <button type="submit" style={{ height: '1.875rem', width: '4.375rem', background: '#EEF2F5', color: 'grey', borderRadius: '.375rem', borderStyle: 'none', marginLeft: '.3125rem',fontFamily:'sans-serif' }} onClick={() => updateState("done", each._id)}>Done</button></div>
                  </div>


                )) : null}
              </Container>
            </div>
            <div style={{ background: '#EEF2F5', height: '36.25rem', width: '21.875rem', marginLeft: '1.5625rem', overflowY: 'scroll',borderRadius:'.625rem'}}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ marginLeft: '1.25rem', marginTop: '1.25rem',fontWeight:'bold' }}>In-progress</div>
                <div style={{ marginLeft: '60%', marginTop: '1.25rem' }} onClick={cardCollapseprogress}><img src="minmax.png" style={{ height: '1.25rem', width: '1.25rem' }}  
                {...cardCollapse3 ? 'Expand' : 'Collapse'} /></div>
              </div>

              <Container style={{}}>
                {inprogress.length ? inprogress.map((each, index) => (
                  <div key={each._id} data={each} style={{ height: '18.75rem', width: '18.125rem', background: 'white', borderRadius: '.625rem', paddingLeft: '.625rem', paddingTop: '.625rem', overflowY: 'hidden', marginTop: '1.25rem', marginLeft: '1.75rem' }}>
                    <div style={{ fontSize: '1.25rem', cursor: 'pointer', color: 'black', float: 'right', paddingRight: '.625rem' }} onClick={() => handleCardPopup(each._id)}>...</div>
                    {visiblePopupId === each._id && (
                      <div style={{ marginLeft: '16%', marginTop: '3%', position: 'absolute' }}>
                        <Cardpopup id={each._id} fetchTasks={fetchTasks} period={period}/>
                      </div>
                    )}

                <div style={{display:'flex', flexDirection:'row'}}>
                     
                     <div
                         style={{
                           height: '.625rem',
                           width: '.625rem',
                           background: getColorByPriority(each.Priority),
                           borderRadius: '1.25rem',
                           borderStyle: 'none',
                           marginTop: '.375rem',
                           top: '10%',
                          
                           
                         }}></div><div style={{marginLeft:'.625rem'}}>{each.Priority}</div>
                         {each.AssignToEmail && (
                         <div style={{height:'2.5rem',width:'2.5rem',borderRadius:'1.25rem',background:'lightpink',borderStyle:'none',marginLeft:'1.25rem',textAlign:'center'}}><p>{(each.AssignToEmail).slice(0,2)}</p></div>
                         )}
                         </div>
                    <div><h2>{each.Title}</h2></div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <div className='check' style={{fontSize:'1.125rem',fontWeight:'bold',fontFamily:'sans-serif'}}>Checklist({checkcount}/{each.Tasks.length})</div>
                   
                <div onClick={cardCollapseprogress} style={{ cursor: 'pointer', float: 'right',height:'1.5625rem',width:'1.5625rem',background:'#EEECEC',borderRadius:'.375rem',display:'flex',marginLeft:'40%' }}>
                        {cardCollapse3 ? <FaChevronUp style={{ height: '.9375rem', width: '.9375rem',marginLeft:'.3125rem',marginTop:'.3125rem',color:'grey' }} /> : <FaChevronDown style={{ height: '.9375rem', width: '.9375rem',marginLeft:'.3125rem',marginTop:'.3125rem',color:'grey'}} />}
                      </div>

                    </div>
                    {!cardCollapse3 &&
                      <div>
                        {each.Tasks.map((task, taskIndex) => (
                          <div key={task._id} style={{ display: 'flex', flexDirection: 'row', marginTop: '.625rem', height: '1.875rem', width: '12.5rem', borderRadius: '.625rem', border: '.125rem solid #EDF5FE' }}>
                            <div><input type="checkbox"
                              style={{ marginLeft: '.625rem', background: '#17A2B8', height: '.9375rem', width: '.9375rem', borderRadius: '.625rem',marginTop:'.375rem' }}
                              onChange={(e) => handleCheck(e.target.checked, each._id,taskIndex,each.Tasks.length)}
                              checked={task.status}>
                            
                            </input></div>
                            <div style={{ height: '1.25rem', width: '9.375rem', background: 'white', borderColor: 'black',marginTop:'.3125rem',marginLeft:'.3125rem' }}>{task.task} - {task.status}</div></div>
                       
                        ))}
                      </div>}
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10%' }}>
                      <button type="button" style={{ height: '1.875rem', width: '3.75rem', borderRadius: '.5rem', background: '#CF3636', color: 'white', borderStyle: 'none' }}>{formatDate(each.DueDate)}</button>
                      <button type="submit" style={{ height: '1.875rem', width: '4.375rem', background: '#EEF2F5', color: 'grey', borderRadius: '.375rem', borderStyle: 'none', marginLeft: '.3125rem',fontFamily:'sans-serif' }} onClick={() => updateState("backlog", each._id)}>Backlog</button>
                      <button type="submit" style={{ height: '1.875rem', width: '4.375rem', background: '#EEF2F5', color: 'grey', borderRadius: '.375rem', borderStyle: 'none', marginLeft: '.3125rem',fontFamily:'sans-serif' }} onClick={() => updateState("todo", each._id)}>To-do</button>
                      <button type="submit" style={{ height: '1.875rem', width: '4.375rem', background: '#EEF2F5', color: 'grey', borderRadius: '.375rem', borderStyle: 'none', marginLeft: '.3125rem',fontFamily:'sans-serif' }} onClick={() => updateState("done", each._id)}>Done</button></div>
                  </div>


                )) : null}
              </Container>
            </div>
            <div style={{ background: '#EEF2F5', height: '36.5625rem', width: '21.875rem', marginLeft: '1.5625rem', overflowY: 'scroll',borderRadius:'.625rem',borderBottomLeftRadius:'.625rem' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ marginLeft: '1.25rem', marginTop: '1.25rem',fontWeight:'bold' }}>Done</div>
                <div style={{ marginLeft: '60%', marginTop: '1.25rem' }} onClick={cardCollapsedone} ><img src="minmax.png" style={{ height: '1.25rem', width: '1.25rem' }}   
                {...cardCollapse4 ? 'Expand' : 'Collapse'} /></div>
              </div>
              <Container style={{}}>
                {done.length ? done.map((each, index) => (
                  <div key={each._id} style={{ height: '18.75rem', width: '18.125rem', background: 'white', borderRadius: '.625rem', paddingLeft: '.625rem', paddingTop: '.625rem', overflowY: 'hidden', border: '.125rem solid #EDF5FE', marginTop: '1.25rem', marginLeft: '1.875rem' }}>
                    <div style={{ fontSize: '1.25rem', cursor: 'pointer', color: 'black', float: 'right', paddingRight: '.625rem' }} onClick={() => handleCardPopup(each._id)}>...</div>
                    {visiblePopupId === each._id && (
                      <div style={{ marginLeft: '16%', marginTop: '3%', position: 'absolute' }}>
                        <Cardpopup id={each._id} fetchTasks={fetchTasks} period={period}/>
                      </div>
                    )}
                   <div style={{display:'flex', flexDirection:'row'}}>
                     
                     <div
                         style={{
                           height: '.625rem',
                           width: '.625rem',
                           background: getColorByPriority(each.Priority),
                           borderRadius: '1.25rem',
                           borderStyle: 'none',
                           marginTop: '.375rem',
                           top: '10%',
                          
                           
                         }}></div><div style={{marginLeft:'.625rem'}}>{each.Priority}</div>
                         {each.AssignToEmail && (
                         <div style={{height:'2.5rem',width:'2.5rem',borderRadius:'1.25rem',background:'lightpink',borderStyle:'none',marginLeft:'1.25rem'}}>{(each.AssignToEmail).slice(0,2).toUppercase()}</div>
                         )}
                         </div>
                    <div><h2>{each.Title}</h2></div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <div className='check' style={{fontSize:'1.125rem',fontWeight:'bold',fontFamily:'sans-serif'}}>Checklist({checkcount}/{each.Tasks.length})</div>
                        
              <div onClick={cardCollapsedone} style={{ cursor: 'pointer', float: 'right',height:'1.5625rem',width:'1.5625rem',background:'#EEECEC',borderRadius:'.375rem',display:'flex',marginLeft:'40%' }}>
                                      {cardCollapse4 ? <FaChevronUp style={{ height: '.9375rem', width: '.9375rem',marginLeft:'.3125rem',marginTop:'.3125rem',color:'grey' }} /> : <FaChevronDown style={{ height: '.9375rem', width: '.9375rem',marginLeft:'.3125rem',marginTop:'.3125rem',color:'grey'}} />}
                                    </div>

                    </div>

                    {!cardCollapse4 &&
                      <div>
                        {each.Tasks.map((task, taskIndex) => (
                          <div key={task._id} style={{ display: 'flex', flexDirection: 'row', marginTop: '.625rem', height: '1.875rem', width: '12.5rem', borderRadius: '.625rem', border: '.125rem solid #EDF5FE' }}>
                            <div><input type="checkbox"
                              style={{ marginLeft: '.5625rem', background: '#17A2B8', height: '.9375rem', width: '.9375rem', borderRadius: '.625rem',marginTop:'.5rem' }}
                              onChange={(e) => handleCheck(e.target.checked, each._id, taskIndex,each.Tasks.length)}
                              checked={task.status}>
                            
                            </input></div>
                            <div style={{ height: '1.25rem', width: '9.375rem', background: 'white', borderColor: 'black',marginTop:'.3125rem',marginLeft:'.5rem' }}>{task.task} - {task.status}</div></div>
                    
                        ))}
                      </div>}
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10%' }}>
                      <button type="button" style={{ height: '1.875rem', width: '3.75rem', borderRadius: '.5rem', background: '#63C05B', color: 'white', borderStyle: 'none',fontFamily:'sans-serif' }}>{formatDate(each.DueDate)}</button>
                      <button type="submit" style={{ height: '1.875rem', width: '4.375rem', background: '#EEF2F5', color: 'grey', borderRadius: '.375rem', borderStyle: 'none', marginLeft: '.3125rem',fontFamily:'sans-serif' }} onClick={() => updateState("backlog", each._id)}>Backlog</button>
                      <button type="submit" style={{ height: '1.875rem', width: '4.375rem', background: '#EEF2F5', color: 'grey', borderRadius: '.375rem', borderStyle: 'none', marginLeft: '.3125rem',fontFamily:'sans-serif', }} onClick={() => updateState("inprogress", each._id)}>Progress</button>
                      <button type="submit" style={{ height: '1.875rem', width: '4.375rem', background: '#EEF2F5', color: 'grey', borderRadius: '.375rem', borderStyle: 'none', marginLeft: '.3125rem',fontFamily:'sans-serif' }} onClick={() => updateState("todo", each._id)}>To-do</button></div>
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
