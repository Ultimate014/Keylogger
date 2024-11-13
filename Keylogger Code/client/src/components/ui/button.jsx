import React from "react";

export default function Button({ name, onClick, variant }) {
  return (
    <button className={`button -${variant}`} onClick={onClick}>
      {name}
    </button>
  );
}

export const KeyBtn = ({ value, special, indicate, ...props }) => {
  return (
    <div
      className={`keys ${special ? "special" : ""} ${
        indicate ? "indicate" : ""
      }`}
      {...props}
    >
      {value}
    </div>
  );
};
