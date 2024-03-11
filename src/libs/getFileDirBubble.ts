import fse from 'fs-extra';
import path from 'path';

type FindUpType = 'directory' | 'file';

/**
 * 获取当前目录向上的最近一个目标文件或文件夹地址
 * @param targetDir 目标名称
 * @param startDir 起始目录
 * @param type 文件或者文件夹
 * @returns
 */
export const getFileDirBubble = async (
  targetDir: string,
  startDir = process.cwd(),
  type: FindUpType = 'file',
) => {
  let curDir = startDir;
  while (curDir) {
    const targetPath = path.join(curDir, targetDir);
    if (fse.pathExistsSync(targetPath)) {
      if (type === 'directory' && fse.statSync(targetPath).isDirectory()) {
        return targetPath;
      }
      if (type === 'file' && fse.statSync(targetPath).isFile()) {
        return targetPath;
      }
    }
    const dirName = path.dirname(curDir);
    curDir = curDir !== dirName ? dirName : '';
  }

  return null;
};
