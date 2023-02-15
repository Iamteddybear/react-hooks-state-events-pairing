import { useState } from "react";
import video from "../data/video.js";
import CommentList from "./CommentList.js";
import CommentSorter from "./CommentSorter.js";

function App() {
  const [showComments] = useState(true);
  const [upvotes, setUpvotes] = useState(video.upvotes);
  const [downvotes, setDownvotes] = useState(video.downvotes);
  const [sortedComments, setSortedComments] = useState(video.comments);
  
  const handleUpvote = () => {
    setUpvotes(upvotes + 1);
  };

  const handleDownvote = () => {
    setDownvotes(downvotes + 1);
  };

  const handleSortComments = (sortType) => {
    const commentsCopy = [...sortedComments];
    switch (sortType) {
      case "upvotes":
        commentsCopy.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case "downvotes":
        commentsCopy.sort((a, b) => b.downvotes - a.downvotes);
        break;
      default:
        commentsCopy.sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));
        break;
    }
    setSortedComments(commentsCopy);
  }

  return (
    <div className="App">
      <iframe
        width="919"
        height="525"
        src={video.embedUrl}
        frameBorder="0"
        allowFullScreen
        title={video.title}
      />
      <h1>{video.title}</h1>
      <p>
        {video.views} views | Uploaded {video.createdAt} |{" "}
        <button onClick={handleUpvote}>👍 {upvotes}</button> |{" "}
        <button onClick={handleDownvote}>👎 {downvotes}</button>
      </p>
      <CommentSorter sortComments={handleSortComments} />
      {showComments && (
        <CommentList
          comments={sortedComments}
          handleUpvote={handleUpvote}
          handleDownvote={handleDownvote}
        />
      )}
    </div>
  );
}

export default App;
