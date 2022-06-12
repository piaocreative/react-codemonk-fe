import get from 'lodash/get';
import StorageService from 'utils/StorageService';

function dayWorkingHoursObj(daysWorked) {
  return daysWorked.map(v => ({ h: +v.split(':')[0], m: +v.split(':')[1] }));
}

export const calculateTotalHours = daysWorked => {
  let totalDaysHoursMinutes = '0 Days 0 Hours and 0 Minutes';
  let totalHours = 0;
  let totalMins = 0;
  let totaldays = 0;

  const dayWorkingHours = dayWorkingHoursObj(daysWorked);

  totaldays = dayWorkingHours.reduce((sum, dayHours) => {
    // who has more than 7:30 hours
    if (dayHours.h > 7 || (dayHours.h === 7 && dayHours.m >= 30)) {
      sum += 1;
    } else {
      totalHours += dayHours.h;
      totalMins += dayHours.m;
    }
    return sum;
  }, 0);

  if (totalMins >= 60) {
    totalHours += Math.trunc(totalMins / 60);
    totalMins %= 60;
  }
  totalDaysHoursMinutes = `${totaldays} Days ${totalHours} Hours and ${totalMins} Minutes`;
  return totalDaysHoursMinutes;
};
export const calculateTotalEarnings = daysWorked => {
  const ratePerHour = get(JSON.parse(StorageService.get('userBillingDetails')), 'ratePerHour');
  const ratePerDay = ratePerHour * 7.5;

  let hourlySum = 0;
  let minSum = 0;

  // who has more than 7 hours
  const dayWorkingHours = dayWorkingHoursObj(daysWorked);

  const dayCharge = dayWorkingHours.reduce((sum, dayHours) => {
    // who has more than 7:30 hours
    if (dayHours.h > 7 || (dayHours.h === 7 && dayHours.m >= 30)) {
      sum += ratePerDay;
    } else {
      hourlySum += dayHours.h;
      minSum += dayHours.m;
    }
    return sum;
  }, 0);

  const hourCharge = (hourlySum + minSum / 60) * ratePerHour;

  return +parseFloat(dayCharge + hourCharge).toFixed(2);
};
