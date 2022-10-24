import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { PromptProps } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import store from "../../store";
import userEvent from "@testing-library/user-event";

import AuthForm from "./AuthForm";

const TestWrapper = (props) => {
  return (
    <Provider store={store}>
      <BrowserRouter>{props.children}</BrowserRouter>
    </Provider>
  );
};

describe("AuthForm Component", () => {
  test("render Log in titles and buttons", () => {
    render(
      <TestWrapper>
        <AuthForm />
      </TestWrapper>
    );

    const passwordText = screen.getByText("Create new account");
    const formTitle = screen.getByRole("heading", {
      name: "Log In",
    });
    const submitButtonText = screen.getByRole("button", { name: "Log In" });
    expect(passwordText).toBeInTheDocument;
    expect(formTitle).toBeInTheDocument;
    expect(submitButtonText).toBeInTheDocument;
  });
  test("render Sign up title and buttons", () => {
    render(
      <TestWrapper>
        <AuthForm />
      </TestWrapper>
    );

    const buttonElement = screen.getByRole("button", {
      name: "Create new account",
    });
    userEvent.click(buttonElement);

    const passwordText = screen.getByText("Login with existing account");
    const formTitle = screen.getByRole("heading", {
      name: "Sing In",
    });
    const submitButtonText = screen.getByRole("button", { name: "Sing In" });
    expect(passwordText).toBeInTheDocument;
    expect(formTitle).toBeInTheDocument;
    expect(submitButtonText).toBeInTheDocument;
  });

  test("render password and email error message when submiting empty form", () => {
    render(
      <TestWrapper>
        <AuthForm />
      </TestWrapper>
    );

    const sumbitButton = screen.getByRole("button", { name: "Log In" });
    userEvent.click(sumbitButton);

    const passwordErrorText = screen.getByText("Wrong Password", {
      exact: false,
    });
    const emailErrorText = screen.getByText("Wrong Email", {
      exact: false,
    });
    expect(emailErrorText).toBeInTheDocument;
    expect(passwordErrorText).toBeInTheDocument;
  });
  test("render email error with password inserted corectly", () => {
    render(
      <TestWrapper>
        <AuthForm />
      </TestWrapper>
    );

    const sumbitButton = screen.getByRole("button", { name: "Log In" });
    const passwordInput = screen.getByLabelText("Your Password");
    userEvent.type(passwordInput, "aaaaaaaaaa");
    userEvent.click(sumbitButton);

    const emailErrorText = screen.getByText("Wrong Email", {
      exact: false,
    });
    expect(emailErrorText).toBeInTheDocument;
  });
});
