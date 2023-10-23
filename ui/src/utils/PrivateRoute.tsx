import React from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  component: React.ComponentType<any>;
  [key: string]: any;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const isLoggedIn = localStorage.getItem("user") !== null;

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Component {...rest} />
    </div>
  );
};

export default PrivateRoute;
