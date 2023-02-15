import React, { useState } from "react";

function CommentSorter({ sortComments }) {
  const [sortType, setSortType] = useState("date");

  const handleSortChange = (event) => {
    setSortType(event.target.value);
    sortComments(event.target.value);
  };

  return (
    <div>
      <label htmlFor="sort-comments">Sort By:</label>
      <select id="sort-comments" value={sortType} onChange={handleSortChange}>
        <option value="date">Date</option>
        <option value="upvotes">Upvotes</option>
        <option value="downvotes">Downvotes</option>
      </select>
    </div>
  );
}

export default CommentSorter;