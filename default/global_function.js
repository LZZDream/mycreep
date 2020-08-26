var hatch = require('hatch');
var hatch_init=require('hatch_init'); 
module.exports = function () {
    global.factory_start = function(room_name,production) {
        Game.rooms[room_name].memory.structure.factory.start=1;
        Game.rooms[room_name].memory.structure.factory.production = production;
    };
    global.factory_start = function(room_name,production,num) {
        Game.rooms[room_name].memory.structure.factory.num=num;
        Game.rooms[room_name].memory.structure.factory.start=1;
        Game.rooms[room_name].memory.structure.factory.production = production;
    };
    global.factory_stop = function (room_name) {
        Game.rooms[room_name].memory.structure.factory.start = 0;
        if (Game.rooms[room_name].memory.structure.factory.start == 0) {
            return 0;
        }
    };

    global.spawn_creep = function () {
        hatch_init.hatch_init(); 
        hatch.begin_spawn();
    };

    global.lab_start = function (room_name) {
        Game.rooms[room_name].memory.structure.lab.start = 1;
        if (Game.rooms[room_name].memory.structure.factory.start == 1) {
            return "OK";
        }
    };

    /* global.lab_start = function (room_name,f1_type,f2_type) {
        Game.rooms[room_name].memory.structure.lab.start = 1;
        Game.rooms[room_name].memory.structure.lab.f1.type = f1_type;
        Game.rooms[room_name].memory.structure.lab.f2.type = f2_type;
        if (Game.rooms[room_name].memory.structure.factory.start == 1) {
            return "OK";
        }
    }; */
    global.get_price = function (type) {
        var deal = Game.market.getAllOrders({
            type: ORDER_BUY,
            resourceType: type
        });
        deal.sort((a, b) => b.price - a.price);
        console.log(deal[0].remainingAmount);
        console.log(deal[0].id);
        console.log(deal[0].price);
        return "OK";
        
       
    };
    
    global.sell = function (id,num,room) {
       Game.market.deal(id, num, room) 
        
       
    };
    
};




