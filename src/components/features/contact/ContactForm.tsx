"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import appConfig from "@/packages/configs/app.config";

/**
 * There's no backend/email service wired up for this site yet — rather
 * than fake a "message sent!" state, this builds a mailto: link from
 * the fields and hands off to the visitor's own email client. Swap this
 * for a real API call once a backend endpoint exists.
 */
const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const subject = encodeURIComponent(
      `Portfolio inquiry from ${name || "a visitor"}`,
    );
    const body = encodeURIComponent(`${message}\n\n—\n${name}\n${email}`);

    window.location.href = `mailto:${appConfig.author.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="rounded-lg border border-border bg-card/50 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-email" className="text-sm font-medium">
          Your email
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="rounded-lg border border-border bg-card/50 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="resize-none rounded-lg border border-border bg-card/50 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <Button type="submit" variant="primary" className="w-fit">
        Send message
      </Button>

      <p className="text-xs text-muted-foreground">
        Opens your email app with this pre-filled — nothing is sent from here
        directly.
      </p>
    </form>
  );
};

export default ContactForm;
