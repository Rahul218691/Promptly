import { lazy } from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import GuestRoute from './routes/GuestRoute';
import PrivateRoute from './routes/PrivateRoute';

const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const FormBuilder = lazy(() => import('./pages/FormBuilder'));
const FormView = lazy(() => import('./pages/FormView'));
const Landing = lazy(() => import('./pages/Landing'));
const NotFound = lazy(() => import('./pages/NotFound'));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GuestRoute><Landing /></GuestRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/form-builder" element={<PrivateRoute><FormBuilder /></PrivateRoute>} />
          <Route path="/form/:formId" element={<PrivateRoute><FormView /></PrivateRoute>} />
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
