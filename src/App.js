import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { proposicaoPorTema } from './data/proposicaoPorTema';

import MyDrawer from './components/MyDrawer';
import MainScreen from './pages/MainScreen';
import ThemeScreen from './pages/ThemeScreen';
import GroupScreen from './pages/GroupScreen';
import Abstract from './pages/Abstract';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MyDrawer>
          <Routes>
            <Route path='/' element={<MainScreen />} />
            <Route path='temas' element={<ThemeScreen proposicaoPorTema={proposicaoPorTema} />} />
            <Route path='grupos' element={<GroupScreen />} />
            <Route path='ementas' element={<Abstract />} />
          </Routes>
        </MyDrawer>
      </BrowserRouter>
    </div>
  );
}

export default App;
