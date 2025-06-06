import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { AddressList } from './components/pages/AddressList';
import { AddressForm } from './components/pages/AddressForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<AddressList />} />
          <Route path="create" element={<AddressForm />} />
          <Route path="edit/:id" element={<AddressForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;