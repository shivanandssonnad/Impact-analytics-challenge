import Table from "./components/Table";

export const USER_COUNT_TO_FETCH = 3;

export const TABLE_CONFIG = [
  {
    Header: "Name",
    accessor: "name",
    Cell: Table.NameRenderer
  },
  {
    Header: "Large Image",
    accessor: "largeImage",
    Cell: Table.ImageRenderer
  },
  {
    Header: "Medium Image",
    accessor: "mediumImage",
    Cell: Table.ImageRenderer
  },
  {
    Header: "Thumbnail Image",
    accessor: "thumbnailImage",
    Cell: Table.ImageRenderer
  },
  {
    Header: "Coordinates",
    accessor: "coordinates",
    Cell: Table.CoordinateRenderer
  }
];
