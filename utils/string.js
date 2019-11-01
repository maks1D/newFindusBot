String.prototype.toTitleCase = function() {
    var result = this.split(' ')
    for(var i = 0; i < result.length; i++){
        if(result == '') continue
        var second = result[i].substring(1).toLowerCase()
        result[i] = result[i][0].toUpperCase() + second
    }
    result = result.join(' ')
    return result
}