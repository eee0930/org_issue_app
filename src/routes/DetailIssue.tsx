/* eslint-disable array-callback-return */
import Markdown from 'marked-react';
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { IIssueDetails, IReactions, fetchIssueDetail } from "../api";
import { TitleSection, Number, IssueTitle, Comments, ContentTitle, SpanStyle } from "../utils/commonStyles";
import { DetailBodyContainer, DetailBodyBox, CategorySection, DetailContainer, 
        DetailHeaderBox, ProfileImage, Reaction, ReactionIcon, Reactions } from "../utils/detailIssueStyles";
import { Loader } from "../utils/globalStyles";

interface IParams {
    org: string;
    rep: string;
    number: string;
}

function DetailIssue() {
    const { org, rep, number } = useParams() as unknown as IParams;
    const [issueData, setIssueData] = useState<IIssueDetails>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getIssueDetailData = async () => { 
            try {
                setIsLoading(true);
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
                const response = await fetchIssueDetail(org, rep, number);
                setIssueData((response).data as IIssueDetails);
                const successMsg = `Success! Status: ${response.status}. 
                    Rate limit remaining: ${response.headers["x-ratelimit-remaining"]}`;
                console.log(successMsg);
            } catch (error) {
                setIsLoading(false);
                console.log("error", error);
            }
        };
        window.scrollTo(0, 0);
        getIssueDetailData();
    }, [number, org, rep]);

    return <div className="page-container">
        {isLoading? (
            <DetailBodyContainer>
                <CategorySection>
                    <Link to='/'>{org +  ' - ' +  rep} list </Link>
                </CategorySection>
                <DetailContainer>
                    <Loader>
                        <div>
                            <div></div><div></div>
                        </div>
                    </Loader>
                </DetailContainer>
            </DetailBodyContainer>
        ) : (<>
            <Helmet>
                <title>{issueData?.title}</title>
            </Helmet>
            
            <DetailBodyContainer>
                <CategorySection>
                    <Link to='/'>{org +  ' - ' +  rep} list </Link>
                    / {issueData?.title}
                </CategorySection>
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
                            {issueData?.reactions && 
                                Object.keys(issueData?.reactions as IReactions).map((reaction) => {
                                    if(reaction !== "url" && reaction !== "total_count" 
                                        && issueData?.reactions[reaction] !== 0) {
                                        return <Reaction key={reaction}>
                                            <ReactionIcon className={'icon' + (reaction === '+1'? 'plus' : reaction)}/>
                                            {issueData?.reactions[reaction]}
                                        </Reaction>;
                                    }
                                })
                            }
                        </Reactions>
                    </DetailBodyBox>
                </DetailContainer>
            </DetailBodyContainer>
        </>)}
    </div>;
}

export default DetailIssue;
