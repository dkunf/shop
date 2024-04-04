//todo auto-logout, when token expire
//shouldn't reach route on path/admin writing...Protect routes.
//make styles better, match

import { useState, useContext } from "react";
import React from "react";
import { Form, Row, Col, Container, Button, Spinner } from "react-bootstrap";
import { cfg } from "../../cfg/cfg";
import { AppContext } from "../../contexts/AppContext";
import useAuth from "../../hooks/useAuth";

function Admin() {
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token, setToken } = useAuth();
  const { fetchAllProducts, setShowLogin } = useContext(AppContext);

  // const [status, setStatus] = useState({
  //   colorCode: null, //'success' | 'error'
  //   message: "",
  // });
  const { setToast, clearToast } = useContext(AppContext);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    console.log(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);
    const form = e.currentTarget;

    if (!form.checkValidity()) return;

    //works for sending without file
    // try {
    //   setLoading(true);
    //   const response = await fetch(`${cfg.API.HOST}/product`, {
    //     method: "POST",
    //     // mode: "no-cors",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       title,
    //       description,
    //       src: "http",
    //     }),
    //   });
    //   console.log(response);
    //   if (!response.ok) throw new Error(response.statusText);
    //   setToast({
    //     txt: "Success",
    //     colorCode: "ok",
    //   });
    //   clearToast();
    // } catch (error) {
    //   setToast({
    //     txt: "error",
    //     colorCode: "warning",
    //   });
    //   clearToast();
    // } finally {
    //   setLoading(false);
    // }

    const formData = new FormData();
    formData.append("img", image);
    formData.append("src", "empty for now");
    formData.append("title", title);
    formData.append("description", description);

    console.log("formData: ", formData.file);
    try {
      const response = await fetch(`${cfg.API.HOST}/product`, {
        //headers are set automatically when body is FormData: 'Content-Type': 'multipart/form-data'
        method: "POST",
        body: formData,
        headers: {
          authorization: `Bearer  ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("r", response);
      if (response.ok) {
        fetchAllProducts();

        setToast({
          txt: `new product created!cool...`,
          colorCode: "ok",
        });
        clearToast();
      } else {
        if (response.status === 401) {
          setToken(null);
          setShowLogin(true);
          alert("session expired, login please");
        }
        setToast({
          txt: `nepavyko sukurti prod`,
          colorCode: "warning",
        });
        clearToast();
      }
      throw new Error("nepavyko sukurti prod");
    } catch (err) {
      console.log(err);
      setToast({
        txt: `nepavyko prisijungti`,
        colorCode: "warning",
      });
      clearToast();
    }
  };
  return (
    <div className="container">
      <h1>Add Product</h1>
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Product Name"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                as="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Product Description"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Img</Form.Label>
              <Form.Control
                required
                type="file"
                onChange={handleImageChange}
                placeholder="Product Name"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button type="submit" disabled={loading}>
            Create Product
          </Button>
          {loading && <Spinner animation="border" color="primary"></Spinner>}
        </Form>
      </Container>
    </div>
  );
}

export default Admin;
