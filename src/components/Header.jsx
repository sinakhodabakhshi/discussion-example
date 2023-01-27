import React, { useContext } from "react";
import { User } from "../context/UserContext";
import { useStore } from "../store/store";
import UserInput from "./UserInput";

export default function Header() {
  const user = useContext(User);
  const [, , setComment] = useStore((store) => store.setter);
  const id = new Date().getTime();
  const onSubmit = (text) => {
    setComment({ id, text, user });
  };

  return (
    <div className="px-[27px] py-[25px] bg-white dark:bg-[#242424] rounded-t-[10px]">
      <UserInput placeHolder={"Start a discussion"} onSubmit={onSubmit} />
    </div>
  );
}
