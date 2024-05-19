import { useEffect, useState } from "react";
import { bringProfile, updateProfile } from "../../services/apiCalls";
import { inputValidator } from "../../utils/validators";
import BootstrapModal from "../../components/BootstrapModal/BootstrapModal";
import { useSelector } from "react-redux";
import { getUserData } from "../../app/slices/userSlice";
import { InputC } from "../../components/InputC/InputC";

export const Profile = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    email: "",
    role: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");

  //   const useDispatch = useDispatch();

  const myPassport = useSelector(getUserData);
  const token = myPassport.token;

  const inputHandler = (e) => {
    setProfileData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const myProfileData = await bringProfile(token);
      console.log(myProfileData);
      setProfileData(myProfileData);
    };
    fetchProfile();
  }, []);

  const updateProfileHandler = () => {
    if (
      !inputValidator(profileData.name, "firstName") ||
      !inputValidator(profileData.email, "email")
    ) {
      console.log("nombre o email no válidos");
      // setErrorMessage("No se pueden actualizar los datos");
      return;
    }
    try {
      updateProfile(profileData, token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <InputC
        typeProp="text"
        nameProp="name"
        placeholderProp="name"
        value={profileData.firstName}
        isDisabled={!isEditing}
        handlerProp={inputHandler}
      />
      <InputC
        typeProp="email"
        nameProp="email"
        placeholderProp="email"
        value={profileData.email}
        isDisabled={!isEditing}
        handlerProp={inputHandler}
      />
      <InputC
        typeProp="text"
        nameProp="role"
        placeholderProp="role"
        value={profileData.role.name}
        isDisabled="disabled"
        handlerProp={inputHandler}
      />
      {isEditing ? (
        <div className="button-container">
          <button onClick={() => updateProfileHandler()}>Guardar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      ) : (
        <>
          <BootstrapModal
            profileData={profileData}
            inputHandler={inputHandler}
            token={token}
          />
        </>
      )}
    </>
  );
};
