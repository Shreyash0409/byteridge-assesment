import React from "react";

class DataTable extends React.Component {
  render() {
    const user = this.props;
    return (
      <div>
        <p>{user.firstName}</p>
        <p>{user.lastName}</p>
        <p>{user.role}</p>
        <p>{user.id}</p>
      </div>
    );
  }
}
export default DataTable;
