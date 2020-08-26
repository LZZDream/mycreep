module.exports = {
    harvest_energy: function (creep) {
        const room_memory = Game.rooms[creep.room.name].memory;
        if (!room_memory.sources) {
            room_memory.sources = [];
            const sources = creep.room.find(FIND_SOURCES);
            var i = 0;
            for (i = 0; i < sources.length; i++) {
                console.log(sources[i]);
                room_memory.sources[i] = sources[i];
            }
            return;
        }

        if (!creep.memory.task.isdefined) {
            creep.memory.task.from = room_memory.sources[0];
            creep.memory.task.isdefined = 1;
        }
        const source = Game.getObjectById(creep.memory.task.from.id);

        const container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: object => object.structureType == STRUCTURE_CONTAINER
        });
        const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

        if (creep.store.energy < creep.store.getCapacity()) { //没满进行采集
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {
                    visualizePathStyle: {
                        stroke: "#ffffff"
                    }
                });
                if (creep.moveTo(source) == -2) {
                    if (room_memory.sources[1]) {
                        creep.memory.task.from = sources[1];
                        return;
                    }
                }
            }
        } else {
            if (container && creep.pos.inRangeTo(container, 1)) { //满了
                creep.transfer(container, RESOURCE_ENERGY);
                if (container.store.energy == 2000) creep.memory.settlement_task = 'building';
            } else if (target && creep.pos.inRangeTo(target, 1) && target.structureType == STRUCTURE_CONTAINER) {
                creep.build(target);

            } else {
                creep.pos.createConstructionSite(STRUCTURE_CONTAINER);
                return;
            }
        }
    },

    build_structure: function (creep) {

        const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        const container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: object => object.structureType == STRUCTURE_CONTAINER
        });

        if (target&&this.pos.inRangeTo(container, 15)) {
            if (creep.store.energy == 0) {
                if (container.store.energy == 0) {
                    creep.memory.settlement_task = 'harvesting';
                    return;
                }

                if (this.pos.inRangeTo(container, 1)) this.withdraw(container, LOOK_ENERGY)
                else this.moveTo(container);
            } else {
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        } else {
            creep.memory.settlement_task = 'harvesting';
            return;
        }





    },
    get_energy: function (creep, container) {
        /* const container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: object => object.structureType == STRUCTURE_CONTAINER
        }); */
        if (creep.pos.inRangeTo(container, 1)) creep.transfer(container, RESOURCE_ENERGY);
        else creep.moveTo(container);
    },
};