import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import userService from "../../../services/userService";
import * as actions from "../../../store/actions";
import LoadingData from "./LoadingData";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { toast } from "react-toastify";
import TableUserRedux from "./TableUserRedux";
//menuApp
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImageURL: "",
      isOpen: false,
      //info user
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      position: "",
      roleId: "",
      image: "",
    };
  }

  // async componentDidMount() {
  //   try {
  //     let gender = await userService.getAllCode("gender");
  //     let position = await userService.getAllCode("position");
  //     let role = await userService.getAllCode("role");
  //     if (gender && gender.data) {
  //       this.setState({
  //         genderArr: gender.data,
  //       });
  //     }
  //     if (position && position.data) {
  //       this.setState({
  //         positionArr: position.data,
  //       });
  //     }
  //     if (role && role.data) {
  //       this.setState({
  //         roleArr: role.data,
  //       });
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // }
  async componentDidMount() {
    await this.props.getGenderStart();
    await this.props.getPositionStart();
    await this.props.getRoleStart();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.genderArr !== this.props.genderArr) {
      this.setState({
        genderArr: this.props.genderArr,
        gender: this.props.genderArr[0].key,
      });
    }
    if (prevProps.positionArr !== this.props.positionArr) {
      this.setState({
        positionArr: this.props.positionArr,
        position: this.props.positionArr[0].key,
      });
    }
    if (prevProps.roleArr !== this.props.roleArr) {
      this.setState({
        roleArr: this.props.roleArr,
        roleId: this.props.roleArr[0].key,
      });
    }
    if (prevProps.listUserRedux !== this.props.listUserRedux) {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        gender: "",
        position: "",
        roleId: "",
        image: "",
      });
    }
  }
  handleOnChangeImage = (event) => {
    let file = event.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImageURL: objectUrl,
        image: file,
      });
    }
  };
  handleValidate = () => {
    let result = true;
    let listState = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "phoneNumber",
      "gender",
      "position",
      "roleId",
    ];
    listState.map((item, index) => {
      if (!this.state[item]) {
        result = false;
      }
    });
    return result;
  };
  HandleOnChangeInput = (event, id) => {
    this.setState({
      [id]: event.target.value,
    });
  };
  handleCreateUserRedux = async () => {
    let result = this.handleValidate();
    if (!result) {
      toast.error("Plz fill all information on this form");
    } else {
      this.props.createUserRedux({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.roleId,
        position: this.state.position,
      });
      this.props.getAllUserRedux("All");
    }
  };
  render() {
    let {
      userInfo,
      language,
      isLoadingGender,
      isLoadingPosition,
      isLoadingRole,
    } = this.props;
    let { genderArr, positionArr, roleArr } = this.state;

    return (
      <>
        {isLoadingGender || isLoadingPosition || isLoadingRole ? (
          <LoadingData />
        ) : (
          <div>
            <div className="text-center title">
              <FormattedMessage id="create-user.title" />
            </div>
            <div className="container ">
              <div className="row my-3">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label">
                      <FormattedMessage id="system.user-manage.email" />:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail4"
                      value={this.state.email}
                      onChange={(event) =>
                        this.HandleOnChangeInput(event, "email")
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">
                      <FormattedMessage id="system.user-manage.password" />:
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword4"
                      value={this.state.password}
                      onChange={(event) =>
                        this.HandleOnChangeInput(event, "password")
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">
                      <FormattedMessage id="system.user-manage.firstName" />:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      value={this.state.firstName}
                      onChange={(event) =>
                        this.HandleOnChangeInput(event, "firstName")
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">
                      <FormattedMessage id="system.user-manage.lastName" />:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      value={this.state.lastName}
                      onChange={(event) =>
                        this.HandleOnChangeInput(event, "lastName")
                      }
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="inputCity" className="form-label">
                      <FormattedMessage id="system.user-manage.address" />:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputCity"
                      placeholder="1234 Main St"
                      value={this.state.address}
                      onChange={(event) =>
                        this.HandleOnChangeInput(event, "address")
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="mobile" className="form-label">
                      <FormattedMessage id="system.user-manage.mobile" />:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="mobile"
                      value={this.state.phoneNumber}
                      onChange={(event) =>
                        this.HandleOnChangeInput(event, "phoneNumber")
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputState" className="form-label">
                      <FormattedMessage id="system.user-manage.gender" />
                    </label>
                    <select
                      id="inputState"
                      className="form-select"
                      value={this.state.gender}
                      onChange={(event) =>
                        this.HandleOnChangeInput(event, "gender")
                      }
                    >
                      {genderArr &&
                        genderArr.length > 0 &&
                        genderArr.map((item, index) => {
                          return (
                            <option key={index} value={item.key}>
                              {language === "vi" ? item.valueVI : item.valueEN}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputState" className="form-label">
                      <FormattedMessage id="system.user-manage.level" />
                    </label>
                    <select
                      id="inputState"
                      className="form-select"
                      value={this.state.position}
                      onChange={(event) =>
                        this.HandleOnChangeInput(event, "position")
                      }
                    >
                      {positionArr &&
                        positionArr.length > 0 &&
                        positionArr.map((item, index) => {
                          return (
                            <option key={index} value={item.key}>
                              {language === "vi" ? item.valueVI : item.valueEN}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="inputState" className="form-label">
                      <FormattedMessage id="system.user-manage.role" />
                    </label>
                    <select
                      id="inputState"
                      className="form-select"
                      value={this.state.roleId}
                      onChange={(event) =>
                        this.HandleOnChangeInput(event, "roleId")
                      }
                    >
                      {roleArr &&
                        roleArr.length > 0 &&
                        roleArr.map((item, index) => {
                          return (
                            <option key={index} value={item.key}>
                              {language === "vi" ? item.valueVI : item.valueEN}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="image" className="form-label">
                      <FormattedMessage id="system.user-manage.image" />
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      onChange={(event) => this.handleOnChangeImage(event)}
                    />
                    <div
                      className="preview-image"
                      style={{
                        backgroundImage: `url(${this.state.previewImageURL})`,
                        width: "150px",
                        height: "150px",
                        backgroundPosition: "center",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        position: "absolute",
                      }}
                      onClick={() => this.setState({ isOpen: true })}
                    ></div>
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={() => this.handleCreateUserRedux()}
                    >
                      <FormattedMessage id="common.confirm" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <TableUserRedux />
            {this.state.isOpen && (
              <Lightbox
                mainSrc={this.state.previewImageURL}
                onCloseRequest={() => this.setState({ isOpen: false })}
              />
            )}
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  // return { UserRedux };
  return {
    userInfo: state.user.userInfo,
    language: state.app.language,
    genderArr: state.admin.genderArr,
    positionArr: state.admin.positionArr,
    roleArr: state.admin.roleArr,
    isLoadingGender: state.admin.isLoadingGender,
    isLoadingPosition: state.admin.isLoadingPosition,
    isLoadingRole: state.admin.isLoadingRole,
    listUserRedux: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createUserRedux: (data) => dispatch(actions.createUserReduxStart(data)),
    getAllUserRedux: (data) => dispatch(actions.getUserReduxStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
