var result = arguments[0];

var tweet = result.text.replace(/(\bhttps?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '<a onclick="Ti.App.fireEvent(\'detail:click\',{link:\'$1\'})">$1</a>')
                       .replace(/(^|\s)@(\w+)/g, '$1<a onclick="Ti.App.fireEvent(\'detail:click\',{user:\'$2\'})">@$2</a>')
                       .replace(/(^|\s)#(\w+)/g, '$1<a onclick="Ti.App.fireEvent(\'detail:click\',{tag:\'$2\'})">#$2</a>');

var html = [
	'<html>',
	'  <head>',
	'    <style>',
	'      body { margin: 0; font-family: \'Helvetica Neue\'; font-size: 11px; }',
	'      a { color: #00f }',
	'    </style>',
	'  </head>',
	'  <body>' + tweet + '</body>',
	'</html>'
].join('\n');

$.image.image = result.profile_image_url;
$.name.text = result.from_user;
$.html.html = html;

function handleLinks(e) {
	
	if (e.user) {
		var scheme = 'twitter://' + e.user;
		
		if (Ti.Platform.canOpenURL(scheme)) {
			Ti.Platform.openURL(scheme);
		} else {
			Ti.Platform.openURL('http://twitter.com/' + e.user);
		}
		
	} else if (e.tag) {
		Ti.Platform.openURL('http://twitter.com/search?q=' + e.tag);
	} else {
		Ti.Platform.openURL(e.link);
	}
}

Ti.App.addEventListener('detail:click', handleLinks);

$.detail.addEventListener('close', function () {
	Ti.App.removeEventListener('detail:click', handleLinks);
});

if (OS_IOS) {
	$.ios.text = 'I am really on iOS!';
}
