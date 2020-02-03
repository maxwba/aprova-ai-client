//new client
import React, { Component } from "react";
import axios from "axios";

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
        "http://localhost:5000/api/client",
        { name: name },
        { withCredentials: true }
      )
      .then(data => {
        console.log(data);
        this.props.getData();
        this.setState({ name: "" });
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
