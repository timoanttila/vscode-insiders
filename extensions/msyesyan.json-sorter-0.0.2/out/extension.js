"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    vscode.window.showInformationMessage('Congratulations, your extension "json-sorter" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand("json-sorter.jsonSort", () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        const sort = (json) => {
            if (json instanceof Array) {
                return json;
            }
            if (typeof json === 'object' && Object.keys(json).length > 0) {
                return Object.keys(json)
                    .sort()
                    .reduce((prev, key) => {
                    return Object.assign(Object.assign({}, prev), { [key]: sort(json[key]) });
                }, {});
            }
            return json;
        };
        const document = editor.document;
        editor.edit((editorBuilder) => {
            const firstLine = document.lineAt(0);
            const lastLine = document.lineAt(document.lineCount - 1);
            const selection = new vscode.Range(0, firstLine.range.start.character, document.lineCount - 1, lastLine.range.end.character);
            const sorted = sort(JSON.parse(document.getText(selection)));
            editorBuilder.replace(selection, JSON.stringify(sorted, null, 2));
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map