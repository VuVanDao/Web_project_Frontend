import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "../userManage.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import LoadingData from "./LoadingData";
import { LANGUAGES } from "../../../utils/constant";
import userService from "../../../services/userService";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textMarkdown: "",
      htmlMarkdown: "",
      introduce: "",
      selectedOption: "",
      options: [],
      priceArr: [],
      paymentArr: [],
      provinceArr: [],
      specialtyArr: [],
      clinicArr: [],
      isLoading: true,
      selectedPayment: "",
      selectedPrice: "",
      selectedProvince: "",
      selectedSpecialty: "",
      selectedClinic: "",
      clinic: "",
      addressClinic: "",
      note: "",
    };
  }
  handleChange = async (selectedOption) => {
    this.setState({
      selectedOption: selectedOption,
    });
    let res = await userService.getDetailDoctor(selectedOption.value);
    if (
      res &&
      res.errCode === 0 &&
      res.data.Markdown &&
      res.data.Markdown.contentHTML &&
      res.data.Doctor_info &&
      res.data.Doctor_detail_payment &&
      res.data.Doctor_detail_price &&
      res.data.Doctor_detail_province &&
      res.data.Doctor_detail_specialty &&
      res.data.Doctor_detail_clinic &&
      res.data.Doctor_info.nameClinic &&
      res.data.Doctor_info.addressClinic &&
      res.data.Doctor_info.note
    ) {
      let checkPrice = this.state.priceArr.find((item) => {
        return item.value === res.data.Doctor_info.priceId;
      });
      let checkPayment = this.state.paymentArr.find((item) => {
        return item.value === res.data.Doctor_info.paymentId;
      });
      let checkProvince = this.state.provinceArr.find((item) => {
        return item.value === res.data.Doctor_info.provinceId;
      });
      let checkSpecialty = this.state.specialtyArr.find((item) => {
        return item.value === res.data.Doctor_info.specialtyId;
      });
      let checkClinic = this.state.clinicArr.find((item) => {
        return item.value === res.data.Doctor_info.clinicId;
      });
      this.setState({
        textMarkdown: res.data.Markdown.contentMarkdown,
        htmlMarkdown: res.data.Markdown.contentHTML,
        introduce: res.data.Markdown.description,
        clinic: res.data.Doctor_info.nameClinic,
        addressClinic: res.data.Doctor_info.addressClinic,
        note: res.data.Doctor_info.note,
        selectedPayment: checkPayment,
        selectedPrice: checkPrice,
        selectedProvince: checkProvince,
        selectedSpecialty: checkSpecialty,
        selectedClinic: checkClinic,
      });
    } else {
      let checkPrice = this.state.priceArr.find((item) => {
        return item.value === res.data.Doctor_info.priceId;
      });
      let checkPayment = this.state.paymentArr.find((item) => {
        return item.value === res.data.Doctor_info.paymentId;
      });
      let checkProvince = this.state.provinceArr.find((item) => {
        return item.value === res.data.Doctor_info.provinceId;
      });
      let checkClinic = this.state.clinicArr.find((item) => {
        return item.value === res.data.Doctor_info.clinicId;
      });
      let checkSpecialty = this.state.specialtyArr.find((item) => {
        return item.value === res.data.Doctor_info.specialtyId;
      });
      this.setState({
        textMarkdown: res.data.Markdown.contentMarkdown
          ? res.data.Markdown.contentMarkdown
          : "",
        htmlMarkdown: res.data.Markdown.contentHTML
          ? res.data.Markdown.contentHTML
          : "",
        introduce: res.data.Markdown.description,
        clinic: res.data.Doctor_info.nameClinic
          ? res.data.Doctor_info.nameClinic
          : "",
        addressClinic: res.data.Doctor_info.addressClinic
          ? res.data.Doctor_info.addressClinic
          : "",
        note: res.data.Doctor_info.note ? res.data.Doctor_info.note : "",
        selectedPayment: checkPayment ? checkPayment : "",
        selectedPrice: checkPrice ? checkPrice : "",
        selectedProvince: checkProvince ? checkProvince : "",
        selectedSpecialty: checkSpecialty ? checkSpecialty : "",
        selectedClinic: checkClinic ? checkClinic : "",
      });
    }
  };
  handleChangeSelect = (selected, id) => {
    let stateClone = { ...this.state };
    stateClone[id.name] = selected;
    this.setState({
      ...stateClone,
    });
  };
  buildInputSelect = (data, id) => {
    let result = [];
    let { language } = this.props;
    if (data && data.length > 0) {
      switch (id) {
        case "allDoctor":
          data.map((item, index) => {
            let object = {};
            let labelVi = item.lastName + " " + item.firstName;
            let labelEn = item.firstName + " " + item.lastName;
            object.label = language === LANGUAGES.VI ? labelVi : labelEn;
            object.value = item.id;
            result.push(object);
          });
          break;

        case "price":
          data.map((item, index) => {
            let object = {};
            object.label =
              language === LANGUAGES.VI
                ? item.valueVi + " VND"
                : item.valueEn + " USD";
            object.value = item.keyMap;
            result.push(object);
          });
          break;
        case "payment":
          data.map((item, index) => {
            let object = {};
            object.label =
              language === LANGUAGES.VI ? item.valueVi : item.valueEn;
            object.value = item.keyMap;
            result.push(object);
          });
          break;
        case "province":
          data.map((item, index) => {
            let object = {};
            object.label =
              language === LANGUAGES.VI ? item.valueVi : item.valueEn;
            object.value = item.keyMap;
            result.push(object);
          });
          break;
        case "specialty":
          data.map((item, index) => {
            let object = {};
            object.label = item.name;
            object.value = item.id;
            result.push(object);
          });
          break;
        case "clinic":
          data.map((item, index) => {
            let object = {};
            object.label = item.name;
            object.value = item.id;
            result.push(object);
          });
          break;
        default:
          break;
      }
    }
    return result;
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      textMarkdown: text,
      htmlMarkdown: html,
    });
  };
  async componentDidMount() {
    this.props.getAllListDoctor();
    this.props.fetchPriceStart();
    this.props.fetchPaymentStart();
    this.props.fetchProvinceStart();
    this.props.fetchSpecialtyStart();
    this.props.fetchClinicStart();
  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.AllDoctor !== this.props.AllDoctor) {
      let result = this.buildInputSelect(this.props.AllDoctor, "allDoctor");
      this.setState({
        options: result,
        isLoading: false,
      });
    }
    if (prevProps.priceArr !== this.props.priceArr) {
      let result = this.buildInputSelect(this.props.priceArr, "price");
      this.setState({
        priceArr: result,
        isLoading: false,
      });
    }
    if (prevProps.paymentArr !== this.props.paymentArr) {
      let result = this.buildInputSelect(this.props.paymentArr, "payment");
      this.setState({
        paymentArr: result,
        isLoading: false,
      });
    }
    if (prevProps.provinceArr !== this.props.provinceArr) {
      let result = this.buildInputSelect(this.props.provinceArr, "province");
      this.setState({
        provinceArr: result,
        isLoading: false,
      });
    }
    if (prevProps.specialtyArr !== this.props.specialtyArr) {
      let result = this.buildInputSelect(this.props.specialtyArr, "specialty");
      this.setState({
        specialtyArr: result,
      });
    }
    if (prevProps.clinicArr !== this.props.clinicArr) {
      let result = this.buildInputSelect(this.props.clinicArr, "clinic");
      this.setState({
        clinicArr: result,
      });
    }
    if (prevProps.language !== this.props.language) {
      let result = this.buildInputSelect(this.props.AllDoctor, "allDoctor");
      this.setState({
        options: result,
        isLoading: false,
      });

      let price = this.buildInputSelect(this.props.priceArr, "price");
      this.setState({
        priceArr: price,
        isLoading: false,
      });
      let payment = this.buildInputSelect(this.props.paymentArr, "payment");
      this.setState({
        paymentArr: payment,
        isLoading: false,
      });
      let province = this.buildInputSelect(this.props.provinceArr, "province");
      this.setState({
        provinceArr: province,
        isLoading: false,
      });
    }
  }
  Validate = () => {
    let result = true;
    let arrCheck = [
      "introduce",
      "selectedOption",
      "selectedPayment",
      "selectedPrice",
      "selectedProvince",
      "selectedSpecialty",
      "clinic",
      "addressClinic",
      "note",
    ];
    arrCheck.map((item) => {
      if (!this.state[item]) result = false;
    });
    return result;
  };
  handleSaveMarkdown = () => {
    let result = this.Validate();
    if (!result) {
      toast.error("Not complete information");
    } else {
      console.log(">>>", this.state.selectedClinic);

      this.props.saveInfoDoctor({
        textMarkdown: this.state.textMarkdown,
        htmlMarkdown: this.state.htmlMarkdown,
        introduce: this.state.introduce,
        id: this.state.selectedOption,
        paymentId: this.state.selectedPayment,
        provinceId: this.state.selectedProvince,
        priceId: this.state.selectedPrice,
        specialtyId: this.state.selectedSpecialty,
        clinicId: this.state.selectedClinic ? this.state.selectedClinic : "",
        nameClinic: this.state.clinic,
        addressClinic: this.state.addressClinic,
        note: this.state.note,
      });
      this.setState({
        textMarkdown: "",
        htmlMarkdown: "",
        introduce: "",
        selectedOption: "",
        selectedPayment: "",
        selectedPrice: "",
        selectedProvince: "",
        selectedSpecialty: "",
        selectedClinic: "",
        clinic: "",
        addressClinic: "",
        note: "",
      });
    }
  };
  handleChangeText = (event, id) => {
    switch (id) {
      case "text-area":
        this.setState({
          introduce: event.target.value,
        });
        break;
      case "clinic":
        this.setState({
          clinic: event.target.value,
        });
        break;
      case "addressClinic":
        this.setState({
          addressClinic: event.target.value,
        });
        break;
      case "note":
        this.setState({
          note: event.target.value,
        });
        break;

      default:
        break;
    }
  };
  /* life cycle
    Run component
    1. Run constructor - init state (khoi tao state)
    2.did mount : gan gia tri cho state
    3. render
   */
  render() {
    // console.log(">>>", this.props.priceArr);
    let {
      options,
      priceArr,
      paymentArr,
      provinceArr,
      specialtyArr,
      clinicArr,
    } = this.state;
    let { language } = this.props;

    return (
      <>
        {this.state.isLoading ? (
          <LoadingData />
        ) : (
          <div>
            <div className="container my-5" style={{ marginTop: "100px" }}>
              <div className="title">
                <FormattedMessage id="menu.system.doctor.title" />
              </div>
              <div className="row mt-4">
                <div className="col-md-6">
                  <label>
                    <FormattedMessage id="menu.system.doctor.ChooseDoctor" />
                  </label>
                  <Select
                    onChange={this.handleChange}
                    options={options}
                    placeholder={
                      <FormattedMessage id="menu.system.doctor.ChooseDoctor" />
                    }
                  />
                </div>
                <div className="col-md-6 ">
                  <label htmlFor="introduce">
                    <FormattedMessage id="menu.system.doctor.introduce" />
                  </label>
                  <textarea
                    id="introduce"
                    className="form-control"
                    style={{ height: "100px" }}
                    value={this.state.introduce}
                    onChange={(event) =>
                      this.handleChangeText(event, "text-area")
                    }
                    name="text-area"
                  ></textarea>
                </div>

                <div className="row mt-4">
                  <div className="col-md-4 ">
                    <label htmlFor="payment">
                      <FormattedMessage id="menu.system.doctor.payment" />
                    </label>
                    <Select
                      id="payment"
                      options={paymentArr}
                      onChange={this.handleChangeSelect}
                      name="selectedPayment"
                      value={this.state.selectedPayment}
                      placeholder={
                        <FormattedMessage id="menu.system.doctor.payment" />
                      }
                    />
                  </div>
                  <div className="col-md-4 ">
                    <label htmlFor="price">
                      <FormattedMessage id="menu.system.doctor.price" />
                    </label>
                    <Select
                      id="price"
                      options={priceArr}
                      onChange={this.handleChangeSelect}
                      name="selectedPrice"
                      value={this.state.selectedPrice}
                      placeholder={
                        <FormattedMessage id="menu.system.doctor.price" />
                      }
                    />
                  </div>
                  <div className="col-md-4 ">
                    <label htmlFor="province">
                      <FormattedMessage id="menu.system.doctor.province" />
                    </label>
                    <Select
                      id="province"
                      options={provinceArr}
                      onChange={this.handleChangeSelect}
                      name="selectedProvince"
                      value={this.state.selectedProvince}
                      placeholder={
                        <FormattedMessage id="menu.system.doctor.province" />
                      }
                    />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-4 ">
                    <label htmlFor="specialty">
                      <FormattedMessage id="menu.system.specialty.title" />
                    </label>
                    <Select
                      id="specialty"
                      options={specialtyArr}
                      onChange={this.handleChangeSelect}
                      name="selectedSpecialty"
                      value={this.state.selectedSpecialty}
                      placeholder={
                        <FormattedMessage id="menu.system.specialty.title" />
                      }
                    />
                  </div>
                  <div className="col-md-4 ">
                    <label htmlFor="specialty">
                      <FormattedMessage id="menu.system.clinic.title" />
                    </label>
                    <Select
                      id="specialty"
                      options={clinicArr}
                      onChange={this.handleChangeSelect}
                      name="selectedClinic"
                      value={this.state.selectedClinic}
                      placeholder={
                        <FormattedMessage id="menu.system.clinic.title" />
                      }
                    />
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-4 ">
                    <label htmlFor="clinic">
                      <FormattedMessage id="menu.system.doctor.clinic" />
                    </label>
                    <input
                      id="clinic"
                      className="form-control"
                      name="clinic"
                      onChange={(event) =>
                        this.handleChangeText(event, "clinic")
                      }
                      value={this.state.clinic}
                    />
                  </div>
                  <div className="col-md-4 ">
                    <label htmlFor="addressClinic">
                      <FormattedMessage id="menu.system.doctor.addressClinic" />
                    </label>
                    <input
                      id="addressClinic"
                      className="form-control"
                      name="addressClinic"
                      onChange={(event) =>
                        this.handleChangeText(event, "addressClinic")
                      }
                      value={this.state.addressClinic}
                    />
                  </div>
                  <div className="col-md-4 ">
                    <label htmlFor="note">
                      <FormattedMessage id="menu.system.doctor.note" />
                    </label>
                    <input
                      id="note"
                      className="form-control"
                      name="note"
                      onChange={(event) => this.handleChangeText(event, "note")}
                      value={this.state.note}
                    />
                  </div>
                </div>
              </div>
            </div>
            <MdEditor
              style={{ height: "500px", margin: "0 auto", width: "1400px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.textMarkdown}
            />
            <div className="col-12 text-center my-5">
              <button
                type="submit"
                className="btn btn-warning"
                onClick={() => this.handleSaveMarkdown()}
              >
                <FormattedMessage id="common.confirm" />
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    AllDoctor: state.admin.AllDoctor,
    language: state.app.language,
    priceArr: state.admin.priceArr,
    paymentArr: state.admin.paymentArr,
    provinceArr: state.admin.provinceArr,
    specialtyArr: state.admin.specialtyArr,
    clinicArr: state.admin.clinicArr,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllListDoctor: () => dispatch(actions.getAllListDoctor()),
    saveInfoDoctor: (data) => dispatch(actions.saveInfoDoctor(data)),
    fetchPriceStart: () => dispatch(actions.fetchPriceStart()),
    fetchPaymentStart: () => dispatch(actions.fetchPaymentStart()),
    fetchProvinceStart: () => dispatch(actions.fetchProvinceStart()),
    fetchSpecialtyStart: () => dispatch(actions.fetchSpecialtyStart()),
    fetchClinicStart: () => dispatch(actions.fetchClinicStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
