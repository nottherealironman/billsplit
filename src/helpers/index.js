/* This file consists a list of reusable helper functions for the application */ 

export function convertToReadableDate (date){
    const formattedDate = new Date(date);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = formattedDate.getFullYear();
    var month = months[formattedDate.getMonth()];
    var day = formattedDate.getDate();
    return day+" "+month+" "+year;
  }