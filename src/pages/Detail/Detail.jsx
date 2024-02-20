import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { formatDistance } from "date-fns";
import { Comments, Loading } from "../../components";
import ReactMarkdown from "react-markdown";

const Detail = () => {
  const { id } = useParams();

  const fetchIssue = async () => {
    const { data } = await axios.get(
      `https://api.github.com/repos/facebook/create-react-app/issues/${id}`
    );
    return data;
  };

  const {
    isLoading,
    isSuccess,
    data: issue,
  } = useQuery(["issue", id], fetchIssue);

  return (
    <div>
      {/* loading statement */}
      {isLoading && (
        <Loading />
      )}

      {isSuccess && (
        <div className="">
          <div className="md:flex md:space-x-2 text-2xl">
            <h1 className="font-bold">{issue?.title}</h1>
            <span className="">#{issue?.number}</span>
          </div>

          <div className="space-x-1 text-sm text-gray-500">
            <a href={issue?.user?.html_url} className="font-bold">{issue?.user?.login}</a>
            <span className="">opened this issus</span>
            <span className="">
              {formatDistance(new Date(issue.created_at), new Date(), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
      )}

      {/* For Question */}
      {isSuccess && (
        <div className="my-5">
          <div className="space-y-2 md:space-y-0 md:flex md:space-x-3">
            <a href={issue?.user?.html_url} className="">
              <img
                className="w-[50px] h-[50px] rounded-full"
                src={issue?.user?.avatar_url}
                alt=""
              />
            </a>
            <div className="border-2 w-full rounded-lg">
              <div className="space-x-1 text-sm  p-4 border-b-2 bg-gray-100">
                <a href={issue?.user?.html_url} className="font-bold">{issue?.user?.login}</a>
                <span className="">commented</span>
                <span className="">
                  {formatDistance(new Date(issue.created_at), new Date(), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <div className="p-4 w-full markdown-body">
                <ReactMarkdown children={issue?.body} />
              </div>
            </div>
          </div>
        </div>
      )}

      {isSuccess && <div className="border-b"></div>}

      {/* For comments */}
      {isSuccess && <Comments issueNumber={issue?.number} />}

    </div>
  );
};

export default Detail;
