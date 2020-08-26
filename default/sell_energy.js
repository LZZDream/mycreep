var sell_energy = function () {
  /*   var composite_deal = Game.market.getAllOrders({
        type: ORDER_BUY,
        resourceType: 'composite'
    });
    composite_deal.sort((a, b) => b.price - a.price);
    var composite_price = 4.0;
    if (composite_deal[0].price >= composite_price) {
        if (Game.market.deal(composite_deal[0].id, 100, "W8N33")==0) {
            console.log("composite "+composite_deal[0].price+" 100");
        }
        
    } */
    
    var u_deal = Game.market.getAllOrders({
        type: ORDER_BUY,
        resourceType: 'U'
    });
    u_deal.sort((a, b) => b.price - a.price);
    //console.log(u_deal);
    
     var u_price = 0.1;
     if (u_deal[0].price >= u_price) {
        if (Game.market.deal(u_deal[0].id, 10000, "W9N33")==0) {
            console.log("u "+u_deal[0].price+" 100");
        }
        
    }
    

    var reductant_deal = Game.market.getAllOrders({
        type: ORDER_BUY,
        /* resourceType: 'reductant' */
        resourceType: 'H'
    });
    reductant_deal.sort((a, b) => b.price - a.price);
    var reductant_price = 0.1;
    if (reductant_deal[0].price >= reductant_price) {
        if (Game.market.deal(reductant_deal[0].id, 1000, "W2N34") == 0) {
            console.log("h "+reductant_deal[0].price+" 1000");
        }

    }
    
     var battery_deal = Game.market.getAllOrders({
        type: ORDER_BUY,
        resourceType: 'battery'
    });
    
    battery_deal.sort((a, b) => b.price - a.price);
    var battery_price = 0.6;
    //console.log(battery_deal[0].price);
    if (battery_deal[0].price >= battery_price) {
        Game.market.deal(battery_deal[0].id, 100, "W2N34")
        Game.market.deal(battery_deal[0].id, 10000, "W2N26")
        Game.market.deal(battery_deal[0].id, 2000, "W9N33")
        Game.market.deal(battery_deal[0].id, 1000, "W1N26")
        Game.market.deal(battery_deal[0].id, 1000, "W2N26")
        //Game.market.deal(battery_deal[0].id, 100, "W8N32")
        if (Game.market.deal(battery_deal[0].id, 100, "W8N33") == 0) {
            console.log("battery "+battery_deal[0].price+" 100");
        }
        /* console.log(battery_deal[0].price); */

    } 
    
     var energy_deal = Game.market.getAllOrders({
        type: ORDER_BUY,
        resourceType: 'energy'
    });
    energy_deal.sort((a, b) => b.price - a.price);
    var energy_price = 0.2;
    if (energy_deal[0].price >= energy_price) {
        //Game.market.deal(energy_deal[0].id, 10000, "W1N26") 
        //if (Game.market.deal(energy_deal[0].id, 1000, "W1N26") == 0) {
          //  console.log("energy "+energy_deal[0].price+" 500");
        //}

    } 
    try{
    var x_deal = Game.market.getAllOrders({
        type: ORDER_BUY,
        resourceType: 'X'
    });
    x_deal.sort((a, b) => b.price - a.price);
    var x_price = 0.33;
    if (x_deal[0].price >= x_price) {
        if (Game.market.deal(x_deal[0].id, 1000, "W1N26") == 0) {
            console.log("X W1N26"+x_deal[0].price+" 1000");
        }
        if (Game.market.deal(x_deal[0].id, 1000, "W2N26") == 0) {
            console.log("X W2N26"+x_deal[0].price+" 1000");
        }

    } 
    }
    catch(err){
        
    }


}

module.exports.sell_energy = sell_energy;