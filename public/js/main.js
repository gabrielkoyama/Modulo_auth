
String.prototype.format = function() {
    
    /* "{0}".format("a") ---> "a" */

    a = this;
    for (k in arguments) {
      a = a.replace("{" + k + "}", arguments[k])
    }
    return a
}