import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./BookingModal.scss";
import { LANGUAGES } from "../../../../utils";
import userService from "../../../../services/userService";
import ProfileDoctor from "../ProfileDoctor/ProfileDoctor";
import { toast } from "react-toastify";
import _, { clone } from "lodash";
import * as actions from "../../../../store/actions";
import moment from "moment";

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
      genderArr: [],
    };
  }
  async componentDidMount() {
    this.props.getGenderStart();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.genderArr !== this.props.genderArr) {
      this.setState({
        genderArr: this.props.genderArr,
        gender: this.props.genderArr[0].keyMap,
      });
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
  handleBooking = async () => {
    let result = this.handleValidate();
    let cloneState = _.cloneDeep(this.state);
    cloneState.doctorId = this.props.doctorId;
    cloneState.date = this.props.currentDatePicked.date;
    cloneState.timeType = this.props.currentDatePicked.timeType;
    if (!result) {
      toast.error("Please fill in the information completely");
    } else {
      let { language, currentDatePicked } = this.props;
      let res = await userService.booking({
        email: this.state.email,
        userName: this.state.userName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        bookFor: this.state.bookFor,
        doctorId: this.props.doctorId,
        doctorName: currentDatePicked.doctorIdData
          ? language === LANGUAGES.VI
            ? currentDatePicked.doctorIdData.lastName +
              " " +
              currentDatePicked.doctorIdData.firstName
            : currentDatePicked.doctorIdData.firstName +
              " " +
              currentDatePicked.doctorIdData.lastName
          : "",
        date: this.props.currentDatePicked.date
          ? language === LANGUAGES.VI
            ? moment(+currentDatePicked.date).format("dddd") +
              " " +
              moment(+currentDatePicked.date).format("DD/MM/YYYY")
            : moment(+currentDatePicked.date).locale("en").format("dddd") +
              " " +
              moment(new Date(+currentDatePicked.date)).format("DD/MM/YYYY")
          : "",
        timeType: this.props.currentDatePicked.timeType
          ? language === LANGUAGES.VI
            ? currentDatePicked.timeTypeData.valueVi
            : currentDatePicked.timeTypeData.valueEn
          : "",
        language: language,
        cloneState,
      });
      res && res.errCode === 0
        ? toast.success("Booking success")
        : toast.error("Booking failed");
      this.toggle();
    }
  };
  render() {
    let { openModalBooking, doctorId, language, currentDatePicked } =
      this.props;
    let { genderArr } = this.state;
    // console.log(">>>props", this.props.currentDatePicked);

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
                    name="gender"
                    id="inputState"
                    className="form-control"
                    value={this.state.gender}
                    onChange={(event) =>
                      this.handleInfoUser(event.target.value, "gender")
                    }
                  >
                    {genderArr &&
                      genderArr.length > 0 &&
                      genderArr.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {language === "vi" ? item.valueVI : item.valueEN}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.toggle()}>
              <FormattedMessage id="common.close" />
            </Button>
            <Button variant="primary" onClick={() => this.handleBooking()}>
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
    genderArr: state.admin.genderArr,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
