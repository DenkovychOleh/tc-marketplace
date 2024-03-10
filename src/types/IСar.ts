export interface ICar {
 
    id: number;
    brand: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    description: string;
    transmission: string;
    fuelType: string;
    engineDisplacement: number;
    city: string;
    created: string;
    fileUrl: string;
    isFavorite: boolean;
  }

export interface IFiltredCarsPayload {
  transportSearchResponse: ICar[];
  total: number;
}


    