
var lab_fun=function(){
     for(var name in Game.rooms){
	     var room=Game.rooms[name];
	     if(room.terminal&&room.terminal.my){
	         try{
	            var lab =room.memory.structure.lab;
	            var s1=Game.getObjectById(lab.s1.id);
	            var s2=Game.getObjectById(lab.s2.id);
	            var s3=Game.getObjectById(lab.s3.id);
	            var s4=Game.getObjectById(lab.s4.id);
	            var s5=Game.getObjectById(lab.s5.id);
	            var s6=Game.getObjectById(lab.s6.id);
	            var s7=Game.getObjectById(lab.s7.id);
	            var s8=Game.getObjectById(lab.s8.id);
	            
	            var f1=Game.getObjectById(lab.f1.id);
	            var f2=Game.getObjectById(lab.f2.id);
	            s1.runReaction(f1,f2);
	            
	            s2.runReaction(f1,f2);
	            s4.runReaction(f1,f2);
	            s3.runReaction(f1,f2);
	            
	            s5.runReaction(f1,f2);
	            s6.runReaction(f1,f2);
	            s7.runReaction(f1,f2);
	            s8.runReaction(f1,f2);
	            
	        }
	        catch(err){}
	        
	     }
	     
	    
	 }
	 
}
module.exports.lab_fun=lab_fun;