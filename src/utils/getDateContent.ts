export const MS_IN_DAY = 1000 * 60 * 60 * 24;

export const getDateContent = (dueDate: string) => {
  const todayDate = new Date().toISOString().slice(0, 10);
  const tomorrowDate = new Date(Date.now() + MS_IN_DAY).toISOString().slice(0, 10);
  const tomorrowOrDateText = dueDate === "tomorrow" ? tomorrowDate : dueDate;
  const date = dueDate === "today" ? todayDate : tomorrowOrDateText;
  const dateContent = dueDate ? ` 📅 ${date}` : ` 📅 ${todayDate}`;
  
  return dateContent;
}