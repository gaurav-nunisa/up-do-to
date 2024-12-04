import Month from "@/app/db/models/monthSchema";
import Todo from "@/app/db/models/todoSchema";

const FetchMonthTotalData = async () => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const month = await Month.findOne({
    monthNumber: currentMonth,
    year: currentYear,
  });
  console.log("month", month)
  const weekIds = month.weeks;
  const todosForTheMonth = await Todo.find({
    week: { $in: weekIds },
  }).select("text completed").lean();
  console.log("tds for the month" , todosForTheMonth)
  const totalCompleted = todosForTheMonth.filter((todo) => todo.completed);
  return (
    <div className="text-black">
      <p>Total Number of Tasks : {todosForTheMonth.length}</p>
      <p>Total Number of Completed Tasks : {totalCompleted.length}</p>
      <p>Total Number of Uncompleted Tasks : {todosForTheMonth.length - totalCompleted.length}</p>
    </div>
  );
};
export default FetchMonthTotalData