const fs = require("fs");
const _ = require("lodash");
const vscode = require("vscode");
const path = require("path");

const templateList = ["model", "controller", "service"];

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
          await this.generatorController(workerPath);
          break;
        case "model":
          await this.generatorModel(workerPath);
          break;
        case "service":
          await this.generatorService(workerPath);
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
      return "请输入文件名称";
    }
  }

  // 创建 controller
  async generatorController(workerPath) {
    const controllerName = await vscode.window.showInputBox({
      placeHolder: "请输入controller名称",
      validateInput: this.validateInput,
    });

    if (!controllerName) {
      return;
    }

    const className = this.fistChartToUpperCase(controllerName);
    const controllerFileName = this.fistChartToLowerCase(controllerName);
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
        identity: className,
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

  // 创建 model
  async generatorModel(workerPath) {
    const modelDirPath = "./app/model";

    const modelName = await vscode.window.showInputBox({
      placeHolder: "请输入model名称",
      validateInput: this.validateInput,
    });

    if (!modelName) {
      return;
    }

    const comment = await vscode.window.showInputBox({
      placeHolder: "请输入comment信息",
      validateInput: this.validateInput,
    });

    if (!comment) {
      return;
    }

    const constFileName = this.fistChartToLowerCase(modelName);

    const schemaName = this.toHump(constFileName);
    const className = this.fistChartToUpperCase(schemaName);

    const modelFilePath = path.join(
      workerPath,
      modelDirPath,
      `${constFileName}.js`
    );

    const templateFile = fs.readFileSync(
      path.join(__dirname, "../template/model.tpl"),
      {
        encoding: "utf8",
      }
    );

    if (templateFile) {
      const compiledTemplate = _.template(templateFile);
      const compiledTemplateFile = compiledTemplate({
        schemaName,
        fileName: modelName,
        className,
        comment,
      });

      if (fs.existsSync(modelFilePath)) {
        vscode.window.showErrorMessage(`${modelFilePath} 文件已经存在`);
        return;
      }

      fs.writeFileSync(modelFilePath, compiledTemplateFile, {
        encoding: "utf8",
      });
    } else {
      vscode.window.showErrorMessage("模板文件不存在");
    }
  }

  // 创建 service
  async generatorService(workerPath) {
    const serviceName = await vscode.window.showInputBox({
      placeHolder: "请输入service名称",
      validateInput: this.validateInput,
    });

    if (!serviceName) {
      return;
    }

    const className = this.fistChartToUpperCase(serviceName);
    const serviceFileName = this.fistChartToLowerCase(serviceName);
    const serviceDirPath = "./app/service";
    const servicePath = path.join(
      workerPath,
      serviceDirPath,
      `${serviceFileName}.js`
    );

    const templateFile = fs.readFileSync(
      path.join(__dirname, "../template/service.tpl"),
      {
        encoding: "utf8",
      }
    );

    if (templateFile) {
      const compiledTemplate = _.template(templateFile);
      const compiledTemplateFile = compiledTemplate({
        identity: className,
      });

      if (fs.existsSync(servicePath)) {
        vscode.window.showErrorMessage(`${servicePath} 文件已经存在`);
        return;
      }

      fs.writeFileSync(servicePath, compiledTemplateFile, {
        encoding: "utf8",
      });
    } else {
      vscode.window.showErrorMessage("模板文件不存在");
    }
  }

  toHump(name) {
    return name.replace(/\_(\w)/g, function (all, letter) {
      return letter.toUpperCase();
    });
  }

  fistChartToLowerCase(name) {
    return name.replace(name[0], name[0].toLocaleLowerCase());
  }

  fistChartToUpperCase(name) {
    return name.replace(name[0], name[0].toUpperCase());
  }
}

module.exports = Generator;
