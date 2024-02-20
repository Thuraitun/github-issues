import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { IconClose, IconOpen } from "../../components";
import { useState } from "react";
import { formatDistance } from 'date-fns';
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
      {isLoading && <div className="text-3xl text-red-500 my-40 text-center">Loading...</div>}

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
              <div className="flex space-x-2">
                {issue?.state === "open" && <IconOpen />}
                {issue?.state === "closed" && <IconClose />}

                <div className="">
                  <Link
                    to={`issue/${issue?.number}`}
                    className="font-bold hover:text-blue-600"
                  >
                    {issue?.title}
                  </Link>
                  <div className="space-x-1 text-sm text-gray-500">
                    <span className="">#{issue?.number}</span>
                    <span className="">{issue?.state}</span>
                    <span className="">{formatDistance(new Date(issue.created_at), new Date(), {
                        addSuffix: true,
                      })}</span>
                    <span className="">by {issue?.user?.login}</span>
                  </div>
                </div>
              </div>
              {issue.comments > 0 && (
                <Link
                  to={`issue/${issue?.number}`}
                  className="flex space-x-1 hover:text-blue-500 hover:font-bold"
                >
                  <span className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                      />
                    </svg>
                  </span>
                  <span className="">{issue?.comments}</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Issue;
