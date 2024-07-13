import { closeMainWindow, List, popToRoot } from "@raycast/api";
import { appendFile } from "node:fs/promises";
import { PATH_TO_INBOX } from "./appendTodoCommand";

interface appendDoneTodoArgs {
  text: string;
}
export default function AppendDoneTodo(props: { arguments: appendDoneTodoArgs }) {
  const { text } = props.arguments;

  const currentDate = new Date().toISOString().split("T")[0];

  appendFile(PATH_TO_INBOX, `\n- [x] ${currentDate} ${text}`);

  popToRoot();
  closeMainWindow();

  return null
}
