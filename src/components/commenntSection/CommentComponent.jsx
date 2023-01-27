import { useContext, useRef, useState } from "react";
import { User } from "../../context/UserContext";
import { useStore } from "../../store/store";
import CommentBtns from "./CommentBtns";
import CommentContent from "./CommentContent";
import Replies from "../repliesList/Replies";
import UserInput from "../UserInput";
import UsersImage from "../UsersImage";

export default function CommentComponent({ commentId }) {
  const [comment, , , setReply] = useStore(
    (store) => store.entities[commentId]
  );
  const user = useContext(User);
  const inputRef = useRef();

  const [inputVisibility, setInputVisibility] = useState(false);

  const handleReplyBtn = () => {
    if (inputRef.current && comment.replies.length !== 0)
      inputRef.current.focus();
    else setInputVisibility(!inputVisibility);
  };

  const onSubmit = (text) => {
    setReply({ commentId: comment.id, ...text, user });
    if (comment.replies.length === 0) setInputVisibility(false);
  };

  return (
    <section
      className="bg-white dark:bg-[#242424] flex space-x-4 p-7"
      key={comment.id}
    >
      <div className="shrink-0 flex flex-col">
        <UsersImage user={comment.user} />
        {comment.replies.length !== 0 && (
          <div className="border-l-2 border-slate-200 dark:border-[#181818] h-[100%] mx-auto mt-3 " />
        )}
      </div>
      <div>
        <CommentContent comment={comment} isReply={false} />
        <CommentBtns
          replyBtnHandler={handleReplyBtn}
          isReply={false}
          id={comment.id}
          likes={comment.likes}
          iLikedIt={comment.iLikedIt}
        />
        {comment.replies.length !== 0 && (
          <>
            <Replies replies={comment.replies} />
            <div className="mt-6">
              <UserInput
                onSubmit={onSubmit}
                placeHolder="Reply"
                ref={inputRef}
              />
            </div>
          </>
        )}
        {comment.replies.length === 0 && inputVisibility && (
          <div className="mt-6">
            <UserInput onSubmit={onSubmit} placeHolder="Reply" />
          </div>
        )}
      </div>
    </section>
  );
}
