import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";

export default function Marker(props) {
  const { maps, map, position, onClick, details } = props || {};

  const createMarker = useCallback(() => {
    const marker = new maps.Marker({
      // icon: markerPoint,
      position,
      map
    });
    return marker;
  }, [maps, position, map]);

  function removeMarker(marker) {
    marker.setMap(null);
  }

  const onClickMarker = useCallback(() => {
    onClick(details);
  }, [details, onClick]);

  useEffect(() => {
    const marker = createMarker();
    maps.event.addListener(marker, "click", onClickMarker);
    return removeMarker.bind(null, marker);
  }, [createMarker, maps, onClickMarker]);

  return <div />;
}

Marker.defaultProps = {
  onClick: () => {},
  details: {}
};

Marker.propTypes = {
  position: PropTypes.object,
  map: PropTypes.object,
  maps: PropTypes.object,
  onClick: PropTypes.func,
  details: PropTypes.shape()
};
