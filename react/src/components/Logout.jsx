import { useAuth } from "../hooks/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    logout();
    navigate('/');
  }, []);
  return <></>;
}
