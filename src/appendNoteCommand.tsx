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

interface appendNoteArgs {
  text: string;
}

export default function AppendNote(props: { arguments: appendNoteArgs }) {
  const { vaults, ready } = useObsidianVaults();
  const { text } = props.arguments;

  const { appendTemplate, heading, notePath, vaultName, silent } = getPreferenceValues<appendTaskPreferences>();
  // const [vaultsWithPlugin, vaultsWithoutPlugin] = vaultPluginCheck(vaults, "obsidian-advanced-uri");
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    async function getContent() {
      const content = await applyTemplates(text, appendTemplate);
      setContent(content);
    }

    getContent();
  }, [appendTemplate, text]);

  if (!ready || content === null) {
    return <List isLoading={true} />;
  }

  if (vaults.length === 0) {
    return <NoVaultFoundMessage />;
  }

  if (!notePath) {
    // Fail if selected vault doesn't have plugin
    return <NoPathProvided />;
  }

  const inbox_md = "/Users/m0rtyn/Repos/motion/Log.md";
  console.debug("🚀 ~ AppendNote ~ inbox_md:", inbox_md);
  appendFile(inbox_md, "\n" + content);

  popToRoot();
  closeMainWindow();
  return null
}
