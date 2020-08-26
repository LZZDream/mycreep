
module.exports = {
    run(){
		for(var name in Game.structures){
		    var tower=Game.structures[name];
		    if(tower.structureType==STRUCTURE_TOWER){
		        const invade = tower.room.find(FIND_HOSTILE_CREEPS);
		        const my_creep = tower.room.find(FIND_MY_CREEPS,{filter: (i) => i.hits<i.hitsMax});
		        const container = tower.room.find(FIND_STRUCTURES,{filter: (i) => i.structureType==STRUCTURE_CONTAINER&&i.hits<i.hitsMax});
		        const road = tower.room.find(FIND_STRUCTURES,{filter: (i) => i.structureType==STRUCTURE_ROAD&&i.hits<i.hitsMax});
		        
		        if(invade.length > 0&& invade[0].owner.username!='RoyalKnight') {
                    if(tower.attack(invade[0]) == ERR_NOT_ENOUGH_ENERGY) {
                        tower.attack(invade[0]);
                        
                        console.log(invade[0].body); 
                    }
                }
               
                else if(container.length>0){
                    tower.repair(container[0]);
                }
                else if(road.length>0){
                    tower.repair(road[0]);
                }
                else if(my_creep){
                    tower.heal(my_creep[0]);
                }
		        
		    }
		    
		}
    }
};