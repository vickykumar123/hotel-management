import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const StyleSignUpLink = styled.span`
  font-size: 16px;
  font-weight: 500;

  &:hover {
    color: blue;
    border-bottom: 2px solid blue;
  }
`;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLogining } = useLogin();
  function handleSubmit(e) {
    e.preventDefault();
    if (!email && !password) return;
    login({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          disabled={isLogining}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          disabled={isLogining}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">{isLogining ? <SpinnerMini /> : "Login"}</Button>
      </FormRowVertical>

      <StyleSignUpLink>
        <Link to="/signup">Sign-Up</Link>
      </StyleSignUpLink>
    </Form>
  );
}

export default LoginForm;
