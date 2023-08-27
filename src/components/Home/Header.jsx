import styled from "styled-components";
import { AwesomeButton } from 'react-awesome-button';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Space } from "antd";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: arial black; 
  background-color: #D7F9F8;
`;
const Content = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 20px 20px 0px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Subtitle = styled.div`
  margin-top: 30px;
  font-size: 75px;
  text-align: center;
  margin-bottom: 30px;
  @media screen and (min-width: 768px) {
    font-size: 65px;
  }
`;

const ButtonContainer = styled.div`
  /* height: 150px; */
  margin-bottom: 200px;
  /* animation: 1s fadeIn 0s; */
`;
const MouseScroll = styled.div`
  z-index: 3;
  transition: opacity 0.5s ease;
`;

const StyledAwesomeButton = styled(AwesomeButton)`
    width: 200px;
    background-color: #78938a;
    padding: 30px 30px 30px 30px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.85);
    border: 3px solid #92BA92;
`;

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [vh, setVh] = useState(window.visualViewport.height * 0.01);
    useEffect(() => {
      if (typeof window !== 'undefined') {
        window.addEventListener('scroll', () =>
          setScrolled(window.pageYOffset > 10)
        );
      }
    }, []);

return (
    <Container vh={vh}>
      <Content>
        <Subtitle className="subtitle">
          <span>THE COVE NETWORK</span>
        </Subtitle>
        <ButtonContainer>
          <Space size={20} wrap>
            <Link to="Trade">
              <StyledAwesomeButton type="primary">Trade</StyledAwesomeButton>
            </Link>
            <Link to="chest">
              <StyledAwesomeButton type="primary">Deposit</StyledAwesomeButton>
            </Link>
          </Space>
        </ButtonContainer>
        <MouseScroll scrolled={scrolled}>
          <div className="icon-scroll" />
        </MouseScroll>
      </Content>
    </Container>
  );
};

export default Header;