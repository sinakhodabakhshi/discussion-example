import React, { useContext } from "react";
import { CommentsDispatchContext, User } from "../context/DiscussionContext";
import { addReplay } from "../context/reducer";
import CommentComponent from "./CommentComponent";
import UserInput from "./UserInput";

export default function Replies({ replies, commentId }) {
  const dispatch = useContext(CommentsDispatchContext);
  const user = useContext(User);
  const id = new Date().getTime();

  const onSubmit = (text) => {
    dispatch(addReplay(commentId, text, id, user));
  };

  return (
    <section className="pt-7 space-y-7">
      {replies.map((reply) => (
        <CommentComponent key={reply.id} isReply={true} comment={reply} />
      ))}
      {replies.length !== 0 && (
        <UserInput
          onSubmit={onSubmit}
          placeHolder={"Reply"}
          commentId={commentId}
        />
      )}
    </section>
  );
}
