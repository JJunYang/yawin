import { spawnSync } from 'child_process';
import fse from 'fs-extra';
import path from 'path';
import { getFileDirBubble } from '../../libs/getFileDirBubble';
import logger, { logAndExit } from '../../utils/log';
import { getPackageJsonData } from '../../utils/pkgData';

export class NpmDeploy {
  private workspace: string;
  constructor(workspace: string) {
    this.workspace = workspace;
  }

  public async run() {
    try {
      const pkgData = getPackageJsonData(path.join(process.cwd(), 'package.json'));
      let pkgName = '';
      if (pkgData.name.startsWith('@jjunyang')) {
        pkgName = pkgData.name.split('/')[1];
      }
      if (!pkgName) {
        logAndExit('项目名不符合 @jjunyang/PROJECT_NAME 的格式，请重新设置！');
      }
      await this.genNpmRc();
      logger.info(`开始 ${pkgData.name} 的发布过程`);
      const isPublish = await this.checkVersionExist(pkgData);
      if (isPublish) {
        logger.warn(`${pkgData.name} 包的 v${pkgData.version} 版本已经存在，已跳过发布`);
      } else {
        const gitUrl = this.doPublishAction(pkgData);
        logger.success(`包 ${pkgData.name} 发布成功，结果为：${gitUrl}`);
      }
    } catch (error: any) {
      logAndExit(error, 1);
    } finally {
      this.rmNpmRc();
    }
  }

  /**
   * 生成 .npmrc 文件信息为发布需要的信息，包括 token，registry 等
   * @returns
   */
  private genNpmRc = async () => {
    const npmrcDir = path.join(this.workspace, '.npmrc');
    const gitDir = await getFileDirBubble('.git', this.workspace, 'directory');
    if (!gitDir) {
      logAndExit('当前地址不为 git 项目地址', 1);
      return;
    }
    if (fse.pathExistsSync(npmrcDir)) {
      logger.warn('已经存在 .npmrc 文件，若发布不成功请调整配置，或删除该文件');
      return;
    }
    logger.info('开始写入 .npmrc 文件...');
    fse.writeFileSync(
      npmrcDir,
      `//npm.pkg.github.com/:_authToken=${process.env.TOKEN}\n` +
        `@jjunyang:registry=https://npm.pkg.github.com`,
    );
    logger.success('写入完成！');
  };

  /**
   * 删除生成的 .npmrc 文件
   */
  private rmNpmRc = () => {
    fse.removeSync(path.join(this.workspace, '.npmrc'));
  };

  /**
   * 执行发布命令，返回发布结果信息
   * @param pkgData 项目信息
   * @returns
   */
  private doPublishAction = (pkgData: any) => {
    logger.info(`开始执行${pkgData.name}的 npm 发布命令`);
    const res = spawnSync('npm publish', { shell: true, cwd: this.workspace });
    return res.stdout.toString();
  };

  /**
   * 检查包版本是否存在
   * @param target 项目package json 信息
   * @returns
   */
  public checkVersionExist = async (target: any) => {
    const res = spawnSync(`npm view ${target.name} --json`, {
      shell: true,
      cwd: this.workspace,
    });
    const resString = res.stdout.toString();
    if (!resString) return false;
    const pkgJson = JSON.parse(resString);

    return pkgJson.versions.includes(target.version);
  };
}
