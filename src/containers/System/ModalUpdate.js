import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { first } from "lodash";
import { toast } from "react-toastify";
import { userService } from "../../services";
import { emitter } from "../../utils/emiter";
class ModalUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      roleId: "",
    };
    this.getInfoUpdateAUser();
  }
  async componentDidMount() {}

  toggle = () => {
    this.setState({
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      roleId: "",
    });
    this.props.ShowModalUpdateUser();
  };
  handleKeyDown = (event) => {
    if (event.keyCode == 13) {
      this.handleLogin();
    }
  };
  handleInfoUser = (data, id) => {
    this.setState({
      [id]: data,
    });
  };
  handleValidate = () => {
    let result = true;
    let listState = ["firstName", "lastName", "address", "gender", "roleId"];
    listState.map((item, index) => {
      if (!this.state[item]) {
        result = false;
      }
    });
    return result;
  };
  getInfoUpdateAUser = async () => {
    emitter.on("EVENT_UPDATE_USER", async (id) => {
      let userId = id.id;
      let userData = await userService.getAllUser(userId);
      if (userData && userData.errCode === 0 && userData.userData.length > 0) {
        let data = userData.userData[0];
        this.setState({
          id: userId,
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
  handleUpdateAUser = async () => {
    let checkState = this.handleValidate();
    console.log("state", this.state);

    if (!checkState) {
      toast.error("Please fill in the information completely");
    } else {
      let data = await userService.updateAUser(this.state);
      if (data && data.errCode === 0) {
        this.toggle();
        this.props.handleGetAllUser();
        toast.success(data.errMessage);
      }
    }
  };
  render() {
    return (
      <>
        <Modal
          show={this.props.isOpenModalUpdate}
          onHide={() => this.toggle()}
          size="xl"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <FormattedMessage id="update-user.title" />
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
            <Button variant="secondary" onClick={() => this.toggle()}>
              <FormattedMessage id="common.close" />
            </Button>
            <Button variant="primary" onClick={() => this.handleUpdateAUser()}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUpdate);
