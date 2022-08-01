import { ICar } from "../../../interfaces/ICar";
import { IidDocument } from "../../../interfaces/IidDocument";

type Attribute = 'model' | 'year' | 'color' | 'buyValue' | 'seatsQty' | 'doorsQty';

export const carMock: ICar = {
  model: 'Fiat Uno',
  year: 2002,
  color: 'White',
  buyValue: 10000,
  seatsQty: 5,
  doorsQty: 2,
};

export const carMockWithId: IidDocument & ICar = {
  _id: '62e7186d7636a3cf34a5dbf9',
  model: 'Fiat Uno',
  year: 2002,
  color: 'White',
  buyValue: 10000,
  seatsQty: 5,
  doorsQty: 2,
};

export const invalidCarsMock = () => Object.keys(carMock)
  .map((attribute: string) => {
    const atr = attribute as Attribute;
    const carMockAltered = { ...carMock };
    delete carMockAltered[atr];
    return carMockAltered;
  });

// export const carMockWithoutModel: Omit<ICar, 'model'> = {
//   year: 2002,
//   color: 'White',
//   buyValue: 10000,
//   seatsQty: 5,
//   doorsQty: 2,
// };
