var fs = require('fs');

exports.write = function(fileName, content, callback) {
    //写入文件
   fs.writeFile(fileName, content,'utf8', function (err) {
       if (err) {
       	  console.error('write file error. fileName:' + fileName + ', err:' + JSON.stringify(err)) ;
       	  callback(false);
       }

       console.log('Saved file: ' + fileName ); //文件被保存

       callback(true);
   });   
}

exports.read = function(fileName, callback) {
   //读取文件
	fs.readFile(fileName, 'utf8', function (err, data) {
	     if (err) {
       	  console.error('read file error. fileName:' + fileName + ', err:' + JSON.stringify(err)) ;
       	  callback(err, null);
       } else {
         console.log('Read file: ' + fileName ); //文件被读取

         callback(null, data);
       }

       
	});   
}


exports.exists = function(fileName, callback) {
  console.log('is exists file: ' + fileName ); //文件被读取
  fs.exists(fileName, function(result){
    callback(result);
  });
};

