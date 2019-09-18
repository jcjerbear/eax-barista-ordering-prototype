import React from "react";
import moment from "moment";

export default function OrderItem(props) {
  const { textAsset, onDeleteListItem } = props;
  return (
    <div className="col-12 mb-3 border">
      <div className="row">
        <div className="col-11">
          <p className="mt-3">
            {textAsset.customer} ordered ({textAsset.drinks}) and will pick up
            at {moment(textAsset.pickup_time).format("HH:mm:ss")}!
          </p>
        </div>
        {/* <div className="col-1">
          <button
            type="button"
            className="close py-2"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => onDeleteListItem(textAsset)}
          >
            <div aria-hidden="true">&times;</div>
          </button>
        </div> */}
      </div>
    </div>
  );
}
