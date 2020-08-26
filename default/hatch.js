
var num=function(spawn,role,task_id){
    var spawn_name=spawn.substr(0,6);
    var num=0;
    for(var creep_name in Game.creeps){
        var creep=Game.creeps[creep_name];
        if(creep.memory.role==role && creep.memory.task_id==task_id && (creep.memory.spawn==spawn_name )){
            num++;
        }
    }
	return num;
}

var begin_spawn=function (){ 
	var i=0;var n=0; 
	c:for(var name in Game.spawns){
	    var spawn=Game.spawns[name];
	    
	    a:for(var role in spawn.memory){
	        b:for(i=0;i<spawn.memory[role].task.length;i++){
	            if(num(name,role,i)<spawn.memory[role].task[i].num){
	               var newName=role+Game.time;
	               var spawn_room=spawn.room.name;
	               var spawn_name=name.substr(0,6);
			       var ss=Game.spawns[name].spawnCreep(spawn.memory[role].task[i].equipment,newName ,
			       {memory:{role:role,task_id:i,
			       spawn:spawn_name,need_heal:0,
			       spawn_room:spawn_room,
			       task:{isdefined:0,lala:0,need_fill:0}}}
				   );
			       continue c;
	            }
	        }
	    }
	}
}
module.exports.begin_spawn=begin_spawn;
module.exports.num=num;
