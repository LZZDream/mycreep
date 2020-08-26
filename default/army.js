function attack(creep){
	var target=creep.room.find(FIND_HOSTILE_CREEPS);
	var i=0;
	
	
	if(target){
	for(i=0;i<target.length;i++){
	    console.log(target[i].owner.username);
	    if(target[i].owner.username!='RoyalKnight'){
	        if(creep.attack(target[i]) == ERR_NOT_IN_RANGE) {
	            creep.say("拿命来",1);
	            creep.moveTo(target[i]);
	            
	        }
	    }
	}
	    
	}

	
       
}
function advance(x,y,room_name,creep){
	if(creep.room.name!=room_name){
		creep.moveTo(new RoomPosition(x, y,room_name));
		creep.say('前往支援',1);
	}
	else{
		attack(creep);
	}
}

function repeal(creep){
	if(creep.room.name!='W16S22'){
		creep.moveTo(new RoomPosition(30, 29, 'W16S22'));
		creep.say('撤退',1);
	}
	//creep.moveTo(new RoomPosition(30, 29, 'W17S22'));
}
function dismantle(structure){
	if(creep.dismantle(structure) == ERR_NOT_IN_RANGE){
		creep.moveTo(structure);
	} 
	
	//creep.moveTo(new RoomPosition(30, 29, 'W17S22'));
}
module.exports = {
	run(creep){
	    //advance(20,20,'W16S23',creep);
	   repeal(creep);
	    //creep.dismantle(Game.getObjectById('5e073a24d8f1f201df5a48f5'));
	    //dismantle(creep);
	    //if(creep.dismantle(Game.getObjectById('5e073a24d8f1f201df5a48f5')) == ERR_NOT_IN_RANGE){
		//creep.moveTo(Game.getObjectById('5e073a24d8f1f201df5a48f5'));
	//} 
	    //var target=creep.room.find(FIND_HOSTILE_CREEPS);
	    //console.log(target[0]);
	    //console.log(target[1]);
	    //
	    //creep.moveTo(new RoomPosition(27, 17,"W15S23"));
	    //var army1=Game.getObjectById("5e0b43897ecd332cd22e6b51");
	    //var army2=Game.getObjectById("5e0b37ca39f69fb1aae7bd71");
	    //console.log(target[0].pos.isNearTo(army1));
	   
	    //army1.dismantle(Game.getObjectById('5e01fefbe5d0089073da958a'));
	    //army2.moveTo(new RoomPosition(41, 2, 'W15S23'));
	    /*
	    for(i=0;i<target.length;i++){
	        if(target[i].owner.username!='RoyalKnight'){
	            if(target[i].pos.isNearTo(army1)){
	                army1.attack(target[i]);
	            }
	            if(target[i].pos.isNearTo(army2)){
	                army2.attack(target[i]);
	            }
	        }
	    }
	    */
	    //army1.moveTo(37,45);
	    
	    
	    
	    /*
	    var room_name='W15S22';
	    if(creep.room.name!=room_name){
	        advance(20,20,room_name,creep);
	    }
		else{
		    var sb=creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		    if(!sb){
		    //repeal(creep);
		    }
		}
		*/
		
		
	}
};