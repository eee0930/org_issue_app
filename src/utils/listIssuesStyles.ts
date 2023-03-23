import styled from "styled-components";

export const IssueListContainer = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 20px auto;
`;
export const Modal = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 50;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  width: 300px;
  height: 100px;
  background-color: #fff;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 100;
  background-color: ${props => props.theme.black.veryDark};
  .col-6 {
    padding: 15px 10px;
  }
  @media only screen and (min-width: 768px) {
    .col-6 {
      padding: 15px;
      text-align: center;
    }
  }
`;
export const Button = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #000;
  font-size: 16px;
  @media only screen and (min-width: 768px) {
    width: 200px;
  }
`;
export const GetButton = styled(Button)`
  border-color: ${props => props.theme.green.darker};
  background-color: ${props => props.theme.green.darker};
  color: ${props => props.theme.white.lighter};
`;
export const ResetButton = styled(Button)`
  border-color: ${props => props.theme.white.lighter};
  background-color: ${props => props.theme.white.lighter};
  color: ${props => props.theme.green.darker};
`;


export const AdImg = styled.img`
    height: 65px;
    width: auto;
    border-radius: 7px;
    @media only screen and (min-width: 768px) {
        width: 300px;
    }
`;
export const IssueBox = styled.div`
    width: 100%;
    min-height: 70px;
    border-radius: 10px;
    margin-bottom: 15px;
    border: 1px solid ${props => props.theme.black.lighter};
    background-color: ${props => props.theme.black.lighter};
    color: ${props => props.theme.white.darker};
    padding: 10px;
    font-size: 15px;
    @media only screen and (min-width: 768px) {
        padding: 12px 15px;
    }
    @media only screen and (min-width: 1200px) {
        padding: 15px 20px;
        font-size: 14px;
    }
`;
export const AdBox = styled(IssueBox)`
    background-color: transparent;
    text-align: center;
    border: none;
    padding: 5px;
`;