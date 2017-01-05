var TestPlugin = function() {};

TestPlugin.prototype.apply = function(compiler) {
    compiler.plugin('compilation', function(compilation) {
        compilation.plugin('optimize-chunks', function(chunks) {
            chunks.forEach(function(chunk) {
                console.log(chunk);
            })
        });
    })
}

module.exports = TestPlugin;