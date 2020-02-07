import React, { Component } from "react";
import axios from "axios";


class NewClient extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
    this.state = { email: "" };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const name = this.state.name;
    const email = this.state.email;
    axios
      .post(
        process.env.REACT_APP_API_URL + "/client",
        { name: name, email: email },
        { withCredentials: true }
      )
      .then(data => {
        this.props.handleClientView(data.data);
        this.setState({
          name: "",
          email: ""
        });
        this.props.getAllClient();
      })
      .catch(error => console.log(error));
  }

  handleChange(event) {
    const { name, email, value } = event.target;

    this.setState({
      [name]: value,
      [email]: value
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <div class="newclient form-group ">
            <label className="newClient">Novo Cliente</label>
            <br />
            <input
              type="text"
              className="form-control mb-3"
              name="name"
              placeholder="Nome do seu cliente"
              value={this.state.name}
              onChange={this.handleChange}
            />
          
            <input
              type="text"
              className="form-control mb-4"
              placeholder="E-mail do seu cliente"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
         
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
