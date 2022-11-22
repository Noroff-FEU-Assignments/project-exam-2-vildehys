import React from "react";
import PropTypes from "prop-types";

function InputError({ children }) {
  return <div className="error input-error">{children}</div>;
}

InputError.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InputError;
