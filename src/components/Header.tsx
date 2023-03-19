import styled from "styled-components";
import SelectIssueOrg from "./SelectIssueOrg";
import { useRecoilValue } from "recoil";
import { isDarkThemeState } from "../atoms";
import ThemeButton from "./ThemeButton";

const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;    
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    background-color: ${props => props.theme.black.veryDark};
    height: 60px;
    @media only screen and (min-width: 768px) {
        height: 80px;
    }
    @media only screen and (min-width: 1200px) {
        height: 100px;
    }
`;

function Header() {
    const isDarkTheme = useRecoilValue(isDarkThemeState);
    return (
        <HeaderContainer>
            <SelectIssueOrg />
            <ThemeButton text={isDarkTheme ? "☀️ light" : "dark 🌙"} />
        </HeaderContainer>
    );
}

export default Header;