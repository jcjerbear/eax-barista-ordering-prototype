import React from "react";
import { Link } from "react-router-dom";

export default function CoffeeShopsComponent(props) {
  const { id, coffeeshop_name, image } = props;
  return (
    <div className="col-md-4 col-sm-12 p-5">
      <img src={image} alt="Default Grey Box" className="mb-3" />
      <h3>
        <Link to={`/coffeeshops/${id}`}>{coffeeshop_name}</Link>
      </h3>
    </div>
  );
}
