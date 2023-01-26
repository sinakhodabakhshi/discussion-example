import React, { useContext, useState } from "react";
import { Focus, User } from "../context/DiscussionContext";
import UsersImage from "./UsersImage";

export default function UserInput({
  placeHolder,
  onSubmit,
  focuse,
  commentId,
}) {
  const [comment, setComment] = useState("");
  const user = useContext(User);
  const { focuseId, setFocuseId } = useContext(Focus);

  const autoFocus = commentId && focuseId === commentId;

  const onBlur = () => {
    if (autoFocus) {
      setFocuseId(null);
    }
  };

  const handleSubmite = (e) => {
    e.preventDefault();
    onSubmit(comment);
    setComment("");
  };

  return (
    <form
      key={`${focuseId}adsadsasd`}
      onSubmit={handleSubmite}
      className="flex justify-center space-x-4 "
    >
      <UsersImage user={user} />
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder={placeHolder}
        className="grow border-2 dark:bg-[#404040] dark:text-white border-[#242424]/5 rounded-[4px] px-4 text-sm font-semibold focus:outline-none"
        type="text"
        onBlur={onBlur}
        autoFocus={focuse || autoFocus}
      />
    </form>
  );
}
