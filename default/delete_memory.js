var hatch=require('hatch'); 
var hatch_init=require('hatch_init'); 
var delete_memory=function delete_memory(){
    for(var name in Memory.creeps){ 
        if(!Game.creeps[name]){
            hatch_init.hatch_init(); 
            hatch.begin_spawn();
            delete Memory.creeps[name];
            //console.log("delete uninstintse creeps  "+name);
        }
    }   
} 
module.exports.delete_memory=delete_memory;