/**
 * 共用函数
 * @author jihua.huang
 * @since 2022-03-24
*/


/**
 * 转换为字符串（false null function undefined NaN 0 空对象 空数组 统一转为空字符串）
 * @param value any
 * @return String 转换后的字符串
 */
export const toStr = (value:any) => {
  let str:string = ''
  if (typeof value === 'undefined') {
    str = ''
  } else if (!value || value === null || typeof value === 'function' || value.isNaN || JSON.stringify(value) === '{}') {
    str = ''
  } else {
    str = value.toString()
  }
  return str
}

/**
 * 转换开关值（true null function undefined NaN  空对象 空数组 统一转为开）
 * @param value any
 * @return boolen 转换后的trun/false
 */
export const hasOnOff = (value:any) => {
  let ret:boolean = false
  if (typeof value === 'undefined') {
    ret = true
  } else {
    if (typeof value === 'string') {
      ret = !!parseInt(value)
    } else if (typeof value === 'number') {
      ret = !!value
    } else {
      ret = true
    }
  }
  return ret
}

/**
 * 拼接成字符串
 * @param str string
 * @param str... string
 * @return string str
 */
export const concatStr = (str:string,str1:string) => {
  return str + str1
}

/**
 * 格式化unix时间戳为年月日格式（2022-03-18 10:08:00）
 * @param time number
 * @param format string 格式 默认：yyyy-MM-dd h:m:s
 * @return string str
 */
export const formatDate = (time:number = 0,format:string = '') => {
  let date:any
  if (time > 0) {
    let timeStr = time.toString();
    if (timeStr.length > 10) {
      date = new Date(time);
    } else {
      // 如果是毫秒则不需要*1000，如果是秒，则需要*1000
      date = new Date(time * 1000);
    }
  } else {
    date = new Date();
  }
  
  if (!format) return date.toLocaleString();
  let dateMap:any = {
      y: date.getFullYear(),
      M: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      m: date.getMinutes(),
      s: date.getSeconds(),
      S: date.getMilliseconds()
  };
  return format.replace(/(y+)|(M+)|(d+)|(h+)|(m+)|(s+)|(S+)/g, (a) => _add0(dateMap[a[0]], a.length))

}

function _add0(time:any, len:number) {
  let timeStr = time.toString();
  let l = timeStr.length;
  return l < len ? '0' . repeat(len - l) + time : time;
}

/**
 * 判断字符串是否在item中
 * @param item object/string item项
 * @param need string 字符串
 * @return number 1：弱，2：中，3：强
 */
export const isIndexOf = (item:any,need:any) => {
  if (typeof item === 'undefined' || item === null || typeof need === 'undefined'  || typeof need === 'undefined') return false
  if (Object.keys(item).length >= 1 && need) {
    if (item.indexOf(need) !== -1) {
      return true;
    }
  }
  return false
}

/**
 * 字符串的IP地址转为整型的IP（127.0.0.1 -> 2130706433 ）
 * @param ipAddress string 字符串的IP地址
 * @return number 整型IP地址
 */
export const ip2long = ( ipAddress:string ) => { 
  var output:any; 
  if ( ipAddress.match ( /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/ ) ) { 
    var parts:any = ipAddress.split ( '.' ); 
    var output:any; 
    output = ( parts [ 0 ] * Math.pow ( 256, 3 ) ) + 
             ( parts [ 1 ] * Math.pow ( 256, 2 ) ) + 
             ( parts [ 2 ] * Math.pow ( 256, 1 ) ) + 
             ( parts [ 3 ] * Math.pow ( 256, 0 ) ); 
  } 
  return output<<0;
} 

/**
 * 整型的IP转为字符串的IP地址（2130706433 -> 127.0.0.1）
 * @param longAddress number 整型IP地址
 * @return string 字符串的IP地址
 */
export const long2ip = ( longAddress:number ) => { 
  longAddress = longAddress>>>0; 
  var output;
 
  if ( !isNaN ( longAddress ) && ( longAddress >= 0 || longAddress <= 4294967295 ) ) { 
    output = Math.floor (longAddress / Math.pow ( 256, 3 ) ) + '.' + 
             Math.floor ( ( longAddress % Math.pow ( 256, 3 ) ) / Math.pow ( 256, 2 ) ) + '.' + 
             Math.floor ( ( ( longAddress % Math.pow ( 256, 3 ) ) % Math.pow ( 256, 2 ) ) / 
Math.pow ( 256, 1 ) ) + '.' + 
             Math.floor ( ( ( ( longAddress % Math.pow ( 256, 3 ) ) % Math.pow ( 256, 2 ) ) % 
Math.pow ( 256, 1 ) ) / Math.pow ( 256, 0 ) ); 
  } 
  return output; 
}
