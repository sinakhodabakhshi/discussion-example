import React from "react";
import Reply from "./Reply";

export default function Replies({ replies }) {
  return (
    <section className="pt-7 space-y-7">
      {replies.map((reply) => (
        <Reply key={reply} isReply={true} replyId={reply} />
      ))}
    </section>
  );
}
