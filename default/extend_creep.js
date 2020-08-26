var sett = require('role.settlement');
module.exports = function () {

	Creep.prototype.fill_energy = function () {
		if (this.store.energy == 0) {
			const storage = this.pos.findClosestByRange(FIND_STRUCTURES, { //能量源
				filter: object => (object.structureType == STRUCTURE_STORAGE || object.structureType == STRUCTURE_CONTAINER || object.structureType == STRUCTURE_TERMINAL) && object.store.energy > 0
			});
			this.memory.task.from = storage;
		}


		if (!this.memory.task.need_fill) { //定位目标
			const extension = this.pos.findClosestByRange(FIND_MY_STRUCTURES, {
				filter: object => (object.structureType == STRUCTURE_EXTENSION ||  object.structureType == STRUCTURE_LAB) && object.store.getFreeCapacity(RESOURCE_ENERGY) != 0
			});
			if (extension) {
				this.memory.task.to = extension;
				this.memory.task.need_fill = 1;
				return;
			} else {
				const tower = this.pos.findClosestByRange(FIND_STRUCTURES, {
					filter: object => object.structureType == STRUCTURE_TOWER && object.store.getFreeCapacity(RESOURCE_ENERGY) >= 500
				});
				if (tower) {
					this.memory.task.to = tower;
					this.memory.task.need_fill = 1;
					return;
				} else {
					const power_spawn = this.pos.findClosestByRange(FIND_STRUCTURES, {
						filter: object => (object.structureType == STRUCTURE_POWER_SPAWN) && object.store.energy < 3000
					});
					if (power_spawn) {
						this.memory.task.to = power_spawn;
						this.memory.task.need_fill = 1;
						return;
					} else return "no";
				}

			}
		}

		try {
			var from = Game.getObjectById(this.memory.task.from.id);
			var to = Game.getObjectById(this.memory.task.to.id);
			if (this.carry.energy == 0) {
				if (this.pos.inRangeTo(from, 1)) {
					if (this.withdraw(from, LOOK_ENERGY) == ERR_FULL) {
						for (const name in this.store) {
							if (from.structureType == STRUCTURE_TERMINAL || from.structureType == STRUCTURE_STORAGE) {
								if (this.transfer(from, name) == ERR_NOT_IN_RANGE) {
									this.moveTo(from);
								}
							} else if (this.transfer(storage, name) == ERR_NOT_IN_RANGE) {
								this.moveTo(storage);
							}
						}
					}

					//console.log(this.withdraw(from, LOOK_ENERGY));
				} else this.moveTo(from);
			} else {
				if (this.pos.inRangeTo(to, 1)) {
					if (this.transfer(to, RESOURCE_ENERGY) == -8) this.memory.task.need_fill = 0;
				} else this.moveTo(to);
			}
		} catch (err) {
			this.memory.task.need_fill = 0;
			//console.log("fill error", err);
			return "no";
		}

	};


	Creep.prototype.work = function () {
		if (!this.memory.task.isdefined) {
			var sources = this.room.find(FIND_SOURCES);
			const mineral = this.pos.findClosestByRange(FIND_MINERALS);
			switch (this.memory.task_id) {
				case 0:
					this.memory.task.from = sources[0];
					break;
				case 1:
					this.memory.task.from = sources[1];
					break;
				case 2:
					this.memory.task.from = mineral;
					break;
			}
			this.memory.task.isdefined = 1;
		}
		try {

			var from = Game.getObjectById(this.memory.task.from.id);

		} catch (err) {
			this.memory.task.isdefined = 0;


		}

		switch (this.memory.task_id) {
			case 0:
			case 1:
				if (this.carry.energy < this.carryCapacity) {
				    try{
				        if (this.pos.inRangeTo(from, 1)) {
						this.harvest(from);
					} else this.moveTo(from);
				    }
					catch(err){}
				} else {
					if (!this.memory.task.to) {

						const link = this.pos.findClosestByPath(FIND_STRUCTURES, {
							filter: object => (object.structureType == STRUCTURE_LINK)
						});
						if (link && (this.pos.inRangeTo(link, 1))||(this.pos.inRangeTo(link, 2))) {
							this.memory.task.to = link;
							break;
						} else {
							const container = this.pos.findClosestByPath(FIND_STRUCTURES, {
								filter: object => (object.structureType == STRUCTURE_CONTAINER)
							});
							if (container && this.pos.inRangeTo(container, 1)) {
								this.memory.task.to = container;
								break;
							} else {
								const storage = this.pos.findClosestByPath(FIND_STRUCTURES, {
									filter: object => (object.structureType == STRUCTURE_STORAGE)
								});
								if (storage) {
									this.memory.task.to = storage;
									break;
								}
							}

						}

					}
					var to = Game.getObjectById(this.memory.task.to.id);
					try {
						if (this.pos.inRangeTo(to, 1)) {
							if (to.hits < to.hitsMax) this.repair(to);
							else this.transfer(to, RESOURCE_ENERGY);
						} else this.moveTo(to);
					} catch (err) {

					}
				}
				break;
			case 2:
				if (this.store[from.mineralType] < this.carryCapacity) {
					if (this.pos.inRangeTo(from, 1)) this.harvest(from);
					else this.moveTo(from);
				} else {
					if (!this.memory.task.to) {
						const storage = this.pos.findClosestByPath(FIND_STRUCTURES, {
							filter: object => (object.structureType == STRUCTURE_STORAGE || object.structureType == STRUCTURE_CONTAINER || object.structureType == STRUCTURE_TERMINAL)
						});
						this.memory.task.to = storage;
					}
					var to = Game.getObjectById(this.memory.task.to.id);
					if (this.pos.inRangeTo(to, 1)) this.transfer(to, from.mineralType);
					else this.moveTo(to);
				}
				break;
		}
	};


	Creep.prototype.build_structure = function () {
		if (this.store.energy == 0) {
			const storage = this.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: object => (object.structureType == STRUCTURE_STORAGE || object.structureType == STRUCTURE_CONTAINER || object.structureType == STRUCTURE_TERMINAL) && object.store.energy > 0
			});
			this.memory.task.from = storage;
		}
		if (!this.memory.task.isdefined) {
			const target = this.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
			if (!target) {
				Game.spawns[this.memory.spawn].memory.builder.task[0].num = 0;
				return;
			} else {
				this.memory.task.to = target;
				this.memory.task.isdefined = 1;
			}


		}
		try {
			var from = Game.getObjectById(this.memory.task.from.id)
			var to = Game.getObjectById(this.memory.task.to.id);
			if (!from || !to) {
				this.memory.task.isdefined = 0;
				return;
			}
			if (this.carry.energy == 0) {
				try {
					if (this.pos.inRangeTo(from, 1)) this.withdraw(from, LOOK_ENERGY)
					else this.moveTo(from);
				} catch (err) {
					return;
				}
			} else {
				if (Game.flags.Flag1 && Game.flags.Flag1.room.name == this.memory.spawn_room) {
					this.moveTo(Game.flags.Flag1);
					this.build(to);
				} else if (this.build(to) == ERR_NOT_IN_RANGE) {
					this.moveTo(to);
				}

			}
		} catch (err) {
			this.memory.task.isdefined = 0;
			console.log("build error");
			return;
		}

	};



	Creep.prototype.repair_structure = function () {
		if (!this.memory.task.isdefined) {
			const storage = this.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: object => (object.structureType == STRUCTURE_STORAGE || object.structureType == STRUCTURE_CONTAINER) && object.store.energy > 0
			});
			const container = this.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: object => object.structureType == STRUCTURE_CONTAINER && object.hits < object.hitsMax
			});
			const targets = this.room.find(FIND_STRUCTURES, {
				filter: object => object.hits < object.hitsMax && object.structureType != STRUCTURE_WALL
			});
			targets.sort((a, b) => (a.hitsMax - a.hits) - (b.hitsMax - b.hits));
			this.memory.task.to = {};
			if (targets.length == 0) return "no";

			this.memory.task.from = storage;
			var i = 0;
			for (i = 0; i < targets.length; i++) {
				var tar = "tar" + i;
				this.memory.task.to[tar] = targets[i];
			}

			this.memory.task.isdefined = 1;
		}
		var from = Game.getObjectById(this.memory.task.from.id);
		var n = this.memory.task.to;

		function get_first(n) {
			for (var name in n) {
				return name;
			}
		}
		try {
			var to = Game.getObjectById(this.memory.task.to[get_first(n)].id);
		} catch (err) {
			this.memory.task.isdefined = 0;
			return;
		}

		if (this.carry.energy == 0) {
			try {
				if (this.pos.inRangeTo(from, 1)) this.withdraw(from, LOOK_ENERGY);
				else this.moveTo(from);
			} catch (err) {
				return;
			}

		} else {
			//onsole.log(this.repair(to));
			try {
				if (this.repair(to) == ERR_NOT_IN_RANGE) {
					this.moveTo(to);
				} else if (to.hits == to.hitsMax) {
					delete Memory.creeps[this.name].task.to[get_first(n)];
				}
			} catch (err) {
				this.memory.task.isdefined = 0;
			}


		}

	};



	Creep.prototype.update = function () {
		this.memory.task.isdefined = 0;
		if (!this.memory.task.isdefined) {
			const storage = this.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: object => (object.structureType == STRUCTURE_STORAGE || object.structureType == STRUCTURE_LINK || object.structureType == STRUCTURE_CONTAINER) && object.store.energy > 0
			});
			const controller = this.pos.findClosestByRange(FIND_MY_STRUCTURES, {
				filter: object => object.structureType == STRUCTURE_CONTROLLER
			});
			//console.log(storage+ this.name);
			this.memory.task.from = storage;
			this.memory.task.to = controller;
			this.memory.task.isdefined = 1;
		}
		// console.log(this.memory.spawn+" "+Game.getObjectById(this.memory.task.from.id));
		try {
			var from = Game.getObjectById(this.memory.task.from.id);

			var to = Game.getObjectById(this.memory.task.to.id);

		} catch (err) {
			return;
		}

		if (this.carry.energy == 0) {
			try {
				if (this.pos.inRangeTo(from, 1)) this.withdraw(from, LOOK_ENERGY);
				else this.moveTo(from);
			} catch (err) {
				return;
			}



		} else {
			if (to.level == 8 && to.ticksToDowngrade == 200000) {
				Game.spawns[this.memory.spawn].memory.updater.task[0].num = 0;
				this.suicide();
			} else if (this.transfer(to, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				this.moveTo(to, {
					visualizePathStyle: {
						stroke: "#ffffff"
					}
				});

			}

			/*
			if(this.signController(this.room.controller, "LZZ")==-9){
			    this.moveTo(controller);
			}
			*/

		}
	};



	Creep.prototype.reserve = function (target) {
		var room_controller = this.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: object => object.structureType == STRUCTURE_CONTROLLER
		});
		//console.log(this.moveTo(room_controller,{visualizePathStyle:{stroke:"#ffffff"}}));

		if (this.room.name == target && (this.pos.x != 0 && this.y != 0 && this.pos.x != 49 && this.y != 49 && this.pos.x != 48 && this.y != 48 && this.pos.x != 1 && this.y != 1)) {
			if (room_controller) {
				if (this.reserveController(room_controller) == ERR_NOT_IN_RANGE) {
					this.moveTo(room_controller, {
						visualizePathStyle: {
							stroke: "#ffffff"
						}
					});
					//this.moveTo(39,19,{visualizePathStyle:{stroke:"#ffffff"}});
				}
			}
		} else {
			this.moveTo(new RoomPosition(10, 10, target));
		}

	};




	Creep.prototype.carry_energy = function () {
		const container = this.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: object => object.structureType == STRUCTURE_CONTAINER && object.store.energy >= 500
		});
		const storage = this.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: object => object.structureType == STRUCTURE_STORAGE
		});
		const terminal = this.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: object => object.structureType == STRUCTURE_TERMINAL
		});
		const link = this.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: object => object.structureType == STRUCTURE_LINK
		});

		const mineral = this.pos.findClosestByRange(FIND_MINERALS);
		var mineral_type = mineral.mineralType;
		const lab = this.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: object => object.structureType == STRUCTURE_LAB && object.store[mineral_type] != 0
		});
		if (this.memory.task_id == 0) { //container to storage
			if (this.store.energy == 0) {
				try {
					if (this.pos.inRangeTo(container, 1)) this.withdraw(container, LOOK_ENERGY);
					else this.moveTo(container);
				} catch (err) {
					return;
				}



			} else {
				if (this.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					this.moveTo(storage);
				}
			}
		} else if (this.memory.task_id == 1) { //link to storage
			if (this.memory.spawn == 'Spawn4') {
				if (this.carry.energy == 0) {
					try {
						if (this.pos.inRangeTo(storage, 1)) this.withdraw(storage, LOOK_ENERGY);
						else this.moveTo(storage);
					} catch (err) {
						return;
					}


				} else {
					if (this.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						this.moveTo(link);
					}
				}


			} else {
				if (this.memory.spawn_room == "W8N33") this.moveTo(9, 17);
				if (this.memory.spawn_room == "W9N33") this.moveTo(23, 22);
				if (this.memory.spawn_room == "W2N26") {
				    if(this.pos.x!=9&&this.pos.y!=44){
				        this.moveTo(9, 44);
				        return;
				    }
				}
				try {
					if (link.store.energy >= this.carryCapacity - 100 || this.store.energy > 0) {

						this.carry_api(link, storage, "energy");
					}
				} catch (err) {}



			}
		} else if (this.memory.task_id == 2) {



		} else if (this.memory.task_id == 3) {



		} else if (this.memory.task_id == 4) { //mineral_container to terminal
			id = 4;
			from = Game.getObjectById(Game.rooms[this.memory.spawn_room].memory.structure.mineral_container);
			to = this.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: object => object.structureType == STRUCTURE_TERMINAL
			});
			//if(from.store==null)return;

			try {
				function a(from) {
					for (var name in from.store) {
						return name;
					}
				};
				type = a(from);
				if (this.store.getUsedCapacity() == 0) {
					try {
						if (this.pos.inRangeTo(from, 1)) this.withdraw(from, type)
						else this.moveTo(from);
					} catch (err) {
						return;
					}


				} else {
					for (var name in this.store) {
						if (this.transfer(to, name) == ERR_NOT_IN_RANGE) {
							this.moveTo(to);
						}
					}

				}
			} catch (err) {
				console.log("carry_4 error");
				console.log(err);
			}
		} else if (this.memory.task_id == 5) { //terminal to storage
			const storage = this.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: object => object.structureType == STRUCTURE_STORAGE
			});
			const terminal = this.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: object => object.structureType == STRUCTURE_TERMINAL
			});


			if (terminal.store.energy < 5000) {
				Game.spawns[this.memory.spawn].memory.carryer.task[5].num = 0;
				//this.memory.task_id=2;
			} else {
				this.carry_api(terminal, storage, 'energy');
			}




		} else if (this.memory.task_id == 6) { //storage to terminal
			const storage = this.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: object => object.structureType == STRUCTURE_STORAGE
			});
			const terminal = this.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: object => object.structureType == STRUCTURE_TERMINAL
			});
			var type = Game.spawns[this.memory.spawn].memory.carryer.task[6].type;
			//console.log(this.memory.spawn+' '+type);
			if (storage.store.energy < 300000) {
				Game.spawns[this.memory.spawn].memory.carryer.task[6].num = 0;
				this.suicide();
			} else {
				this.carry_api(storage, terminal, type);
			}





		} else if (this.memory.task_id == 7) { //power 
			const power_spawn = this.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: object => object.structureType == STRUCTURE_POWER_SPAWN
			});
			const terminal = this.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: object => object.structureType == STRUCTURE_TERMINAL
			});
			var type = Game.spawns[this.memory.spawn].memory.carryer.task[7].type;
			//console.log(this.memory.spawn+' '+type);
			if (power_spawn.store.power == 0) {
				this.carry_api(terminal, power_spawn, type);
				if (terminal.store.power == 0 || terminal.store.energy == 0) {
					Game.spawns[this.memory.spawn].memory.carryer.task[7].num = 0;
					this.suicide();
				}
			} else if (power_spawn.store.energy < 5000) {
				this.carry_api(terminal, power_spawn, 'energy');
			}


		}



	};

	Creep.prototype.defence = function () {
		var wall_hits = Game.spawns[this.memory.spawn].memory.defence.task[0].wall_hits;

		var wall = this.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: object => ((object.structureType == STRUCTURE_WALL && object.hits < wall_hits))
		});
		var rampart = this.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: object => ((object.structureType == STRUCTURE_RAMPART && object.hits < wall_hits))
		});
		const storage = this.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: object => object.structureType == STRUCTURE_STORAGE
		});
		const build_target = this.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
		if (this.carry.energy == 0) {
			try {
				if (this.pos.inRangeTo(storage, 1)) this.withdraw(storage, LOOK_ENERGY)
				else this.moveTo(storage);
			} catch (err) {
				return;
			}
		} else {
			if (build_target) {
				if (this.build(build_target) == ERR_NOT_IN_RANGE) this.moveTo(build_target);
			} else if (rampart) {
				if (this.repair(rampart) == ERR_NOT_IN_RANGE) this.moveTo(rampart);
			} else if (wall) {
				if (this.repair(wall) == ERR_NOT_IN_RANGE) this.moveTo(wall);

			} else {
				Game.spawns[this.memory.spawn].memory.defence.task[0].wall_hits += 100000;
			}


		}
	};






	Creep.prototype.increase_tick = function () {
		const spawn = this.room.find(FIND_STRUCTURES, {
			filter: object => object.structureType == STRUCTURE_SPAWN
		});

		if (this.ticksToLive < 1400) {
			if (this.memory.spawn_room == "W8N33") {
				this.moveTo(11, 19);
				//spawn[0].renewCreep(this);
			} else if (this.memory.spawn_room == "W9N33") {
				this.moveTo(25, 29);
			} else this.moveTo(spawn[0]);

			var i = 0;
			for (i = 0; i < spawn.length; i++) {
				spawn[i].renewCreep(this);
			}


		} else this.memory.need_heal = 0;

	};

	Creep.prototype.carry_from_sto_to_ter = function (type) {
		const terminal = this.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: object => object.structureType == STRUCTURE_TERMINAL
		});
		const storage = this.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: object => object.structureType == STRUCTURE_STORAGE
		});

		//if(terminal.store[type]>=100000){
		//	return "no";
		//}
		//else
		this.carry_api(storage, terminal, type);

	};


	Creep.prototype.carry_terminal_to_storage = function (type) {
		const terminal = this.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: object => object.structureType == STRUCTURE_TERMINAL
		});
		const storage = this.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: object => object.structureType == STRUCTURE_STORAGE
		});


		this.carry_api(terminal, storage, type);

	};

	Creep.prototype.storage_to_nuker = function (type) {
		if (!this.memory.task.isdefined) {
			const storage = this.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: object => object.structureType == STRUCTURE_STORAGE
			});
			const nuker = this.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: object => object.structureType == STRUCTURE_NUKER
			});

			this.memory.task.from = storage;
			this.memory.task.to = nuker;

			if (!storage || !nuker) return -1;

			this.memory.task.isdefined = 1;
		}
		var from = Game.getObjectById(this.memory.task.from.id);
		var to = Game.getObjectById(this.memory.task.to.id);
		if (to.store.energy == to.store.getCapacity(type)) {
			//console.log(0000);
			this.memory.task.isdefined = 0;
			return "no";
		} else this.carry_api(from, to, type);

	};



	Creep.prototype.is_empty = function (type) {
		for (var name in this.store) {
			if (type != name) return 0;
		}
		return 1;
	};

	Creep.prototype.carry_api = function (from, to, type) {
		const storage = this.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: object => object.structureType == STRUCTURE_STORAGE
		});
		if (this.store[type] == 0 && this.is_empty(type) == 1) {
			try {
				if (this.pos.inRangeTo(from, 1)) this.withdraw(from, type)
				else this.moveTo(from);
			} catch (err) {
				console.log(err);
			
			}


		} else if (this.store[type] == 0 && this.is_empty(type) == 0) {
			for (const name in this.store) {
				if (from.structureType == STRUCTURE_TERMINAL || from.structureType == STRUCTURE_STORAGE) {
					if (this.transfer(from, name) == ERR_NOT_IN_RANGE) {
						this.moveTo(from);
					}
				} else if (this.transfer(storage, name) == ERR_NOT_IN_RANGE) {
					this.moveTo(storage);
				}
			}
		} else if (this.store[type] != 0) {
			if (this.transfer(to, type) == ERR_NOT_IN_RANGE) {
				this.moveTo(to);
			}
		}
	};


	Creep.prototype.lab_product = function () {
		const lab_memory = Game.rooms[this.memory.spawn_room].memory.structure.lab;
		if (lab_memory.start) {
			const storage = this.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: object => object.structureType == STRUCTURE_TERMINAL
			});

			const f1 = Game.getObjectById(lab_memory.f1.id);
			const f2 = Game.getObjectById(lab_memory.f2.id);

			const slab = this.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: object => object.structureType == STRUCTURE_LAB &&
					object.mineralAmount > this.carryCapacity &&
					object.id != f1.id &&
					object.id != f2.id
			});


			var f1_type = lab_memory.f1.type;
			var f2_type = lab_memory.f2.type;


			if (f1.mineralCapacity - f1.mineralAmount >= this.carryCapacity) {

				if (storage.store[f1_type] != 0 || this.store[f1_type] != 0) {
					this.carry_api(storage, f1, f1_type);
					this.say("f1");

				} else if (storage.store[f1_type] == 0 && this.store[f1_type] == 0) {
					lab_memory.start = 0;
				}

			} else if (f2.mineralCapacity - f2.mineralAmount >= this.carryCapacity) {
				if (storage.store[f2_type] != 0 || this.store[f2_type] != 0) {
					this.carry_api(storage, f2, f2_type);
					this.say("f2");
					//console.log(f2_type);
				} else if (storage.store[f2_type] == 0 && this.store[f2_type] == 0) {
					lab_memory.start = 0;
				}

			} else if (slab) {
				this.carry_api(slab, storage, slab.mineralType);
			} else return "no";
		} else {
			return "no";
			/*
			const storage = this.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: object => object.structureType == STRUCTURE_STORAGE
			});
			const lab = this.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: object => object.structureType == STRUCTURE_LAB && object.mineralAmount > 0
			});

			if (lab) {
				this.carry_api(lab, storage, lab.mineralType);
			} else if (this.is_empty("energy") == 0) {
				for (var name in this.store) {
					if (this.pos.inRangeTo(storage, 1)) this.transfer(storage, name);
					else this.moveTo(storage);
				}
			} */
		}

	};





	Creep.prototype.factory_product = function () {
		const room_memory = Game.rooms[this.memory.spawn_room].memory;
		const factory_memory = Game.rooms[this.memory.spawn_room].memory.structure.factory;

		if (factory_memory.start) {


			const production = factory_memory.production;
			const factory = Game.getObjectById(factory_memory.id);
			const components = COMMODITIES[production].components;
			const terminal = Game.getObjectById(room_memory.structure.terminal);

            const storage = Game.getObjectById(room_memory.structure.storage);
			

			const power_screep = Game.getObjectById('5e5db4643091f675ba3fa639');

			if (factory.produce(production) == ERR_INVALID_TARGET || factory.produce(production) == ERR_BUSY) {
				power_screep.update_factory();
			} else {
				//power_screep.moveTo(11, 25);
				//return;
			}

			//原料名称
			for (var name in components) {
				var num = components[name];
				const from = this.pos.findClosestByRange(FIND_STRUCTURES, {
					filter: object => (object.structureType == STRUCTURE_TERMINAL || object.structureType == STRUCTURE_STORAGE) && object.store[name] > 0
				});
				if (factory.store[factory_memory.production] >= 100 || this.store[factory_memory.production] > 0) {
				    if(terminal.store.getFreeCapacity()>0){
				        this.carry_api(factory, terminal, factory_memory.production);
				    }
				    else{
				        this.carry_api(factory, storage, factory_memory.production);
				    }
					
				} else if (factory.store[name] < num) {
					if (this.store[name] > 0 || from) {
						this.carry_api(from, factory, name);
						break;
					} else return;
				}
			}
		} else {

			const factory = Game.getObjectById(factory_memory.id);
			const terminal = Game.getObjectById(room_memory.structure.terminal);

			if (!this.memory.task.isdefined) {
				const targets = factory.store;
				this.memory.task.clean_factory = {};
				if (factory.store.getUsedCapacity == 0) return "no";
				this.memory.task.from = factory;
				this.memory.task.to = terminal;
				var i = 0;
				for (var name in targets) {
					var tar = "tar" + i;
					if (name != "energy") {
						this.memory.task.clean_factory[tar] = name;
					}

					i++;
				}
				this.memory.task.isdefined = 1;
			}
			var from = Game.getObjectById(this.memory.task.from.id);
			var to = Game.getObjectById(this.memory.task.to.id);
			var n = this.memory.task.clean_factory;

			function get_first(n) {
				for (var name in n) {
					if (n[name] != "energy")
						return name;
				}
			}

			try {
				var clean_factory = this.memory.task.clean_factory[get_first(n)];

				if ((from.store[clean_factory] == 0 && this.store[clean_factory] == 0)) {

					delete Memory.creeps[this.name].task.clean_factory[get_first(n)];
				} else {
					this.carry_api(from, to, clean_factory);

				}

			} catch (err) {
				console.log(err);
				this.memory.task.isdefined = 0;
				return;
			}
		}

	};

	Creep.prototype.settlement = function (room_name) {
		if (this.room.name != room_name) {
			this.moveTo(new RoomPosition(10, 10, room_name));
			this.say(room_name);
		} else {
			const container = this.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: object => object.structureType == STRUCTURE_CONTAINER
			});
			const storage = this.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: object => object.structureType == STRUCTURE_STORAGE
			});
			const target = this.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

			var sources = this.room.find(FIND_SOURCES);
			if (!this.memory.task.isdefined) {
				this.memory.task.from = sources[0];
				if (sources[0]) {
					this.memory.task.isdefined = 1;
				} else this.memory.task.isdefined = 0;

			}

			const source = Game.getObjectById(this.memory.task.from.id);


			const find_updater = this.room.find(FIND_MY_CREEPS, {
				filter: object => (object.memory.role == 'settlement_updater')
			});
			const find_builder = this.room.find(FIND_MY_CREEPS, {
				filter: object => (object.memory.role == 'builder')
			});
			const find_settlement = this.room.find(FIND_MY_CREEPS, {
				filter: object => (object.memory.role == 'settlement')
			});
			if (container) {

				if (find_updater.length < 1 && container.store.energy > 1500 && find_settlement.length > 1) {

					this.memory.role = 'settlement_updater';
				} else if (find_builder.length < 1 && find_settlement.length > 1) {
					if (target) {
						this.memory.role = 'builder';
					}

				}
			}


			if (container) {
				//sett.harvest_energy(this);
				//this.pos.createConstructionSite(STRUCTURE_ROAD);
				const close_source = this.pos.findClosestByRange(FIND_SOURCES);
				//console.log(close_source)
				if (this.store.energy == 0) {
					this.memory.need_energy = 1;
					
				} 
				if (this.store.energy == this.store.getCapacity()) {
					this.memory.need_energy = 0;
					
				} 

				if (this.memory.need_energy) {
					if (this.harvest(close_source) == ERR_NOT_IN_RANGE) {
						this.moveTo(close_source);
					}
				} else {
					const link = this.pos.findClosestByRange(FIND_STRUCTURES, {
						filter: object => object.structureType == STRUCTURE_LINK
					});
					if (link && this.pos.inRangeTo(link, 1)) {
						this.transfer(link, RESOURCE_ENERGY);
					} else if (target && this.pos.inRangeTo(target, 3)) {
						this.build(target);
					} else if (this.pos.inRangeTo(container, 1)) {
						if (container.hits < container.hitsMax) this.repair(container);
						else this.transfer(container, RESOURCE_ENERGY);
					} else this.moveTo(container);
				}


			} else {
				const close_source = this.pos.findClosestByRange(FIND_SOURCES);

				if (target) {
					if (this.store.energy == 0) {
						this.memory.need_energy = 1;
						//return;
					} 
					if (this.store.energy == this.store.getCapacity()) {
						this.memory.need_energy = 0;
						//return;
					} 

					if (this.memory.need_energy) {

						if (this.harvest(close_source) == ERR_NOT_IN_RANGE) {
							this.moveTo(close_source);
						}
					} else {
						if (this.build(target) == ERR_NOT_IN_RANGE) {
							this.moveTo(target);
						}
					}


				} else {
					const controller = this.pos.findClosestByRange(FIND_STRUCTURES, {
						filter: object => object.structureType == STRUCTURE_CONTROLLER
					});
                    if (this.store.energy == 0) {
						this.memory.need_energy = 1;
						//return;
					} 
					if (this.store.energy == this.store.getCapacity()) {
						this.memory.need_energy = 0;
						//return;
					} 
					if (this.memory.need_energy) {

						if (this.harvest(close_source) == ERR_NOT_IN_RANGE) {
							this.moveTo(close_source);
						}
					} else {
						if (this.transfer(controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
							this.moveTo(controller);
						}
					}

					

				}

			}
		}
	};

	Creep.prototype.claim_room = function (room_name) {
		var room_controller = this.pos.findClosestByRange(FIND_STRUCTURES, {
			filter: object => object.structureType == STRUCTURE_CONTROLLER
		});
		if (this.room.name == room_name) {
			if (room_controller) {
				if (this.claimController(room_controller) == ERR_NOT_IN_RANGE) {
					this.moveTo(room_controller, {
						visualizePathStyle: {
							stroke: "#ffffff"
						}
					});

				}
			}
		} else {
			this.moveTo(new RoomPosition(25, 25, room_name));
		}

	};

};