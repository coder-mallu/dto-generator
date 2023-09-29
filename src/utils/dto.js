/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const type = {
  ARRAY: 'ARRAY',
  OBJECT: 'OBJECT',
};

const checkValue = (val) => {
  if (Array.isArray(val)) return type.ARRAY;
  if (typeof val === 'object' && val !== null) return type.OBJECT;
  return null;
};

const titleCase = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const getSwaggerDecorator = (valKey, val) => {
  if (typeof val === 'object') {
    if (checkValue(val) === type.OBJECT) return `@ApiProperty({ type: ${titleCase(`${valKey}Dto`)} })`;
    if (checkValue(val) === type.ARRAY) {
      if (typeof val[0] === 'object') return `@ApiProperty({ type: ${`[${titleCase(valKey)}Dto]`} })`;
      if (typeof val[0] !== 'undefined') {
        return `@ApiProperty({ type: ${titleCase(`[${typeof val[0]}]`)} })`;
      }
      return `@ApiProperty({ type: ${titleCase(`[any]`)} })`;
    }
  }
  return '@ApiProperty()';
};

let dtoArrray = [];

const generate = (val, name = 'BaseDto') => {
  const valCheck = checkValue(val);
  if (valCheck === type.OBJECT) {
    let dtoString = `class ${titleCase(name)} {`;
    for (const valKey in val) {
      if (typeof val[valKey] === 'object') {
        if (checkValue(val[valKey]) === type.ARRAY) {
          if (typeof val[valKey][0] === 'object') generate(val[valKey], `${valKey}Dto`);
        }

        if (checkValue(val[valKey]) === type.OBJECT) {
          generate(val[valKey], `${valKey}Dto`);
        }
      }

      dtoString = `${dtoString}
    ${getSwaggerDecorator(valKey, val[valKey])}
    ${valKey}: ${
        typeof val[valKey] === 'object'
          ? checkValue(val[valKey]) === type.OBJECT
            ? `${titleCase(`${valKey}Dto`)}`
            : checkValue(val[valKey]) === type.ARRAY
            ? typeof val[valKey][0] === 'object'
              ? `${titleCase(`${valKey}Dto[]`)}`
              : typeof val[valKey][0] === 'undefined'
              ? 'any[]'
              : `${typeof val[valKey][0]}[]`
            : 'any'
          : typeof val[valKey] === 'undefined'
          ? 'any'
          : typeof val[valKey]
      };`;
    }
    dtoString = `${dtoString}
}`;
    dtoArrray.push(dtoString);
  }

  if (valCheck === type.ARRAY) {
    generate(val[0], name);
  }
};

const generateDto = (value) => {
  generate(value);
  let stringValue = '';
  dtoArrray.forEach((index) => {
    stringValue = `${stringValue}
${index}`;
  });

  dtoArrray = [];

  return stringValue;
};

module.exports = { generateDto };
