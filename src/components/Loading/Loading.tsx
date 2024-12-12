import { LoadingProps, useLoading } from "./useLoading";
import "./Loading.css";

const Loading: React.FC<LoadingProps> = (props) => {
  const { loading } = useLoading(props);
  return (
    <div className="my-loader-container">
      <div className="my-loader"> {loading}</div>
    </div>
  );
};

export default Loading;
