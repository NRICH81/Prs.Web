import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";

function Index() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  useEffect(() => {
    if (!user) navigate("/signin");
    else navigate("/requests");
  }, [navigate, user]);
  return null;
}

export default Index;