fis3-parser-babel-env
============================

> 直接 copy 的 [fis-parser-babel-6.x](https://github.com/fex-team/fis-parser-babel-6.x)
> <br>添加了[sourceMap 支持](https://github.com/fex-team/fis-parser-babel-6.x/issues/20)
> <br>将 `preset-2015` 改为 `preset-env`, `preset-stage-3` 改为 `preset-stage-2`

插件默认开启了 `preset-env` `preset-stage-2` `preset-react`，如果希望使用更多的babel插件，可以使用插件配置自行添加

插件配置文档可以参考 https://babeljs.io/docs/usage/api/#options

### 安装

```shell
npm install fis3-parser-babel-env --save-dev
```

FIS2用法: 不支持


FIS3用法

```
fis.set('project.fileType.text', 'es');
fis.match('server/**.es', {
    parser: fis.plugin('babel-env', {
        // presets: [
        // 注意一旦这里在这里添加了 presets 配置，则会覆盖默认加载的 preset-env 等插件，因此需要自行添加所有需要使用的 presets
        // ]
    }),
    rExt: 'js'
});
```


## 如何开启resourcemap

以下例子以 FIS3 为示例

```
fis.match('server/**.es', {
    parser: fis.plugin('babel-env', {
        sourceMaps: true,
        sourceMapRelative: true  // 使用相对路径
    }),
    rExt: 'js'
});
```


## DEMO

https://github.com/fex-team/fis3-demo/tree/master/use-react
