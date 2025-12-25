
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './screens/Home';
import About from './screens/About';
import ProductCenter from './screens/ProductCenter';
import ProductDetail from './screens/ProductDetail';
import Contact from './screens/Contact';
import Cases from './screens/Cases';
import Dashboard from './screens/Dashboard';
import Inventory from './screens/Inventory';
import ContactManagement from './screens/ContactManagement';
import ContentManagement from './screens/ContentManagement';
import Login from './screens/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/products" element={<PublicLayout><ProductCenter /></PublicLayout>} />
          <Route path="/product/:id" element={<PublicLayout><ProductDetail /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/cases" element={<PublicLayout><Cases /></PublicLayout>} />
          
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute><AdminLayout><Dashboard /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/inventory" element={<ProtectedRoute><AdminLayout><Inventory /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/contacts" element={<ProtectedRoute><AdminLayout><ContactManagement /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/content" element={<ProtectedRoute><AdminLayout><ContentManagement /></AdminLayout></ProtectedRoute>} />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
};

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
};

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full bg-paper-white dark:bg-zinc-950 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default App;
