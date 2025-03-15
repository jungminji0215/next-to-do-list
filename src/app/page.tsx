import AddTodo from "@/components/AddTodo";
import Tab from "@/components/Tab";
import Todos from "@/components/Todos";

export default function Home() {
  return (
    <div className="text-center my-5 flex flex-col gap-4">
      <h1 className="font-bold text-lg">Todo List</h1>
      <Tab />
      <Todos />
      <AddTodo />
    </div>
  );
}
