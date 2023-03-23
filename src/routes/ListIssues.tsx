import { Helmet } from "react-helmet";
import { Loader } from "../utils/globalStyles";
import { useEffect, useState } from "react";
import IssueItems from "../components/IssueItems";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { orgIssueListSetState, selectedOrgState, Iissue, orgIssueSelector } from "../atoms";
import { fetchIssueList } from "../api";
import { Footer, GetButton, IssueListContainer, Modal, ResetButton } from "../utils/listIssuesStyles";

interface INewIssueListSet {
    setId: string;
    page: number;
    issueList: Iissue[];
}

function ListIssues() {
    const setOrgIssueListSet = useSetRecoilState(orgIssueListSetState);
    const [selectedOrg, setSelectedOrg] = useRecoilState(selectedOrgState);
    const orgIssueSelect = useRecoilValue(orgIssueSelector);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => window.scrollTo(0, 0), []);
    
    const settingIssueList = ({ setId, page, issueList }: INewIssueListSet) => {
        const newIssueList = {
            page,
            issueList,
        };
        setOrgIssueListSet((allOrgListSet) => {            
            let newIssueListSet = [];
            if(allOrgListSet[setId] === undefined) {
                newIssueListSet = [newIssueList];
            } else {
                newIssueListSet = [...allOrgListSet[setId], newIssueList];
            }
            return {
                ...allOrgListSet,
                [setId]: newIssueListSet,
            }
        });
        setSelectedOrg((prevOrg) => {
            const newOrg = {
                setId: prevOrg.setId,
                org: prevOrg.org,
                rep: prevOrg.rep,
                page,
            };
            return newOrg;
        });
    };

    const getIssueList = async (page : number) => {        
        document.body.scrollIntoView({behavior: 'smooth', block: 'end'});
        try {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
            const response = await fetchIssueList(selectedOrg.org, selectedOrg.rep, page);
            const args = {
                setId: selectedOrg.setId,
                page,
                issueList: response.data
            } as INewIssueListSet;
            settingIssueList(args);

            const successMsg = `Success! Status: ${response.status}. 
                Rate limit remaining: ${response.headers["x-ratelimit-remaining"]}`;
            console.log(successMsg);
            console.log(selectedOrg.org, selectedOrg.rep, page);
        } catch (error) {
            setIsLoading(false);
            console.log("error", error);
        }
    }; 
    
    const handleReset = () => {
        const setId = selectedOrg.setId;
        setOrgIssueListSet((allOrgListSet: any) => {
            const newIssueList = {
                page: 0,
                issueList: [],
            };
            return {
                ...allOrgListSet,
                [setId]: [newIssueList],
            }
        });
        setSelectedOrg((prevOrg) => {
            const newOrg = {
                setId: prevOrg.setId,
                org: prevOrg.org,
                rep: prevOrg.rep,
                page: 0,
            };
            return newOrg;
        });
    };

    return (<>
        <Helmet>
            <title>List Issues</title>
        </Helmet>
        {isLoading && <Modal>issue 10개 로딩 시작</Modal>}

        {/* ---------------------------[이슈 리스트]--------------------------- */}
        <div className="page-container">
            <IssueListContainer>
                {orgIssueSelect && 
                orgIssueSelect.map((issueSet, i) => 
                <IssueItems key={i} issueList={issueSet.issueList} />)}
            </IssueListContainer>
        </div>

        {/* ---------------------------[버튼 영역]---------------------------- */}
        <Footer>
            <div className="row">
                {/* load button */}
                <div className="col-6">
                    <GetButton onClick={() => getIssueList(selectedOrg.page + 1)}>
                        {isLoading ? (
                            <Loader>
                                <div>
                                    <div></div><div></div>
                                </div>
                            </Loader>
                        ) : (<>
                            LOAD
                        </>)}
                    </GetButton>
                </div>
                {/* reset button */}
                <div className="col-6">
                    <ResetButton onClick={handleReset}>
                        RESET
                    </ResetButton>
                </div>
            </div>
        </Footer>
    </>);
}

export default ListIssues;