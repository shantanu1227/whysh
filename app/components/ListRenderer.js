import React from "react";
import NoDataRenderer from "./NoDataRenderer";
import PropTypes from 'prop-types';

export default function ListRenderer(props) {
  const {listLength} = props;
  if ((listLength === undefined) || listLength) {
    return props.children || <></>;
  }
  return (
    <NoDataRenderer/>
  )
}

ListRenderer.propTypes = {
  listLength: PropTypes.any
};
