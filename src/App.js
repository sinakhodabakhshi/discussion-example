import Provider from "./store/store";
import CommentsSection from "./components/commenntSection/CommentsSection";
import Header from "./components/Header";

function App() {
  return (
    <Provider>
      <section className="flex flex-col px-[5px] pt-[2px] space-y-[2px] ">
        <Header />
        <CommentsSection />
      </section>
    </Provider>
  );
}

export default App;
