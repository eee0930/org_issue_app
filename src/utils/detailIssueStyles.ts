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
export const DetailBodyBox = styled.div`
    padding: 8px;
    width: 100%;
    font-size: 16px;
    line-height: 1.5;
    @media only screen and (min-width: 768px) {
        padding: 12px;
        font-size: 15px;
    }
    a { color: #58a6ff; }
    a:hover { border-bottom: solid 1px #58a6ff; }
    p {margin-bottom: 12px;}
    h1, h2, h3 {
        margin-top: 20px;
        margin-bottom: 12px;
    }
    h1 {
        font-size: 1.6em;
        padding-bottom: 0.3em;
        border-bottom: 1px solid #21262d;
    }
    h2 {
        font-size: 1.5em;
        padding-bottom: 0.3em;
        border-bottom: 1px solid #21262d;
    }
    h3 {font-size: 1.25em;}
    h4 {font-size: 1.2em;}
    h5 {font-size: 1.1em;}
    em {font-style: italic;}
    hr {margin: 20px 0;}
    ul, ol {
        padding-left: 2em; 
        list-style-type: disc;
        margin-bottom: 12px;
    }
    li {display: list-item;}
    img {max-width: 100%;}
`;
export const Reactions = styled.div`
    margin-top: 25px;
    font-size: 14px;
`;
export const Reaction = styled.label`
    padding: 4px 8px;
    border-radius: 15px;
    border: solid 2px ${props => props.theme.black.lighter};
    margin-right: 8px;
`;
export const ReactionIcon = styled.label`
    width: 20px;
    height: 20px;
    padding: 0 10px;
    position: relative;
    margin-right: 4px;
    &:after {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
    }
    &.iconplus:after {
        content: '👍';
    }
    &.icon-1:after {
        content: '👎';
    }
    &.iconlaugh:after {
        content: '😁';
    }
    &.iconhooray:after {
        content: '🎉';
    }
    &.iconconfused:after {
        content: '😕';
    }
    &.iconheart:after {
        content: '❤️';
    }
    &.iconrocket:after {
        content: '🚀';
    }
    &.iconeyes:after {
        content: '👀';
    }   
`;