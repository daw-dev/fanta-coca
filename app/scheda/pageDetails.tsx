"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Scheda, SchedaDocument, Staff } from "@/lib/types";
import generaNomeDiCaccia from "@/utils/nomeDiCacciaGenerator";

interface SchedaPageProps {
  staffs: string[];
}

export default function SchedaPage(props: SchedaPageProps) {
  const [loaded, setLoaded] = useState(false);
  const [scheda, setScheda] = useState<Scheda | SchedaDocument>(() => ({
    nome: generaNomeDiCaccia(),
    staffs: props.staffs.map((staff) => ({ unita: staff, capi: [] })),
  }));
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const schedaInviata = localStorage.getItem("scheda");
    if (schedaInviata) { 
      fetch(`/api/scheda/${schedaInviata}`).then(async (response) => {
        if (!response.ok) {
          setLoaded(true);
          localStorage.removeItem("scheda");
          return;
        }
        const schedaDb = await response.json();
        const scheda: SchedaDocument = {
          ...schedaDb,
          timeStamp: new Date(schedaDb.timeStamp),
        };
        if (scheda.timeStamp.getFullYear() < new Date().getFullYear()) {
          localStorage.removeItem("scheda");
        } else {
          setScheda(scheda);
        }
        setLoaded(true);
      });
    } else {
      setLoaded(true);
    }
  }, []);

  if (!loaded)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-5xl">Caricamento...</span>
      </div>
    );


  return (
    <div className="flex flex-col items-center gap-3 w-screen p-8">
      <span className="text-3xl w-full text-center">Scheda Fanta-CoCa</span>
      <div className="w-full grid auto-rows-min grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center items-center gap-y-5 gap-x-10">
        {scheda.staffs.map((staff, index) => (
          <StaffViewer
            key={index}
            staff={staff}
            onGuessChange={(capi) => {
              staff.capi = capi;
              scheda.staffs[index].capi = capi;
              setScheda({ ...scheda });
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
            setScheda({ ...scheda, nome: evt.target.value });
          }}
          value={scheda.nome}
        />
      </span>
      <button
        className="cool-button md:col-span-2 lg:col-span-3"
        onClick={() => {
          if (scheda.staffs.some((guess) => guess.capi.length === 0)) {
            toast("Inserire almeno un capo per ogni staff!", {
              type: "error",
            });
            return;
          }
          scheda.timeStamp = new Date();
          if (scheda._id) {
            buttonRef.current!.disabled = true;
            fetch(`/api/scheda/${scheda._id}`, {
              method: "PUT",
              body: JSON.stringify(scheda),
            }).then((response) => {
              if (!response.ok) {
                toast("Errore nell'aggiornamento della scheda!", {
                  type: "error",
                });
              } else {
                toast("Scheda aggiornata con successo!", { type: "success" });
              }
              buttonRef.current!.disabled = false;
            });
            return;
          } else {
            buttonRef.current!.disabled = true;
            fetch("api/nuova-scheda", {
              method: "POST",
              body: JSON.stringify(scheda),
            }).then(async (response) => {
              if (!response.ok) {
                toast("Errore nell'invio della scheda!", { type: "error" });
              } else {
                toast("Scheda inviata con successo!", { type: "success" });
                const { insertedId } = await response.json();
                localStorage.setItem("scheda", insertedId);
                setScheda({ ...scheda, _id: insertedId });
              }
              buttonRef.current!.disabled = false;
            });
          }
        }}
        ref={buttonRef}
      >
        {scheda._id ? "Aggiorna Scheda" : "Invia Scheda"}
      </button>
    </div>
  );
}

interface StaffViewerProps {
  onGuessChange: (capi: string[]) => void;
  readonly?: boolean;
  staff: Staff;
}

function StaffViewer(props: StaffViewerProps) {
  const readonly = props.readonly ?? false;
  const [capi, setCapi] = useState<string[]>(props.staff.capi);
  useEffect(() => {
    props.onGuessChange(capi);
  }, [capi]);
  const newCapoRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-col gap-3 w-full text-center items-center bg-white bg-opacity-10 py-10 px-5 h-full justify-center rounded-md">
      <span className="text-xl">{props.staff.unita}</span>
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
          disabled={readonly}
        />
      ))}
      <input
        className="p-2 w-full max-w-80 bg-white text-black rounded-sm hover:rounded-lg transition-[border-radius]"
        placeholder="Scrivi qui per inserire un nuovo capo..."
        onChange={(evt) => {
          if (evt.target.value.trim())
            setCapi((capi) => [...capi, evt.target.value]);
        }}
        value=""
        ref={newCapoRef}
        hidden={readonly}
      />
    </div>
  );
}
