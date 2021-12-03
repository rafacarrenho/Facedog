import React from "react";
import { UserContext } from "../../UserContext";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = (props: any) => {
  const { login } = React.useContext(UserContext);

  if (login) return <Route {...props} />;

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
