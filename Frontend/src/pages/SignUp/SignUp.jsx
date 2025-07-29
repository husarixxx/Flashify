import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Form from "../../components/Form";
import ContinueBtn from "../../components/ContinueBtn";
import { FaGoogle } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import MainButton from "../../components/MainButton";
import { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [success, setSucces] = useState("");
  const [error, setError] = useState("");

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

  async function handleOnSubmit(e) {
    e.preventDefault();

    const usernameRegex = /^[\w-]{5,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    const updatedUsernameInputs = inputs.map((input) => {
      if (input.label === "Username") {
        return usernameRegex.test(input.value)
          ? { ...input, error: "" }
          : {
              ...input,
              error: "Username must be between 5 and 20 characters.",
            };
      } else return input;
    });
    const updatedEmailInputs = updatedUsernameInputs.map((input) => {
      if (input.label === "Email") {
        return emailRegex.test(input.value)
          ? { ...input, error: "" }
          : { ...input, error: "Invalid email" };
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
    console.log(formData);

    if (
      formData.email !== "" &&
      formData.username !== "" &&
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
          setSucces("Account created!");
        } else {
          setError("Something went wrong. Try again");
        }
      } catch (err) {
        setError("Server connection error");
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
            <MainButton text={"Log In"} styles={"px-10 lg:px-16 py-2.5 my-8"} />
          </Link>
        </div>
      )}
      <Footer></Footer>
    </div>
  );
}

export default SignUp;
