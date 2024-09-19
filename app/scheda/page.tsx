"use client";

import { useState } from "react";
interface Scheda {
  timeStamp: Date;
  nome: string;
  giovaneGirasole: string[];
  vecchiaQuercia: string[];
  deneb: string[];
  sanAvogaro: string[];
  avalance: string[];
  k2: string[];
}

// TODO: aggiungere animali e aggettivi

const animali = [
  "Tigre",
  "Squalo",
  "Lupo",
  "Lince",
  "Farfalla",
  "Fennec",
  "Panda",
  "Mantide",
  "Pipistrello",
  "Delfino",
];

const aggettivi = [
  "Tenace",
  "Perfido",
  "Lento",
  "Alto",
  "Basso",
  "Altezzoso",
  "Sensibile",
  "Affamato",
  "Dolorante",
  "Estroverso",
];

function getNomeDefault() {
  return `${animali[Math.floor(Math.random() * animali.length)]} ${
    aggettivi[Math.floor(Math.random() * aggettivi.length)]
  }`;
}

export default function SchedaPage() {
  const [nome, setNome] = useState(getNomeDefault());
  return (
    <div className="grid grid-rows-[50px_1fr_1fr_1fr_40px_50px] grid-cols-2 min-h-screen p-10 justify-items-center items-center gap-y-5 gap-x-10">
      <span className="text-3xl col-span-2">Scheda Fanta-CoCa</span>
      <Staff staffName="Giovane Girasole" />
      <Staff staffName="Vecchia Quercia" />
      <Staff staffName="Deneb (Santa Croce)" />
      <Staff staffName="San Avogaro (San Pio X)" />
      <Staff staffName="Avalanche (Noviziato)" />
      <Staff staffName="K2 (Clan)" />
      <span className="col-span-2 w-full max-w-75%">
        <label htmlFor="nome">Inserire il tuo nome:</label>
        <input
          id="nome"
          className="p-2 w-full bg-white text-black rounded-sm hover:rounded-lg transition-[border-radius]"
          placeholder="Nome..."
          onChange={(evt) => {
            setNome(evt.target.value);
          }}
          value={nome}
        />
      </span>
      <button
        className="col-span-2 p-2 w-full max-w-75% bg-white text-black rounded-sm hover:rounded-lg transition-[border-radius]"
        type="submit"
      >
        Invia Scheda
      </button>
    </div>
  );
}

interface StaffProps {
  staffName: string;
}

function Staff(props: StaffProps) {
  const [capi, setCapi] = useState<string[]>([]);
  return (
    <div className="flex flex-col gap-3 w-full text-center items-center">
      <span>{props.staffName}</span>
      {capi.map((capo, index) => (
        <input
          className="p-2 w-full max-w-80 bg-white text-black rounded-sm hover:rounded-lg transition-[border-radius]"
          key={index}
          value={capo}
          autoFocus={index === capi.length - 1 && capo.length === 1}
          onChange={(evt) => {
            if (!evt.target.value) {
              capi.splice(index, 1);
            } else {
              capi[index] = evt.target.value;
            }
            setCapi([...capi]);
          }}
        />
      ))}
      <input
        className="p-2 w-full max-w-80 bg-white text-black rounded-sm hover:rounded-lg transition-[border-radius]"
        placeholder="Scrivi qui per inserire un nuovo capo..."
        onChange={(evt) => {
          setCapi((capi) => [...capi, evt.target.value]);
        }}
        value=""
      />
    </div>
  );
}
