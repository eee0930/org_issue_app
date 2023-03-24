import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkThemeState } from "../atoms";

const Button = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 23px;
  border: solid 2px ${props => props.theme.green.lighter};
  font-size: 13px;
  background-color: transparent;
  color: ${props => props.theme.white.lighter};
  position: absolute;
  top: calc(50% - 20px);
  right: 20px;
`;

interface IThemeButton {
  text: string;
}
function ThemeButton({text}: IThemeButton) {
  const setTheme = useSetRecoilState(isDarkThemeState);
  const handleThemeButton = () => {
    setTheme((prev) => !prev);
  };
  
  return (
    <Button onClick={handleThemeButton}>
      {text}
    </Button>
  );   
}

export default ThemeButton;