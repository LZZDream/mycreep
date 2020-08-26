
/* let keneral_spawn=Game.getObjectById('5ecc8e3c536fd604c75a041a')
let structure_memory=Game.rooms[keneral_spawn.room.name].memory.structure
let terminal=Game.getObjectById(structure_memory.terminal.id);
let storage=Game.getObjectById(structure_memory.storage.id); */

module.exports = {
    run(){
        if(!Game.rooms['W1N26'].memory.task){
            Game.rooms['W1N26'].memory.task=[]
        }
        const storage=Game.getObjectById('5e9a771ad085d474303493f8')
        const terminal=Game.getObjectById('5e9dc7160659a67cb39f1e69')
        var W1N26_task=Game.rooms['W1N26'].memory.task
       
        /* console.log(terminal)
        if(terminal.store['energy']>=50000 && !structure_memory.terminal.is_task){
            W1N26_task.push({
                from:terminal,
                to:storage,
                type:'energy'
            })
            structure_memory.terminal.is_task=true
        }
        console.log(W1N26_task) */
        /* if(link1.store.energy>=500){
            
        } */
       /*  var a="ss"
        if(! a in room_W8N33){
            room_W8N33.push("ss")
            console.log(room_W8N33.pop())
        }else {
            room_W8N33.push("aa")
            console.log(room_W8N33.pop())
        } */
       
        
    }
    


}