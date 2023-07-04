'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const scansel_js_1 = require("./commands/scansel.js");
const updatetoken_js_1 = require("./updatetoken.js");
function activate(context) {
    console.log('Extension "starcoderex" is now active!');
    if (vscode.workspace.getConfiguration("starcoderex").get("bearertoken") === "") {
        (0, updatetoken_js_1.default)();
    }
    let scandoc = vscode.commands.registerCommand('starcoderex.ScanSel', async () => {
        await (0, scansel_js_1.default)();
    });
    let scandocprompt = vscode.commands.registerCommand('starcoderex.ScanSelPrompt', async () => {
        await (0, scansel_js_1.default)();
    });
    let tokenscreen = vscode.commands.registerCommand('starcoderex.TokenScreen', async () => {
        await (0, updatetoken_js_1.default)();
    });
    // let realtime = vscode.commands.registerCommand('starcoderex.StartLifeTime', async () => {
    // 		await lifetime();
    // });
    context.subscriptions.push(scandoc);
    context.subscriptions.push(scandocprompt);
    context.subscriptions.push(tokenscreen);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map