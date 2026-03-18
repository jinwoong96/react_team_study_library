import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookList from './components/BookList';
import CommentList from './components/CommentList';
import CreateBook from './components/CreateBook';
import EditBookInfo from './components/EditBookInfo';
import Home from './components/Home';
import Navibar from './components/navibar';
import SignUp from './components/SignUp';
import Login from './components/Login';


const App = () => {
  return (
    <AuthContextPro>
      <BrowserRouter>
        <Navibar />
        <Routes>
          <Route path='/BookList' element={<BookList />}></Route>
          <Route path='/:id' element={<EditBookInfo />}></Route>
          <Route path='/Create' element={<CreateBook />}></Route>
          <Route path ='/login' element={<Login />}></Route>
          <Route path ='/signup' element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthContextPro>
  );
};

export default App;