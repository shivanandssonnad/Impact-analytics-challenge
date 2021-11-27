import React from "react";
import PropTypes from "prop-types";
import mapsApi from "google-maps-api";
import Marker from "./Marker";

const GOOGLE_MAP_API_KEY = "AIzaSyANDj4mJ2i_d0zRiNozVqbUGMgZTnDOeYI";

class GoogleMaps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: props.center,
      defaultZoom: 10
    };
  }

  componentDidMount() {
    this.initMap();
  }

  handleClickOnMap = (map) => {
    const { allowClickOnMap } = this.props;
    if (allowClickOnMap) {
      map.addListener("click", (evt) => {
        const { latLng } = evt || {};
        const position = { lat: latLng.lat(), lng: latLng.lng() };
        this.props.onClickMap(position);
      });
    }
  };

  handleCreateMap = () => {
    return mapsApi(GOOGLE_MAP_API_KEY)();
  };

  initMap = () => {
    const { center, defaultZoom } = this.state;
    this.handleCreateMap()
      .then((maps) => {
        const element = this.mapElement;
        const map = new maps.Map(element, {
          center: center,
          zoom: defaultZoom,
          streetViewControl: false
        });
        return { maps, map };
      })
      .then((config) => {
        const { maps, map } = config || {};
        this.setState({ maps, map });
        this.handleClickOnMap(map);
        this.props.onUpdateParent({ maps, map });
      });
  };

  handleRef = (element) => {
    this.mapElement = element;
  };

  render() {
    const { width, height } = this.props;
    return (
      <div ref={this.handleRef} id="map" style={{ width, height }}>
        {this.props.children}
      </div>
    );
  }
}

GoogleMaps.defaultProps = {
  onUpdateParent: () => {},
  onClickMap: () => {},
  allowClickOnMap: false,
  width: "100%",
  height: "300px",
  center: { lat: 51.50853, lng: -0.12574 }
};

GoogleMaps.propTyeps = {
  onUpdateParent: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string,
  center: PropTypes.object,
  allowClickOnMap: PropTypes.bool,
  onClickMap: PropTypes.func
};

GoogleMaps.Marker = Marker;

export default GoogleMaps;
