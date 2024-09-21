"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Scheda, StaffGuess } from "./page";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  useEffect(() => {
    const schedaInviata = localStorage.getItem("scheda");
    if (schedaInviata) {
      router.push(`/scheda/${schedaInviata}`);
    }
  },[]);

  return (
    <div className="flex flex-col items-center gap-3 w-screen p-8">
      <span className="text-3xl w-full text-center">Scheda Fanta-CoCa</span>
      <div className="w-full grid auto-rows-min grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center items-center gap-y-5 gap-x-10">
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
      </div>
      <span className="md:col-span-2 lg:col-span-3 w-full max-w-75%">
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
        className="cool-button md:col-span-2 lg:col-span-3"
        disabled={schedaInviata}
        onClick={() => {
          const scheda = creaScheda(nome, guesses);
          if (scheda.guesses.some((guess) => guess.capi.length === 0)) {
            toast("Inserire almeno un capo per ogni staff!", {
              type: "error",
            });
            return;
          }
          setSchedaInviata(true);
          fetch("api/nuova-scheda", {
            method: "POST",
            body: JSON.stringify(scheda),
          }).then(async (response) => {
            if (!response.ok) {
              setSchedaInviata(false);
              toast("Errore nell'invio della scheda!", { type: "error" });
            } else {
              toast("Scheda inviata con successo!", { type: "success" });
              const json = await response.json();
              localStorage.setItem("scheda", json.insertedId);
              router.push(`/scheda/${json.insertedId}`);
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
      <span className="text-xl">{props.nomeStaff}</span>
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
          if (evt.target.value.trim())
            setCapi((capi) => [...capi, evt.target.value]);
        }}
        value=""
        ref={newCapoRef}
      />
    </div>
  );
}
