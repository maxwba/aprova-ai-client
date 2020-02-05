//new client
import React, { Component } from "react";
import axios from "axios";
import { typography } from "@material-ui/system";


class NewClient extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const name = this.state.name;
    axios
      .post(
        process.env.REACT_APP_API_URL + "/client",
        { name: name },
        { withCredentials: true }
      )
      .then(data => {
        this.setState({ name: "" });
        console.log("DATA=>", data)
        this.props.handleClientView(data.data)
      })
      .catch(error => console.log(error));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <div class="newclient form-group ">
            <label className="newClient">Novo Cliente</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <br />
            <button
              type="submit"
              value="Submit"
              class="btnClient btn btn-primary"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewClient;
