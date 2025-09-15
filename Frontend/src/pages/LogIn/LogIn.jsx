import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Form from "../../components/Form";
import ContinueBtn from "../../components/ContinueBtn";
import { FaGoogle } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLoggedIn } from "../../context/LoggedInContext";
import useGet from "../../hooks/useGet";
import { useSubjects } from "../../context/SubjectsContext";

function LogIn() {
  const { setIsLoggedIn } = useLoggedIn();
  const { get } = useGet();
  const { setSubjects } = useSubjects();

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
      type: "password",
      value: "",
      label: "Password",
      error: "",
      onChange: handleOnChange,
    },
  ]);

  const navigateLogin = useNavigate();

  function handleOnChange(e, id) {
    setInputs((prevInputs) =>
      prevInputs.map((input) => {
        return input.id === id ? { ...input, value: e.target.value } : input;
      })
    );
  }
  function assignError(error) {
    setInputs((prevInputs) =>
      prevInputs.map((input) => {
        return { ...input, error: error };
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

    const updatedPasswordInputs = updatedUsernameInputs.map((input) => {
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

    if (formData.username !== "" && formData.password !== "") {
      try {
        const response = await fetch("http://127.0.0.1:8000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",

          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setIsLoggedIn(true);
          navigateLogin("/app");
          const fetchedSubjects = await get("subjects/count");

          setSubjects(fetchedSubjects);
        } else {
          const dataResponse = await response.json();
          assignError(dataResponse.detail);
          alert(dataResponse.detail || "Something went wrong. Try again");
        }
      } catch (err) {
        alert(err.detail[0].msg);
      }
    }
  }

  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <Header></Header>
      {
        <div className="flex flex-col items-center justify-center ">
          <h1 className="text-center my-18">Log In</h1>
          <Form
            inputs={inputs}
            submitText="Log In"
            onSubmit={handleOnSubmit}
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
      }

      <Footer></Footer>
    </div>
  );
}

export default LogIn;
