var async = require('async');

module.exports = function(app){
    var TESTING = true;
    var mysqlDs = app.dataSources.mysqlDs;

    if(TESTING){
        async.parallel({
            members: async.apply(createMembers),
            workEvents: async.apply(createWorkEvents)   
        }, function(err, results){
            if(err) throw err;
            console.log('> models created successfully');
        });
    }else{
        var lbTables = ['Member', 'WorkEvent'];

        mysqlDs.autoupdate(lbTables, function(err){ //use autoupdate to keep existing data
            if(err) throw err;
            console.log('Table ['+ lbTables +'] created in', mysqlDs.adapter.name);
        });
    }

    //--------------------------------------------------------------------------------------------helpers
    function createMembers(cb){
        mysqlDs.automigrate('Member', function(err){
            if(err) return cb(err);
            //insert data into db
            var Member = app.models.Member;
            Member.create([
                {email: 'test@email.com', password: '1111'},
                {email: 'abc@email.com', password: '1111'}
            ], cb);
        });
    }

    function createWorkEvents(cb){
        mysqlDs.automigrate('WorkEvent', function(err){
            if(err) return cb(err);
            //insert data into db
            var WorkEvent = app.models.WorkEvent;
            WorkEvent.create([
                {
                    title: 'wedding for jack', 
                    type: 'wedding', 
                    description: 'a short wedding in summer', 
                    start: (new Date(2017, 1, 2, 9, 10, 0, 0)).toJSON(), 
                    end: (new Date(2017, 1, 2, 20, 10, 0, 0)).toJSON(), 
                    createdOn: (new Date()).toJSON(),
                    modifiedOn: (new Date()).toJSON()
                },
                {
                    title: 'wedding for jason', 
                    type: 'wedding', 
                    description: 'a big fat greek wedding in winter', 
                    start: (new Date(2017, 10, 2, 7, 10, 0, 0)).toJSON(), 
                    end: (new Date(2017, 10, 2, 22, 10, 0, 0)).toJSON(), 
                    createdOn: (new Date()).toJSON(),
                    modifiedOn: (new Date()).toJSON()
                }
            ], cb);
        });
    }
}