import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./user.scss";

function User() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  let tmp = [<h2>Your profile data</h2>];
  let padding = 20;
  function printObj(obj) {
    for (let key in obj) {
      if (typeof obj[key] !== "object") {
        if (key !== "id") {
          tmp.push(
            <p style={{ paddingLeft: padding + "px" }}>
              {key} : {obj[key]}
            </p>
          );
        }
      } else {
        padding += 20;
        tmp.push(<br />);
        tmp.push(
          <h4 style={{ paddingLeft: padding - 20 + "px" }}>
            {key[0].toUpperCase() + key.slice(1)}
          </h4>
        );

        printObj(obj[key]);
      }
    }
    padding -= 20;
    return tmp;
  }

  useEffect(() => {
    const fetchUser = async (id) => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        const data = await response.json();
        console.log(data);
        setUser(data);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => setLoading(false), 1500);
      }
    };
    fetchUser(Math.round(Math.random() * 9) + 1);
  }, []);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  return (
    <>
      {loading ? (
        <Spinner className="spin-bigger" animation="grow" />
      ) : (
        <>
          <div onClick={handleOpen} className="spin-bigger user">
            {user?.name[0]}
          </div>
          <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header
              className="tamsus"
              closeButton
              closeVariant="white"
            >
              <Offcanvas.Title>{user.name}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="labai-tamsus">
              {printObj(user)}
            </Offcanvas.Body>
          </Offcanvas>
        </>
      )}
    </>
  );
}

export default User;
