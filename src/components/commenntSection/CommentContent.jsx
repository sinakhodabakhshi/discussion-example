import moment from "moment/moment";

export default function CommentContent({ comment, isReply }) {
  return (
    <article className={`flex flex-col ${!isReply && "pr-7"}`}>
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
      </div>
    </article>
  );
}
