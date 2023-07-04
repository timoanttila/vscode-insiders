"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const vscode = require("vscode");
const updatetoken_1 = require("./updatetoken");
exports.default = async (input) => {
    //console.log(`Input: ${input}`);
    let promise;
    try {
        promise = (0, node_fetch_1.default)(vscode.workspace.getConfiguration("starcoderex").get("apiurl"), {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            headers: { authorization: `Bearer ${vscode.workspace.getConfiguration("starcoderex").get("bearertoken")}`, "content-type": "application/json" },
            method: "POST",
            body: JSON.stringify({ inputs: input }),
        });
        let response = await promise;
        if (response.status !== 200) {
            if (response.status === 400) {
                vscode.window.showErrorMessage("Bearer invalid!");
                vscode.workspace.getConfiguration("starcoderex").update("bearertoken", "", vscode.ConfigurationTarget.Global);
                (0, updatetoken_1.default)();
                return null;
            }
            else {
                vscode.window.showWarningMessage("Service turned off right now. Try later!");
                (0, updatetoken_1.default)();
            }
        }
        let output = (await response.json())[0].generated_text;
        console.log(`Output: ${output.length}`);
        return output;
    }
    catch (exception) {
        if (exception instanceof node_fetch_1.FetchError) {
            vscode.window.showErrorMessage(exception.message);
        }
        return null;
    }
};
//# sourceMappingURL=request.js.map