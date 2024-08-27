console.log(
  '\x1B[0;37;44m INFO \x1B[0m',
  '\x1B[0;;34m ' +
    `读取了: ${__filename.slice(__dirname.length + 1)}` +
    ' \x1B[0m'
);

module.exports = {
  root: true,
  ignorePatterns: [
    '.DS_Store',
    '.eslintcache',
    'pnpm-lock.yaml',
    'node_modules',
    'nuxt-build',
    '.output',
  ],
  settings: {
    // 'import/parsers': {
    //   '@typescript-eslint/parser': ['.ts', '.tsx'],
    // },
    // 'import/resolver': {
    //   typescript: {
    //     alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
    //     project: './tsconfig.json',
    //   },
    // },
  },
  env: {
    browser: true,
    node: true,
  },
  extends: [
    // 'airbnb-base', // airbnb的eslint规范，它会对import和require进行排序，挺好的。如果不用它的话，需要在env添加node:true
    'eslint:recommended',
    '@nuxtjs/eslint-config-typescript',
    'plugin:vue/vue3-recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['import'],
  // overrides: [],
  // rules会覆盖extends里面的规则（https://eslint.org/docs/latest/user-guide/migrating-to-6.0.0#-overrides-in-an-extended-config-file-can-now-be-overridden-by-a-parent-config-file）
  // rules里面的规则不会对overrides里面的文件生效
  rules: {
    /**
     * 0 => off
     * 1 => warn
     * 2 => error
     */
    'no-shadow': 0, // 禁止变量声明与外层作用域的变量同名
    'class-methods-use-this': 0, // 类方法如果不使用this的话会报错
    'no-console': 0, // 此规则不允许调用console对象的方法。
    'spaced-comment': ['error', 'always', { exceptions: ['-', '+'] }], // 该规则强制注释中 // 或 /* 后空格的一致性
    'no-var': 2, // 要求let或const代替var
    camelcase: [
      'error',
      { properties: 'never' }, // properties默认always，即检查属性名；可以设置为never，即不检查属性名
    ], // 强制执行驼峰命名约定
    'no-underscore-dangle': 2, // 此规则不允许在标识符中使用悬空下划线。
    'no-param-reassign': 2, // 禁止对 function 的参数进行重新赋值
    'no-nested-ternary': 2, // 禁止嵌套三元
    'no-plusplus': 2, // 禁用一元操作符 ++ 和 --
    'no-unused-vars': 0, // 禁止出现未使用过的变量
    'vars-on-top': 2, // 要求所有的 var 声明出现在它们所在的作用域顶部
    'prefer-const': 2, // 要求使用 const 声明那些声明后不再被修改的变量
    'prefer-template': 2, // 要求使用模板字符串代替字符串连接
    'new-cap': 2, // 要求构造函数名称以大写字母开头
    'no-restricted-syntax': [
      // 禁用一些语法
      'error',
      // 'ForInStatement',
      // 'ForOfStatement',
      {
        selector: 'ForInStatement',
        /**
         * 用 map() / every() / filter() / find() / findIndex() / reduce() / some() / ... 遍历数组，
         * 和使用 Object.keys() / Object.values() / Object.entries() 迭代你的对象生成数组。
         * 拥有返回值得纯函数比这个更容易解释
         */
        message:
          'for in会迭代遍历原型链(__proto__)，建议使用map/every/filter等遍历数组，使用Object.{keys,values,entries}等遍历对象',
      },
      {
        selector: 'ForOfStatement',
        message:
          '建议使用map/every/filter等遍历数组，使用Object.{keys,values,entries}等遍历对象',
      },
    ], // https://github.com/BingKui/javascript-zh#%E8%BF%AD%E4%BB%A3%E5%99%A8%E5%92%8C%E5%8F%91%E7%94%9F%E5%99%A8
    'no-iterator': 2, // 禁止使用__iterator__迭代器
    'require-await': 2, // 禁止使用不带 await 表达式的 async 函数
    'no-empty': 2, // 禁止空块语句
    'guard-for-in': 2, // 要求for-in循环包含if语句
    'global-require': 2, // 此规则要求所有调用require()都在模块的顶层，此规则在 ESLint v7.0.0中已弃用。请使用 中的相应规则eslint-plugin-node：https://github.com/mysticatea/eslint-plugin-node
    'no-unused-expressions': [
      2,
      {
        allowShortCircuit: true, // 允许短路
        allowTernary: true, // 允许三元
      },
    ], // 禁止未使用的表达式，即let a = true && console.log(1)允许，但是true && console.log(1)不行
    'object-shorthand': ['error', 'always'], // （默认）希望尽可能使用速记。var foo = {x:x};替换为var foo = {x};
    'no-useless-escape': 2, // 禁止不必要的转义字符

    // eslint-plugin-import插件
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // 如:import fs from 'fs';
          'external', // 如:import _ from 'lodash';
          'internal', // 如:import foo from 'src/foo';
          'parent', // 如:import foo from '../foo';
          'sibling', // 如:import bar from './bar';
          // ['sibling', 'parent'],
          // ['parent', 'sibling'],
          'index', // 如:import main from './';
          'object', // 如:import log = console.log;
          'type', // 如:import type { Foo } from 'foo';
        ],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
        'newlines-between': 'always', // 强制或禁止导入组之间的新行
        // 根据导入路径以字母顺序排列每个组中的顺序
        alphabetize: {
          order: 'asc', // 使用asc按升序排序，使用desc按降序排序（默认值：ignore）。
          caseInsensitive: true, // 使用true忽略大小写，而false考虑大小写（默认值：false）。
          orderImportKind: 'asc', // 使用asc以升序对各种导入类型进行排序，例如以type或typeof为前缀的导入，具有相同的导入路径。使用desc按降序排序（默认值：忽略）
        },
      },
    ],
    'import/newline-after-import': 2, // 强制在最后一个顶级导入语句或 require 调用之后有一个或多个空行
    'import/no-extraneous-dependencies': 2, // 禁止导入未在package.json中声明的外部模块。
  },
};
