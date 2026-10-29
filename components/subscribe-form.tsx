"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";
import { subscribe } from "@/lib/actions";

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) {
      setOk(false);
      setMessage(email ? "Please enter a valid email" : "Please enter your email");
      return;
    }
    setPending(true);
    const result = await subscribe(email);
    setPending(false);
    setOk(result.ok);
    setMessage(result.message);
    if (result.ok) setEmail("");
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl mx-auto" noValidate>
      <div className="relative">
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email address"
          aria-label="Email address"
          aria-invalid={!!message && !ok}
          className="pr-32 h-14 w-full bg-white"
        />
        <Button
          type="submit"
          disabled={pending}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-5 h-10 rounded-lg disabled:cursor-not-allowed"
        >
          {pending ? "Joining..." : "Join Now"}
        </Button>
      </div>
      {message && (
        <p role="status" className={`mt-3 text-sm ${ok ? "text-green-600" : "text-red-500"}`}>
          {message}
        </p>
      )}
      <div className="py-10 text-sm text-gray-500">
        <p>
          Become part of a community of <span className="text-blue-600 font-medium">1000+</span> people learning, sharing, and growing in real estate.
        </p>
      </div>
    </form>
  );
}
