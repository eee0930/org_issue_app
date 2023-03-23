import styled from "styled-components";

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