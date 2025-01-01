import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { first } from "lodash";
import { toast } from "react-toastify";
import { userService } from "../../services";
import { emitter } from "../../utils/emiter";

class ModalDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      roleId: "",
    };
    this.getInfoDeleteAUser();
  }
  async componentDidMount() {}

  toggle = () => {
    this.setState({
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      roleId: "",
    });
    this.props.ShowModalDeleteUser();
  };
  handleKeyDown = (event) => {
    if (event.keyCode == 13) {
      this.handleLogin();
    }
  };
  getInfoDeleteAUser = async () => {
    emitter.on("EVENT_DELETE_USER", async (id) => {
      let userId = id.id;
      let userData = await userService.getAllUser(userId);
      if (userData && userData.errCode === 0 && userData.userData.length > 0) {
        let data = userData.userData[0];
        this.setState({
          id: userId,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          roleId: data.roleId,
        });
      }
    });
  };
  handleDeleteAUser = async () => {
    let data = await userService.deleteAUser(this.state.id);
    if (data && data.errCode === 0) {
      this.toggle();
      this.props.handleGetAllUser();
      toast.success(data.errMessage);
    }
  };
  render() {
    return (
      <>
        <Modal
          show={this.props.isOpenModalDelete}
          onHide={() => this.toggle()}
          size="xl"
          centered
        >
          <Modal.Header>
            <Modal.Title>
              <FormattedMessage id="delete-user.title" />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <label htmlFor="email">
                    <FormattedMessage id="system.user-manage.email" />:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={this.state.email}
                    onChange={(event) =>
                      this.handleInfoUser(event.target.value, "email")
                    }
                    onKeyDown={(event) => this.handleKeyDown(event)}
                    disabled
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="password">
                    <FormattedMessage id="system.user-manage.password" />:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="password"
                    value={this.state.password}
                    onChange={(event) =>
                      this.handleInfoUser(event.target.value, "password")
                    }
                    onKeyDown={(event) => this.handleKeyDown(event)}
                    disabled
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-6">
                  <label htmlFor="firstName">
                    <FormattedMessage id="system.user-manage.firstName" />:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={this.state.firstName}
                    onChange={(event) =>
                      this.handleInfoUser(event.target.value, "firstName")
                    }
                    onKeyDown={(event) => this.handleKeyDown(event)}
                    disabled
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="lastName">
                    <FormattedMessage id="system.user-manage.lastName" />:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={this.state.lastName}
                    onChange={(event) =>
                      this.handleInfoUser(event.target.value, "lastName")
                    }
                    onKeyDown={(event) => this.handleKeyDown(event)}
                    disabled
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-6">
                  <label htmlFor="address">
                    <FormattedMessage id="system.user-manage.address" />:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    value={this.state.address}
                    onChange={(event) =>
                      this.handleInfoUser(event.target.value, "address")
                    }
                    onKeyDown={(event) => this.handleKeyDown(event)}
                    disabled
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="phoneNumber">
                    <FormattedMessage id="system.user-manage.mobile" />:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    value={this.state.phoneNumber}
                    onChange={(event) =>
                      this.handleInfoUser(event.target.value, "phoneNumber")
                    }
                    onKeyDown={(event) => this.handleKeyDown(event)}
                    disabled
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-6">
                  <label htmlFor="inputState">
                    <FormattedMessage id="system.user-manage.gender" />
                  </label>
                  <select
                    id="inputState"
                    className="form-control"
                    name="gender"
                    onChange={(event) =>
                      this.handleInfoUser(event.target.value, "gender")
                    }
                    disabled
                  >
                    <option value="">Plz choose one</option>
                    <option value="1">Nam</option>
                    <option value="0">Nữ</option>
                  </select>
                </div>
                <div className="col-6">
                  <label htmlFor="inputZip">
                    <FormattedMessage id="system.user-manage.role" />
                  </label>
                  <select
                    id="inputZip"
                    className="form-control"
                    name="roleId"
                    onChange={(event) =>
                      this.handleInfoUser(event.target.value, "roleId")
                    }
                    disabled
                  >
                    <option value="">Plz choose one</option>
                    <option value="1">Admin</option>
                    <option value="2">Doctor</option>
                    <option value="3">Patient</option>
                  </select>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.toggle()}
              style={{ padding: "0px 10px" }}
            >
              <FormattedMessage id="common.close" />
            </Button>
            <Button
              variant="primary"
              onClick={() => this.handleDeleteAUser()}
              style={{ padding: "0px 10px" }}
            >
              <FormattedMessage id="common.confirm" />
            </Button>
          </Modal.Footer>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalDelete);
