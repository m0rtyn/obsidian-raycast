import { closeMainWindow, getPreferenceValues, List,  popToRoot } from "@raycast/api";
import { useEffect, useState } from "react";
import { NoPathProvided } from "./components/Notifications/NoPathProvided";
import { NoVaultFoundMessage } from "./components/Notifications/NoVaultFoundMessage";
import { appendTaskPreferences } from "./utils/preferences";
import {
  applyTemplates,
  useObsidianVaults,
} from "./utils/utils";
import { appendFile} from "node:fs/promises";
import { PATH_TO_INBOX } from "./appendTodoCommand";

interface appendNoteArgs {
  text: string;
}
export default function AppendNote(props: { arguments: appendNoteArgs }) {
  const { text } = props.arguments;

  console.log(PATH_TO_INBOX);

  const currentDate = new Date().toISOString().split("T")[0];
  const inboxPath = PATH_TO_INBOX;

  appendFile(inboxPath, `\n${currentDate} ${text}`);

  popToRoot();
  closeMainWindow();

  return null
}
