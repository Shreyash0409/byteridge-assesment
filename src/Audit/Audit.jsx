import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../_actions";
import { Navbar, Nav } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import moment from "moment";
import "./Audit.css";

class Auditpage extends React.Component {
  state = {
    timeFormat: "12",
  };
  componentDidMount() {
    this.props.getUsers();
  }
  handleDeleteUser(id) {
    return (e) => this.props.deleteUser(id);
  }

  handleDropdownChange = (e) => {
    this.setState({ timeFormat: e.target.value });
  };

  render() {
    const { user, users } = this.props;
    const { timeFormat } = this.state;

    //Logic for storing the data in the products array to use in the react-bootstrap-table
    let products = [];
    users.items &&
      users.items.map((userData) => {
        // console.log("user data is", userData);
        products.push({
          id: userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: userData.role,
          date: moment(userData.createdDate, "YYYYMMDD").format(
            "Do / MM / YYYY"
          ),
          time:
            timeFormat === "24"
              ? moment(userData.createdDate, "h:mm:ss a").format("HH:mm:ss")
              : moment(userData.createdDate, "h:mm:ss a").format("hh:mm:ss A"),
        });
      });

    //Creating a checkbox for the table
    const selectRow = {
      mode: "checkbox",
      bgColor: "rgb(238, 193, 213)",
    };

    return (
      <div>
        <Navbar bg="dark" va riant="dark">
          <Navbar.Brand></Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link href="#features">Auditor</Nav.Link>
            <Nav.Link>
              <Link to="/login">Logout</Link>
            </Nav.Link>
          </Nav>
        </Navbar>
        <div className="col-md-8 col-lg-12">
          <h1>Hi {user.firstName}!</h1>
          <p>You're logged in with React!!</p>
          <h3>All login audit :</h3>
          {users.loading && <em>Loading users...</em>}
          {users.error && (
            <span className="text-danger">ERROR: {users.error}</span>
          )}

          {/* For time format - A dropdown menu */}
          <span className="spn">Time Format: </span>
          <select
            className="btn btn-md btn-info"
            onChange={this.handleDropdownChange}
          >
            <option value="12">12</option>
            <option value="24">24</option>
          </select>

          {/* Use a Data Table to display the data along with pagination, sorting and filtering/search  */}
          <BootstrapTable
            data={products}
            pagination
            selectRow={selectRow}
            deleteRow={true}
            search={true}
            options={{
              onDeleteRow: this.handleDeleteUser,
            }}
          >
            <TableHeaderColumn width="370" dataField="id" isKey dataSort={true}>
              ID
            </TableHeaderColumn>
            <TableHeaderColumn
              width="170"
              dataField="firstName"
              dataSort={true}
            >
              First Name
            </TableHeaderColumn>
            <TableHeaderColumn width="180" dataField="lastName" dataSort={true}>
              Last Name
            </TableHeaderColumn>
            <TableHeaderColumn width="180" dataField="role" dataSort={true}>
              Role
            </TableHeaderColumn>
            <TableHeaderColumn width="180" dataField="date" dataSort={true}>
              Date
            </TableHeaderColumn>
            <TableHeaderColumn dataField="time" dataSort={true}>
              Time
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete,
};

const connectedAuditPage = connect(mapState, actionCreators)(Auditpage);
export { connectedAuditPage as Auditpage };
