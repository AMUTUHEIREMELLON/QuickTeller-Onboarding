const Regexps = {
  twoNamesRegexp: /(\w.+\s).+/,
  ninRegexp: /^[A-Z0-9]{14}$/,
  phoneNumberRegexp: /(07)(\d){8}\b/,
  tinRegexp: /^[0-9]{10}$/i,
  regNoRegexp: /^[0-9]{14}$/i,
  numRegexp: /^[0-9]+$/,
  panRegexp: /^[0-9]{19}$/,
  emailRegexp: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
};

export default Regexps
