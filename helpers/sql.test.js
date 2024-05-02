const { BadRequestError } = require("../expressError");
const { sqlForPartialUpdate } = require("./sql");

describe('sqlForPartialUpdate', () => {
  test('should return SQL SET clause and values for valid data', () => {
    const dataToUpdate = { firstName: 'Aliya', age: 32 };
    const jsToSql = { firstName: 'first_name' };
    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);
    expect(result.setCols).toBe('"first_name"=$1, "age"=$2');
    expect(result.values).toEqual(['Aliya', 32]);
  });

  test('should handle missing jsToSql mapping', () => {
    const dataToUpdate = { firstName: 'Aliya', age: 32 };
    const result = sqlForPartialUpdate(dataToUpdate, {});
    expect(result.setCols).toBe('"firstName"=$1, "age"=$2');
    expect(result.values).toEqual(['Aliya', 32]);
  });

  test('should throw BadRequestError if no data provided', () => {
    expect(() => sqlForPartialUpdate({}, {})).toThrow(BadRequestError);
  });
});