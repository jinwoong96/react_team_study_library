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
          <Route path='/BookReview' element={<BookReview />}></Route>
          <Route path='/CommentList' element={<CommentList />}></Route>
          <Route path='/CreateBook' element={<CreateBook />}></Route>
          <Route path='/CreateComment' element={<CreateComment />}></Route>
          <Route path='/EditBookinfo' element={<EditBookInfo />}></Route>
          <Route path='/' element={<Home />}></Route>
          <Route path ='/login' element={<Login />}></Route>
          <Route path ='/signup' element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthContextPro>
  );
};

export default App;