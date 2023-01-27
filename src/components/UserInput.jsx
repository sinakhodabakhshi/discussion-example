import React, { useContext, useState } from "react";
import { User } from "../context/UserContext";
import UsersImage from "./UsersImage";

const UserInput = React.forwardRef(({ placeHolder, onSubmit }, ref) => {
  const [text, setText] = useState("");
  const user = useContext(User);

  const handleSubmite = (e) => {
    e.preventDefault();
    const id = new Date().getTime();
    if (text) {
      onSubmit({ text, id });
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmite} className="flex justify-center space-x-4 ">
      <UsersImage user={user} />
      <input
        ref={ref}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeHolder}
        className="grow border-2 dark:bg-[#404040] dark:text-white border-[#242424]/5 rounded-[4px] px-4 text-sm font-semibold focus:outline-none focus:border-[#242424]/30"
        type="text"
      />
    </form>
  );
});

export default UserInput;
