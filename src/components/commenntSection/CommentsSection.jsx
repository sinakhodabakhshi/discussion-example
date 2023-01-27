import { useStore } from "../../store/store";
import CommentComponent from "./CommentComponent";

export default function CommentsSection() {
  const [commentIds] = useStore((store) => store.ids);

  return (
    <section className="space-y-[2px]">
      {commentIds.map((id) => (
        <CommentComponent key={id} commentId={id} />
      ))}
    </section>
  );
}
