import axios from "axios";
import { useQuery } from "react-query";
import { IconClose, IconOpen, IssueList, Loading } from "../../components";
import { useState } from "react";
import "../../github-markdown.css"

const Issue = () => {
  const [filter, setFilter] = useState("open");

  const fetchIssues = async () => {
    const { data } = await axios.get(
      `https://api.github.com/repos/facebook/create-react-app/issues?per_page=10&state=${filter}`
    );
    return data;
  };

  const fetchIssuesOpen = async () => {
    const { data } = await axios.get(
      `https://api.github.com/search/issues?q=repo:facebook/create-react-app+type:issue+state:open&per_page=1`
    );
    return data;
  }; 

  const fetchIssuesClosed = async () => {
    const { data } = await axios.get(
      `https://api.github.com/search/issues?q=repo:facebook/create-react-app+type:issue+state:closed&per_page=1`
    );
    return data;
  };

  const {
    isLoading,
    isSuccess,
    data: issues,
  } = useQuery(["issues", filter], fetchIssues);

  const { isSuccess: isSuccessIssuesOpen, data: issuesOpen } = useQuery(
    "issuesOpen",
    fetchIssuesOpen
  );

  const { isSuccess: isSuccessIssuesClosed, data: issuesClosed } = useQuery(
    "issuesClosed",
    fetchIssuesClosed
  );

  return (
    <div className="">

      {/* loading statement */}
      {isLoading && <Loading />}

      {isSuccess && (
        <div className="border-2 rounded-lg">
          <div className="p-4 bg-gray-100">
            <a href="https://github.com/facebook/create-react-app" className="text-xl mb-3 text-blue-600 font-bold">
              facebook/create-react-app
            </a>

            <div className="flex space-x-2">
              <button
                onClick={() => setFilter("open")}
                className="flex space-x-2"
              >
                <IconOpen />
                <span className={filter === "open" ? "font-bold" : ""}>
                    { isSuccessIssuesOpen && <span>{issuesOpen.total_count} Open</span>}
                </span>
              </button>

              <button
                onClick={() => setFilter("closed")}
                className="flex space-x-2"
              >
                <IconClose />
                <span className={filter === "closed" ? "font-bold" : ""}>
                    { isSuccessIssuesClosed && <span>{issuesClosed.total_count} Closed</span>}
                </span>
              </button>
            </div>
          </div>

          {issues.map((issue) => (
            <div key={issue.id} className="border p-4 flex justify-between items-center">
              <IssueList issue={issue} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Issue;
