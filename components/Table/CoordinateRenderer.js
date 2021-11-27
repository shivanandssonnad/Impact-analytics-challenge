function CoordinateRenderer(props) {
  const { value } = props;
  const { lat, lng } = value || {};
  return (
    <div>
      <div>Latitude: {lat}</div>
      <div>Longitude: {lng}</div>
    </div>
  );
}

export default CoordinateRenderer;
