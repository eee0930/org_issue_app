import { createHashRouter } from "react-router-dom";
import App from "./App";
import ErrorComponent from "./components/ErrorComponent";
import DetailIssue from "./routes/DetailIssue";
import ListIssues from "./routes/ListIssues";
import NotFound from "./routes/NotFound";
// routes


const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <ListIssues />,
                errorElement: <ErrorComponent />,
            },{
                path: "issue/:number",
                element: <DetailIssue />,
                errorElement: <ErrorComponent />,
            }
        ],
        errorElement: <NotFound />,    
    }
]);


export default router;