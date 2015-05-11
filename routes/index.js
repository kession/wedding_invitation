var fileUtil = require('../util/fileUtil');
var settings = require('../settings');
/*
 * GET home page.
 */

module.exports = function (app) {

	

    // 首页
    app.get('/', function (req, res) {
    	
        res.render('index', {
        	
        });
    });

    app.get('/u/:uid', function (req, res) {
    	var json = {
	        c 	: 1,
	        d 	: null
	    };
    	var uid =  req.params.uid ;

    	console.log('uid:' + uid + ', un:' + settings.visitor[uid]);

    	if(!uid || !settings.visitor[uid]) {
    		json.c = 0;
    		json.d = '未被邀请的用户!';
    		res.json(json);
    	} else {
    		json.c = 1;
    		json.d = settings.visitor[uid];
    		res.json(json);
    	}

        
    });

    app.post('/join/:uid', function (req, res) {
    	var json = {
	        c 	: 1,
	        d 	: null
	    };

    	var uid =  req.params.uid ;
    	var	type = parseInt(req.body.t);

    	if(type != 1 && type != 0) {
    		json.c = 0;
    		json.d = '未知类型';
    		res.json(json);
        	return;
    	}

    	var username = settings.visitor[uid];

    	if(!uid || !username) {
    		json.c = 0;
    		json.d = '未被邀请的用户!';
    		res.json(json);
        	return;
    	}


    	var fileName = './files/' + uid + '.txt';
    	

    	var content = '['+ new Date() + ']: ' +  username + ' 参加！';  

    	if(type == 0) {
    		content = '['+ new Date() + ']: ' +  username + ' 不参加！'; 
    	}  	

    	try {

    		fileUtil.exists(fileName, function(isExists){
    			if(isExists) {
    				// 已操作过
    				json.c = 0;
    				json.d = '您已经确认过了！要有变数及时通知我们吧!';
    				res.json(json);
    				return;
    			} else {
    				fileUtil.write(fileName, content, function(err){
			    			if(err) {
			    				json.c = 1;
			    				json.d = '操作成功';
			    				res.json(json);
			    			} else {
			    				json.c = 0;
			    				json.d = '系统繁忙';
			    				res.json(json);
			    			}
	    			
	    			});
    			}

    		});    		
    		
    	} catch(e) {
    		console.log('read OR write FileErr: ' + JSON.stringify(e));
    		json.c = 0;
    		json.d = '系统繁忙';
    		res.json(json);
        	return;
    	}

    });


	// 404
	app.get('*', function(req, res){
	    res.render('404', {
	        title: 'No Found'
	    })
	});

};
