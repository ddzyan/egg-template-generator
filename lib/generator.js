const fs = require("fs");
const _ = require("lodash");
const vscode = require("vscode");
const path = require("path");

const templateList = ["model", "controller"];

class Generator {
  constructor() {
    var now = new Date();
    this.nowTime = now.getTime();
  }

  async create() {
    try {
      let workerSpace = vscode.workspace.workspaceFolders;
      if (!workerSpace) {
        vscode.window.showErrorMessage("请打开项目工程！");
        return;
      }

      const template = await vscode.window.showQuickPick(templateList, {
        placeHolder: "请选择需要创建的模板类型",
      });
      const workerPath = workerSpace[0].uri.path;
      switch (template) {
        case "controller":
          await this.generatorFile(workerPath);
          break;

        default:
          vscode.window.showErrorMessage("类型暂不支持");
          return;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  validateInput(val) {
    if (!val) {
      return "请填写发布备注！";
    }
  }

  async generatorFile(workerPath) {
    let controllerName = await vscode.window.showInputBox({
      placeHolder: "请输入controller名称",
      validateInput: this.validateInput,
    });
    const controllerFileName = controllerName.replace(
      controllerName[0],
      controllerName[0].toLocaleLowerCase()
    );
    const controllerDirPath = "./app/controller";
    const controllerPath = path.join(
      workerPath,
      controllerDirPath,
      `${controllerFileName}.js`
    );

    const templateFile = fs.readFileSync(
      path.join(__dirname, "../template/controller.tpl"),
      {
        encoding: "utf8",
      }
    );

    if (templateFile) {
      const compiledTemplate = _.template(templateFile);
      const compiledTemplateFile = compiledTemplate({
        identity: controllerName,
      });

      if (fs.existsSync(controllerPath)) {
        vscode.window.showErrorMessage(`${controllerPath} 文件已经存在`);
        return;
      }

      fs.writeFileSync(controllerPath, compiledTemplateFile, {
        encoding: "utf8",
      });
    } else {
      vscode.window.showErrorMessage("模板文件不存在");
    }
  }
}

module.exports = Generator;
