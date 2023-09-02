import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 12.5rem;
  width: auto;
  border-radius: 50%;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/vickyLogo.png" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
