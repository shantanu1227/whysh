import React from "react";
import NoDataRenderer from "./NoDataRenderer";
import PropTypes from 'prop-types';

export default function ListRenderer(props) {
  const {listLength} = props;
  return props.children;
}

ListRenderer.propTypes = {
  listLength: PropTypes.any
};
