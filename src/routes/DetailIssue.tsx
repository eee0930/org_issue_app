/* eslint-disable array-callback-return */
import Markdown from 'marked-react';
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { CONTENT_TYPE, IIssueDetails, IReactions, octokit } from "../api";
import { selectedOrgState } from "../atoms";
import { TitleSection, Number, IssueTitle, Comments, ContentTitle, SpanStyle } from "../utils/commonStyles";
import { DetailBodyBox, DetailContainer, DetailHeaderBox, ProfileImage, Reaction, ReactionIcon, Reactions } from "../utils/detailIssueStyles";
import { Loader } from "../utils/globalStyles";

function DetailIssue() {
    const { number } = useParams();
    const selectedOrg = useRecoilValue(selectedOrgState);
    const issueNumber = number as string;
    const [issueData, setIssueData] = useState<IIssueDetails>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
                const response = await octokit.request("GET /repos/{owner}/{repo}/issues/{issue_number}", {
                    owner: selectedOrg.org,
                    repo: selectedOrg.rep,
                    issue_number: +issueNumber,
                    headers: {
                        "content-type": CONTENT_TYPE,
                    },
                });
                setIssueData(response.data as IIssueDetails);
                const successMsg = `Success! Status: ${response.status}. 
                Rate limit remaining: ${response.headers["x-ratelimit-remaining"]}`;
                console.log(successMsg);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log("error", error);
            }
        };
        fetchData();
    }, [issueNumber, selectedOrg.org, selectedOrg.rep]);


    useEffect(() => window.scrollTo(0, 0), []);

    return <div className="page-container">
        {isLoading? (
            <Loader>
                <div>
                    <div></div><div></div>
                </div>
            </Loader>
        ) : (<>
            <Helmet>
                <title>{issueData?.title}</title>
            </Helmet>
            <DetailContainer>
                {/* ------------------[1. 상세보기 헤더 영역]-------------------- */}
                <DetailHeaderBox className="row">
                    <div className="col-auto align-self-center">
                        <ProfileImage 
                            backgroundImage={issueData?.user.avatar_url as string} />
                    </div>
                    <div className="col align-self-center">
                        <TitleSection>
                            <Number>#{issueData?.number}</Number> 
                            <IssueTitle>{issueData?.title}</IssueTitle>
                        </TitleSection>
                        <div>
                            <SpanStyle>
                                <ContentTitle>writer : </ContentTitle>
                                {issueData?.user.login}
                            </SpanStyle>
                            <SpanStyle>
                                <ContentTitle>date : </ContentTitle>
                                {issueData?.created_at.slice(0, 10)}
                            </SpanStyle>
                        </div>
                    </div>
                    <div className="col-2 text-center align-self-center">
                        <Comments>
                            <ContentTitle className="title">comment : </ContentTitle>
                            <div className="count">{issueData?.comments}</div>
                        </Comments>
                    </div>
                </DetailHeaderBox>

                {/* ------------------[2. 상세보기 본문 영역]-------------------- */}
                <DetailBodyBox>
                    <Markdown>{issueData?.body}</Markdown>
                    <Reactions>
                        {Object.keys(issueData?.reactions as IReactions).map((reaction) => {
                            if(reaction !== "url" && reaction !== "total_count" && issueData?.reactions[reaction] !== 0) {
                                return <Reaction key={reaction}>
                                    <ReactionIcon className={'icon' + (reaction === '+1'? 'plus' : reaction)}/>
                                    {issueData?.reactions[reaction]}
                                </Reaction>;
                            }
                        })}
                    </Reactions>
                </DetailBodyBox>
            </DetailContainer>
        </>)}
    </div>;
}

export default DetailIssue;

    // Octokit과 useEffect를 이용하여 데이터 불러오기
    // useEffect 안에서 fetch 함수를 한번 불러옴.
    
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await octokit.rest.issues.get({
    //             owner: "Angular",
    //             repo: "Angular-cli",
    //             issue_number: Number(id),
    //         });
    //         setIssueData(response.data as IIssueData);
    //     };
    //     fetchData();
    // }, [id]);
