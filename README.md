一个使用NODE写的婚礼请柬，指定用户生成链接，使用文件记录用户反馈，无需数据库支持。

#截图
![screenshot1](https://github.com/kession/wedding_invitation/blob/master/screenshot/screenshot1.png)

![screenshot1](https://github.com/kession/wedding_invitation/blob/master/screenshot/screenshot2.png)

#启动

    ./run.sh
or

    node run.js
    
    
    
#访问

复制生成的链接给亲戚朋友

    http://127.0.0.1:8888/#/i/f7c57f06a1d3ce117749fc98e2111668

没被邀请的用户不能访问，可自行修改代码控制。


#生成链接

    node tool.js


#用户反馈

用户可以选择接受邀请或拒绝，在`files`目录生成文件进行记录。

#图片修改

图片PSD位于`psd`目录，可以自行修改，字体已忘记自行换自己喜欢的吧。
