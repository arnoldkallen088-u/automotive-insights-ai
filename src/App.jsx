import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { toast } from "sonner";
import { ADMIN_USER, MOCK_CARS } from "./lib/mockData";
import { cn } from "./lib/utils";

// Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Showroom from "./components/Showroom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CarList from "./components/CarList";
import CarForm from "./components/CarForm";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial data setup
    const storedAuth = localStorage.getItem("isAuth") === "true";
    const storedCars = JSON.parse(localStorage.getItem("cars"));

    if (!storedCars) {
      localStorage.setItem("cars", JSON.stringify(MOCK_CARS));
      setCars(MOCK_CARS);
    } else {
      setCars(storedCars);
    }

    setIsAuthenticated(storedAuth);
    setLoading(false);
  }, []);

  const handleLogin = (email, password) => {
    if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuth", "true");
      toast.success("Welcome back, Admin!");
      return true;
    }
    toast.error("Invalid credentials. Please try again.");
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuth");
    toast.info("Logged out successfully");
  };

  const updateCars = (newCars) => {
    setCars(newCars);
    localStorage.setItem("cars", JSON.stringify(newCars));
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        
        <div className="flex">
          {isAuthenticated && <Sidebar />}
          
          <main className={cn("flex-1 p-6 transition-all duration-300", isAuthenticated ? "ml-64" : "")}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Showroom cars={cars} />} />
              <Route path="/login" element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />
              } />

              {/* Protected Admin Routes */}
              <Route path="/dashboard" element={
                isAuthenticated ? <Dashboard cars={cars} /> : <Navigate to="/login" />
              } />
              <Route path="/dashboard/cars" element={
                isAuthenticated ? <CarList cars={cars} setCars={updateCars} /> : <Navigate to="/login" />
              } />
              <Route path="/dashboard/cars/add" element={
                isAuthenticated ? <CarForm onSave={(car) => updateCars([...cars, car])} /> : <Navigate to="/login" />
              } />
              <Route path="/dashboard/cars/edit/:id" element={
                isAuthenticated ? <CarForm cars={cars} onSave={(car) => updateCars(cars.map(c => c.id === car.id ? car : c))} /> : <Navigate to="/login" />
              } />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;