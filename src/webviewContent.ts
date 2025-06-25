import * as vscode from 'vscode';
import { Uri } from 'vscode';

export function getWebviewContent(webview: vscode.Webview, extensionUri: Uri): string {
  const scriptUri = webview.asWebviewUri(
    Uri.joinPath(extensionUri, 'media', 'dist', 'assets/index.js') // Vite path
  );
  
  return `<!DOCTYPE html>
      <html>
          <body>
              <div id="root"></div>
              <script src="${scriptUri}"></script>
          </body>
      </html>`;
}