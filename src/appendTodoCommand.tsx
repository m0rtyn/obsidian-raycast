import { closeMainWindow, List, popToRoot } from "@raycast/api";
import { NoVaultFoundMessage } from "./components/Notifications/NoVaultFoundMessage";
import {
  useObsidianVaults
} from "./utils/utils";
import { appendFile } from "node:fs/promises";

export const PATH_TO_INBOX = "/Users/m0rtyn/Repos/motion/Log.md"

interface appendTodoArgs {
  text: string;
}
export default function AppendTodo(props: { arguments: appendTodoArgs }) {
  const { text } = props.arguments;

  const currentDate = new Date().toISOString().split("T")[0];
  const inboxPath = PATH_TO_INBOX;

  appendFile(inboxPath, `\n- [ ] ${currentDate} ${text}`);

  popToRoot();
  closeMainWindow();
  return null
}
