import React from 'react';
import AuthContextPro from './components/AuthContextPro';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import BookList from './components/BookList';
import Navibar from './components/navibar';
import EditBookInfo from './components/EditBookInfo';
import CreateBook from './components/CreateBook';
import Home from './components/Home';
import AdminPage from './components/AdminPage';

const App = () => {
  return (
    <AuthContextPro>
      <BrowserRouter>
        <Navibar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/booklist' element={<BookList />}></Route>
          <Route path='/:id' element={<EditBookInfo />}></Route>
          <Route path='/create' element={<CreateBook />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/adminpage' element={<AdminPage />}></Route>
          




        </Routes>
      </BrowserRouter>
    </AuthContextPro>

    
  );
};

export default App;