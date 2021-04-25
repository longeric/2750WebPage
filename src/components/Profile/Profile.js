import React, { Component } from "react";
import { readUser, updateProfile } from "../../actions/saveUser.js";
import { readAllUser, deleteUser } from "../../actions/adminUser.js";
import {
  Button,
  Container,
  Row,
  Col,
  Image,
  Spinner,
  Card,
  Table
} from "react-bootstrap";
import {
  BsFillPersonFill,
  BsFilePost,
  BsFillEnvelopeFill
} from "react-icons/bs";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import Chart from "./Chart.js";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    // this.state = { user: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    };
  }

  async componentWillMount() {
    const data = await readUser(localStorage.email);
    // console.log(data);
    this.setState({ user: data });
    if (this.state.user.admin == true) {
      // console.log("Now admin should load");
      // call another function
      await this.readAllUsers();
    }

    
  }

  async readAllUsers() {
    await readAllUser().then(data => {
      // console.log(data);
      this.setState({ alluser: data });
    });

    const array = [];
    for (let i = 0; i < this.state.alluser.length; i++) {
      if (this.state.alluser[i].admin == false) {
        array.push(this.state.alluser[i]);
      }
    }
    this.setState({ alluser: array });
    console.log("Thing from read All user");
    console.log(this.state.alluser);
  }

  handleChange(e) {
    var user = this.state.user;
    user.name = e.target.value;
    this.setState({ user });
  }

  async handleSubmit(e) {
    e.preventDefault();
    if(window.confirm(""))
    const response = await updateProfile(this.state.user);
    // console.log(response);
  }

  deleteUser(email) {
    // console.log(email);
    if (window.confirm("Are you sure to delete this task?")) {
      deleteUser(email);
      this.readAllUsers();
    }
  }

  render() {
    if (this.state === null || this.state.user === "") {
      // return <div>You should login first</div>;
      return <Spinner animation="border" />;
    } else if (this.state.user.admin == false) {
      const unschedule = this.state.user.unschedule.map((item, index) => (
        <Col lg={4} key={index}>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ));
      return (
        <div className="container">
          <legend>
            <center>
              <h4>
                <b>Profile Form</b>
              </h4>
            </center>
          </legend>
          <form onSubmit={this.handleSubmit}>
            <Container fluid>
              <Row>
                <Col lg={4}></Col>
                <Col lg={4}>
                  <center>
                    <Image
                      src={this.state.user.avatar}
                      roundedCircle
                      style={{ width: 200, height: 200 }}
                    />
                  </center>
                </Col>
                <Col lg={4}></Col>
              </Row>
              <br />
              <Row>
                <Col lg={3}></Col>
                <Col lg={6}>
                  <BsFillPersonFill />
                  <label className="">Name</label>
                  <input
                    name="name"
                    defaultValue={this.state.user.name}
                    className="form-control"
                    type="text"
                    onChange={this.handleChange}
                  />
                </Col>
                <Col lg={3}></Col>
              </Row>
              <br />
              <Row>
                <Col lg={3}></Col>
                <Col lg={6}>
                  <BsFillEnvelopeFill />
                  <label>Email</label>
                  <input
                    name="email"
                    defaultValue={this.state.user.email}
                    className="form-control"
                    type="text"
                    readOnly={true}
                  />
                </Col>
                <Col lg={3}></Col>
              </Row>
              <br />
              <Row>
                <Col lg={3}></Col>
                <Col lg={6}>
                  <BsFilePost />
                  <label>Create Date</label>
                  <input
                    name="date"
                    defaultValue={this.state.user.date}
                    className="form-control"
                    type="text"
                    readOnly={true}
                  />
                </Col>
                <Col lg={3}></Col>
              </Row>
              <br />

              <Row>
                <Col></Col>
                <Col>
                  <center>
                    <Button variant="dark" type="submit">
                      Save Profile
                    </Button>
                  </center>
                </Col>
                <Col></Col>
              </Row>
            </Container>
          </form>
          <div>
            <Container>
              <Row>{unschedule}</Row>
            </Container>
          </div>
        </div>
      );
    } else if (
      this.state.user.admin == true &&
      this.state.alluser != undefined
    ) {
      const arr = this.state.alluser.map((item, index) => (
        // <p key={index}> {item.name} </p>
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>
            <Button
              variant="danger"
              onClick={() => this.deleteUser(item.email)}
            >
              Delete
            </Button>
          </td>
        </tr>
      ));

      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <Container fluid>
              <legend>
                <center>
                  <h2>
                    <b>Admin</b>
                  </h2>
                </center>
              </legend>
              <Row>
                <Col>
                  <Row>
                    <Col lg={3}></Col>
                    <Col lg={6}>
                      <center>
                        <Image
                          src={this.state.user.avatar}
                          roundedCircle
                          style={{ width: 200, height: 200 }}
                        />
                      </center>
                    </Col>
                    <Col lg={3}></Col>
                  </Row>

                  <Row>
                    <Col lg={3}></Col>
                    <Col lg={6}>
                      <BsFillPersonFill />
                      <label className="">Name</label>
                      <input
                        name="name"
                        defaultValue={this.state.user.name}
                        className="form-control"
                        type="text"
                        onChange={this.handleChange}
                      />
                    </Col>
                    <Col lg={3}></Col>
                  </Row>
                 <br />
                  <Row>
                    <Col lg={3}></Col>
                    <Col lg={6}>
                      <BsFillEnvelopeFill />
                      <label>Email</label>
                      <input
                        name="email"
                        defaultValue={this.state.user.email}
                        className="form-control"
                        type="text"
                        readOnly={true}
                      />
                    </Col>
                    <Col lg={3}></Col>
                  </Row>
                  <br />
                  <Row>
                    <Col lg={3}></Col>
                    <Col lg={6}>
                      <BsFilePost />
                      <label>Create Date</label>
                      <input
                        name="date"
                        defaultValue={this.state.user.date}
                        className="form-control"
                        type="text"
                        readOnly={true}
                      />
                    </Col>
                    <Col lg={3}></Col>
                  </Row>
                </Col>
              </Row>
              <br />
              <Row>
                <Col></Col>
                <Col>
                  <center>
                    <Button variant="dark" type="submit">
                      Save Profile
                    </Button>
                  </center>
                </Col>
                <Col></Col>
              </Row>
            </Container>
          </form>

          <Container>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{arr}</tbody>
            </Table>
          </Container>
          
          <Container>
            <Chart />
          </Container>
        </div>
      );
    } else {
      return <Spinner animation="border" />;
    }
  }
}

// {this.state.alluser.map(item => (
//   <p>Hello, {item} </p>
// ))}

// {this.state.alluser[0].name}

// <Row>
//   <Col>what</Col>
// </Row>

// <Container>
//             <table class="table">
//               <thead>
//                 <tr>
//                   <th scope="col">#</th>
//                   <th scope="col">UserName</th>
//                   <th scope="col">Email</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   {nameArray.map((username, index) => {
//                     return (
//                       <div>
//                         <th scope="row" key={index + 1}>
//                           {index}
//                         </th>
//                         <td key={index}>{username}</td>
//                         <td key={index}>1</td>
//                       </div>
//                     );
//                   })}
//                 </tr>
//                 <tr>
//                   {emailArray.map((email, index) => {
//                     return (
//                       <div>
//                         <th scope="row" key={index + 1}>
//                           {index}
//                         </th>
//                         <td key={index}>{email.name}</td>
//                         <td key={index}>{email.email}</td>
//                       </div>
//                     );
//                   })}
//                 </tr>
//               </tbody>
//             </table>
//           </Container>

// <Row>
//               <Col>
//                 <Row>
//                   <Col>name</Col>
//                   <Col>email</Col>
//                 </Row>
//                 {arr}
//               </Col>
//             </Row>
