exports.translate = function (load) {
    console.log("Dummy Transpiler called for file:=" + load.name);
    
    return load.source;
}