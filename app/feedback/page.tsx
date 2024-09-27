"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex justify-center items-center h-screen flex-col gap-10">
      <span className="text-xl md:text-3xl lg:text-5xl">Invia un feedback o un suggerimento</span>
      <textarea
        className="max-w-75% w-full p-5 text-black text-md md:text-lg lg:text-xl"
        onChange={(evt) => {
          setFeedback(evt.target.value);
        }}
        value={feedback}
      />
      <button
        className="cool-button"
        onClick={() => {
          if (!feedback) {
            toast.error("Inserisci un feedback!");
            return;
          }
          buttonRef.current!.disabled = true;
          fetch("/api/feedback", {
            method: "POST",
            body: JSON.stringify(feedback),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            if (res.ok) {
              toast.success("Feedback inviato con successo!");
              setFeedback("");
            } else {
              toast.error("Errore nell'invio del feedback!");
            }
            buttonRef.current!.disabled = false;
          });
        }}
        ref={buttonRef}
      >
        Invia
      </button>
      <Link href="/" className="cool-button">
        Indietro
      </Link>
    </div>
  );
}
