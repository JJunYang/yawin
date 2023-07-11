import { cosmiconfigSync } from 'cosmiconfig';
import fse from 'fs-extra';
import path from 'path';
import { ConfigType } from '../types/project';

export class Project {
  private _packageJsonDir: string;
  private _config: ConfigType | undefined;

  public isEmptyProject = false;

  constructor(private workspace: string) {
    this._packageJsonDir = path.join(this.workspace, 'package.json');
    const explorerResult = cosmiconfigSync('yawin', {
      packageProp: 'yawinConfig',
      stopDir: this.workspace,
    }).search(this.workspace);

    if (fse.existsSync(this._packageJsonDir)) {
      if (typeof explorerResult?.config === 'function') {
        this._config = explorerResult?.config() || {};
      } else {
        this._config = explorerResult?.config || {};
      }
    } else {
      this.isEmptyProject = true;
    }
  }

  getAllConfig() {
    return this._config || {};
  }

  getConfigItem(key: keyof ConfigType) {
    return this._config?.[key];
  }
}

export const currentProject = new Project(process.cwd());
