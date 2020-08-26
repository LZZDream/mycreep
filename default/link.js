
var link=function(){
    
    try {
        const linkFrom1 = Game.getObjectById("5e259ccba67ca85d2831006a");
        const linkFrom2 = Game.getObjectById("5e1d419ffb142085df7fc87c");
        const linkTo = Game.getObjectById("5e62299122ee73148a59d284");
        const linkTo2 = Game.getObjectById("5e36805610da289e51eb66e2");

        if (linkTo2.store.energy <750) {
            linkTo.transferEnergy(linkTo2);
            linkFrom1.transferEnergy(linkTo2);
            linkFrom2.transferEnergy(linkTo2);
        } else {
            if (linkFrom1.store.energy >= 600) {
                linkFrom1.transferEnergy(linkTo);
            } else if (linkFrom2.store.energy >= 600) {
                linkFrom2.transferEnergy(linkTo);
            }
        }

        //2
        const linkFrom2_2 = Game.getObjectById("5e312ea8c41b42fd2928f175");
        const linkFrom2_1 = Game.getObjectById("5e25972d8302b0a48ccdff2a");
        const linkTo2_1 = Game.getObjectById("5e2589333e6bf25b81078fbe");
        
        if(linkFrom2_2.store.energy==800){
            linkFrom2_2.transferEnergy(linkTo2_1);
        }else if(linkFrom2_1.store.energy==800){
            linkFrom2_1.transferEnergy(linkTo2_1);
        }
        
        
        //3
        const linkFrom3_2 = Game.getObjectById("5e475e0059c103373395d29a");
        const linkFrom3_1 = Game.getObjectById("5e3f99226d269e2ffe38d369");
        const linkTo3_1 = Game.getObjectById("5e3e823288a116705bf73156");
        linkFrom3_1.transferEnergy(linkTo3_1);
        linkFrom3_2.transferEnergy(linkTo3_1);


        //4
        const linkFrom4_1 = Game.getObjectById("5e436764b5b3c47adef61a2d");
        const linkTo4_1 = Game.getObjectById("5e437d0fddebf0dff9f41102");
        linkFrom4_1.transferEnergy(linkTo4_1);

        //5
        const linkFrom5_1 = Game.getObjectById("5e9acd019380fa68752a9c0d");
        const linkFrom5_2 = Game.getObjectById("5e9d0fcc3904c951c0115c88");
        const linkTo5_1 = Game.getObjectById("5e9c1b1af0cf3cc3f60554e9");
        
        const update=Game.getObjectById('5ea50912055374701f1f43f5');
        if(update.store.energy<100){
            linkFrom5_1.transferEnergy(update);
            linkFrom5_2.transferEnergy(update);
            linkTo5_1.transferEnergy(update);
        }
        else{
             linkFrom5_1.transferEnergy(linkTo5_1);
        linkFrom5_2.transferEnergy(linkTo5_1);
        }
       
        
        
        //6
        const linkFrom6_1 = Game.getObjectById("5ea90a83dcb70784dcd041b1");
         const linkFrom6_2 = Game.getObjectById("5ea81f3b1dcfd3e647c3d623");
       const linkTo6_1 = Game.getObjectById("5ea797f52b5fd6446fa8d1c8");
        linkFrom6_1.transferEnergy(linkTo6_1);
        linkFrom6_2.transferEnergy(linkTo6_1);
        
        const update6=Game.getObjectById('5ead2d9cede95200ab426b13');
        if(update.store.energy<100){
            linkFrom6_1.transferEnergy(update6);
            linkFrom6_2.transferEnergy(update6);
            linkTo6_1.transferEnergy(update6);
        }
        else{
             linkFrom6_1.transferEnergy(linkTo6_1);
        linkFrom6_2.transferEnergy(linkTo6_1);
        }

    } catch (err) {
        console.log("link error");
        console.log(err);
    }
};

module.exports.link=link;