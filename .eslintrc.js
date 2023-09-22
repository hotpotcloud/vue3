
module.exports = {
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    globals: {
      uni: true,
      plus: 'readonly',
      wx: 'readonly',
      getCurrentPages: 'readonly',
    },
    extends: [
      'eslint:recommended',
      'plugin:prettier/recommended',
      'plugin:vue/essential',
    ],
    parserOptions: {
      ecmaVersion: 6,
      sourceType: 'module',
      extraFileExtensions: ['.vue'],
    },
    rules: {
      'prefer-promise-reject-errors': [0],
      'standard/no-callback-literal': [0], // 允许在callback中使用所有类型参数
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-function': [0],
      '@typescript-eslint/no-explicit-any': [0],
      '@typescript-eslint/no-var-requires': [0],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/no-non-null-assertion': 'off',
      'no-unused-vars': 'off',
      // 禁止条件表达式中出现赋值操作符
      'no-cond-assign': 2,
      // 禁止在条件中使用常量表达式
      'no-constant-condition': 2,
      // 禁止在正则表达式中使用控制字符 ：new RegExp("\x1f")
      'no-control-regex': 2,
      // 禁止 function 定义中出现重名参数
      'no-dupe-args': 2,
      // 禁止对象字面量中出现重复的 key
      'no-dupe-keys': 2,
      // 禁止重复的 case 标签
      'no-duplicate-case': 2,
      // 禁止空语句块
      'no-empty': 2,
      // 禁止在正则表达式中使用空字符集 (/^abc[]/)
      'no-empty-character-class': 2,
      // 禁止对 catch 子句的参数重新赋值
      'no-ex-assign': 2,
      // 禁止不必要的布尔转换
      'no-extra-boolean-cast': 2,
      // 禁止不必要的括号 //(a * b) + c;//报错
      'no-extra-parens': 0,
      // 禁止不必要的分号
      'no-extra-semi': 2,
      // 禁止对 function 声明重新赋值
      'no-func-assign': 2,
      // 禁止在嵌套的块中出现 function 或 var 声明
      'no-inner-declarations': [2, 'functions'],
      // 禁止 RegExp 构造函数中无效的正则表达式字符串
      'no-invalid-regexp': 2,
      // 禁止在字符串和注释之外不规则的空白
      'no-irregular-whitespace': 2,
      // 禁止在 in 表达式中出现否定的左操作数
      'no-negated-in-lhs': 2,
      // 禁止正则表达式字面量中出现多个空格
      'no-regex-spaces': 2,
      // 禁用稀疏数组
      'no-sparse-arrays': 2,
      // 禁止出现令人困惑的多行表达式
      'no-unexpected-multiline': 2,
      // 禁止在return、throw、continue 和 break语句之后出现不可达代码
      'no-unreachable': 2,
      // 使用 === 替代 == allow-null允许null和undefined==
      eqeqeq: [2, 'allow-null'],
      // 禁止 case 语句落空
      'no-fallthrough': 2,
      // 禁止数字字面量中使用前导和末尾小数点
      'no-floating-decimal': 2,
      // Node.js and CommonJS //
      // require return statements after callbacks
      'callback-return': 0,
      // 要求 require() 出现在顶层模块作用域中
      'global-require': 0,
      // 要求回调函数中有容错处理
      'handle-callback-err': [2, '^(err|error)$'],
      // 禁止混合常规 var 声明和 require 调用
      'no-mixed-requires': 0,
      // 禁止调用 require 时使用 new 操作符
      'no-new-require': 2,
      // 禁止对 __dirname 和 __filename进行字符串连接
      'no-path-concat': 0,
      // 禁用 process.env
      'no-process-env': 0,
      // 禁用 process.exit()
      'no-process-exit': 0,
      // 禁用同步方法
      'no-sync': 0,
      // 风格指南 //
      // 禁止行末空格
      'no-trailing-spaces': 2,
      // ES6.相关 //
      // 禁止修改 const 声明的变量
      'no-const-assign': 2,
      // 禁止类成员中出现重复的名称
      'no-dupe-class-members': 2,
      // 不允许复制模块的进口
      'no-duplicate-imports': 0,
      // 禁止 Symbol 的构造函数
      'no-new-symbol': 2,
      // 允许指定模块加载时的进口
      'no-restricted-imports': 0,
      // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
      'no-this-before-super': 2,
      // 禁止不必要的计算性能键对象的文字
      'no-useless-computed-key': 0,
      // 要求使用 let 或 const 而不是 var
      'no-var': 0,
      // 要求或禁止对象字面量中方法和属性使用简写语法
      'object-shorthand': 0,
      // 要求使用箭头函数作为回调
      'prefer-arrow-callback': 0,
      // 要求使用 const 声明那些声明后不再被修改的变量
      'prefer-const': 0,
      // 要求在合适的地方使用 Reflect 方法
      'prefer-reflect': 0,
      // 要求使用扩展运算符而非 .apply()
      'prefer-spread': 0,
      // 要求使用模板字面量而非字符串连接
      'prefer-template': 0,
      // Suggest using the rest parameters instead of arguments
      'prefer-rest-params': 0,
      // 要求generator 函数内有 yield
      'require-yield': 0,
      // enforce spacing between rest and spread operators and their expressions
      'rest-spread-spacing': 0,
      // 强制模块内的 import 排序
      'sort-imports': 0,
      // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
      'template-curly-spacing': 1,
      // 强制在 yield* 表达式中 * 周围使用空格
      'yield-star-spacing': 2,
      // vue/component-definition-name-casing 对组件定义名称强制使用特定的大小
      'vue/name-property-casing': ['error', 'PascalCase'],
      'vue/attributes-order': 'off',
      'vue/one-component-per-file': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/attribute-hyphenation': 'off',
      'vue/require-default-prop': 'off',
      'vue/script-setup-uses-vars': 'off',
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'never',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
    },
  }  
