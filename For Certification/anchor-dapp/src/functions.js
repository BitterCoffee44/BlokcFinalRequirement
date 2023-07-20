export function toString(data) {
    const slicedData = data.slice(0); 
    return slicedData.map((num) => String.fromCharCode(num)).join('');
  }
  