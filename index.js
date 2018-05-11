/**
 * @file: index.js
 */
'use strict';

var babel = require('babel-core');
var presetenv = require('babel-preset-env');
var presetstage2 = require('babel-preset-stage-2');
var react = require('babel-preset-react');


module.exports = function(content, file, conf) {
    // 添加 useBabel 配置项，如果 useBabel 为 false 则不进行编译
    if (file.useBabel === false) {
        return content;
    }

    conf = fis.util.extend({
        presets: [
            presetenv,
            presetstage2,
            react
        ]
    }, conf);

    // 添加 jsx 的 html 语言能力处理
    if (fis.compile.partial && file.ext === '.jsx') {
        content = fis.compile.partial(content, file, {
            ext: '.html',
            isHtmlLike: true
        });
    }

    var sourceMapRelative = conf.sourceMapRelative;

    if (sourceMapRelative) {
        delete conf.sourceMapRelative;
    }

    // 出于安全考虑，不使用原始路径
    // conf.filename = file.subpath;

    var result = babel.transform(content, conf);

    // 添加resourcemap输出
    if (result.map) {
        var mapping = fis.file.wrap(file.dirname + '/' + file.filename + file.rExt + '.map');
        mapping.setContent(JSON.stringify(result.map, null, 4));
        var url = sourceMapRelative ? ('./' + file.basename + '.map').replace('jsx', 'js') :
            mapping.getUrl(fis.compile.settings.hash, fis.compile.settings.domain);
        result.code = result.code.replace(/\n?\s*\/\/#\ssourceMappingURL=.*?(?:\n|$)/g, '');
        result.code += '\n//# sourceMappingURL=' + url + '\n';
        file.derived.push(mapping);
    }

    return result.code;
};
