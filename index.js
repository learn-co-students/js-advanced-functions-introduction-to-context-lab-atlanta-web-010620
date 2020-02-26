function createEmployeeRecord(array){
    let testEmployee = {}; 
    testEmployee.firstName = array[0]; 
    testEmployee.familyName = array[1]; 
    testEmployee.title = array[2]; 
    testEmployee.payPerHour = array[3]; 
    testEmployee.timeInEvents = []; 
    testEmployee.timeOutEvents = []; 
    return testEmployee; 
}

function createEmployeeRecords(array){
    return array.map(emp => createEmployeeRecord(emp)); 
}

function createTimeInEvent(emp, time){
    let timeDate = time.slice(0,10);
    let TimeIn = {
        type:"TimeIn",
        date: timeDate,
        hour: parseInt(time.slice(11))
    }
    emp.timeInEvents.push(TimeIn); 
    return emp
}

function createTimeOutEvent(emp,time){
    let timeDate = time.slice(0,10);
    let TimeOut = {
        type:"TimeOut",
        date: timeDate,
        hour: parseInt(time.slice(11))
    }
    emp.timeOutEvents.push(TimeOut); 
    return emp
}

function hoursWorkedOnDate(emp,date){
    let timeInIndex = emp.timeInEvents.findIndex(element => element.date ===date); 
    // debugger; 
    let timeIn = emp.timeInEvents[timeInIndex].hour; 
    let timeOut = emp.timeOutEvents[timeInIndex].hour; 
    // debugger;
    return (timeOut - timeIn)*0.01;
}

function wagesEarnedOnDate(emp,date){
    return hoursWorkedOnDate(emp,date)*emp.payPerHour;
}

function allWagesFor(emp){
    let hoursWorked = emp.timeInEvents.map(event => hoursWorkedOnDate(emp,event.date));
    let totalHours = hoursWorked.reduce(function(i,memo){return i+memo})
    let totalEarnings = totalHours * emp.payPerHour; 
    return totalEarnings; 
}

function calculatePayroll(employees){
    // return employees.reduce(allWagesFor)
    // return employees.reduce(emp=>allWagesFor(emp))
    return employees.reduce(function(memo,emp){
        return memo + allWagesFor(emp)
    },0)
}

function findEmployeeByFirstName(employees,name){
    return employees.find(employee => employee.firstName === name); 
}