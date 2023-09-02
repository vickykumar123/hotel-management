import { styled } from "styled-components";
import LoginSignup from "../features/authentication/LoginSingup";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";

const StyledSignup = styled.div`
  /* margin-top: 50px; */
  min-height: 100vh;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  background-color: var(--color-grey-50);
`;

export default function SignUp() {
  return (
    <StyledSignup>
      <Logo />
      <Heading as="h4">Sign-Up</Heading>
      <LoginSignup />
    </StyledSignup>
  );
}
