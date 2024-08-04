import Form from "@/_components/form";
import TopicsList from "@/_components/topics-list";

function page() {
  return (
    <main className="p-10">
      <div className="grid grid-cols-1 ">
        <div className="rounded-lg">
          <Form />
        </div>

        <div className="rounded-lg">
          <TopicsList />
        </div>
      </div>
    </main>
  );
}
export default page;
