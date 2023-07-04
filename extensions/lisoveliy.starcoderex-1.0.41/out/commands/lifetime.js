"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const request_1 = require("../request");
async function default_1() {
    const editor = vscode.window.activeTextEditor;
    let currentline;
    let prom = new Promise(() => {
        setInterval(async () => {
            currentline = editor?.document.getText(new vscode.Range(new vscode.Position(editor.selection.start.line, 0), editor.selection.active.translate(1, 0)));
            if (currentline?.includes("@Prompt")) {
                await realtimeCheck(currentline);
            }
        }, 1000);
    });
}
exports.default = default_1;
async function realtimeCheck(prompt) {
    let result = await (0, request_1.default)(prompt.replace("@Prompt", ""));
    vscode.window.activeTextEditor?.edit((edBuiler) => {
    });
}
//# sourceMappingURL=lifetime.js.map