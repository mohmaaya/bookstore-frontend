import React from 'react';
import './App.css';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import Navbar from './navigation/Navbar';
import AllBooksComponent from './RenderComponents/AllBooksComponent';
import PaginatedBooksComponent from './RenderComponents/PaginatedBooksComponent';

function App() {


  return (
      <>
      <Navbar />

      <Routes>
              <Route path="/" />
              <Route path="/books/*">
                  <Route path="allbooks" element={<AllBooksComponent />} />
                  <Route path="paginatedbooks" element={<PaginatedBooksComponent />} />
              </Route>
      </Routes>

    </>
  );
}

export default App;
