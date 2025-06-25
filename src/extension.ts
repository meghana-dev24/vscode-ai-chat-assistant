import * as vscode from 'vscode';
import { getWebviewContent } from './webviewContent';

export function activate(context: vscode.ExtensionContext) {
  // Register command to open chat
  let disposable = vscode.commands.registerCommand('ai-chat-assistant.openChat', () => {
    // Create WebView panel
    const panel = vscode.window.createWebviewPanel(
      'aiChat',
      'AI Chat Assistant',
      vscode.ViewColumn.One,
      { enableScripts: true }
    );

    // Handle messages from WebView (e.g., user queries)
    panel.webview.onDidReceiveMessage(async message => {
      if (message.command === 'sendMessage') {
        const response = await getAIResponse(message.text);
        panel.webview.postMessage({ command: 'receiveMessage', text: response });
      }
    });

    // Load React app
    panel.webview.html = getWebviewContent(panel.webview, context.extensionUri);
  });

  context.subscriptions.push(disposable);
}

async function getAIResponse(prompt: string): Promise<string> {
  // Replace with actual OpenAI API call
  return `AI: You asked "${prompt}". This is a mock response.`;
}