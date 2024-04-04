//based on copy - paste is Pavelo :
//https://github.com/pavelVCS/shop/blob/master/src/components/AdminUser/AdminUser.jsx
import React, { useState, useContext } from "react";
import {
  Spinner,
  Offcanvas,
  Form,
  Row,
  Col,
  Button,
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { cfg } from "../../cfg/cfg";
import useAuth from "../../hooks/useAuth";
import { AppContext } from "../../contexts/AppContext";

function AdminUser() {
  const { showLogin, setShowLogin } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setloginError] = useState(false);
  const { token, setToken } = useAuth();

  const handleClose = () => {
    setShowLogin(false);
    setValidated(false);
    setUsername("");
    setPassword("");
  };
  const handleShow = () => setShowLogin(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);

    const form = e.currentTarget;

    if (!form.checkValidity()) return;

    console.log(username, password);

    try {
      setLoading(true);

      const response = await fetch(`${cfg.API.HOST}/user/login`, {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let user = await response.json();
      // console.log("token", user);
      console.log(response.ok);
      if (user?.token) setToken(user.token);
      handleClose();
      if (!response.ok) setloginError(true);
    } catch (err) {
      setloginError(true);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="user" onClick={handleShow}>
        <FontAwesomeIcon icon={faUser} />
      </div>
      <Offcanvas show={showLogin} onHide={handleClose} placement="end">
        {token ? (
          <Offcanvas.Header closeButton closeVariant="white">
            <Offcanvas.Title> Zurueck Wilcommen</Offcanvas.Title>
          </Offcanvas.Header>
        ) : (
          <>
            <Offcanvas.Header closeButton closeVariant="white">
              <Offcanvas.Title>Login</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {loginError && (
                <Alert variant="danger">Nepavyksta prisiloginti</Alert>
              )}
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Form.Group as={Col} controlId="validationCustom01">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Username is required!
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row style={{ marginTop: "1rem" }}>
                  <Form.Group as={Col} controlId="validationCustom02">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Password is required!
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Button
                  style={{ marginTop: "2rem" }}
                  type="submit"
                  disabled={loading}
                >
                  Login
                </Button>
                {loading && <Spinner animation="border" variant="primary" />}
              </Form>
            </Offcanvas.Body>
          </>
        )}
      </Offcanvas>
    </>
  );
}

export default AdminUser;
