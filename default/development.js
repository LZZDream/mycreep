require('extend_creep')();
require('global_function')();
var link = require('link');

module.exports = function () {
    link.link();
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];

        if (creep.ticksToLive <= 100 &&
            creep.memory.role == "carryer" &&
            creep.room.name == creep.memory.spawn_room
        ) {
            if (creep.carry.energy != 0) {

                const storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: object => (object.structureType == STRUCTURE_STORAGE || object.structureType == STRUCTURE_LINK) && object.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                });

                if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }
            } else {
                creep.suicide();
            }
        } else {
            switch (creep.memory.role) {
                case 'worker':
                    creep.work();

                    break;
                case 'claim':
                    //creep.claim_room('W1N26');
                    break;
                case 'settlement':
                    //creep.memory.target="W0N30";
                    if (creep.room.name == "W2N34") creep.memory.target = "W0N30";
                    if (creep.room.name == "W0N30") {
                        if (creep.memory.task_id == 0) {
                            creep.memory.target = "W1N26";
                        } else if (creep.memory.task_id == 1) {
                            creep.memory.target = "W2N26";
                        }
                    }
                    //creep.memory.target=Game.spawns[creep.memory.spawn_room].memory.settlement.task[creep.memory.task_id].room;
                    creep.settlement(creep.memory.target);
                    break;
                case 'updater':
                    creep.update();
                    creep.say(creep.carry.energy);


                    break;
                case 'settlement_updater':
                    creep.update();
                    creep.say(creep.carry.energy);
                    break;
                case 'builder':
                    creep.build_structure();
                    break;
                case 'carryer':
                    if (creep.memory.task_id == 8) {

                        if (creep.ticksToLive < 500) creep.memory.need_heal = 1;
                        if (creep.memory.need_heal == 1) {
                            creep.increase_tick();
                        } else {
                            if (creep.fill_energy() == "no") {

                                if (creep.memory.spawn_room == "W8N33") {
                                    const terminal = Game.getObjectById('5e63093a0244801051efee22');
                                    const storage = Game.getObjectById('5e622f120f4ae05f00f92647');
                                    //creep.say('lab');
                                    creep.moveTo(11, 17);
                                    // creep.moveTo(n);
                                    //creep.carry_from_sto_to_ter('oxidant');
                                    // creep.carry_terminal_to_storage('utrium_bar');
                                    //creep.factory_product();

                                    if (terminal.store.energy < 50000) {
                                        creep.carry_from_sto_to_ter('energy');
                                    }
                                    else if (terminal.store.battery >= 50000) {
                                        creep.carry_terminal_to_storage('battery');
                                    } else if (terminal.store.energy > 60000) {
                                        creep.carry_terminal_to_storage('energy');
                                    } else if (creep.lab_product() == "no") {
                                        //creep.carry_from_sto_to_ter('keanium_bar');
                                        if (storage.store.energy >= 500000) {
                                            Game.rooms['W8N33'].memory.structure.factory.production = 'battery';
                                            creep.factory_product();
                                        } else if (terminal.store['O'] >= 50000) {
                                            Game.rooms['W8N33'].memory.structure.factory.production = 'oxidant';
                                            creep.factory_product();
                                        }

                                        // 
                                    }


                                } else if (creep.memory.spawn_room == "W9N33") {
                                    const terminal = Game.getObjectById('5e3114d6c8b0cec92bbdafdd');
                                    const storage = Game.getObjectById('5e1d5cffece8180d6ecbf5bf');
                                    if (terminal.store.energy <= 10000) {
                                        creep.memory.task.fill_terminal_energy = 1;
                                    } else if (terminal.store.energy >= 50000) {
                                        creep.memory.task.fill_terminal_energy = 0;
                                    }

                                     if (terminal.store['U'] >= 50000 && creep.store['U'] != 0) {
                                        Game.rooms['W9N33'].memory.structure.factory.production = 'utrium_bar';
                                        creep.factory_product();
                                    } else if (creep.memory.task.fill_terminal_energy) {
                                        creep.carry_from_sto_to_ter('energy');
                                    } else {

                                        if (terminal.store['U'] >= 50000 && creep.store['U'] != 0) {
                                            Game.rooms['W9N33'].memory.structure.factory.production = 'utrium_bar';
                                            creep.factory_product();
                                        } else if (storage.store.energy >= 500000) {
                                            Game.rooms['W9N33'].memory.structure.factory.production = 'battery';
                                            creep.factory_product();
                                        } else if (terminal.store['battery'] >= 10000) {
                                            creep.carry_terminal_to_storage('battery');
                                        }

                                        //else creep.factory_product();
                                    }
                                    // creep.carry_from_sto_to_ter('U');
                                    // creep.carry_terminal_to_storage('utrium_bar');
                                    // if (terminal.store.energy < 50000&&creep.store.energy==0) {
                                    //   
                                    //} else {
                                    //creep.carry_from_sto_to_ter('keanium_bar');

                                    // 
                                    //}

                                } else if (creep.memory.spawn_room == "W2N34") {
                                    const terminal = Game.getObjectById('5e47e9ab255f39219da5d83f');
                                    const storage = Game.getObjectById('5e40e968c8b0ce9238c305a2');
                                    //creep.factory_product();

                                    if (terminal.store['H'] > 50000) {
                                        Game.rooms['W2N34'].memory.structure.factory.production = 'reductant';
                                        creep.factory_product();
                                       
                                    } else if (terminal.store.energy < 50000) {
                                        creep.carry_from_sto_to_ter('energy');
                                    } else if (terminal.store.energy > 60000) {
                                        creep.carry_terminal_to_storage('energy');
                                    } else if (storage.store.energy >= 500000) {
                                        Game.rooms['W2N34'].memory.structure.factory.production = 'battery';

                                        creep.factory_product();
                                    } else if (terminal.store.energy < 50000) {
                                        creep.carry_from_sto_to_ter('energy');
                                    }

                                } else if (creep.memory.spawn_room == "W1N26") {
                                    
                                    try {

                                        const storage = Game.getObjectById(Game.rooms[creep.memory.spawn_room].memory.structure.storage);
                                        const terminal = Game.getObjectById(Game.rooms[creep.memory.spawn_room].memory.structure.terminal);
                                        if (terminal.store.energy <= 40000) {
                                            creep.memory.task.fill_terminal_energy = 1;
                                        } else if (terminal.store.energy > 50000) {
                                            creep.memory.task.fill_terminal_energy = 0;
                                        }

                                        
                                        if (creep.memory.task.fill_terminal_energy) {
                                            creep.carry_from_sto_to_ter('energy');

                                        } 
                                        else if (storage.store['energy'] >= 500000) {

                                            Game.rooms['W1N26'].memory.structure.factory.production = 'battery';

                                            creep.factory_product();
                                        } else if (terminal.store['X'] >= 50000) {

                                            Game.rooms['W1N26'].memory.structure.factory.production = 'purifier';

                                            creep.factory_product();
                                        } else if (terminal.store['X'] < 40000) {

                                            Game.rooms['W1N26'].memory.structure.factory.production = 'X';

                                            creep.factory_product();
                                        } 

                                    } catch (err) {
                                        //console.log("W1N6 dont have storage or terminal");
                                        var load_storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                                            filter: object => (object.structureType == STRUCTURE_STORAGE)
                                        });
                                        var load_terminal = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                                            filter: object => (object.structureType == STRUCTURE_TERMINAL)
                                        });
                                        if (!load_storage || !load_terminal) {
                                            const spawn = Game.getObjectById(Game.rooms[creep.memory.spawn_room].memory.structure.spawn);
                                            spawn.memory.carryer.task[8].num = 0;
                                            creep.suicide();
                                        } else {
                                            Game.rooms[creep.memory.spawn_room].memory.structure.storage = load_storage.id;
                                            Game.rooms[creep.memory.spawn_room].memory.structure.terminal = load_terminal.id;
                                        }


                                    }














                                   /*  try {

                                        const storage = Game.getObjectById(Game.rooms[creep.memory.spawn_room].memory.structure.storage);
                                        const terminal = Game.getObjectById(Game.rooms[creep.memory.spawn_room].memory.structure.terminal);
                                        if (terminal.store.energy < 50000) {
                                            creep.carry_from_sto_to_ter('energy');
                                        } else if (terminal.store['X'] >= 50000||creep.store["X"]>0) {

                                            Game.rooms['W1N26'].memory.structure.factory.production = 'purifier';

                                            creep.factory_product();
                                        }else if (storage.store['energy'] >= 500000) {

                                            Game.rooms['W1N26'].memory.structure.factory.production = 'battery';

                                            creep.factory_product();
                                        } 


                                    } catch (err) {
                                        //console.log("W1N6 dont have storage or terminal");
                                        var load_storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                                            filter: object => (object.structureType == STRUCTURE_STORAGE)
                                        });
                                        var load_terminal = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                                            filter: object => (object.structureType == STRUCTURE_TERMINAL)
                                        });
                                        if (!load_storage || !load_terminal) {
                                            const spawn = Game.getObjectById(Game.rooms[creep.memory.spawn_room].memory.structure.spawn);
                                            spawn.memory.carryer.task[8].num = 0;
                                            creep.suicide();
                                        } else {
                                            Game.rooms[creep.memory.spawn_room].memory.structure.storage = load_storage.id;
                                            Game.rooms[creep.memory.spawn_room].memory.structure.terminal = load_terminal.id;
                                        }


                                    } */

                                } else if (creep.memory.spawn_room == "W8N32") {
                                    const terminal = Game.getObjectById('5e474b1b500f8a5d146f2be7');
                                    const storage = Game.getObjectById('5e3a6e6b30e4a2b22ba9a2f7');
                                    if (storage.store.energy >= 700000) {
                                        Game.rooms['W8N32'].memory.structure.factory.production = 'battery';

                                        creep.factory_product();
                                        //creep.carry_from_sto_to_ter('energy');
                                    }
                                } else if (creep.memory.spawn_room == "W2N26") {
                                    // console.log(Game.rooms[creep.memory.spawn_room].structure.storage)
                                    //console.log(Game.rooms[creep.memory.spawn_room].)
                                    try {

                                        const storage = Game.getObjectById(Game.rooms[creep.memory.spawn_room].memory.structure.storage);
                                        const terminal = Game.getObjectById(Game.rooms[creep.memory.spawn_room].memory.structure.terminal);
                                        if (terminal.store.energy <= 40000) {
                                            creep.memory.task.fill_terminal_energy = 1;
                                        } else if (terminal.store.energy > 50000) {
                                            creep.memory.task.fill_terminal_energy = 0;
                                        }

                                        
                                        if (creep.memory.task.fill_terminal_energy) {
                                            creep.carry_from_sto_to_ter('energy');

                                        } 
                                        else if (storage.store['energy'] >= 500000) {

                                            Game.rooms['W2N26'].memory.structure.factory.production = 'battery';

                                            creep.factory_product();
                                        } else if (terminal.store['X'] >= 50000) {

                                            Game.rooms['W2N26'].memory.structure.factory.production = 'purifier';

                                            creep.factory_product();
                                        } else if (terminal.store['X'] < 40000) {

                                            Game.rooms['W2N26'].memory.structure.factory.production = 'X';

                                            creep.factory_product();
                                        } else if (terminal.store.battery >= 50000) {
                                           // creep.carry_terminal_to_storage('battery');
                                        } else if (terminal.store.battery <= 40000) {
                                            creep.carry_carry_from_sto_to_ter('battery');
                                        }

                                    } catch (err) {
                                        //console.log("W1N6 dont have storage or terminal");
                                        var load_storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                                            filter: object => (object.structureType == STRUCTURE_STORAGE)
                                        });
                                        var load_terminal = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                                            filter: object => (object.structureType == STRUCTURE_TERMINAL)
                                        });
                                        if (!load_storage || !load_terminal) {
                                            const spawn = Game.getObjectById(Game.rooms[creep.memory.spawn_room].memory.structure.spawn);
                                            spawn.memory.carryer.task[8].num = 0;
                                            creep.suicide();
                                        } else {
                                            Game.rooms[creep.memory.spawn_room].memory.structure.storage = load_storage.id;
                                            Game.rooms[creep.memory.spawn_room].memory.structure.terminal = load_terminal.id;
                                        }


                                    }

                                }


                            }

                        }
                    } else creep.carry_energy();

                    break;
                case 'filler':

                    creep.fill_energy();


                    break;
                case 'repairer':

                    creep.repair_structure();

                    break;
                case 'defence':
                    creep.defence();
                    creep.say("lala");
                    break;

            }
        }
    }
}