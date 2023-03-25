import Card from "react-bootstrap/Card";
import { Component, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import DemoNavbar from "./components/Navbars/DemoNavbar";

function User(props) {
  const [User, setUser] = useState(props.User);

  return (
    <Card>
      <Card.Img
        variant="top"
        src={"http://localhost:5000/images/" + User.image_user}
        height="200"
        width="50"
      />
      <Card.Body>
        <Card.Title>
          <Link to={`/products/${User.id}`}>{User.username}</Link>
        </Card.Title>
        <Card.Text>{User.first_Name}</Card.Text>
        <Card.Text>email :{User.email}</Card.Text>
        <Card.Text>dateOfBirth :{User.dateOfBirth}</Card.Text>
        <br></br>
        {/* <Row>
            <Col md={6}>
              {" "}
              <Button variant="success" ><Link to={`/products/update/${product.id}`} style={{textDecoration :'none' ,color: 'white'}}>Update Product </Link></Button>
            </Col>
            <Col md={6}>
              <Button variant="danger" onClick={() => props.deleteProd(product.id)}>Delete Product</Button>
            </Col>
            
          </Row> */}
      </Card.Body>
    </Card>
  );
}

export default User;
