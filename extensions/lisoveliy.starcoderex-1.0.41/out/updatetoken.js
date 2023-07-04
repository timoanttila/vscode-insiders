"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function default_1() {
    let options = {
        prompt: "Insert bearer token from https://huggingface.co",
    };
    vscode.commands
        .executeCommand("vscode.open", vscode.Uri.parse("https://huggingface.co/settings/tokens"))
        .then(() => vscode.window.showInputBox(options))
        .then((value) => {
        if (!value) {
            return;
        }
        vscode.workspace
            .getConfiguration("starcoderex")
            .update("bearertoken", value, vscode.ConfigurationTarget.Global);
    });
}
exports.default = default_1;
//# sourceMappingURL=updatetoken.js.map