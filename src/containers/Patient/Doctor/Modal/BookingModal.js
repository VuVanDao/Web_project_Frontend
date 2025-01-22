import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./BookingModal.scss";
import { LANGUAGES } from "../../../../utils";
import userService from "../../../../services/userService";
import ProfileDoctor from "../ProfileDoctor/ProfileDoctor";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      userName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      bookFor: "",
      detailDoctor: "",
    };
  }
  async componentDidMount() {
    if (this.props.doctorId) {
      let result = await userService.getDetailDoctor(this.props.doctorId);
      if (result && result.errCode === 0) {
        this.setState({
          detailDoctor: result.data,
        });
      }
    }
  }
  toggle = () => {
    this.setState({
      email: "",
      userName: "",
      address: "",
      phoneNumber: "",
      bookFor: "",
      gender: "",
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
      "userName",
      "address",
      "gender",
      "phoneNumber",
      "bookFor",
    ];
    listState.map((item, index) => {
      if (!this.state[item]) {
        result = false;
      }
    });
    return result;
  };

  render() {
    let { openModalBooking, doctorId, language, currentDatePicked } =
      this.props;

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
              <ProfileDoctor
                doctorId={doctorId}
                currentDatePicked={currentDatePicked}
                showDescription={false}
              />
              <div className="row mt-3">
                <div className="col-6">
                  <label htmlFor="userName">
                    <FormattedMessage id="system.user-manage.firstName" />:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="userName"
                    onChange={(event) =>
                      this.handleInfoUser(event.target.value, "userName")
                    }
                    onKeyDown={(event) => this.handleKeyDown(event)}
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="email">
                    <FormattedMessage id="system.user-manage.email" />:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    onChange={(event) =>
                      this.handleInfoUser(event.target.value, "email")
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
                    onChange={(event) =>
                      this.handleInfoUser(event.target.value, "phoneNumber")
                    }
                    onKeyDown={(event) => this.handleKeyDown(event)}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-6">
                  <label htmlFor="bookFor">
                    <FormattedMessage id="Schedule.BookFor" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="bookFor"
                    onChange={(event) =>
                      this.handleInfoUser(event.target.value, "bookFor")
                    }
                    onKeyDown={(event) => this.handleKeyDown(event)}
                  />
                </div>
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
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
