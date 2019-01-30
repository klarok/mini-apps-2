module.exports.extractPageLinks = (linkHeader) => {
  const regex = /(\/events\?q=[a-z]+&_page=\d)>; rel="(\w+)"/ig;
  const links = {
    first: null,
    prev: null,
    next: null,
    last: null
  };
  let match = regex.exec(linkHeader);
  while (match !== null) {
    links[match[2]] = match[1];
    match = regex.exec(linkHeader);
  }
  return links;
}
