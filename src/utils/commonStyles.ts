import styled from "styled-components";

export const SpanStyle = styled.span`
    padding: 0 5px;
`;
export const TitleSection = styled.div`
    margin-bottom: 8px;
    @media only screen and (min-width: 768px) {
        margin-bottom: 10px;
    }
    @media only screen and (min-width: 1200px) {
        margin-bottom: 12px;
    }
`;
export const Number = styled(SpanStyle)`
    color: ${props => props.theme.red};
`;
export const IssueTitle = styled(SpanStyle)`
    color: ${props => props.theme.green.lighter};
    font-size: 17px;
    padding-bottom: 5px;
    @media only screen and (min-width: 1200px) {
        font-size: 16px;
    }
`;
export const ContentTitle = styled.div`
    display: none;
    vertical-align: middle;
    padding-right: 5px;
    @media only screen and (min-width: 768px) {
        display: inline-block;
    }
`;
export const Comments = styled.div`
    padding: 0 5px;
    .count {
        border-radius: 50%;
        background-color: ${props => props.theme.red};
        width: 35px;
        height: 35px;
        padding: 8px 0;
        display: inline-block;
        vertical-align: middle;
    }
    @media only screen and (min-width: 768px) {
        .count {
            border-radius: 0;
            background-color: transparent;
            width: auto;
            height: auto;
            padding: 0;
            vertical-align: none;
        }
    }
`;