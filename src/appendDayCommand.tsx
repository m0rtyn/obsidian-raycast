import { closeMainWindow, List,  popToRoot } from "@raycast/api";
import { NoVaultFoundMessage } from "./components/Notifications/NoVaultFoundMessage";
import {
  useObsidianVaults,
} from "./utils/utils";
import { appendFile} from "node:fs/promises";
import { PATH_TO_INBOX } from "./appendTodoCommand";

export default function AppendDay() {
  const { vaults, ready } = useObsidianVaults();

  if (!ready) {
    return <List isLoading={true} />;
  }

  if (vaults.length === 0) {
    return <NoVaultFoundMessage />;
  }

  const inboxPath = PATH_TO_INBOX;
  const dayOfTheWeek = new Date().toLocaleDateString('en-US', { weekday: 'short' });
  const newDayHeading = `\n# ${new Date().toISOString().slice(0, 10)} (${dayOfTheWeek})\n`;
  
  appendFile(inboxPath, newDayHeading);
  popToRoot();
  closeMainWindow();
  return null
}
