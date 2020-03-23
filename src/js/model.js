let totalHours;
const data = {
  checkout: {},
  groups: []
};

function roundDownHundredthsPlace(num) {
  return (Math.floor(100 * num) / 100).toFixed(2);
}

class Checkout {
  constructor(totalSales, creditCardTips, mdrTips, cashTips) {
    this.totalSales = totalSales;
    this.creditCardTips = creditCardTips;
    this.mdrTips = mdrTips;
    this.cashTips = cashTips;
  }

  get totalTips() {
    return this.cashTips + this.creditCardTips;
  }

  get salesPerHour() {
    return this.totalSales / totalHours;
  }

  get cashTipsPerHour() {
    return this.cashTips / totalHours;
  }

  get ccTipsPerHour() {
    return this.creditCardTips / totalHours;
  }

  get busTipOutPerHour() {
    const busTipOutTotal = this.mdrTips * 0.1;
    return busTipOutTotal / totalHours;
  }

  get barTipOutPerHour() {
    const barTipOutTotal = this.totalTips * 0.05;
    return barTipOutTotal / totalHours;
  }

  get expoTipOutPerHour() {
    const expoTipOutTotal = this.totalTips * 0.05;
    return expoTipOutTotal / totalHours;
  }
}

class Group {
  constructor(name, size, hoursPerMember, minutesPerMember) {
    this.name = name;
    this.size = parseInt(size, 10);
    this.hoursPerMember = parseInt(hoursPerMember, 10);
    this.minutesPerMember = parseInt(minutesPerMember, 10);
  }

  decimalTimePerMember() {
    const decimalMinutes = this.minutesPerMember / 60;
    return this.hoursPerMember + decimalMinutes;
  }

  groupHours() {
    return this.decimalTimePerMember() * this.size;
  }

  get salesPerMember() {
    return this.decimalTimePerMember() * data.checkout.salesPerHour;
  }

  get cashTipsPerMember() {
    return this.decimalTimePerMember() * data.checkout.cashTipsPerHour;
  }

  get ccTipsPerMember() {
    return this.decimalTimePerMember() * data.checkout.ccTipsPerHour;
  }

  get busTipOutPerMember() {
    return data.checkout.busTipOutPerHour * this.decimalTimePerMember();
  }

  get barTipOutPerMember() {
    return data.checkout.barTipOutPerHour * this.decimalTimePerMember();
  }

  get expoTipOutPerMember() {
    return data.checkout.expoTipOutPerHour * this.decimalTimePerMember();
  }

  get totalTipsPerMember() {
    return this.ccTipsPerMember + this.cashTipsPerMember;
  }

  get totalTipOutPerMember() {
    return (
      this.busTipOutPerMember +
      this.barTipOutPerMember +
      this.expoTipOutPerMember
    );
  }

  get claimedPerMember() {
    return this.totalTipsPerMember - this.totalTipOutPerMember;
  }
}

export function setCheckout(totalSales, creditCardTips, mdrTips, cashTips) {
  const checkout = new Checkout(totalSales, creditCardTips, mdrTips, cashTips);
  data.checkout = checkout;
}

export function setGroup(name, size, hoursPerMember, minutesPerMember) {
  const group = new Group(name, size, hoursPerMember, minutesPerMember);
  data.groups.push(group);
}

export function setTotalHours() {
  totalHours = data.groups.reduce(
    (accumulator, item) => accumulator + item.groupHours(),
    0
  );
}

export function getGroups() {
  return data.groups.map(item => ({
    name: item.name,
    hours: roundDownHundredthsPlace(item.decimalTimePerMember()),
    size: item.size,
    sales: roundDownHundredthsPlace(item.salesPerMember),
    creditCardTips: roundDownHundredthsPlace(item.ccTipsPerMember),
    cashTips: roundDownHundredthsPlace(item.cashTipsPerMember),
    claimedTips: roundDownHundredthsPlace(item.claimedPerMember),
    busserTips: roundDownHundredthsPlace(item.busTipOutPerMember),
    barTips: roundDownHundredthsPlace(item.barTipOutPerMember),
    runnerTips: roundDownHundredthsPlace(item.expoTipOutPerMember),
    totalTipOut: roundDownHundredthsPlace(item.totalTipOutPerMember)
  }));
}

export function removeGroupFromData(e) {
  const identifier = e.target.id;

  console.log(data.groups);
  data.groups = data.groups.filter(item => item.name !== identifier);
  console.log(data.groups);
}
