import React from "react";
import "./NotFound404.css";

import { Link } from "react-router-dom";
import { NotFound404Props, useNotFound404 } from "./useNotFound404";

const NotFound404: React.FC<NotFound404Props> = (props) => {
  // eslint-disable-next-line no-empty-pattern
  const {} = useNotFound404(props);

  return (
    <div className=" newPageSection" id="MyNotfound">
      <div className="MyNotfound">
        <div className="MyNotfound-404">
          <h1>OOPS!</h1>
          <h2>404 - THE PAGE CAN'T BE FOUND</h2>
        </div>

        <Link to={"/"}> GO TO HOMEPAGE</Link>
      </div>
    </div>
  );
};

export default NotFound404;
