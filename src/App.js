import { useContext } from "react";
import CommentsSection from "./components/CommentsSection";
import UserInput from "./components/UserInput";
import { CommentsDispatchContext, User } from "./context/DiscussionContext";
import { AddDiscussion } from "./context/reducer";

function App() {
  const dispatch = useContext(CommentsDispatchContext);
  const user = useContext(User);
  const id = new Date().getTime();
  const onSubmit = (text) => {
    dispatch(AddDiscussion(text, id, user));
  };

  return (
    <section className="flex flex-col px-[5px] pt-[2px] space-y-[2px] ">
      <div className="px-[27px] py-[25px] bg-white dark:bg-[#242424] rounded-t-[10px]">
        <UserInput placeHolder={"Start a discussion"} onSubmit={onSubmit} />
      </div>

      <CommentsSection />
    </section>
  );
}

export default App;
