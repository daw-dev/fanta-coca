import { ObjectId } from "mongodb";

export interface Scheda {
  _id?: ObjectId;
  timeStamp?: Date;
  nome: string;
  staffs: Staff[];
}

export interface Staff {
  nomeStaff: string;
  capi: string[];
}

export interface Risultato {
  availableFrom: Date;
  staffs: Staff[];
}