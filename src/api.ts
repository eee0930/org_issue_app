import { Octokit } from "octokit";

export const CONTENT_TYPE = "application/json";
export const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const RESPONSE_STATE = "open";
const RESPONSE_SORT = "comments";
const RESPONSE_PER_PAGE = 10;

export const octokit = new Octokit({ 
    auth: GITHUB_TOKEN,
});

export interface IReactions {
    [key: string]: any;
};
interface IUser {
    login: string;
    avatar_url: string;
    html_url: string;
};
export interface IIssueDetails {
    number: number;
    title: string;
    user: IUser;
    created_at: string;
    body: string;
    comments: number;
    reactions: IReactions;
};

export async function fetchIssueList(org: string, rep: string, page: number) {
    const response = await octokit.request("GET /repos/{owner}/{repo}/issues", {
        owner: org,
        repo: rep,
        state: RESPONSE_STATE,
        sort: RESPONSE_SORT,
        per_page: RESPONSE_PER_PAGE, 
        page: page,
        headers: {
            "content-type": CONTENT_TYPE,
        },
    });
    return response;
}

export async function fetchIssueDetail(org: string, rep: string, number: string) {
    const response = await octokit.request("GET /repos/{owner}/{repo}/issues/{issue_number}", {
        owner: org,
        repo: rep,
        issue_number: +number,
        headers: {
            "content-type": CONTENT_TYPE,
        },
    });
    return response;
};


// export function getIssueDetail(owner: string, repo: string, issue_number: number) {
//     return fetch(`${HOST_URL}/repos/${owner}/${repo}/issues/${issue_number}`, {
//         headers: {
//             Authorization: `token ${GITHUB_TOKEN}`,
//             "content-type": CONTENT_TYPE,
//         },
//     }).then((response) => {
//         if (!response.ok) throw new Error(response.statusText);
//         return response.json();
//     });
// };