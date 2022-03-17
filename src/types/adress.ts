export interface IAdress {
  value: string;
  isTouched: boolean;
}

export enum ActionTypes {
  CHANGE = "CHANGE",
  BLUR = "BLUR",
  RESET = "RESET",
}

export interface AdressAction {
  type: ActionTypes;
  payload?: string;
}

export interface IPlace {
  id: number;
  adress: string;
  lng: number;
  lat: number;
}

export interface AdressState {
  places: IPlace[];
  draggedPlaceID: number | null;
}
