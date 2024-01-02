import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/FakeAuthContext";
import { useEffect } from "react";
import PropTypes from "prop-types";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/login");
    },
    [isAuthenticated, navigate]
  );

  return isAuthenticated ? children : null;
}

ProtectedRoute.propTypes = {
  children: PropTypes.any,
};
export default ProtectedRoute;
