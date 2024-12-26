import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { userService } from "../../services";
import "./userManage.scss";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUser: [],
    };
  }
  async componentDidMount() {
    let data = await userService.getAllUser("ALL");
    if (data && data.errCode === 0) {
      this.setState({
        listUser: data.userData,
      });
    }
  }
  /* life cycle
    Run component
    1. Run constructor - init state (khoi tao state)
    2.did mount : gan gia tri cho state
    3. render
    *
   */
  render() {
    return (
      <>
        <div className="text-center p-3">Manage users hehehe</div>;
        <div className="container">
          <table className="table">
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th scope="col">Id</th>
                <th scope="col">FirstName</th>
                <th scope="col">LastName</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Gender</th>
                <th scope="col">PhoneNumber</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              {this.state.listUser &&
                this.state.listUser.length > 0 &&
                this.state.listUser.map((item, index) => {
                  return (
                    <tr style={{ textAlign: "center" }}>
                      <th scope="row">{item.id}</th>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.email}</td>
                      <td>{item.address}</td>
                      <td>{item.gender === 1 ? "Male" : "Female"}</td>
                      <td>{item.phoneNumber}</td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            gap: "15px",
                            justifyContent: "center",
                          }}
                        >
                          <button className="btn-update">
                            Update <i className="fas fa-user-edit"></i>
                          </button>
                          <button className="btn-Delete">
                            Delete <i className="fas fa-user-times"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
