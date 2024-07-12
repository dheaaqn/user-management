import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { appRoutes } from './routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {appRoutes.map((item) => {
          return (
            <Route key={item.id} path={item.path} element={<item.component />} />
          )
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
