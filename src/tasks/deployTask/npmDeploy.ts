import { spawnSync } from 'child_process';
import fse from 'fs-extra';
import path from 'path';
import { getFileDirBubble } from '../../libs/getFileDirBubble';
import { GitUtil } from '../../libs/gitUtils';
import logger, { logAndExit } from '../../utils/log';
import { getPackageJsonData } from '../../utils/pkgData';

export class NpmDeploy {
  private workspace: string;
  constructor(workspace: string) {
    this.workspace = workspace;
  }

  public async run() {
    try {
      await this.genNpmRc();
      const pkgData = getPackageJsonData(path.join(process.cwd(), 'package.json'));
      logger.info(`开始 ${pkgData.name} 的发布过程`);
      const gitUtil = new GitUtil(process.cwd());
      const isPublish = await gitUtil.checkVersionExist(pkgData.version);
      if (isPublish) {
        logger.warn(`${pkgData.name} 包的 v${pkgData.version} 版本已经存在，已跳过发布`);
      } else {
        const gitUrl = this.doPublishAction(pkgData);
        logger.success(`包 ${pkgData.name} 发布成功，地址为：${gitUrl}`);
      }
    } catch (error: any) {
      logAndExit(error, 1);
    } finally {
      this.rmNpmRc();
    }
  }

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

  private rmNpmRc = () => {
    fse.removeSync(path.join(this.workspace, '.npmrc'));
  };

  doPublishAction = (pkgData: any) => {
    logger.info(`开始执行${pkgData.name}的 npm 发布命令`);
    const res = spawnSync('npm publish', { shell: true, cwd: this.workspace });
    return res.stdout.toString();
  };
}
