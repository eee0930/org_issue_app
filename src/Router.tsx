import { createHashRouter } from "react-router-dom";
import App from "./App";
import DetailIssue from "./routes/DetailIssue";
import ListIssues from "./routes/ListIssues";
// routes


const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <ListIssues />,
            },{
                path: "issue/:number",
                element: <DetailIssue />,
            }
        ],
    }
]);


export default router;