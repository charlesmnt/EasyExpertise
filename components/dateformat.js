export default  function dateFormat(date){
    var newDate = new Date(date);
    if((newDate.getMonth()+1)<10 ){
    var format = newDate.getDate()+'/'+'0'+(newDate.getMonth()+1)+'/'+newDate.getFullYear();
  }
  if(newDate.getDate()<10) {
    var format = '0'+newDate.getDate()+'/'+(newDate.getMonth()+1)+'/'+newDate.getFullYear();
} if((newDate.getMonth()+1)<10 && newDate.getDate()<10 ){
  var format = '0'+newDate.getDate()+'/'+'0'+(newDate.getMonth()+1)+'/'+newDate.getFullYear();
}
    return format;
  };