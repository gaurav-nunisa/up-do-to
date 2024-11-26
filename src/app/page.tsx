import SideBarExtra from "./components/sideBarExtra";
import WeekView from "./components/todos/WeekView";

export default function Home() {
  return (
    <>
      <div className="flex flex-row">
        <SideBarExtra />
        <WeekView />
      </div>
    </>
  );
}
