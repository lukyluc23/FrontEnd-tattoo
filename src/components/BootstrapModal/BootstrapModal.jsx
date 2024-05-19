import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateProfile } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { InputC } from "../InputC/InputC";

// eslint-disable-next-line react/prop-types
function BootstrapModal({ profileData, inputHandler, token }) {
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
    setTimeout(() => {
      navigate("/profile");
    });

    console.log("close");
    setShow(false);
  };
  const handleUpdate = async () => {
    try {
      await updateProfile(profileData, token);
      console.log("usuario actualizado");
      setTimeout(() => {
        setShow(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Modificar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edita tus datos!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputC
            typeProp="text"
            nameProp="name"
            placeholderProp="name"
            // eslint-disable-next-line react/prop-types
            value={profileData.firstName}
            isDisabled=""
            handlerProp={inputHandler}
          />
          <InputC
            typeProp="email"
            nameProp="email"
            placeholderProp="email"
            // eslint-disable-next-line react/prop-types
            value={profileData.email}
            isDisabled=""
            handlerProp={inputHandler}
          />
          <InputC
            typeProp="text"
            nameProp="role"
            placeholderProp="role"
            // eslint-disable-next-line react/prop-types
            value={profileData.role.name}
            isDisabled="disabled"
            handlerProp={inputHandler}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BootstrapModal;
