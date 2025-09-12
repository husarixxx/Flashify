import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Form from "../../components/Form";
import ContinueBtn from "../../components/ContinueBtn";
import { FaGoogle } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import MainButton from "../../components/MainButton";
import { useState } from "react";
import { Link } from "react-router-dom";

import validator from "validator";

function SignUp() {
  const [success, setSucces] = useState("");
  const [inputs, setInputs] = useState([
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "Username",
      error: "",
      onChange: handleOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "email",
      value: "",
      label: "Email",
      error: "",
      onChange: handleOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "password",
      value: "",
      label: "Password",
      error: "",
      onChange: handleOnChange,
    },
  ]);

  function handleOnChange(e, id) {
    setInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.id === id ? { ...input, value: e.target.value } : input;
      })
    );
  }

  function assignError(error) {
    const errorLower = error.toLowerCase();
    if (errorLower.includes("username"))
      setInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Username"
            ? { ...input, error: error }
            : input;
        })
      );
    else if (errorLower.includes("email"))
      setInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Email" ? { ...input, error: error } : input;
        })
      );
  }

  async function handleOnSubmit(e) {
    e.preventDefault();

    const usernameRegex = /^[\w-]{8,20}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    const updatedUsernameInputs = inputs.map((input) => {
      if (input.label === "Username") {
        return usernameRegex.test(input.value)
          ? { ...input, error: "" }
          : {
              ...input,
              error: "Username must be between 8 and 20 characters.",
            };
      } else return input;
    });
    const updatedEmailInputs = updatedUsernameInputs.map((input) => {
      if (input.label === "Email") {
        return validator.isEmail(input.value)
          ? { ...input, error: "" }
          : { ...input, error: "You have enter valid email" };
      } else return input;
    });
    const updatedPasswordInputs = updatedEmailInputs.map((input) => {
      if (input.label === "Password") {
        return passwordRegex.test(input.value)
          ? { ...input, error: "" }
          : {
              ...input,
              error:
                "Password must include at least 1 uppercase letter, 1 number, and be 8+ characters long.",
            };
      } else return input;
    });
    setInputs(updatedPasswordInputs);

    const formData = updatedPasswordInputs.reduce((acc, input) => {
      const key = input.label.toLowerCase();
      acc[key] = input.error ? "" : input.value;
      return acc;
    }, {});

    if (
      formData.username !== "" &&
      formData.email !== "" &&
      formData.password !== ""
    ) {
      try {
        const response = await fetch("http://127.0.0.1:8000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSucces("Account created succesfuly!");
        } else {
          const dataResponse = await response.json();
          assignError(dataResponse.detail);
        }
      } catch (err) {
        alert(err.detail[0].msg || "Server connection error");
      }
    }
  }

  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <Header></Header>
      {!success ? (
        <div className="flex flex-col items-center justify-center ">
          <h1 className="text-center my-18">
            Sign Up for <span className="text-purple-600">Flashify</span>
          </h1>
          <Form
            inputs={inputs}
            onSubmit={handleOnSubmit}
            submitText="Sign Up"
          ></Form>
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
      ) : (
        <div className="flex flex-col items-center justify-center p-4">
          <h1 className="text-center ">{success}</h1>
          <Link to={"../log-in"}>
            <MainButton text={"Log In"} styles={"px-15 lg:px-20 py-3 my-8"} />
          </Link>
        </div>
      )}
      <Footer></Footer>
    </div>
  );
}

export default SignUp;
