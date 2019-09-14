import React from "react";
import { Link } from "react-router-dom";

export default function CoffeeShopsComponent(props) {
  const { image, header, description } = props;
  return (
    <div className="col-md-4 col-sm-12 p-5">
      <img src={image} alt="Default Grey Box" className="mb-3" />
      <h3>
        <Link to={`/coffeeshops/${header}/drinks`}>{header}</Link>
      </h3>
      <p>{description}</p>
    </div>
  );
}
