/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('lab_reaction');
 * mod.thing == 'a thing'; // true
 */

module.exports =function(room_name){
   // console.log(Game.rooms[room_name]);
    const lab_memory=Game.rooms[room_name].memory.structure.lab;
    
    const s1=Game.getObjectById(lab_memory.s1.id);
	const s2=Game.getObjectById(lab_memory.s2.id);
	const s3=Game.getObjectById(lab_memory.s3.id);
	const s4=Game.getObjectById(lab_memory.s4.id);
	const s5=Game.getObjectById(lab_memory.s5.id);
	const s6=Game.getObjectById(lab_memory.s6.id);
	const s7=Game.getObjectById(lab_memory.s7.id);
	const s8=Game.getObjectById(lab_memory.s8.id);
			    
	const f1=Game.getObjectById(lab_memory.f1.id);
	const f2=Game.getObjectById(lab_memory.f2.id);
	
	s1.runReaction(f1, f2);
	s2.runReaction(f1, f2);
	s3.runReaction(f1, f2);
	s4.runReaction(f1, f2);
	s5.runReaction(f1, f2);
	s6.runReaction(f1, f2);
	s7.runReaction(f1, f2);
	s8.runReaction(f1, f2);
};