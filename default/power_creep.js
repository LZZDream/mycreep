module.exports = function(){
    const power_creep=Game.powerCreeps['LZZ'];

    const power_spawn=Game.getObjectById(power_creep.memory.power_spawn);
    /* Game.getObjectById('5e621b6911a570af465b7607'); */
    const storage=Game.getObjectById(Game.rooms[power_creep.memory.spawn_room].memory.structure.storage);
   /*  Game.getObjectById('5e622f120f4ae05f00f92647'); */

    if(!power_creep.ticksToLive){
        power_creep.spawn(power_spawn);
        return;
    }

    if(power_creep.ticksToLive<2500){
        power_creep.renew(power_spawn);
        return;
    }
    else{
        power_creep.usePower(PWR_GENERATE_OPS);
        if (power_creep.store.ops >= 100) {
            power_creep.transfer(storage, "ops");
        }
    }

    
    

}