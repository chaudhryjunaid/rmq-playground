exports.fromBuffer = (buf) => {
  const str = buf.toString();
  return JSON.parse(str);
};

exports.toBuffer = (json) => {
  const str = JSON.stringify(json);
  return Buffer.from(str);
};

