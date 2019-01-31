module.exports.getPageCount = (count) => {
  return Math.ceil(count / 10);
}

module.exports.closeEditor = (e) => {
  e.preventDefault();
  console.log(e.target.parentNode);
  e.target.parentNode.style.display = 'none';
  
}
