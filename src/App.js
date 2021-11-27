import React from "react";
import Header from "../components/Header";
import Table from "../components/Table";
import { TABLE_CONFIG, USER_COUNT_TO_FETCH } from "./constants";
import Map from "./modules/Map";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMarker: null,
      markers: [],
      initialised: false,
      showTable: false,
      tableData: [],
      tableColumns: TABLE_CONFIG,
      userCountsToFetch: USER_COUNT_TO_FETCH
    };
  }

  componentDidMount() {
    this.fetchUser().then((res) => {
      const users = res.map(this.transformUserDetails);
      this.setState({ markers: users, initialised: true });
    });
  }

  transformUserDetails = (user) => {
    const { name, location, picture, email } = user || {};
    const lat = parseFloat(location?.coordinates?.latitude, 10);
    const lng = parseFloat(location?.coordinates?.longitude, 10);
    return {
      id: email,
      name: name?.first,
      lat,
      lng,
      coordinates: { lat, lng },
      largeImage: picture.large,
      mediumImage: picture.medium,
      thumbnailImage: picture.thumbnail,
      zoom: 4
    };
  };

  fetchUser = () => {
    const { userCountsToFetch } = this.state;
    return fetch(
      `https://randomuser.me/api/?inc=location,name,picture,email&results=${userCountsToFetch}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (Array.isArray(res.results) && res.results.length) {
          return res.results;
        }
        return [];
      })
      .catch((res) => []);
  };

  handleClickMarker = (activeMarker) => {
    const tableData = [];
    tableData.push(activeMarker);
    this.setState({ activeMarker, tableData, showTable: true });
  };

  render() {
    const {
      initialised,
      markers,
      tableData,
      tableColumns,
      showTable
    } = this.state;
    if (!initialised) return <div>Loading</div>;
    return (
      <div className="App">
        <Header className="display-center">
          React Data Plotting Application
        </Header>
        <Map markers={markers} onClickMarker={this.handleClickMarker} />
        {showTable && (
          <Table
            className="margin-top-10"
            data={tableData}
            columns={tableColumns}
          />
        )}
      </div>
    );
  }
}

export default App;
