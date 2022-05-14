const vscode = require("vscode");
const Generator = require("./lib/generator");
/**
 * @param {vscode.ExtensionContext} context
 * 注册的激活事件被触发之时执行
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "extension.generatorTemplate",
    function () {
      const generator = new Generator();
      generator.create();
    }
  );

  context.subscriptions.push(disposable);
}

// 插件关闭前执行清理工作的机会
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
