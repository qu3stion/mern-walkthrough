//useLocation hook extracts the object(s) relevant to the url endpoint
//  sort of a useState for urls
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from './components/routes/Home';
import Items from './components/routes/Items';
import ItemCreate from './components/routes/ItemCreate';
import Item from './components/routes/Item';
import ItemEdit from './components/routes/ItemEdit';

function App() {
  //grabs object from url and displays it via the jsx on line 17
  const location = useLocation();

  return (
    <div className="App">

      <h3>{location.state ? location.state.msg: null }</h3>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/items' element={<Items />} />
        <Route path='/create-item' element={<ItemCreate />} />
        <Route path='/items/:id' element={<Item />} />
        <Route path='/items/:id/edit' element={<ItemEdit />} />

      </Routes>
    </div>
  );
}

export default App;
