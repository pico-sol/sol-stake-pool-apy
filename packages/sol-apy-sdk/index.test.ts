import {describe, it, expect} from '@jest/globals';
import {Readable} from 'stream';
import {calcAverageApy, calcAverageApyList, parsePriceRecordsFromCSV} from '.';

const PRICES_FIXTURE = `timestamp,epoch,price
2023-02-16T20:00:00.000Z,412,1.0941210906569283
2023-02-18T15:28:09.247Z,413,1.0945924869715526
2023-02-21T13:11:32+00:00,414,1.0950583993877852
2023-02-23T20:54:15+00:00,415,1.0955070615234903
2023-02-27T02:13:17+00:00,416,1.0959482337882382
2023-03-01T13:12:45+00:00,417,1.096392841238896
2023-03-03T20:54:30+00:00,418,1.096843739456418
2023-03-06T04:54:27+00:00,419,1.0972802712441718
2023-03-08T16:56:06+00:00,420,1.0977456564567272
2023-03-10T21:56:02+00:00,421,1.0982106707479484
2023-03-13T05:56:03+00:00,422,1.0986825938727043
2023-03-15T14:56:14+00:00,423,1.0991392944646632
2023-03-17T22:56:17+00:00,424,1.0992061116862286
2023-03-17T23:56:03+00:00,424,1.0996000494015115
2023-03-20T05:56:09+00:00,425,1.1000629805857518
2023-03-22T13:08:34+00:00,426,1.100526299299535
2023-03-24T20:55:59+00:00,427,1.1009865561790546
2023-03-27T02:56:14+00:00,428,1.101442255695231
2023-03-29T09:56:08+00:00,429,1.1019035790931255
2023-03-31T15:56:21+00:00,430,1.1019035790931255
2023-03-31T16:56:21+00:00,430,1.102335473523167
2023-04-02T23:56:00+00:00,431,1.1027780885651493
2023-04-05T06:55:56+00:00,432,1.1032175661352648
`;

describe('APY SDK', () => {
  describe('parsePriceRecordsFromCSV', () => {
    it('parses CSV and returns price records', async () => {
      const prices = await parsePriceRecordsFromCSV(
        Readable.from(PRICES_FIXTURE)
      );
      expect(prices).toMatchSnapshot();
    });
  });
  describe('calcAverageApy', () => {
    it('calculates average APY over past 10 epochs', async () => {
      const prices = await parsePriceRecordsFromCSV(
        Readable.from(PRICES_FIXTURE)
      );
      const result = calcAverageApy(prices);

      expect(result).toStrictEqual({
        apy: 0.0674747747045612,
        epochs: 10,
        timestampEnd: 1680677756000,
        timestampStart: 1678686963000,
      });
    });
  });
  describe('calcAverageApyList', () => {
    it('calculates average APY over past 10 epochs at every epoch', async () => {
      const prices = await parsePriceRecordsFromCSV(
        Readable.from(PRICES_FIXTURE)
      );
      const result = calcAverageApyList(prices);

      expect(result).toMatchSnapshot();
    });
  });
});