import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import CreateBook from './components/CreateBook';
import EditBookInfo from './components/EditBookInfo';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BookList />}></Route>
        <Route path='/:id' element={<EditBookInfo />}></Route>
        <Route path='/create' element={<CreateBook />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;