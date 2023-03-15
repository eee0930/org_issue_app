import { useState } from "react";
import { useMatch } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { issueNameState, selectedOrgState } from "../atoms";

const Select = styled.select`
    width: 130px;
    font-size: 17px;
    padding: 5px 8px 7px;
    border-radius: 5px;
    border: solid 2px ${props => props.theme.green.darker};
    color: ${props => props.theme.green.darker};
    background-color: transparent;
    margin: 0 5px;
    option: {
        color: ${props => props.theme.green.darker};
    }
`;

function SelectIssueOrg() {
    const getIssueNames = useRecoilValue(issueNameState);
    const [selectedOrg, setSelectedOrg] = useRecoilState(selectedOrgState);
    const [issueRepList, setIssueRepList] = useState(getIssueNames[selectedOrg.org]);
    const detialPageMatch = useMatch('/issue/:number');

    const handleOrgChange = (event:React.FormEvent<HTMLSelectElement>) => {
        const value = event.currentTarget.value as string;
        const newIssueRepList = getIssueNames[value];
        setIssueRepList(newIssueRepList);
        const newIssueOrg = {
            setId: `${value}_0`,
            org: value,
            rep: newIssueRepList[0],
        }
        setSelectedOrg(newIssueOrg);
    };
    const handleRepChange = (event:React.FormEvent<HTMLSelectElement>) => {
        const value = event.currentTarget.value;
        setSelectedOrg((prevOrg) => {
            const newOrg = {
                setId: `${prevOrg.org}_${value}`,
                org: prevOrg.org,
                rep: getIssueNames[prevOrg.org][+value],
            }
            return newOrg;
        });
    };
    return (<>
        <Select defaultValue={selectedOrg.org} onChange={handleOrgChange} 
            disabled={detialPageMatch !== null}>
            {Object.keys(getIssueNames).map((orgName) => 
                <option key={orgName} value={orgName} >
                    {orgName}
                </option>
            )}
        </Select>
        <Select defaultValue={selectedOrg.rep} onChange={handleRepChange} 
            disabled={detialPageMatch !== null}>
            {issueRepList.map((rep, i) => 
                <option key={rep} value={i} >
                    {rep}
                </option>
            )}
        </Select>
    </>);
}

export default SelectIssueOrg;