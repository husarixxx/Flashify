import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Form from "../../components/Form";
import ContinueBtn from "../../components/ContinueBtn";
import { FaGoogle } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";

import { useState } from "react";

function LogIn() {
  const [inputs, setInputs] = useState([
    {
      id: crypto.randomUUID(),
      type: "email",
      value: "",
      label: "Email",
      onChange: handleOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "password",
      value: "",
      label: "Password",
      onChange: handleOnChange,
    },
  ]);

  function handleOnChange(e, id) {
    setInputs(
      inputs.map((input) => {
        return input.id === id ? { ...input, value: e.target.value } : input;
      })
    );
  }

  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <Header></Header>
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-center my-18">Log In</h1>
        <Form inputs={inputs} submitText="Log In"></Form>
        <p className="text-center my-8 text-gray-600">or</p>
        <ContinueBtn
          icon={<FaGoogle size={24} />}
          text="Continue with Google"
        ></ContinueBtn>
        <ContinueBtn
          icon={<FaFacebook size={24} />}
          text="Continue with Facebook"
        ></ContinueBtn>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default LogIn;
