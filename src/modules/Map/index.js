import React from "react";
import GoogleMaps from "../../../components/Map";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialised: false
    };
  }

  getPointers = () => {
    return this.props.markers;
  };

  handleSaveMapConfig = (config) => {
    const { map, maps } = config || {};
    this.setState(
      {
        map,
        maps,
        initialised: true
      },
      this.handleZoomToAllPointers
    );
  };

  handleZoomToAllPointers = () => {
    const { maps, map } = this.state;
    const pointers = this.getPointers();
    if (pointers.length === 1) {
      map.setCenter(pointers[0]);
      map.setZoom(pointers[0].zoom);
    } else {
      var bounds = new maps.LatLngBounds();
      pointers.forEach((pointer) => bounds.extend(pointer));
      map.fitBounds(bounds);
    }
  };

  handleClickMarker = (details) => {
    this.props.onClickMarker(details);
  };

  renderMarkers = () => {
    const { initialised, maps, map } = this.state;
    const markers = this.getPointers();
    if (!initialised) return null;
    return markers.map((marker) => (
      <GoogleMaps.Marker
        key={`${marker.lat}_${marker.lng}`}
        maps={maps}
        map={map}
        position={marker}
        onClick={this.handleClickMarker}
        details={marker}
      />
    ));
  };

  render() {
    const { center } = this.props;
    return (
      <div className="App">
        <GoogleMaps
          center={center}
          onUpdateParent={this.handleSaveMapConfig}
          allowClickOnMap={false}
          onClickMap={this.handleClickMap}
        >
          {this.renderMarkers()}
        </GoogleMaps>
      </div>
    );
  }
}

Map.defaultProps = {
  markers: [],
  center: { lat: 51.50853, lng: -0.12574 }
};

export default Map;
