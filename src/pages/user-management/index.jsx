import React, { Component } from "react";
import { Table } from "react-bootstrap";
import Header from "components/shared/header";
import FilterHeader from "components/shared/filter-header";
import UserManagementModal from "components/shared/modal/user-management-modal";
import { getJwt } from "services/shared/cookie";
import Axios from "axios";
import { RiDeleteBin2Fill } from "react-icons/ri";
import "./index.css";
import ApiActions from "services/shared/api/ApiActions";

export default class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operators: [],
    };
  }

  async componentDidMount() {
    await this.getOperators();
  }

  async getOperators() {
    const config = {
      headers: { Authorization: `Bearer ${getJwt()}` },
    };

    Axios.get(ApiActions.GetOperator, config)
      .then((response) => {
        this.setState({
          operators: response.data,
        });
      })
      .catch(() => {
        console.log("Werkt niet");
      });
  }

  deleteOperator(uuid) {
    Axios.delete(ApiActions.DeleteOperator, {
      headers: {
        Authorization: `Bearer ${getJwt()}`,
      },
      data: {
        uuid: uuid,
      },
    })
      .then(() => {
        this.getOperators();
      })
      .catch(() => {
        console.log("Werkt niet");
      });
  }

  render() {
    let { operators } = this.state;
    console.log(operators);

    return (
      <div>
        <div className='header-wrapper'>
          <Header pageName='User management' />
          <FilterHeader />
        </div>
        <div className='management-container'>
          <Table striped bordered hover responsive='sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>E-mail</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {operators.map((object, index) => (
                <tr key={index}>
                  <td>{object.uuid}</td>
                  <td>{object.username}</td>
                  <td>{object.email}</td>
                  <td>
                    <RiDeleteBin2Fill
                      onClick={() => this.deleteOperator(object.uuid)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <UserManagementModal />
        </div>
      </div>
    );
  }
}
