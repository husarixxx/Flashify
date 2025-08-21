import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Container from "../../components/Container";
import Form from "../../components/Form";
import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import UploadButton from "./UploadInput";
import MainButton from "../../components/MainButton";

function Settings() {
  const user = {
    img: <FaRegUserCircle size={80} />,
    username: "username",
  };

  const [nameInputs, setNameInputs] = useState([
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "New username",
      error: "",
      onChange: handleUsernameOnChange,
    },
  ]);

  const [passwordInputs, setPasswordInputs] = useState([
    {
      id: crypto.randomUUID(),
      type: "email",
      value: "",
      label: "Email",
      error: "",
      onChange: handlePasswordOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "password",
      value: "",
      label: "Password",
      error: "",
      onChange: handlePasswordOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "password",
      value: "",
      label: "New password",
      error: "",
      onChange: handlePasswordOnChange,
    },
  ]);
  const [emailInputs, setEmailInputs] = useState([
    {
      id: crypto.randomUUID(),
      type: "email",
      value: "",
      label: "Email",
      error: "",
      onChange: handleEmailOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "password",
      value: "",
      label: "Password",
      error: "",
      onChange: handleEmailOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "email",
      value: "",
      label: "New email",
      error: "",
      onChange: handleEmailOnChange,
    },
  ]);
  function handleUsernameOnChange(e, id) {
    setNameInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.id === id ? { ...input, value: e.target.value } : input;
      })
    );
  }

  function handlePasswordOnChange(e, id) {
    setPasswordInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.id === id ? { ...input, value: e.target.value } : input;
      })
    );
  }
  function handleEmailOnChange(e, id) {
    setEmailInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.id === id ? { ...input, value: e.target.value } : input;
      })
    );
  }
  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <Header></Header>
      <div className="max-w-[800px] mx-4 md:mx-auto mt-6">
        <Container>
          <h2>Profile</h2>
          <div className="flex flex-col sm:flex-row justify-around gap-14 mb-4">
            <div className="flex flex-col">
              <h3>Username</h3>
              <Form
                inputs={nameInputs}
                submitText={"Update username"}
                styles={" grow justify-between h-full"}
              ></Form>
            </div>
            <div>
              <h3>Profile image</h3>
              <form className="flex flex-col justify-center items-center gap-4 p-2">
                {user.img}
                <UploadButton></UploadButton>
                <MainButton
                  text={"Change image"}
                  styles={"w-full px-8 py-2 mt-4"}
                ></MainButton>
              </form>
            </div>
          </div>
        </Container>
        <Container>
          <h2>Account</h2>
          <div className="flex flex-col sm:flex-row justify-around gap-14 mb-4">
            <div className="px-4">
              <h3>Email</h3>
              <Form inputs={emailInputs} submitText={"Update email"}></Form>
            </div>
            <div className="px-3">
              <h3>Password</h3>
              <Form
                inputs={passwordInputs}
                submitText={"Update password"}
              ></Form>
            </div>
          </div>
        </Container>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Settings;
