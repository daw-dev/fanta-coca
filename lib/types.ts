export type Scheda = {
  nome: string;
  staffs: Staff[];
}

export type Staff = {
  unita: string;
  capi: string[];
}

export type CoCa = {
  passaggi: Date;
  staffs: Staff[];
}

type Genere = "maschile" | "femminile";

export type Nome = {
  nome: string;
  genere: Genere;
}

export type Aggettivo = string | {
  [key in Genere]: string;
}