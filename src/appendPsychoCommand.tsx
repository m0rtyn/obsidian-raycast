import { closeMainWindow, List,  popToRoot } from "@raycast/api";
import { NoVaultFoundMessage } from "./components/Notifications/NoVaultFoundMessage";
import {
  useObsidianVaults,
} from "./utils/utils";
import { appendFile} from "node:fs/promises";
import { PATH_TO_INBOX } from "./appendTodoCommand";

export default function AppendPsycho() {
  const { vaults, ready } = useObsidianVaults();

  if (!ready) {
    return <List isLoading={true} />;
  }

  if (vaults.length === 0) {
    return <NoVaultFoundMessage />;
  }

  const inboxPath = PATH_TO_INBOX;
  const currentDateString = new Date().toISOString().slice(0, 10);
  const psychoString = `
- ### [[Психо]] ${currentDateString}
  - [ ] оплатил сеанс`
  
  appendFile(inboxPath, psychoString);
  popToRoot();
  closeMainWindow();
  return null
}
