require('global_function')();

var sell = require('sell_energy');
var defence = require('defence');
var delete_memory = require('delete_memory');
var W8N33=require('W8N33')
var W1N26=require('W1N26')
try {
    Game.spawns["Spawn1Spawn1"].memory = Game.spawns["Spawn1"].memory;
    Game.spawns["Spawn1_"].memory = Game.spawns["Spawn1"].memory;
    Game.spawns["Spawn2Spawn2"].memory = Game.spawns["Spawn2"].memory;
     Game.spawns["Spawn6_2"].memory = Game.spawns["Spawn6"].memory;

} catch (err) {
    console.log(err);
}

module.exports.loop = function () {
    if(Game.cpu.bucket ==10000) {
        Game.cpu.generatePixel();
    }
    require('power_creep')();
    require('factory')();
    require('extend_power_creep')();
    require('lab_reaction')('W8N33');
    require('delete_memory');
    /* W8N33.run(); */
    W1N26.run()
    spawn_creep();
    ///var lala=Game.market.getHistory(['K']);
    //console.log(JSON.stringify(lala));
    //console.log(Game.market.getHistory(['K'])[0].avgPrice);



    

    //console.log(sell_obar.remainingAmount);
    defence();
    //Game.rooms['W1N26'].memory.structure= Game.rooms['W8N33'].memory.structure;
    //Game.rooms['W8N33'].memory.structure.terminal.id='5e63093a0244801051efee22';
    const terk = Game.getObjectById('5e474b1b500f8a5d146f2be7');



    sell.sell_energy();
    try {
        delete_memory.delete_memory();
    } catch (err) {

    }

    //Game.rooms['W1N26'].terminal.send('energy',50000,'W6N32','lzz');
    //Game.rooms['W8N33'].terminal.send('oxidant',20000,'E29N8','lzz');
    //Game.rooms['W8N32'].terminal.send('K',20000,'W9N32','lzz'); 
    //Game.rooms['W8N33'].terminal.send('energy', 40000, 'W9N33', 'lzz');
    // Game.rooms['W2N34'].terminal.send('energy', 60000, 'W9N33', 'lzz');
    try {
        require('development')();
    } catch (err) {
        console.log("development error");
        console.log(err);
    }


    // console.log(ps.store.power);
    // ps.processPower();

    //pc.usePower(PWR_GENERATE_OPS);
    /*
    if (pc.ticksToLive < 500) {
        if (pc.renew(ps) == ERR_NOT_IN_RANGE) {
            pc.moveTo(ps);
        }
    } else {
        if (pc.store.ops >= 100) {
            if (pc.transfer(stor, "ops") == ERR_NOT_IN_RANGE) {
                pc.moveTo(stor);
            }
        }
        // else pc.moveTo(11,22);
        if (ps.store.power == 0 && term.store.power > 0) {
            pc.carry_api(term, ps, "power");
        } else {
            //pc.moveTo(11, 25);
        }

    }
*/

    //factory.produce(production) ;



}