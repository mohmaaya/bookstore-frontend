import { Route, Routes} from 'react-router-dom'
import Navbar from './navigation/Navbar';
import AllBooksComponent from './RenderComponents/AllBooksComponent';
import PaginatedBooksComponent from './RenderComponents/PaginatedBooksComponent';
import AddBookComponent from './RenderComponents/AddBookComponent';

function App() {


  return (
      <div className = ""   >
      <Navbar />
        
              <Routes>
                      <Route path="/" />
                      <Route path="/books/*">
                          <Route path="allbooks" element={<AllBooksComponent />} />
                          <Route path="paginatedbooks" element={<PaginatedBooksComponent />} />
                          <Route path="addbook" element={<AddBookComponent />} />
                      </Route>
              </Routes>
         
      </div>
  );
}

export default App;
