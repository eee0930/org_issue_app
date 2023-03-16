import { useState } from "react";
import { useMatch } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { issueNameState, orgIssueListSetState, selectedOrgState } from "../atoms";

const Select = styled.select`
    width: 135px;
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
    const orgIssueListSet = useRecoilValue(orgIssueListSetState);
    const getIssueNames = useRecoilValue(issueNameState);
    const [selectedOrg, setSelectedOrg] = useRecoilState(selectedOrgState);
    const [issueRepList, setIssueRepList] = useState(getIssueNames[selectedOrg.org]);
    
    const detialPageMatch = useMatch('/:org/:rep/:number');

    const getNowIssuePage = (nowSetId: string) => {
        let issuePage = 0;
        if(orgIssueListSet[nowSetId] !== undefined) {
            const lastIndex = orgIssueListSet[nowSetId].length - 1;
            const thisPage = orgIssueListSet[nowSetId][lastIndex].page as number;
            issuePage = thisPage;
        }
        return issuePage;
    };
    const handleOrgChange = (event:React.FormEvent<HTMLSelectElement>) => {
        const value = event.currentTarget.value as string;
        const newIssueRepList = getIssueNames[value];
        const nowSetPage = getNowIssuePage(`${value}_0`) as number;
        setIssueRepList(newIssueRepList);
        const newIssueOrg = {
            setId: `${value}_0`,
            org: value,
            rep: newIssueRepList[0],
            page: nowSetPage,
        }
        setSelectedOrg(newIssueOrg);
    };
    const handleRepChange = (event:React.FormEvent<HTMLSelectElement>) => {
        const value = event.currentTarget.value;
        setSelectedOrg((prevOrg) => {
            const nowSetPage = getNowIssuePage(`${prevOrg.org}_${value}`) as number;
            const newOrg = {
                setId: `${prevOrg.org}_${value}`,
                org: prevOrg.org,
                rep: getIssueNames[prevOrg.org][+value],
                page: nowSetPage,
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