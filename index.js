// Your code here
function createEmployeeRecord(data) {
    return {
        firstName: data[0],
        familyName: data[1],
        title: data[2],
        payPerHour: data[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) {
    let newEmployees = [];
    employees.forEach(function(employee) {
        newEmployees.push(createEmployeeRecord(employee))
    })
    return newEmployees
}

function createTimeInEvent(employee, dateTime) {
    let hour = parseInt(dateTime.slice(-4))
    let date = dateTime.slice(0, 10)
    let event = {
        type: "TimeIn",
        hour: hour,
        date: date
    }
    employee.timeInEvents.push(event)
    return employee
}

function createTimeOutEvent(employee, dateTime) {
    let hour = parseInt(dateTime.slice(-4))
    let date = dateTime.slice(0, 10)
    let event = {
        type: "TimeOut",
        hour: hour,
        date: date
    }
    employee.timeOutEvents.push(event)
    return employee
}

function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(event => event.date === date)
    let timeOut = employee.timeOutEvents.find(event => event.date === date)
    let hours = timeOut.hour - timeIn.hour 
    return (hours/100)
}

function wagesEarnedOnDate(employee, date) {
    let hours = hoursWorkedOnDate(employee, date)
    return employee.payPerHour * hours
}

function allWagesFor(employee) {
    let dates = employee.timeInEvents.map(event => event.date)
    
    return dates.reduce(function(memo, date) {
        return memo + wagesEarnedOnDate(employee, date)
    }, 0)
}

function calculatePayroll(employees) {
    return employees.reduce(function(memo, employee) {
        return memo + allWagesFor(employee)
    }, 0)
}

function findEmployeeByFirstName(array, name) {
    return array.find(employee => employee.firstName ===name)
}