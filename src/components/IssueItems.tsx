import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Iissue, selectedOrgState } from "../atoms";
import { SpanStyle, TitleSection, Number, IssueTitle, ContentTitle, Comments } from "../utils/commonStyles";
import { IssueBox, AdBox, AdImg} from "../utils/listIssuesStyles";

const AD_PATH = `${process.env.PUBLIC_URL}/image/lazy_sleep.png`;
const AD_ERROR_PATH = `${process.env.PUBLIC_URL}/image/no_image.jpg`;
const AD_LINK = 'https://github.com/eee0930/org_issue_app';

interface IIssueList {
  issueList: Iissue[];
}

function IssueItems({ issueList }: IIssueList) {
  const selectedOrg = useRecoilValue(selectedOrgState); 

  // ad image error가 날 경우 해당 이미지를 대신 보여줌
  const handleImgError = (e: any) => {
    e.target.src = AD_ERROR_PATH;
  };

  return (<>
    {issueList && issueList.length > 0 && (<>
      {/* -----------------------[이슈 리스트 one set 영역]--------------------- */}
      {issueList.map((issueItem) => 
      <IssueBox key={issueItem.number}>
        <Link to={`${selectedOrg.org}/${selectedOrg.rep}/${issueItem.number}`}>
          <div className="row">
            <div className="col-10 col-md-9">
              <TitleSection>
                <Number>#{issueItem.number}</Number> 
                <IssueTitle>{issueItem.title}</IssueTitle>
              </TitleSection>
              <div>
                <SpanStyle>
                  <ContentTitle>writer : </ContentTitle>
                  {issueItem.user.login}
                </SpanStyle>
                <SpanStyle>
                  <ContentTitle>date : </ContentTitle>
                  {issueItem.created_at.slice(0, 10)}
                </SpanStyle>
              </div>
            </div>
            <div className="col-2 col-md-3 text-center align-self-center">
              <Comments>
                <ContentTitle className="title">comment : </ContentTitle>
                <div className="count">{issueItem.comments}</div>
              </Comments>
            </div>
          </div>
        </Link>
      </IssueBox>)}
      {/* -----------------------------[광고 영역]---------------------------- */}
      <AdBox>
        <a href={AD_LINK} target="_blank" rel="noopener noreferrer">
          <AdImg src={AD_PATH} onError={handleImgError}/> 
        </a>
      </AdBox>
    </>)}
  </>);
}

export default IssueItems;