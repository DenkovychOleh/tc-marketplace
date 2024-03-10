import { IBrands } from 'types/IBrands';
import { ICarBody } from 'types/ICarBody';
import { ICity } from 'types/ICity';
import { IColor } from 'types/IColor';
import { ICondition } from 'types/ICondition';
import { IDriverType } from 'types/IDriverType';
import { IFuel } from 'types/IFuel';
import { IModel } from 'types/IModel';
import { INumberAxles } from 'types/INumberAxles';
import { IProducingCountry } from 'types/IProducingCountry';
import { IRegion } from 'types/IRegion';
import { ITransmission } from 'types/ITransmission';
import { IWheelConfiguration } from 'types/IWheelConfiguration';

export const getArrayOfId = (
  regions: IRegion[],
  selectedRegions: string | string[],
) => {
  const selectedToFilter = new Set(selectedRegions);
  const ids: number[] = [];
  for (const item of regions) {
    if (selectedToFilter.has(item.region)) {
      ids.push(item.regionId);
    }
  }
  return ids;
};
export const getArrayBrandsOfId = (
  regions: IBrands[],
  selectedRegions: string | string[],
) => {
  const selectedToFilter = new Set(selectedRegions);
  const ids: number[] = [];
  for (const item of regions) {
    if (selectedToFilter.has(item.brand)) {
      ids.push(item.brandId);
    }
  }
  return ids;
};

export const getArrayModelsOfId = (
  models: IModel[],
  selectedModels: string | string[],
) => {
  const selectedToFilter = new Set(selectedModels);

  const ids: number[] = [];
  for (const item of models) {
    if (selectedToFilter.has(item.model)) {
      ids.push(item.modelId);
    }
  }
  return ids;
};

export const getArrayCarBodyOfId = (
  bodyTypes: ICarBody[],
  carBody: string | string[],
) => {
  const newArray = [carBody];
  const selectedToFilter = new Set(newArray);

  const ids: number[] = [];

  for (const item of bodyTypes) {
    if (selectedToFilter.has(item.bodyType)) {
      ids.push(item.bodyTypeId);
    }
  }
  return ids;
};

export const getArrayCityOfId = (
  citys: ICity[],
  selectedCity: string | string[],
) => {
  const selectedToFilter = new Set(selectedCity);

  const ids: number[] = [];
  for (const item of citys) {
    if (selectedToFilter.has(item.city)) {
      ids.push(item.cityId);
    }
  }
  return ids;
};

export const getArrayFuelOfId = (fuel: IFuel[], carFuel: string | string[]) => {
  const newArray = [carFuel];
  const selectedToFilter = new Set(newArray);

  const ids: number[] = [];
  for (const item of fuel) {
    if (selectedToFilter.has(item.fuelType)) {
      ids.push(item.fuelTypeId);
    }
  }
  return ids;
};
export const getArrayDriveOfid = (
  driveType: IDriverType[],
  carDriveType: string | string[],
) => {
  const newArray = [carDriveType];
  const selectedToFilter = new Set(newArray);

  const ids: number[] = [];
  for (const item of driveType) {
    if (selectedToFilter.has(item.driveType)) {
      ids.push(item.driveTypeId);
    }
  }
  return ids;
};

export const getArrayTransmissionOfId = (
  transmission: ITransmission[],
  carTransmission: string | string[],
) => {
  const newArray = [carTransmission];
  const selectedToFilter = new Set(newArray);

  const ids: number[] = [];
  for (const item of transmission) {
    if (selectedToFilter.has(item.transmission)) {
      ids.push(item.transmissionId);
    }
  }
  return ids;
};

export const getArrayColorOfId = (
  transportColor: IColor[],
  carColor: string | string[],
) => {
  const newArray = [carColor];
  const selectedToFilter = new Set(newArray);

  const ids: number[] = [];
  for (const item of transportColor) {
    if (selectedToFilter.has(item.transportColor)) {
      ids.push(item.transportColorId);
    }
  }
  return ids;
};

export const getArrayConditionOfId = (
  transportCondition: ICondition[],
  carTransportCondition: string | string[],
) => {
  const newArray = [carTransportCondition];
  const selectedToFilter = new Set(newArray);

  const ids: number[] = [];
  for (const item of transportCondition) {
    if (selectedToFilter.has(item.transportCondition)) {
      ids.push(item.transportConditionId);
    }
  }
  return ids;
};

export const getArrayNumberAxlesOfId = (
  numberAxles: INumberAxles[],
  carNumberAxles: string | string[],
) => {
  const newArray = [carNumberAxles];
  const selectedToFilter = new Set(newArray);

  const ids: number[] = [];
  for (const item of numberAxles) {
    if (selectedToFilter.has(item.numberAxles)) {
      ids.push(item.numberAxlesId);
    }
  }
  return ids;
};

export const getArrayProducingCountryOfId = (
  producingCountry: IProducingCountry[],
  countryDeliver: string | string[],
) => {
  const newArray = [countryDeliver];
  const selectedToFilter = new Set(newArray);

  const ids: number[] = [];
  for (const item of producingCountry) {
    if (selectedToFilter.has(item.producingCountry)) {
      ids.push(item.producingCountryId);
    }
  }
  return ids;
};
export const getArrayWheelConfigurationOfId = (
  wheelConfiguration: IWheelConfiguration[],
  carWheelConfiguration: string | string[],
) => {
  const newArray = [carWheelConfiguration];
  const selectedToFilter = new Set(newArray);
  const ids: number[] = [];
  for (const item of wheelConfiguration) {
    if (selectedToFilter.has(item.wheelConfiguration)) {
      ids.push(item.wheelConfigurationId);
    }
  }
  return ids;
};
