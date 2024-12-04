export function getStartOfWeek(): Date {
  const today = new Date();
  const day = today.getDay();

  const daysToSubtract = day === 0 ? 6 : day - 1;

  const monday = new Date(today);
  monday.setDate(today.getDate() - daysToSubtract);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

export function generateWeekDates() {
  const startDate = getStartOfWeek();

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    return {
      date,
      formattedDate: formatDate(date),
      dayName: date.toLocaleDateString("en-US", { weekday: "long" }),
      isCurrentDay: formatDate(date) === formatDate(new Date()),
    };
  });

  return weekDays;
}
export function formatDate(date: Date): string {
  return date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })
    .replace(/\//g, "-");
}

// Check if current date is still in the week block
export function isInCurrentWeek(date: Date): boolean {
  const startOfWeek = getStartOfWeek();
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  return date >= startOfWeek && date <= endOfWeek;
}

export function getWeekBoundaries() {
  const startOfWeek = getStartOfWeek();
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  
  return { startOfWeek, endOfWeek };
}

// New function to check if todo belongs to current week
export function isTodoInWeek(todoDate: Date, weekStart: Date, weekEnd: Date) {
  return todoDate >= weekStart && todoDate <= weekEnd;
}

