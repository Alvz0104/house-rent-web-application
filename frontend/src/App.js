import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import NavigationBar from
"./components/Navbar";

import ProtectedRoute from
"./components/ProtectedRoute";

import Home from "./pages/Home";

import Login from "./pages/Login";

import Register from "./pages/Register";

import AddProperty from
"./pages/AddProperty";

import Properties from
"./pages/Properties";

import PropertyDetails from
"./pages/PropertyDetails";

import MyBookings from
"./pages/MyBookings";

import OwnerDashboard from
"./pages/OwnerDashboard";

import Chat from "./pages/Chat";


function App() {

  return (

    <BrowserRouter>

      <NavigationBar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/properties"
          element={<Properties />}
        />

        <Route
          path="/property/:id"
          element={<PropertyDetails />}
        />

        <Route
          path="/add-property"
          element={
            <ProtectedRoute>

              <AddProperty />

            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>

              <MyBookings />

            </ProtectedRoute>
          }
        />

        <Route
          path="/owner-dashboard"
          element={
            <ProtectedRoute>

              <OwnerDashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/chat/:receiverId"
          element={
            <ProtectedRoute>

              <Chat />

            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;