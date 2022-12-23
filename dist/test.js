"use strict";
const factories = [
    { name: 'BR1', employees: ['John', 'Alice', 'Bob', 'Jessie', 'Karen'] },
    { name: 'BR2', employees: ['Jessie', 'Karen', 'John'] },
    { name: 'BR3', employees: ['Miles', 'Eric', 'Henry', 'Bob'] },
    { name: 'BR4', employees: [] }
];
// 1. Count Employees Number by Factory // => [ {name: 'BR1', count: 4}, ... ]
function countEmployees(factoriesArr) {
    const result = factoriesArr.map(factory => {
        return {
            name: factory.name,
            count: factory.employees.length
        };
    });
    console.log(result);
    return result;
}
// countEmployees(factories)
// 2. Count Factories Number by Employee // => [ {employee: 'John', count: 2}, ... ]
//! I assume that employee name is unique for each factory because I guess it normally count by id or something unique identification in real world situation.
function countFactories(factoriesArr) {
    const result = [];
    const existEmployee = {};
    factoriesArr.forEach(factory => {
        factory.employees.forEach(employee => {
            existEmployee[employee]
                ? existEmployee[employee]++
                : (existEmployee[employee] = 1);
        });
    });
    for (const [key, value] of Object.entries(existEmployee)) {
        result.push({ employee: key, count: value });
    }
    console.log(result);
    return result;
}
// countFactories(factories)
// 3. Order employees list by alphabetical order // =>   { name: "BR2", employees: ["Jessie", "John", "Karen"] }
function orderByAlphabetical(factoriesArr) {
    const result = factoriesArr.map(factory => {
        return {
            name: factory.name,
            employees: factory.employees.sort()
        };
    });
    console.log(result);
    return result;
}
const employeeType = [
    { id: 1, name: 'FullTime', work_begin: '09:00:00', work_end: '17:00:00' },
    { id: 2, name: 'MidTime', work_begin: '12:00:00', work_end: '21:00:00' },
    { id: 3, name: 'HalfTime', work_begin: '20:00:00', work_end: '00:00:00' } // 4
];
const employees = [
    { id: 1, name: 'Alice', type: 2 },
    { id: 2, name: 'Bob', type: 3 },
    { id: 3, name: 'John', type: 2 },
    { id: 4, name: 'Karen', type: 1 },
    { id: 5, name: 'Miles', type: 3 },
    { id: 6, name: 'Henry', type: 1 }
];
const tasks = [
    { id: 1, title: 'task01', duration: 60 },
    { id: 2, title: 'task02', duration: 120 },
    { id: 3, title: 'task03', duration: 180 },
    { id: 4, title: 'task04', duration: 360 },
    { id: 5, title: 'task05', duration: 30 },
    { id: 6, title: 'task06', duration: 220 },
    { id: 7, title: 'task07', duration: 640 },
    { id: 8, title: 'task08', duration: 250 },
    { id: 9, title: 'task09', duration: 119 },
    { id: 10, title: 'task10', duration: 560 },
    { id: 11, title: 'task11', duration: 340 },
    { id: 12, title: 'task12', duration: 45 },
    { id: 13, title: 'task13', duration: 86 },
    { id: 14, title: 'task14', duration: 480 },
    { id: 15, title: 'task15', duration: 900 } // 15
];
// 4. Count total hours worked in 1 day ? // => 39
//! For this question, I create the other two functions, one is for turning the time string to number and the other one is to calculate the duration, I'm doing this because of keeping the function easy and reusing.
function timeStringToNumber(timeString) {
    const date = new Date('1970-01-01 ' + timeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return hours * 3600 + minutes * 60 + seconds;
}
function calculateDuration(workBegin, workEnd) {
    const start = timeStringToNumber(workBegin);
    const end = timeStringToNumber(workEnd);
    let duration = end - start;
    if (duration < 0) {
        duration += 86400;
    }
    return duration;
}
function countTotalHoursWorked(employeeType, employees) {
    let totalHoursWorked = 0;
    for (const employee of employees) {
        const workBegin = employeeType.find(type => type.id === employee.type).work_begin;
        const workEnd = employeeType.find(type => type.id === employee.type).work_end;
        const duration = calculateDuration(workBegin, workEnd);
        totalHoursWorked += duration;
    }
    totalHoursWorked /= 3600;
    console.log(totalHoursWorked);
    return totalHoursWorked;
}
// countTotalHoursWorked(employeeType, employees)
// 5. Make a function that take dayTime as parameters and return number of employee working // howManyEmployeeByTime(time) => int
//! Not quite clear with the question, as my guessing is that how many employees will be at work by the time we checking. So let's say if the time is '16:00:00' then the function need to provide how many employees at works by this time.
function howManyEmployeeByTime(time) {
    let numberOfEmployee = 0;
    const checkingTime = timeStringToNumber(time);
    for (const employee of employees) {
        const workBegin = employeeType.find(type => type.id === employee.type).work_begin;
        const workEnd = employeeType.find(type => type.id === employee.type).work_end;
        const workBeginTime = timeStringToNumber(workBegin);
        const workEndTime = timeStringToNumber(workEnd) === 0
            ? 86400 - 1
            : timeStringToNumber(workEnd) - 1;
        if (checkingTime >= workBeginTime && checkingTime < workEndTime) {
            numberOfEmployee++;
        }
    }
    console.log(numberOfEmployee);
    return numberOfEmployee;
}
// howManyEmployeeByTime('22:22:22')
// howManyEmployeeByTime('13:22:22')
// howManyEmployeeByTime('17:22:22')
// howManyEmployeeByTime('2:22:22')
// 6. How many days of work needed to done all tasks ? // => 1 day = 9:00 to 00:00 between 00:00 and 09:00 doesnt count.
function howManyDaysForTasks(tasks) {
    const WORKINGHOURSPERDAY = 24 - 9;
    const totalMinutes = tasks.reduce((acc, obj) => {
        return acc + obj.duration;
    }, 0);
    const totalHours = Math.round(totalMinutes / 60);
    const workingDays = Math.ceil(totalHours / WORKINGHOURSPERDAY);
    console.log(`${workingDays} days`);
    return `${workingDays} days`;
}
// howManyDaysForTasks(tasks)
