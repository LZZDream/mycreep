
var cal=function(){
    
    for(var name in Game.spawns){
        var spawn=Game.spawns[name];
        var extension=spawn.room.find(FIND_STRUCTURES,{filter: object => object.structureType==STRUCTURE_EXTENSION});
        var source=spawn.room.find(FIND_SOURCES);
        
        var worker=spawn.memory.worker;
        var updater=spawn.memory.updater;
        var builder=spawn.memory.builder;
        var filler=spawn.memory.filler;
        var repairer=spawn.memory.repairer;
        if(extension.length==0){//300
            if(source.length==1){
                worker.task[0].equipment=['work','carry','carry','move'];
                worker.task[0].num=2;
            }
            else if(source.length==2){
                worker.task[0].equipment=['work','carry','carry','move'];
                worker.task[0].num=2;
                worker.task[1].equipment=['work','carry','carry','move'];
                worker.task[1].num=2;
            }
            updater.task[0].equipment=['work','carry','carry','move'];
            updater.task[0].num=2;
            
            builder.task[0].equipment=['work','carry','carry','move'];
            
            filler.task[0].equipment=['carry','carry','move','move'];
            filler.task[0].num=1;
            
        }
        else if(extension.length==5){//300+250
            if(source.length==1){
                worker.task[0].equipment=['work','work','carry','carry','carry','move','move','move'];
                worker.task[0].num=2;
            }
            else if(source.length==2){
                worker.task[0].equipment=['work','work','work','carry','move','move','move'];
                worker.task[0].num=1;
                worker.task[1].equipment=['work','work','work','carry','move','move','move'];
                worker.task[1].num=2;
            }
            updater.task[0].equipment=['work','work','carry','carry','carry','move','move','move'];
            updater.task[0].num=4;
            
            builder.task[0].equipment=['work','work','carry','carry','carry','move','move','move'];
            
            filler.task[0].equipment=['carry','carry','move','move'];
            filler.task[0].num=1;
            
            repairer.task[0].equipment=['work','work','carry','carry','carry','move','move','move'];
            repairer.task[0].num=1;
        }
        else if(extension.length==10){//300+500
            if(source.length==1){
                worker.task[0].equipment=['work','work','work','work','carry','carry','carry','carry','move','move','move','move'];
                //worker.task[0].num=2;
            }
            else if(source.length==2){
                worker.task[0].equipment=['work','work','work','work','carry','carry','carry','carry','move','move','move','move'];
                //worker.task[0].num=2;
                worker.task[1].equipment=['work','work','work','work','carry','carry','carry','carry','move','move','move','move'];
                //worker.task[1].num=2;
            }
            updater.task[0].equipment=['work','work','work','work','carry','carry','carry','carry','move','move','move','move'];
            //updater.task[0].num=2;
            
            builder.task[0].equipment=['work','work','work','work','carry','carry','carry','carry','move','move','move','move'];
            
            filler.task[0].equipment=['carry','carry','move','move'];
            //filler.task[0].num=2;
            
            repairer.task[0].equipment=['work','work','work','work','carry','carry','carry','carry','move','move','move','move'];
            //repairer.task[0].num=1;
            
            
        }
        else if(extension.length==20){//300+1000
            if(source.length==1){
                worker.task[0].equipment=['work','work','work','work','carry','carry','carry','carry','carry','carry','move','move','move','move','move','move','move','move'];
                //worker.task[0].num=1;
            }
            else if(source.length==2){
                worker.task[0].equipment=['work','work','work','work','carry','carry','carry','carry','carry','carry','move','move','move','move','move','move','move','move'];
                //worker.task[0].num=1;
                worker.task[1].equipment=['work','work','work','work','carry','carry','carry','carry','carry','carry','move','move','move','move','move','move','move','move'];
                //worker.task[1].num=1;
            }
            updater.task[0].equipment=['work','work','work','work','carry','carry','carry','carry','carry','carry','move','move','move','move','move','move','move','move'];
            //updater.task[0].num=1;
            
            builder.task[0].equipment=['work','work','work','work','carry','carry','carry','carry','carry','carry','move','move','move','move','move','move','move','move'];
            
            filler.task[0].equipment=['carry','carry','move','move'];
            //filler.task[0].num=2;
        }
        else if(extension.length==30){//300+1500
            if(source.length==1){
                worker.task[0].equipment=['work','work','work','work','work','work','carry','carry','carry','move','move','move'];
                //worker.task[0].num=1;
            }
            else if(source.length==2){
                worker.task[0].equipment=['work','work','work','work','work','work','carry','carry','carry','move','move','move','move','move','move'];
                //worker.task[0].num=1;
                worker.task[1].equipment=['work','work','work','work','work','work','carry','carry','carry','move','move','move','move','move','move'];
                //worker.task[1].num=1;
            }
            //updater.task[0].equipment=['carry','carry','carry','carry','work','work','work','work','work','work','work','work','work','work','move','move','move','move','move','move'];
            //updater.task[0].num=1;
            
            builder.task[0].equipment=['carry','carry','carry','carry','carry','carry','carry','carry','work','work','work','work','work','work','move','move','move','move','move','move'];
            
            filler.task[0].equipment=['carry','carry','move','move'];
            //filler.task[0].num=2;
        }
        else if(extension.length==40){//300+1000
            if(source.length==1){
                worker.task[0].equipment=['work','work','work','work','work','work','carry','carry','carry','move','move','move'];
                worker.task[0].num=1;
            }
            else if(source.length==2){
                worker.task[0].equipment=['work','work','work','work','work','work','carry','carry','carry','move','move','move'];
                worker.task[0].num=1;
                worker.task[1].equipment=['work','work','work','work','work','work','carry','carry','carry','move','move','move'];
                worker.task[1].num=1;
            }
            //updater.task[0].equipment=['work','work','work','work','work','work','work','work','carry','carry','carry','carry','carry','carry','carry','carry','move','move','move','move','move','move'];
            //updater.task[0].num=1;
            
            builder.task[0].equipment=['work','work','work','work','work','work','work','work','work','work','carry','carry','carry','carry','carry','carry','move','move','move','move','move','move'];
            
            filler.task[0].equipment=['carry','carry','move','move'];
            //filler.task[0].num=3;
        }
        else if(extension.length==50){//300+1000
            if(source.length==1){
                worker.task[0].equipment=['work','work','work','work','work','work','carry','carry','carry','move','move','move','move','move','move'];
                worker.task[0].num=1;
            }
            else if(source.length==2){
                worker.task[0].equipment=['work','work','work','work','work','work','carry','carry','carry','move','move','move','move','move','move'];
                worker.task[0].num=1;
                worker.task[1].equipment=['work','work','work','work','work','work','carry','carry','carry','move','move','move','move','move','move'];
                worker.task[1].num=1;
            }
            //updater.task[0].equipment=['carry','carry','carry','carry','work','work','work','work','work','move','work','move','work','move','work','move','work','move','work','move','work','move','work','move'];
            //updater.task[0].num=1;
            
            builder.task[0].equipment=['carry','carry','carry','carry','carry','carry','carry','carry','carry','carry','carry','carry','work','move','work','move','work','move','work','move','work','move'];
            
            filler.task[0].equipment=['carry','carry','carry','carry','carry','carry','carry','carry','carry','carry','move','move'];
            filler.task[0].num=1;
        }
       // console.log(spawn+source.length);
    }
}
module.exports.cal = cal;