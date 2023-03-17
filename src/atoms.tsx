import { atom, selector } from "recoil";
import { recoilPersist } from 'recoil-persist';

interface ISelectedOrg {
    setId: string;
    org: string;
    rep: string;
    page: number;
};
interface IIssueName {
    [key: string]: string[];
};
interface IUser {
    login: string;
};
export interface Iissue {
    number: number;
    title: string;
    created_at: string;
    user: IUser;
    comments: number;
};
export interface IIssueList {
    page: number;
    issueList: Iissue[];
};
export interface IOrgIssueList {
    [key: string]: IIssueList[];
};

const { persistAtom } = recoilPersist({
    key: 'issueListSet',
    storage: localStorage,
});

export const isDarkThemeState = atom({
    key: "defaultTheme",
    default: true,
});

export const issueNameState = atom<IIssueName>({
    key: "issueName",
    default: {
        "reactjs": ["reactjs.org"],
        "Angular": ["angular", "components", "angular-cli"],
        "microsoft": ["TypeScript", "vscode"],
    },
});

export const selectedOrgState = atom<ISelectedOrg>({
    key: "selectedOrg",
    default: {
        setId: "reactjs_0",
        org: "reactjs",
        rep: "reactjs.org",
        page: 1,
    },
    effects_UNSTABLE: [persistAtom],
});

export const orgIssueListSetState = atom<IOrgIssueList>({
    key: "issueListSet",
    default: {},
    effects_UNSTABLE: [persistAtom],
});

export const orgIssueSelector = selector({
    key: "orgIssueSelector",
    get: ({ get }) => {
        const selectedOrg = get(selectedOrgState);
        const orgIssueListSet = get(orgIssueListSetState);
        return orgIssueListSet[selectedOrg.setId];
    },
});