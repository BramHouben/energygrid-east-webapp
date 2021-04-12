import "./index.css";
import Axios from "axios";
import ApiActions from "services/shared/api/ApiActions";
import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";

const RemotePagination = ({
  data,
  page,
  sizePerPage,
  onTableChange,
  totalSize,
}) => (
  <div>
    <PaginationProvider
      pagination={paginationFactory({
        custom: true,
        page,
        sizePerPage,
        totalSize,
      })}
    >
      {({ paginationProps, paginationTableProps }) => (
        <div>
          <div>
            <PaginationListStandalone {...paginationProps} />
          </div>
          <BootstrapTable
            remote
            keyField='hash'
            data={data}
            columns={[
              {
                dataField: "hash",
                hidden: true,
              },
              {
                dataField: "street",
                text: "street",
                sort: true,
              },
              {
                dataField: "number",
                text: "number",
                sort: true,
              },
              {
                dataField: "postcode",
                text: "postcode",
                sort: true,
              },
              {
                dataField: "region",
                text: "region",
                sort: true,
              },
              {
                dataField: "coordinates",
                text: "coordinates",
                sort: true,
              },
            ]}
            onTableChange={onTableChange}
            {...paginationTableProps}
          />
        </div>
      )}
    </PaginationProvider>
  </div>
);

export default class Housetable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      allpoints: [],
      page: 1,
      totalSize: 0,
      sizePerPage: 10,
      updatelist: this.props.updatelist,
    };
  }
  handleTableChange = async (type, { page, sizePerPage }) => {
    setTimeout(() => {
      this.fetchData(page, sizePerPage);
      this.setState(() => ({
        page,
        sizePerPage,
      }));
    }, 1000);
  };

  async fetchData(
    page = this.state.page,
    sizeperPage = this.state.sizePerPage
  ) {
    await Axios.get(ApiActions.StreetInfo, {
      params: {
        streetname: "Josephine Bakerstraat",
        page: page,
      },
    })
      .then((result) => {
        this.state.updatelist(result.data.houses);

        this.setState({
          items: result.data.houses,
          totalsize: result.data.totalStreet,
        });
      })
      .catch((result) => {
        console.log("error loading results");
      });
  }

  componentDidMount() {
    this.fetchData(this.state.page);
  }
  render() {
    let { items, sizePerPage, page, totalsize } = this.state;
    return (
      <div>
        <RemotePagination
          data={items}
          page={page}
          sizePerPage={sizePerPage}
          totalSize={totalsize}
          onTableChange={this.handleTableChange}
        />
      </div>
    );
  }
}
