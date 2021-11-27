function ImageRenderer(props) {
  return (
    <div className="display-center">
      <img src={props.value} alt="profile" />
    </div>
  );
}

export default ImageRenderer;
