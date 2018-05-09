function HashTable() {
    this.table = [];
}

//loselose散列函数
HashTable.prototype.loseloseHash = function(str){
    var hash = 0;
    for(var i=0; i<str.length; i++){
        hash += str.charCodeAt(i);
    }
    return hash;
}

//增加/更新 散列表
HashTable.prototype.put = function(key,value){
    this.table[this.loseloseHash(key)] = value;
    return this.loseloseHash(key);
}

//删除散列表一个值
HashTable.prototype.remove = function(key){
    this.table[this.loseloseHash(key)] = undefined;
}

//获取散列表的一个值
HashTable.prototype.get = function(key){
    return this.table[this.loseloseHash(key)];
}