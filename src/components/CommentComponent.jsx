import React from "react";
import CommentContent from "./CommentContent";
import Replies from "./Replies";
import UsersImage from "./UsersImage";

export default function CommentComponent({ comment, isReply }) {
  return (
    <section
      className={`bg-white dark:bg-[#242424] flex space-x-4 p-7 ${
        isReply && "p-0"
      }`}
      key={comment.id}
    >
      <div className="shrink-0 flex flex-col">
        <UsersImage user={comment.user} />
        {!isReply && comment.replies.length !== 0 && (
          <div className="border-l-2 border-slate-200 dark:border-[#181818] h-[100%] mx-auto mt-3 " />
        )}
      </div>
      <div>
        <CommentContent comment={comment} isReply={isReply} />
        {!isReply && comment.replies.length !== 0 && (
          <Replies commentId={comment.id} replies={comment.replies} />
        )}
      </div>
    </section>
  );
}
