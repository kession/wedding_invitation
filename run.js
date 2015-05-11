start();

function start()

{

	console.log('Mother process is running.');

	var ls = require('child_process').spawn('node', ['invitationApp.js']);

	ls.stdout.on('data', function (data)

	{

		console.log(data.toString());

	});

	ls.stderr.on('data', function (data)

	{

		console.log(data.toString());

	});

	ls.on('exit', function (code)

	{

		console.log('child process exited with code ' + code);

		delete(ls);

		setTimeout(start,5000);

	});

}