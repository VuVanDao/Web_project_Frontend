import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   email: "",
      //   password: "",
      //   firstName: "",
      //   lastName: "",
      //   address: "",
      //   phoneNumber: "",
      //   gender: "",
      //   roleId: "",
    };
  }
  componentDidMount() {}
  toggle = () => {
    this.setState({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      roleId: "",
    });
    this.props.handleOpenModalBooking();
  };
  handleKeyDown = (event) => {
    if (event.keyCode == 13) {
      this.handleAddNewUser();
    }
  };
  handleInfoUser = (data, id) => {
    this.setState({
      [id]: data,
    });
  };
  handleValidate = () => {
    let result = true;
    let listState = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "gender",
      "roleId",
    ];
    listState.map((item, index) => {
      if (!this.state[item]) {
        result = false;
      }
    });
    return result;
  };

  render() {
    let { openModalBooking } = this.props;
    console.log(">>>>", this.props);

    return (
      <>
        <Modal
          show={openModalBooking}
          onHide={() => this.toggle()}
          size="xl"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <FormattedMessage id="Schedule.title" />
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

                    // onChange={(event) =>
                    //   this.handleInfoUser(event.target.value, "email")
                    // }
                    // onKeyDown={(event) => this.handleKeyDown(event)}
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

                    // onChange={(event) =>
                    //   this.handleInfoUser(event.target.value, "password")
                    // }
                    // onKeyDown={(event) => this.handleKeyDown(event)}
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

                    // onChange={(event) =>
                    //   this.handleInfoUser(event.target.value, "firstName")
                    // }
                    // onKeyDown={(event) => this.handleKeyDown(event)}
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

                    // onChange={(event) =>
                    //   this.handleInfoUser(event.target.value, "lastName")
                    // }
                    // onKeyDown={(event) => this.handleKeyDown(event)}
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
                    // onChange={(event) =>
                    //   this.handleInfoUser(event.target.value, "address")
                    // }
                    // onKeyDown={(event) => this.handleKeyDown(event)}
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
                    // onChange={(event) =>
                    //   this.handleInfoUser(event.target.value, "phoneNumber")
                    // }
                    // onKeyDown={(event) => this.handleKeyDown(event)}
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
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.toggle()}>
              <FormattedMessage id="common.close" />
            </Button>
            <Button variant="primary">
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
