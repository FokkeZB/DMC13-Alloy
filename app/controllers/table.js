var file = Ti.Filesystem.getFile('twitter.json');
var json = file.read();
var object = JSON.parse(json);
var rows = [];
	
	
_.each(object.results, function (result) {
	var row = Alloy.createController('row', result);
	
	rows.push(row.getView());
});

$.tableView.setData(rows);


function showDetail(e) {
	var detail = Alloy.createController('detail', e.rowData.result);
	
	Alloy.Globals.navgroup.open(detail.getView());
}