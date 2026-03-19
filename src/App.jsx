import React from 'react';
import AuthContextPro from './components/AuthContextPro';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import BookList from './components/BookList';
import Navibar from './components/Navibar';
import EditBookInfo from './components/EditBookInfo';
import CreateBook from './components/CreateBook';
import Home from './components/Home';
import BookInfo from './components/BookInfo';
import AdminPage from './components/AdminPage';

const App = () => {
  return (
    <AuthContextPro>
      <BrowserRouter>
        <Navibar />
        <Routes>
          <Route path='/' element={<BookList />}></Route>
          <Route path='/:id' element={<BookInfo />}></Route>
          <Route path='/EditBookInfo/:id' element={<EditBookInfo />}></Route>
          <Route path='/create' element={<CreateBook />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/AdminPage' element={<AdminPage />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthContextPro>

    
  );
};

export default App;