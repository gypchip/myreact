## 基于mobx的公共状态管理方案

mobox是一个简单可扩展的状态管理库，相比较于redux，她：
  + 开发难度低
  + 开发代码量少
  + 渲染性能好
### 想使用Mobox先安装babel插件
```shell
# 支持装饰器语法
npm i @babel/plugin-proposal-decorators
# 编译class插件
npm i @babel/plugin-proposal-class-properties
```
在package.json里面配置
```json
"plugins": [
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true // 让装饰器语法遗留版本为主
      }
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose": true
      }
    ]
  ]
```

### mobx第五代版本的运用
安装

