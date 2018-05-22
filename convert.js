var fontnik = require('.');
var fs = require('fs');
var path = require('path');

/**
 * 转换方法
 * @param {String} fileName 字体文件路径
 * @param {String} outputDir 输出分段文件路径
 */
var convert = function (fileName, outputDir) {
    var font = fs.readFileSync(path.resolve(__dirname + "/" + fileName));
    output2pbf(font, 0, 255, outputDir);
}

function output2pbf(font, start, end, outputDir) {
    if (start > 65535) {
        console.log("done!");
        return;
    }
    fontnik.range({ font: font, start: start, end: end }, function (err, res) {
        var outputFilePath = path.resolve(__dirname + "/" + outputDir + start + "-" + end + ".pbf");
        fs.writeFile(outputFilePath, res, function (err) {
            if (err) {
                console.error(err);
            } else {
                output2pbf(font, end + 1, end + 1 + 255, outputDir);
            }
        });
    });
}
convert("./fonts/YaHei/MSYaHei.ttf", "./Microsoft YaHei/");