import moment from "moment/moment";
import React, { useContext, useState } from "react";
import {
  CommentsDispatchContext,
  FocusSetter,
  User,
} from "../context/DiscussionContext";
import { addReplay, like } from "../context/reducer";
import LikeIcon from "./icons/LikeIcon";
import UserInput from "./UserInput";

export default function CommentContent({ comment, isReply }) {
  const dispatch = useContext(CommentsDispatchContext);
  const user = useContext(User);
  const setFocuseId = useContext(FocusSetter);
  const [inputVisibility, setInputVisibility] = useState(false);
  const id = new Date().getTime();

  const onSubmit = (text) => {
    dispatch(addReplay(comment.id, text, id, user));
    setInputVisibility(false);
  };

  const onClick = () => {
    if (comment.replies.length === 0) {
      setInputVisibility(!inputVisibility);
    } else {
      setFocuseId(comment.id);
    }
  };
  const iLikeIt = comment.iLikedIt
    ? "bg-blue-600 text-white"
    : "bg-slate-100 text-slate-400";

  const iLikedItNumber = comment.iLikedIt ? "text-while" : "text-black";
  return (
    <article className={`flex flex-col ${!isReply && "pr-10"}`}>
      <div>
        <div className="flex space-x-2 pb-2 items-center ">
          <p className="font-semibold dark:text-white">{comment.user.name}</p>{" "}
          <time className="text-slate-400 text-sm font-semibold ">
            {moment(comment.date).fromNow()}
          </time>
        </div>
        <p className="pb-2 text-gray-500 dark:text-[#FAF9F6] text-sm font-semibold leading-6">
          {comment.text}
        </p>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              dispatch(like(comment.id, isReply));
            }}
            className={`flex py-[5px] px-4 items-center rounded-full ${iLikeIt}`}
          >
            <LikeIcon />
            <p className={`text-sm font-semibold ${iLikedItNumber}`}>
              {comment.likes}
            </p>
          </button>
          {!isReply && (
            <button
              className="text-sm font-semibold text-blue-600"
              onClick={onClick}
            >
              Replay
            </button>
          )}
        </div>
        {inputVisibility && comment.replies.length === 0 && (
          <div className="mt-7">
            <UserInput
              focuse={true}
              onSubmit={onSubmit}
              placeHolder={"Reply"}
            />
          </div>
        )}
      </div>
    </article>
  );
}
