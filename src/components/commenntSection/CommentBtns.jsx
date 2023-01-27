import { useStore } from "../../store/store";
import LikeIcon from "../icons/LikeIcon";

export default function CommentBtns({
  isReply,
  id,
  likes,
  iLikedIt,
  replyBtnHandler,
}) {
  const [, , , , setLike] = useStore((store) => store.setter);
  const iLikedItNumber = iLikedIt ? "text-while" : "text-black";
  const iLikeIt = iLikedIt
    ? "bg-blue-600 text-white"
    : "bg-slate-100 text-slate-400";
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => {
          setLike({ id, isReply });
        }}
        className={`flex py-[5px] px-4 items-center rounded-full ${iLikeIt}`}
      >
        <LikeIcon />
        <p className={`text-sm font-semibold ${iLikedItNumber}`}>{likes}</p>
      </button>
      {!isReply && (
        <button
          onClick={replyBtnHandler}
          className="text-sm font-semibold text-blue-600"
        >
          Replay
        </button>
      )}
    </div>
  );
}
