import axios from "axios";
import { useQuery } from "react-query";
import { formatDistance } from "date-fns";
import ReactMarkdown from 'react-markdown';

const Comments = ({ issueNumber }) => {
  const fetchComments = async () => {
    const { data } = await axios.get(
      `https://api.github.com/repos/facebook/create-react-app/issues/${issueNumber}/comments`
    );
    return data;
  };

  const {
    isLoading,
    isSuccess,
    data: comments,
  } = useQuery(["comments", issueNumber], fetchComments);

  return (
    <div className="my-5">
      {isSuccess &&
        comments.map((comment) => (
          <div key={comment?.id} className="space-y-2 md:space-y-0 md:flex md:space-x-3 mb-2">
            <a href={comment?.user?.html_url} className="">
              <img
                className="w-[50px] h-[50px] rounded-full"
                src={comment?.user.avatar_url}
                alt=""
              />
            </a>
            <div className="border-2 w-full rounded-lg ">
              <div className="space-x-1 text-sm  p-4 border-b-2 bg-gray-100">
                <a href={comment?.user?.html_url} className="font-bold">
                  {comment?.user?.login}
                </a>
                <span className="">commented</span>
                <span className="">
                  {formatDistance(new Date(comment?.created_at), new Date(), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <div className="p-4 markdown-body">
                <ReactMarkdown children={comment?.body} />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Comments;
