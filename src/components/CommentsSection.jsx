import React, { useContext } from "react";
import { CommentsContext } from "../context/DiscussionContext";
import CommentComponent from "./CommentComponent";

export default function CommentsSection() {
  const comments = useContext(CommentsContext);

  return (
    <section className="space-y-[2px]">
      {comments.map((comment) => (
        <CommentComponent key={comment.id} comment={comment} isReply={false} />
      ))}
    </section>
  );
}
