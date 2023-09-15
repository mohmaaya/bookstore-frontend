import { Route, Routes} from 'react-router-dom'
import Navbar from './navigation/Navbar';
import PaginatedBooksComponent from './RenderComponents/PaginatedBooksComponent';
import AddBookComponent from './RenderComponents/AddBookComponent';
import AboutComponent from './RenderComponents/AboutComponent';

const App = () => {

  return (
      <div>
      <Navbar />
        
              <Routes>
                      <Route path="/" />
                      <Route index element={<AboutComponent />} />
                      <Route path="/books/*">
                          <Route path="about" element={<AboutComponent />} />
                          <Route path="paginatedbooks" element={<PaginatedBooksComponent />} />
                          <Route path="addbook" element={<AddBookComponent />} />
                      </Route>
              </Routes>
         
      </div>
  );
}

export default App;
