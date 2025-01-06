import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { userService } from "../../../services";
import "../userManage.scss";
// import ModalUpdate from "./ModalUpdate";
import ModalDelete from "../ModalDelete";
import { toast } from "react-toastify";
import { emitter } from "../../../utils/emiter";
import * as actions from "../../../store/actions";

class TableUserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUserRedux: [],
      isOpenModalUpdate: false,
      isOpenModalDelete: false,
    };
  }
  async componentDidMount() {
    await this.props.getAllUserRedux("ALL");
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listUserRedux !== this.props.listUserRedux) {
      this.setState({
        listUserRedux: this.props.listUserRedux,
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

  ShowModalUpdateUser = async (user) => {
    this.props.handleUpdateUserRedux(user);
  };
  ShowModalDeleteUser = async (id) => {
    this.props.deleteUserRedux(id);
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
        <div className="container" style={{ marginTop: "100px" }}>
          <table className="table">
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th scope="col">Id</th>
                <th scope="col">
                  <FormattedMessage id="system.user-manage.firstName" />
                </th>
                <th scope="col">
                  <FormattedMessage id="system.user-manage.lastName" />
                </th>
                <th scope="col">
                  <FormattedMessage id="system.user-manage.email" />
                </th>
                <th scope="col">
                  <FormattedMessage id="system.user-manage.address" />
                </th>
                <th scope="col">
                  <FormattedMessage id="system.user-manage.gender" />
                </th>
                <th scope="col">
                  <FormattedMessage id="system.user-manage.mobile" />
                </th>
                <th scope="col">
                  <FormattedMessage id="system.user-manage.feature" />
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.listUserRedux &&
                this.state.listUserRedux.length > 0 &&
                this.state.listUserRedux.map((item, index) => {
                  return (
                    <tr style={{ textAlign: "center" }} key={index}>
                      <th scope="row">{item.id}</th>
                      <td>{item.lastName}</td>
                      <td>{item.firstName}</td>
                      <td>{item.email}</td>
                      <td>{item.address}</td>
                      <td>
                        {item.gender === "M" ? (
                          <FormattedMessage id="system.user-manage.male" />
                        ) : (
                          <FormattedMessage id="system.user-manage.female" />
                        )}
                      </td>
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
                            onClick={() => this.ShowModalUpdateUser(item)}
                          >
                            <FormattedMessage id="system.user-manage.edit-user" />
                            <i className="fas fa-user-edit"></i>
                          </button>
                          <button
                            className="btn-Delete"
                            onClick={() => this.ShowModalDeleteUser(item.id)}
                          >
                            <FormattedMessage id="system.user-manage.del-user" />
                            <i className="fas fa-user-times"></i>
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
  return {
    userInfo: state.user.userInfo,
    listUserRedux: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserRedux: (data) => dispatch(actions.getUserReduxStart(data)),
    deleteUserRedux: (id) => dispatch(actions.deleteUserReduxStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUserRedux);
