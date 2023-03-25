function calculateNumber(type, a, b) {
  if (type === 'SUM') {
    return (Math.round(a) + Math.round(b));
  }
  if (type === 'SUBTRACT') {
    return (Math.round(a) - Math.round(b));
  }
  if (type === 'DIVIDE') {
    const round_a = Math.round(a);
    const round_b = Math.round(b);
    
    if (round_b === 0) {
      return ('Error');
    }
    return (round_a / round_b);
  }
};
module.exports = calculateNumber;
