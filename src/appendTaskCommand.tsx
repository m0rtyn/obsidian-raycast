import { Action, ActionPanel, closeMainWindow, getPreferenceValues, List, open, popToRoot } from "@raycast/api";
import { getDateContent } from "./utils/getDateContent";
import { appendFile} from "node:fs/promises";
import { PATH_TO_INBOX } from "./appendTodoCommand";

interface appendTaskArgs {
  text: string;
  dueDate: string;
}

export default function AppendTask(props: { arguments: appendTaskArgs }) {
  const { text, dueDate } = props.arguments;

  const dateContent = getDateContent(dueDate);

  console.log(PATH_TO_INBOX);

  const inboxPath = PATH_TO_INBOX;

  appendFile(inboxPath, `\n- [ ] #want ${text} ${dateContent}`);

  popToRoot();
  closeMainWindow();

  return null
}
