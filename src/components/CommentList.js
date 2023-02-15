import { useState } from "react";


function CommentList({ comments }) {
  const [commentCounts, setCommentCounts] = useState(
    comments.reduce((acc, comment) => {
      acc[comment.id] = { upvotes: 0, downvotes: 0 };
      return acc;
    }, {})
  );

  const handleUpvote = (commentId) => {
    setCommentCounts((prevCounts) => {
      return {
        ...prevCounts,
        [commentId]: {
          upvotes: prevCounts[commentId].upvotes + 1,
          downvotes: prevCounts[commentId].downvotes,
        },
      };
    });
  };

  const handleDownvote = (commentId) => {
    setCommentCounts((prevCounts) => {
      return {
        ...prevCounts,
        [commentId]: {
          upvotes: prevCounts[commentId].upvotes,
          downvotes: prevCounts[commentId].downvotes + 1,
        },
      };
    });
  };

  const handleRemoveComment = (commentId) => {
    setFilteredComments((prevComments) => {
      return prevComments.filter((comment) => comment.id !== commentId);
    });
  };

  const [showComments, setShowComments] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredComments, setFilteredComments] = useState(comments);

  const toggleComments = () => {
    setShowComments((prevShowComments) => !prevShowComments);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const filteredComments = comments.filter((comment) =>
      comment.user.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredComments(filteredComments);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search comments by username"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <button onClick={toggleComments}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>
      {showComments && (
        <ul>
          {filteredComments.map((comment) => (
            <li key={comment.id}>
              <h4>{comment.user}</h4>
              <p>{comment.comment}</p>
              <div>
                <button onClick={() => handleUpvote(comment.id)}>
                  👍 {commentCounts[comment.id].upvotes}
                </button>
                <button onClick={() => handleDownvote(comment.id)}>
                  👎 {commentCounts[comment.id].downvotes}
                </button>
                <button onClick={() => handleRemoveComment(comment.id)}>
                  Remove Comment
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CommentList;

