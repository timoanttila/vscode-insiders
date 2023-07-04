"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const request_1 = require("../request");
async function default_1() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage("Editor doesn't opened");
        return;
    }
    let selection = new vscode.Range(editor.selection.start, editor.selection.end);
    let text = editor.document.getText(selection);
    if (text === "") {
        vscode.window.showWarningMessage("Empty selection");
    }
    console.log("Prompt: ", text);
    let result;
    let requests = vscode.workspace.getConfiguration("starcoderex").get("countofrequests");
    vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        cancellable: true,
        title: 'Prompt executing',
    }, async (progress, token) => {
        for (let i = 0; i < requests; i++) {
            if (token.isCancellationRequested) {
                return;
            }
            progress.report({ increment: ((1 / requests) * 100) - 1, message: `${i + 1}/${requests}` });
            result = await (0, request_1.default)(text);
            if (!result) {
                return;
            }
            text = result;
        }
        editor.edit((edBuiler) => {
            edBuiler.delete(selection);
        }).then(() => {
            progress.report({ increment: 100 });
            editor.insertSnippet(new vscode.SnippetString(result), editor.selection.start);
            vscode.window.showInformationMessage("Done!");
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=scansel.js.map