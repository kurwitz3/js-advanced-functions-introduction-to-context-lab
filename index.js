function createEmployeeRecord(array){
    let person = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return person
}

function createEmployeeRecords(array){
   return  array.map(createEmployeeRecord)

}
function createTimeInEvent(object,dateStamp){
   let [date,hour] = dateStamp.split(' ')
   let hourNumber = parseInt(hour,10)
    object.timeInEvents.push({
        type:'TimeIn',
        hour: hourNumber,
        date: date
    })
    return object
}

function createTimeOutEvent(object,dateStamp){
    let [date,hour] = dateStamp.split(' ')
    let hourNumber = parseInt(hour,10)
     object.timeOutEvents.push({
         type:'TimeOut',
         hour: hourNumber,
         date: date
     })
     return object
 }

 function hoursWorkedOnDate(object,dates){
    let timeIn = object.timeInEvents.find(function(e){
        return e.date === dates
    })
    let timeOut = object.timeOutEvents.find(function(e){
        return e.date === dates
    })
    let timeInStamp =  timeIn.hour / 100
    let timeOutStamp = timeOut.hour / 100

    return   timeOutStamp - timeInStamp
}
function wagesEarnedOnDate(object,date){
    let payRate = parseInt(object.payPerHour)
    return hoursWorkedOnDate(object,date) * payRate
}

function allWagesFor(object){
  let dates = object.timeInEvents.map(function(e){
      return e.date 
  })
  let wages = dates.reduce(function(acc,value){
      return acc + wagesEarnedOnDate(object,value)
  },0)
  return wages
}

function findEmployeeByFirstName(array,name){
   return array.find(e => {return e.firstName === name})
}

function calculatePayroll(array){
    let total = array.reduce(function(acc,value){
        return  acc + allWagesFor(value)
    },0)
    return total 
}