import { Routes, Route } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import appRoute from "./Components/appRoute";
import ProtectedRoute from "./Components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture"
      }}
    >
      <Routes>
        {appRoute.map((route, index) => {
          const Page = route.Component;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                route.role ? (
                  <ProtectedRoute roleRequired={route.role}>
                    <Page />
                  </ProtectedRoute>
                ) : (
                  <Page />
                )
              }
            />
          );
        })}
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </PayPalScriptProvider>

  );
}

export default App;

