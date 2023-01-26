import React from "react";
import { nameIcon } from "../helpers/functions";

export default function UsersImage({ user }) {
  const { name, avatar } = user;

  return (
    <>
      {avatar ? (
        <img
          className="w-11 h-11 rounded-full"
          src={avatar}
          alt={nameIcon(name)}
        />
      ) : (
        <div className="flex justify-center items-center w-11 h-11 shrink-0 bg-blue-100 dark:bg-[#404040] rounded-full">
          <p className="font-bold cursor-default text-blue-600 ">
            {nameIcon(name)}
          </p>
        </div>
      )}
    </>
  );
}
