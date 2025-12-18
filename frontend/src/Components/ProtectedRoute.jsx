// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, roleRequired }) => {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role"); 

  
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   if (roleRequired && roleRequired !== role) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;


import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roleRequired, publicRoute }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ✅ PUBLIC ROUTES → no auth, no role check
  if (publicRoute) {
    return children;
  }

  // 🔒 AUTH REQUIRED
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 🔒 ROLE CHECK
  if (roleRequired && roleRequired !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
