import React from "react";
import Register from './register';
import Sidebar from "./sidebar";
import Login from './login';
import Setting from './setting';
import Model from './model';
import Analytics from './analytics';
import Board from './board';
import Logout from './logout';
import Delete from './delete';
import Share from './share';
import AddedUser from './addeduser';
import EditModel from './editmodel';
import Sharedtask from './sharedtask';
import Cardpopup from './cardpopup';
import {Routes, Route, BrowserRouter} from 'react-router-dom'; 
import handleCheck from './cardpopup';
import showShare from './cardpopup';
import showCopiedMessage from './cardpopup';
import setShowCopiedMessage from './cardpopup';
import setShowShare from './cardpopup';
import formvalue from './register';
import formValue from './model';


const App = () => {

return(
  <>

<main>
  <BrowserRouter>
  <Routes>
    <Route path ="/" element ={<Register/>}/>
    <Route path ="/register" element ={<Register/>}/>
    <Route path ="/login" element ={<Login/>}/>
    <Route path ="/analytics" element ={<Analytics/>}/>
    <Route path ="/model" element ={<Model/>}/>
    <Route path ="/board" element ={<Board  showShare={showShare} formvalue={formvalue} showCopiedMessage={showCopiedMessage} setShowCopiedMessage={setShowCopiedMessage} setShowShare={setShowShare} formValue={formValue}/>}/>
    <Route path ="/setting" element ={<Setting/>}/>
    <Route path ="/sidebar" element ={<Sidebar/>}/>
    <Route path ="/logout" element ={<Logout/>}/>
    <Route path ="/delete" element ={<Delete/>}/>
    <Route path ="/share" element ={<Share/>}/>
    <Route path ="/cardpopup" element ={<Cardpopup/>}/>
    <Route path ="/addeduser" element ={<AddedUser/>}/>
    <Route path ="/editmodel" element ={<EditModel/>}/>
    <Route path ="/sharedtask/:id" element ={<Sharedtask handleCheck={handleCheck} />}/>
    <Route path ="." element ={<h1>404 Route not found</h1>}/>
  </Routes> 
  </BrowserRouter>
  </main>

  </>
);
}

export default App; 