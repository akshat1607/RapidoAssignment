function countCost(distance) {
  let cost = 0;
  if (distance <= 10) {
    cost += 100 * distance;
  } else {
    cost += 1000;
    distance -= 10;
    cost += distance * 50;
  }
  return cost;
}
class Rapido {
  constructor() {
    this.riders = [];
    this.customers = [];
  }
  addRider = (id, Fname, Lname, phoneNumber, dlNumber, isAvailable) => {
    console.log(`driver ${id} added`);

    
    this.riders.push({
      id: id,
      firstName: Fname,
      lastName: Lname,
      phoneNumber: phoneNumber,
      dlNumber: dlNumber,
      isAvailable: isAvailable,
    });
  };

  addCustomer = (id, Fname, Lname, phoneNumber) => {
    console.log(`Customer ${id} added`);
    this.customers.push({ id, Fname, Lname, phoneNumber,});
  };

  bookRide = (customerid, distance) => {
    if (customerid > this.customers.length) {
      console.log("Enter valid customer id");
      return;
    }
    if (this.customers[customerid - 1].onRide == true) {
      console.log("Customer already in a ride");
      return;
    }
    console.log("Finding a rider...");
    let idAvailable = -1;
    for (const rider of this.riders) {
      if (rider.isAvailable) {
        idAvailable = rider.id;
        break;
      }
    }
    if (idAvailable === -1) {
      console.log("All riders are busy please try after sometime");
    } else {
      let cost = countCost(distance);
      console.log(`The cost of this ride is ${cost}Rs`);
      this.customers[customerid - 1].onRide = true;
      this.riders[idAvailable - 1].isAvailable = false;
      let tid = setTimeout(() => {
        let { t, curSeconds } = this.startRide(
          idAvailable,
          customerid,
          cost,
          distance
        );

        // if (customerid === 1) {
        //   setTimeout(() => {
        //     let { tt, newSeconds } = this.updateRide(
        //       t,
        //       customerid,
        //       idAvailable,
        //       12,
        //       curSeconds
        //     );
        //   }, 2000);
        // }
      }, 5000);
      // if(customerid===3)
      // {
      // setTimeout(() =>{
      //     this.cancelRide(tid,idAvailable,customerid);

      // },2000)
      // }
    }
  };

  cancelRide = (t, riderid, customerid) => {
    this.customers[customerid - 1].onRide = false;
    this.riders[riderid - 1].isAvailable = true;
    clearTimeout(t);
    console.log("Ride cancelled");
  };

  startRide = (riderid, customerid, cost, distance) => {
    console.log(
      `${this.customers[customerid - 1].Fname} is riding with ${
        this.riders[riderid - 1].firstName
      }`
    );
    const curDate = new Date();
    const curSeconds = curDate.getSeconds();
    let t = setTimeout(() => {
      this.customers[customerid - 1].onRide = false;
      this.riders[riderid - 1].isAvailable = true;
      console.log("Ride completed");
    }, distance * 1000);
    return { t, curSeconds };
  };

  updateRide(t, customerid, riderid, distance, curSeconds) {
    let newDate = new Date();
    let newSeconds = newDate.getSeconds();
    let distanceTravelled = newSeconds - curSeconds;
    if (distanceTravelled > distance) {
      console.log("Enter valid distance");
      return;
    } else {
      console.log("Ride updated");
      let distanceLeft = distance - distanceTravelled;
      console.log(`Updated cost is ${countCost(distance)}Rs`);
      clearTimeout(t);
      t = setTimeout(() => {
        this.customers[customerid - 1].onRide = false;
        this.riders[riderid - 1].isAvailable = true;
        console.log("Ride completed");
      }, distanceLeft * 1000);
    }
    return { t, newSeconds };
  }
}

const rapido = new Rapido();
rapido.addRider(1, "Akshat", "Bhayani", 1234567890, "0e3384293", true);
rapido.addRider(2, "asdfgh", "sdfgh", 0987654321, "2093ieujrhf", true);
rapido.addCustomer(1, "asdfgb", "sdfdwsffgebsr", 1234567890, false);
rapido.addCustomer(2, "qwerty", "sdfgebedfcvcxsr", 2284439021, false);
rapido.addCustomer(3, "qwertyuiop", "sdfgebeasdfg", 1234509876, false);
rapido.bookRide(1, 8);
rapido.bookRide(2, 8);
rapido.bookRide(3, 8);
rapido.bookRide(4, 8);
rapido.bookRide(5, 8);




//rapido.bookRide(2, 5);
// setTimeout(() => {
//   rapido.bookRide(3, 8);
// }, 11000);
