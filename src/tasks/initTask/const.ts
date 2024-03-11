import { QuestionCollection } from 'inquirer';
import Separator from 'inquirer/lib/objects/separator';

export const REPOSITORY_NAME = 'template-repository';
export const DEFAULT_BRANCH = 'master';

export const npmOptions: QuestionCollection = [
  { name: 'name', type: 'input', message: 'Input Package Name', default: 'react-npm-template' },
  { name: 'version', type: 'input', message: 'Input Package Init Version', default: '1.0.0' },
  { name: 'author', type: 'input', message: 'Input Author Name', default: '' },
];

export const initTypeOptions: QuestionCollection = [
  {
    type: 'list',
    name: 'initType',
    message: 'Select Init Template',
    choices: [
      // { value: 'npm', name: 'NPM 包', description: '新建npm包仓库' },
      // { value: 'page', name: '单页应用', description: '新建单页应用' },
      {
        value: 'react-app-template',
        name: 'react-ts-app',
        description: '新建基于React+Typescript的app应用项目',
      },
      {
        value: 'npm-ts-template',
        name: 'npm-ts-template',
        description: '新建基于Typescript的npm包项目',
      },
      new Separator(),
    ],
  },
];
