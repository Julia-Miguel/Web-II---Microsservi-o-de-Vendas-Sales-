// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App.tsx';
import Home from './pages/Home.tsx';

// Importações dos componentes
import ListUsers from './components/users/ListUsers.tsx';
import CreateUser from './components/users/CreateUser.tsx';
import UpdateUser from './components/users/UpdateUser.tsx';
import ListEvents from './components/events/ListEvents.tsx';
import { CreateEventForm } from './components/events/CreateEventForm.tsx';
import UpdateEvent from './components/events/UpdateEvent.tsx';
import { SalesList } from './components/sales/SalesList.tsx';
import { CreateSaleForm } from './components/sales/CreateSaleForm.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/users" element={<ListUsers />} />
          <Route path="/users/create" element={<CreateUser />} />
          <Route path="/users/update/:id" element={<UpdateUser />} />
          <Route path="/events" element={<ListEvents />} />
          <Route path="/events/create" element={<CreateEventForm />} />
          <Route path="/events/update/:id" element={<UpdateEvent />} />
          <Route path="/sales" element={<SalesList />} />
          <Route path="/sales/create" element={<CreateSaleForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);