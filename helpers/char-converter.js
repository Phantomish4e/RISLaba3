function charConverter(str){
    const charMap = {};
    const newStr = [];
    
    for (let i = 0; i < str.length; i++) {
      const char = str[i].toLowerCase();
      
      if (char in charMap) {
        charMap[char]++;
      } else {
        charMap[char] = 1;
      }
    }
    
    for (let i = 0; i < str.length; i++) {
      const char = str[i].toLowerCase();
      const newChar = charMap[char] > 1 ? ')' : '(';
      
      newStr.push(newChar);
    }
    
    return newStr.join('');
}

const _charConverter=charConverter
export {_charConverter as charConverter}

function multiplicationTable(size) {
  const table = [];
  
  for (let i = 1; i <= size; i++) {
    const row = [];
    
    for (let j = 1; j <= size; j++) {
      row.push(i * j);
    }
    
    table.push(row);
  }
  
  return table;
}

const _multiplicationTable=multiplicationTable
export {_multiplicationTable as multiplicationTable}  
