import React from "react";
import { useStore } from "../../store/store";
import CommentBtns from "../commenntSection/CommentBtns";
import CommentContent from "../commenntSection/CommentContent";
import UsersImage from "../UsersImage";

export default function Reply({ replyId }) {
  const [reply] = useStore((store) => store.replies[replyId]);

  return (
    <section
      className={`bg-white dark:bg-[#242424] flex space-x-4 p-7 ${
        true && "p-0"
      }`}
      key={replyId}
    >
      <div className="shrink-0 flex flex-col">
        <UsersImage user={reply.user} />
      </div>
      <div>
        <CommentContent comment={reply} isReply={true} />
        <CommentBtns
          isReply={true}
          id={reply.id}
          likes={reply.likes}
          iLikedIt={reply.iLikedIt}
        />
      </div>
    </section>
  );
}
