import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { userService } from "../../services";
import "./userManage.scss";
import ModalCreate from "./ModalCreate";
import ModalUpdate from "./ModalUpdate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import { emitter } from "../../utils/emiter";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUser: [],
      isOpenModal: false,
      isOpenModalUpdate: false,
      isOpenModalDelete: false,
      userIdForUpdateAndDelete: "",
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
  handleGetAllUser = async () => {
    let data = await userService.getAllUser("ALL");
    if (data && data.errCode === 0) {
      this.setState({
        listUser: data.userData,
      });
    }
  };
  ShowModalCreateUser = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };
  ShowModalUpdateUser = async (id) => {
    this.setState({
      isOpenModalUpdate: !this.state.isOpenModalUpdate,
    });
    emitter.emit("EVENT_UPDATE_USER", { id });
  };
  ShowModalDeleteUser = async (id) => {
    this.setState({
      isOpenModalDelete: !this.state.isOpenModalDelete,
    });
    emitter.emit("EVENT_DELETE_USER", { id });
  };
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
        <div className="text-center p-3">
          <h3 style={{ fontWeight: "700", color: "#0071ba" }}>
            Manage users hehehe
          </h3>
        </div>
        <div className="text-center" style={{ margin: "10px" }}>
          <button
            className="btn-create"
            onClick={() => this.ShowModalCreateUser()}
          >
            Add new user <i className="fas fa-user-plus"></i>
          </button>
        </div>
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
                    <tr style={{ textAlign: "center" }} key={index}>
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
                          <button
                            className="btn-update"
                            onClick={() => this.ShowModalUpdateUser(item.id)}
                          >
                            Update <i className="fas fa-user-edit"></i>
                          </button>
                          <button
                            className="btn-Delete"
                            onClick={() => this.ShowModalDeleteUser(item.id)}
                          >
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
        <ModalCreate
          isOpenModal={this.state.isOpenModal}
          ShowModalCreateUser={this.ShowModalCreateUser}
          handleGetAllUser={this.handleGetAllUser}
        />
        <ModalUpdate
          isOpenModalUpdate={this.state.isOpenModalUpdate}
          ShowModalUpdateUser={this.ShowModalUpdateUser}
          handleGetAllUser={this.handleGetAllUser}
        />
        <ModalDelete
          isOpenModalDelete={this.state.isOpenModalDelete}
          ShowModalDeleteUser={this.ShowModalDeleteUser}
          handleGetAllUser={this.handleGetAllUser}
        />
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
