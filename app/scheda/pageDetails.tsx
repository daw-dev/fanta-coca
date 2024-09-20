"use client";

import { useEffect, useRef, useState } from "react";
import { Scheda, StaffGuess } from "./page";

// TODO: aggiungere animali e aggettivi
// TODO: maschile e femminile
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

function getDefaultGuesses(staffNames: string[]): StaffGuess[] {
  return staffNames.map((staff) => ({ nomeStaff: staff, capi: [] }));
}

function creaScheda(nome: string, guesses: StaffGuess[]): Scheda {
  return {
    timeStamp: new Date(),
    nome,
    guesses,
  };
}

interface SchedaPageProps {
  staffs: string[];
}

export default function SchedaPage(props: SchedaPageProps) {
  const [nome, setNome] = useState(getNomeDefault);
  const [guesses, setGuesses] = useState<StaffGuess[]>(() =>
    getDefaultGuesses(props.staffs)
  );
  const [schedaInviata, setSchedaInviata] = useState(false);

  return (
    <div className="grid grid-rows-[50px_1fr_1fr_1fr_1fr_1fr_1fr_40px_50px] md:grid-rows-[50px_1fr_1fr_1fr_40px_50px] md:grid-cols-2 min-h-screen p-10 justify-items-center items-center gap-y-5 gap-x-10">
      <span className="text-3xl md:col-span-2">Scheda Fanta-CoCa</span>
      {guesses.map((guess, index) => (
        <Staff
          key={index}
          schedaInviata={schedaInviata}
          nomeStaff={guess.nomeStaff}
          onGuessChange={(capi) => {
            guess.capi = capi;
            setGuesses([...guesses]);
          }}
        />
      ))}
      <span className="md:col-span-2 w-full max-w-75%">
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
        className="md:col-span-2 p-2 w-full max-w-75% bg-white text-black rounded-sm hover:rounded-lg transition-[border-radius]"
        disabled={schedaInviata}
        onClick={() => {
          const scheda = creaScheda(nome, guesses);
          setSchedaInviata(true);
          fetch("api/nuova-scheda", {
            method: "POST",
            body: JSON.stringify(scheda),
          }).then((response) => {
            if (!response.ok) {
              setSchedaInviata(false);
            }
          });
        }}
      >
        Invia Scheda
      </button>
    </div>
  );
}

interface StaffProps {
  nomeStaff: string;
  onGuessChange: (capi: string[]) => void;
  schedaInviata: boolean;
}

function Staff(props: StaffProps) {
  const [capi, setCapi] = useState<string[]>([]);
  useEffect(() => {
    props.onGuessChange(capi);
  }, [capi]);
  const newCapoRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-col gap-3 w-full text-center items-center bg-white bg-opacity-10 py-10 px-5 h-full justify-center rounded-md">
      <span>{props.nomeStaff}</span>
      {capi.map((capo, index) => (
        <input
          className="p-2 w-full max-w-80 bg-white text-black rounded-sm hover:rounded-lg transition-[border-radius]"
          key={index}
          value={capo}
          autoFocus={index === capi.length - 1 && capo.length === 1}
          onChange={(evt) => {
            if (!evt.target.value) {
              capi.splice(index, 1);
              newCapoRef.current?.focus();
            } else {
              capi[index] = evt.target.value;
            }
            setCapi([...capi]);
          }}
          disabled={props.schedaInviata}
        />
      ))}
      <input
        hidden={props.schedaInviata}
        className="p-2 w-full max-w-80 bg-white text-black rounded-sm hover:rounded-lg transition-[border-radius]"
        placeholder="Scrivi qui per inserire un nuovo capo..."
        onChange={(evt) => {
          if (evt.target.value.trim()) setCapi((capi) => [...capi, evt.target.value]);
        }}
        value=""
        ref={newCapoRef}
      />
    </div>
  );
}
