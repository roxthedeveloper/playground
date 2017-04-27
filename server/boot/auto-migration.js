module.exports = function(app){
    var mysqlDs = app.dataSources.mysqlDs;

    mysqlDs.autoupdate('Member', function(err){
        if(err) throw err;
        console.log('Table [Member] created in', mysqlDs.adapter.name);
    });
}