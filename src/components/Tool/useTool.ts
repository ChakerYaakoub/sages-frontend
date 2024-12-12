import { useNavigate } from "react-router-dom";

export interface ToolProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  haveToLogin: boolean;
}

export const useTool = (props: ToolProps) => {
  const isLoggedIn = true;
  const { haveToLogin } = props;
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (haveToLogin && !isLoggedIn) {
      navigate("/login");
    } else {
      navigate(props.route);
    }
  };
  return { ...props, handleNavigate };
};
