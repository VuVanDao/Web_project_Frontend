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
      isLoading: true,
    };
  }
  handleChange = (selectedOption) => {
    this.setState({
      selectedOption: selectedOption.value,
    });
  };
  buildInputSelect = (data) => {
    let result = [];
    let { language } = this.props;
    if (data && data.length > 0) {
      data.map((item, index) => {
        let object = {};
        let labelVi = item.lastName + " " + item.firstName;
        let labelEn = item.firstName + " " + item.lastName;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
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
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.AllDoctor !== this.props.AllDoctor) {
      let result = this.buildInputSelect(this.props.AllDoctor);
      this.setState({
        options: result,
        isLoading: false,
      });
    }
    if (prevProps.language !== this.props.language) {
      let result = this.buildInputSelect(this.props.AllDoctor);
      this.setState({
        options: result,
        isLoading: false,
      });
    }
  }
  handleSaveMarkdown = () => {
    this.props.saveInfoDoctor({
      textMarkdown: this.state.textMarkdown,
      htmlMarkdown: this.state.htmlMarkdown,
      introduce: this.state.introduce,
      id: this.state.selectedOption,
    });
  };
  handleChangeTextArea = (event) => {
    this.setState({
      introduce: event.target.value,
    });
  };
  /* life cycle
    Run component
    1. Run constructor - init state (khoi tao state)
    2.did mount : gan gia tri cho state
    3. render
   */
  render() {
    // console.log(">>>", this.props.options);
    let { options } = this.state;
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
                    value={this.state.selectedOption}
                    onChange={this.handleChange}
                    options={options}
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
                    onChange={(event) => this.handleChangeTextArea(event)}
                  ></textarea>
                </div>
              </div>
            </div>
            <MdEditor
              style={{ height: "500px", margin: "0 auto", width: "1400px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllListDoctor: () => dispatch(actions.getAllListDoctor()),
    saveInfoDoctor: (data) => dispatch(actions.saveInfoDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
