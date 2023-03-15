import styled from "styled-components";

export const DetailContainer = styled.div`
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    min-height: 200px;
`;
export const DetailHeaderBox = styled.div`
    margin: 10px 0;
    border-bottom: 1px solid ${props => props.theme.black.lighter};
    >div {
        padding: 8px 4px;
    }
    @media only screen and (min-width: 768px) {
        >div {
            padding: 12px 6px;
        }
    }
`;
export const ProfileImage = styled.div<{ backgroundImage: string }>`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background-image: url(${props => props.backgroundImage});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    @media only screen and (min-width: 768px) {
        width: 50px;
        height: 50px;
        border-radius: 15px;
    }
    @media only screen and (min-width: 1200px) {
        width: 60px;
        height: 60px;
        border-radius: 20px;
    }
`;