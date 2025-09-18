import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Container from "../../components/Container";
import Form from "../../components/Form";
import { useState } from "react";
import UploadButton from "./UploadInput";
import MainButton from "../../components/MainButton";
import { useUser } from "../../context/UserContext";
import usePut from "../../hooks/usePut";
import validator from "validator";
import { usePost } from "../../hooks/usePost";
import { useLoggedIn } from "../../context/LoggedInContext";

// TODO: Uploading image for profile. Currently it's not working

function Settings() {
  const { user, setUser } = useUser();
  const { put, error: errorPut } = usePut();
  const { post } = usePost();
  const { setIsLoggedIn } = useLoggedIn();
  const [nameInputs, setNameInputs] = useState([
    {
      id: crypto.randomUUID(),
      type: "text",
      value: "",
      label: "New username",
      error: "",
      onChange: handleUsernameOnChange,
    },
    {
      id: crypto.randomUUID(),
      type: "password",
      value: "",
      label: "Password",
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

  async function handleUsernameOnSubmit(e) {
    e.preventDefault();

    const usernameRegex = /^[\w-]{8,20}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    let isRdyToSend = true;

    const usernameInput = nameInputs.find(
      (input) => input.label === "New username"
    );
    const passwordInput = nameInputs.find(
      (input) => input.label === "Password"
    );

    if (!usernameRegex.test(usernameInput.value)) {
      setNameInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "New username"
            ? {
                ...input,
                error: "New username must be between 8 and 20 characters",
              }
            : input;
        })
      );
      isRdyToSend = false;
    } else {
      setNameInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "New username"
            ? { ...input, error: "" }
            : input;
        })
      );
    }

    if (!passwordRegex.test(passwordInput.value)) {
      setNameInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Password"
            ? {
                ...input,
                error:
                  "Password must include at least 1 uppercase letter, 1 number, and be 8+ characters long.",
              }
            : input;
        })
      );
      isRdyToSend = false;
    } else {
      setNameInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Password" ? { ...input, error: "" } : input;
        })
      );
    }

    if (isRdyToSend) {
      const formData = {
        new_username: usernameInput.value,
        password: passwordInput.value,
      };

      await put(formData, `user/username`);
      if (errorPut !== null) {
        alert(errorPut.detail[0].msg);
        return;
      }
      setUser({ ...user, username: formData.new_username });
    } else return;
  }
  async function handleEmailOnSubmit(e) {
    e.preventDefault();

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    let isRdyToSend = true;

    const emailInput = emailInputs.find((input) => input.label === "Email");
    const passwordInput = emailInputs.find(
      (input) => input.label === "Password"
    );
    const newEmailInput = emailInputs.find(
      (input) => input.label === "New email"
    );

    if (!validator.isEmail(emailInput.value)) {
      setEmailInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Email"
            ? {
                ...input,
                error: "You have to enter valid email",
              }
            : input;
        })
      );
      isRdyToSend = false;
    } else if (emailInput.value !== user.email) {
      setEmailInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Email"
            ? {
                ...input,
                error: "You have to enter your current email",
              }
            : input;
        })
      );
      isRdyToSend = false;
    } else {
      setEmailInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Email" ? { ...input, error: "" } : input;
        })
      );
    }

    if (!passwordRegex.test(passwordInput.value)) {
      setEmailInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Password"
            ? {
                ...input,
                error:
                  "Password must include at least 1 uppercase letter, 1 number, and be 8+ characters long",
              }
            : input;
        })
      );
      isRdyToSend = false;
    } else {
      setNameInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Password" ? { ...input, error: "" } : input;
        })
      );
    }
    if (!validator.isEmail(newEmailInput.value)) {
      setEmailInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "New email"
            ? {
                ...input,
                error: "You have to enter valid email",
              }
            : input;
        })
      );
      isRdyToSend = false;
    } else {
      setNameInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "New email" ? { ...input, error: "" } : input;
        })
      );
    }

    if (isRdyToSend) {
      const formData = {
        email: emailInput.value,
        password: passwordInput.value,
        new_email: newEmailInput.value,
      };

      await put(formData, `user/email`);

      if (errorPut !== null) {
        alert(errorPut.detail[0].msg);
        return;
      }
      setUser({ ...user, email: formData.new_email });
    } else return;
  }

  async function handlePasswordOnSubmit(e) {
    function logOut() {
      post({}, "logout");
      setIsLoggedIn(false);
    }
    e.preventDefault();

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    let isRdyToSend = true;

    const emailInput = passwordInputs.find((input) => input.label === "Email");
    const passwordInput = passwordInputs.find(
      (input) => input.label === "Password"
    );
    const newPasswordInput = passwordInputs.find(
      (input) => input.label === "New password"
    );

    if (!validator.isEmail(emailInput.value)) {
      setPasswordInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Email"
            ? {
                ...input,
                error: "You have to enter valid email",
              }
            : input;
        })
      );
      isRdyToSend = false;
    } else {
      setPasswordInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Email" ? { ...input, error: "" } : input;
        })
      );
    }

    if (!passwordRegex.test(passwordInput.value)) {
      setPasswordInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Password"
            ? {
                ...input,
                error:
                  "Password must include at least 1 uppercase letter, 1 number, and be 8+ characters long",
              }
            : input;
        })
      );
      isRdyToSend = false;
    } else {
      setPasswordInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "Password" ? { ...input, error: "" } : input;
        })
      );
    }
    if (!passwordRegex.test(newPasswordInput.value)) {
      setPasswordInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "New password"
            ? {
                ...input,
                error:
                  "Password must include at least 1 uppercase letter, 1 number, and be 8+ characters long",
              }
            : input;
        })
      );
      isRdyToSend = false;
    } else {
      setPasswordInputs((prevInputs) =>
        prevInputs.map((input) => {
          return input.label === "New password"
            ? { ...input, error: "" }
            : input;
        })
      );
    }

    if (isRdyToSend) {
      const formData = {
        email: emailInput.value,
        old_password: passwordInput.value,
        new_password: newPasswordInput.value,
      };

      await put(formData, `user/password`);

      if (errorPut !== null) {
        alert(errorPut.detail[0].msg);
        return;
      }
      logOut();
    } else return;
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
                onSubmit={handleUsernameOnSubmit}
              ></Form>
            </div>
            <div className="flex flex-col justify-between">
              <h3>Profile image</h3>
              <form className="flex flex-col justify-center items-center gap-4 p-2">
                {<user.img size={80} />}
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
              <Form
                inputs={emailInputs}
                submitText={"Update email"}
                onSubmit={handleEmailOnSubmit}
              ></Form>
            </div>
            <div className="px-3">
              <h3>Password</h3>
              <Form
                inputs={passwordInputs}
                submitText={"Update password"}
                onSubmit={handlePasswordOnSubmit}
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
