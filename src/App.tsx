import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { AddressList } from './components/pages/AddressList';
// import CreateAddress from './pages/CreateAddress';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<AddressList />} />
          {/* <Route path="create" element={<CreateAddress />} /> */}
          {/* Add more routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;