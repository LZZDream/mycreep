
var hatch_init=function(){
    for(var name in Game.spawns){ 
        var spawn=Game.spawns[name];
        
        //up 
        try{
            const controller=spawn.room.find(FIND_STRUCTURES,{
				filter: object => object.structureType==STRUCTURE_CONTROLLER&&object.level==8});
			if(controller.length>0){
			    if(controller[0].ticksToDowngrade<=60000){
			        spawn.memory.updater.task[0].num=1;
			    }
			}
        }
        catch(err){
			console.log(name);
			console.log("hatch_init updater error");
			console.log(err);
		}

		//builder
		try{
			if((spawn.room.find(FIND_CONSTRUCTION_SITES)).length>0){
				spawn.memory.builder.task[0].num=1;
			}
			else{
				spawn.memory.builder.task[0].num=0;
			}
		}
		catch(err){
			console.log(name);
			console.log("hatch_init builder error");
			console.log(err);		
		}
	    
    
        
        //defence
        try{
			const wall=spawn.room.find(FIND_STRUCTURES,{filter: object => object.structureType==STRUCTURE_RAMPART&&object.hits<object.hitsMax});
			const storage=spawn.room.find(FIND_STRUCTURES,{filter: object => object.structureType==STRUCTURE_STORAGE});
			
			if(storage[0].store.energy>300000&&wall.length>0){
			    if(spawn.room.name=="W9N33"){
			        spawn.memory.defence.task[0].num=3;
			    }else if(spawn.room.name=="W2N34"){
			        spawn.memory.defence.task[0].num=2;
			    }
			    else spawn.memory.defence.task[0].num=1;
	             
	        }
	        else{
				spawn.memory.defence.task[0].num=0;
				
	        } 
        }
        catch(err){
			console.log(name);
			spawn.memory.defence={
				"task":[
					{
						"num":0,
						"wall_hits":1000000,
						"equipment":[WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE],
					}
					
				]
			};
			console.log("hatch_init defencer error");
			console.log(err);		 
		}
        
        //mineral 
        
	    try{
	       
	        const extractor=spawn.room.find(FIND_STRUCTURES,{filter: object => object.structureType==STRUCTURE_EXTRACTOR});
	        const mineral=spawn.room.find(FIND_MINERALS);
		    
		    
	        if(mineral[0].mineralAmount==0&&extractor.length>0){
	            spawn.memory.worker.task[2].num=0;
	            spawn.memory.carryer.task[4].num=0;
	        }
	        else if(mineral[0].mineralAmount>0&&extractor.length>0){
	            spawn.memory.worker.task[2].num=spawn.memory.worker.task[2].num_max;
	            if(spawn.memory.worker.task[2].need_carryer=='yes'){
	                spawn.memory.carryer.task[4].num=1;
	            }
	        }
	        
	        
	    }
	    catch(err){
			console.log(name);
			console.log("hatch_init mneral_worker error");
			console.log(err);	
	    }
        
      
    }
	    
}
module.exports.hatch_init =hatch_init;