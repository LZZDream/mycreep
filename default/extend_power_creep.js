
module.exports = function(){
    PowerCreep.prototype.is_empty=
		function(type){
		    for(var name in this.store){
				if(type!=name)return 0;
			}
		return 1;
		};
    
    PowerCreep.prototype.carry_api=
		function(from,to,type){
            if(this.store[type]==0&&this.is_empty(type)==1){
				if(this.withdraw(from,type)==ERR_NOT_IN_RANGE){
					//this.moveTo(from);
				}
			}
			else if(this.store[type]==0&&this.is_empty(type)==0){
			    for(const name in this.store){
			        if(this.transfer(from,name)==ERR_NOT_IN_RANGE){
			            //this.moveTo(from);
			        }
			    }
			}
			else if(this.store[type]!=0){
			    if(this.transfer(to,type)==ERR_NOT_IN_RANGE){
			        //this.moveTo(to);
			    }
			}
		};	
    PowerCreep.prototype.update_factory=
		function(){
			const terminal=this.pos.findClosestByRange(FIND_STRUCTURES,{
				filter: object => (object.structureType==STRUCTURE_TERMINAL||object.structureType==STRUCTURE_STORAGE)&&object.store.ops>0});
			const factory=this.pos.findClosestByRange(FIND_STRUCTURES,{
				filter: object => object.structureType==STRUCTURE_FACTORY});
			var n=this.usePower(PWR_OPERATE_FACTORY,factory);
			//console.log(n+" 00");
			if(n==-6&&terminal){
				if(this.withdraw(terminal,"ops")==ERR_NOT_IN_RANGE){
					//this.moveTo(terminal);
				}
			}
			//else this.moveTo();
		};
};
    
