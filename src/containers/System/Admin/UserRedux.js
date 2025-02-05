import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { CRUD_ACTIONS } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import LoadingData from "./LoadingData";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { toast } from "react-toastify";
import TableUserRedux from "./TableUserRedux";
import CommonUtils from "../../../utils/CommonUtils";

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
      positionId: "",
      roleId: "",
      image: "",
      id: "",
      action: "CREATE",
    };
  }

  async componentDidMount() {
    await this.props.getGenderStart();
    await this.props.getPositionStart();
    await this.props.getRoleStart();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.genderArr !== this.props.genderArr) {
      this.setState({
        genderArr: this.props.genderArr,
        gender: this.props.genderArr[0].keyMap,
      });
    }
    if (prevProps.positionArr !== this.props.positionArr) {
      this.setState({
        positionArr: this.props.positionArr,
        positionId: this.props.positionArr[0].keyMap,
      });
    }
    if (prevProps.roleArr !== this.props.roleArr) {
      this.setState({
        roleArr: this.props.roleArr,
        roleId: this.props.roleArr[0].keyMap,
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
        positionId: "",
        roleId: "",
        image: "",
        action: "CREATE",
        image: "",
        previewImageURL: "",
      });
    }
  }
  handleOnChangeImage = async (event) => {
    let file = event.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      const objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImageURL: objectUrl,
        image: base64,
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
    ];
    listState.map((item, index) => {
      if (!this.state[item]) {
        result = false;
        return this.state[item];
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
    console.log(">>", this.state);

    // let result = true;
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
        gender: this.state.gender ? this.state.gender : "M",
        roleId: this.state.roleId ? this.state.roleId : "R3",
        positionId: this.state.positionId ? this.state.positionId : "P0",
        image: this.state.image,
      });
      this.props.getAllUserRedux("All");
    }
  };
  handleEditUserRedux = async () => {
    this.props.updateUserRedux({
      id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      gender: this.state.gender,
      roleId: this.state.roleId,
      positionId: this.state.positionId,
      image: this.state.image,
    });
    this.props.getAllUserRedux("All");
  };
  handleUpdateUserRedux = async (data) => {
    let url = "";
    if (data.image) {
      url = new Buffer(data.image, "base64").toString("binary");
    }
    this.setState({
      ...data,
      action: "EDIT",
      image: "",
      previewImageURL: url,
    });
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
                    {this.state.action === CRUD_ACTIONS.CREATE ? (
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail4"
                        value={this.state.email}
                        onChange={(event) =>
                          this.HandleOnChangeInput(event, "email")
                        }
                      />
                    ) : (
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail4"
                        value={this.state.email}
                        onChange={(event) =>
                          this.HandleOnChangeInput(event, "email")
                        }
                        disabled
                      />
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">
                      <FormattedMessage id="system.user-manage.password" />:
                    </label>
                    {this.state.action === CRUD_ACTIONS.CREATE ? (
                      <input
                        type="password"
                        className="form-control"
                        id="inputPassword4"
                        value={this.state.password}
                        onChange={(event) =>
                          this.HandleOnChangeInput(event, "password")
                        }
                      />
                    ) : (
                      <input
                        type="password"
                        className="form-control"
                        id="inputPassword4"
                        value={this.state.password}
                        onChange={(event) =>
                          this.HandleOnChangeInput(event, "password")
                        }
                        disabled
                      />
                    )}
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
                            <option key={index} value={item.keyMap}>
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
                      value={this.state.positionId}
                      onChange={(event) =>
                        this.HandleOnChangeInput(event, "positionId")
                      }
                    >
                      {positionArr &&
                        positionArr.length > 0 &&
                        positionArr.map((item, index) => {
                          return (
                            <option key={index} value={item.keyMap}>
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
                            <option key={index} value={item.keyMap}>
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
                  {this.state.action === CRUD_ACTIONS.CREATE ? (
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={() => this.handleCreateUserRedux()}
                      >
                        <FormattedMessage id="common.confirm" />
                      </button>
                    </div>
                  ) : (
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-warning"
                        onClick={() => this.handleEditUserRedux()}
                      >
                        <FormattedMessage id="common.confirm" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <TableUserRedux
              handleUpdateUserRedux={this.handleUpdateUserRedux}
            />
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
    updateUserRedux: (data) => dispatch(actions.updateUserReduxStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
