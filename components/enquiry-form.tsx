"use client";

import { CheckCircle2 } from "lucide-react";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/field";
import { submitEnquiry } from "@/lib/actions";
import { ENQUIRY_TYPES, type EnquiryState } from "@/lib/types";

const initial: EnquiryState = { ok: false, message: "" };

function SubmitButton({ className, disabled }: { className?: string; disabled?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending || disabled} className={className}>
      {pending ? "Sending..." : "Send Your Message"}
    </Button>
  );
}

function Sent({ message, onReset }: { message: string; onReset: () => void }) {
  return (
    <div className="flex flex-col items-center py-10 text-center animate-in fade-in zoom-in-95" role="status">
      <CheckCircle2 className="mb-3 h-12 w-12 text-green-600" />
      <h3 className="text-lg font-semibold text-gray-900">Message sent</h3>
      <p className="mt-2 max-w-sm text-sm text-gray-600">{message}</p>
      <Button variant="outline" className="mt-6" onClick={onReset}>
        Send another message
      </Button>
    </div>
  );
}

/** Contact page form: name, contact details, enquiry type and a message. */
export function EnquiryForm({ defaultType = "", defaultNote = "" }: { defaultType?: string; defaultNote?: string }) {
  const [key, setKey] = useState(0);
  return <ContactFields key={key} defaultType={defaultType} defaultNote={defaultNote} onReset={() => setKey((k) => k + 1)} />;
}

function ContactFields({ defaultType, defaultNote, onReset }: { defaultType: string; defaultNote: string; onReset: () => void }) {
  const [state, action] = useActionState(submitEnquiry, initial);
  if (state.ok) return <Sent message={state.message} onReset={onReset} />;

  return (
    <form action={action} className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName" className="mb-2">First Name</Label>
          <Input id="firstName" name="first_name" placeholder="Enter First Name" required autoComplete="given-name" />
        </div>
        <div>
          <Label htmlFor="lastName" className="mb-2">Last Name</Label>
          <Input id="lastName" name="last_name" placeholder="Enter Last Name" required autoComplete="family-name" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
        <div>
          <Label htmlFor="email" className="mb-2">Email</Label>
          <Input id="email" type="email" name="email" placeholder="Enter Your Email" required autoComplete="email" />
        </div>
        <div>
          <Label htmlFor="phone" className="mb-2">Phone</Label>
          <Input id="phone" type="tel" name="phone" placeholder="Enter Phone Number" autoComplete="tel" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="propertyType" className="mb-2">What is your enquiry about?</Label>
          <Select id="propertyType" name="enquiry_type" required defaultValue={defaultType}>
            <option value="" disabled>Select an option</option>
            {ENQUIRY_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="message" className="mb-2">Message</Label>
        <Textarea id="message" name="additional_info" placeholder="Enter your message here..." rows={5} defaultValue={defaultNote} className="min-h-[120px]" />
      </div>
      {state.message && <p className="text-sm text-red-500" role="alert">{state.message}</p>}
      <SubmitButton className="w-fit" />
    </form>
  );
}

/** Property page form: the property is fixed and the visitor agrees to be contacted. */
export function PropertyEnquiryForm({ property }: { property: string }) {
  const [key, setKey] = useState(0);
  return <PropertyFields key={key} property={property} onReset={() => setKey((k) => k + 1)} />;
}

function PropertyFields({ property, onReset }: { property: string; onReset: () => void }) {
  const [state, action] = useActionState(submitEnquiry, initial);
  const [agreed, setAgreed] = useState(false);
  if (state.ok) return <Sent message={state.message} onReset={onReset} />;

  return (
    <form
      action={(formData) => {
        formData.set("additional_info", `Property: ${property}\n\n${formData.get("additional_info") ?? ""}`.trim());
        return action(formData);
      }}
      className="space-y-4"
    >
      <input type="hidden" name="enquiry_type" value="Buying a Property" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="p-first" className="mb-2">First Name</Label>
          <Input id="p-first" name="first_name" placeholder="Enter First Name" required autoComplete="given-name" />
        </div>
        <div>
          <Label htmlFor="p-last" className="mb-2">Last Name</Label>
          <Input id="p-last" name="last_name" placeholder="Enter Last Name" required autoComplete="family-name" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="p-email" className="mb-2">Email</Label>
          <Input id="p-email" type="email" name="email" placeholder="Enter Your Email" required autoComplete="email" />
        </div>
        <div>
          <Label htmlFor="p-phone" className="mb-2">Phone</Label>
          <Input id="p-phone" type="tel" name="phone" placeholder="Enter Phone Number" autoComplete="tel" />
        </div>
      </div>
      <div>
        <Label htmlFor="p-property" className="mb-2">Selected Property</Label>
        <Select id="p-property" disabled value={property}>
          <option>{property}</option>
        </Select>
      </div>
      <div>
        <Label htmlFor="p-message" className="mb-2">Message</Label>
        <Textarea id="p-message" name="additional_info" placeholder="Enter your message here..." rows={4} />
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <input
            id="p-terms"
            type="checkbox"
            checked={agreed}
            onChange={(event) => setAgreed(event.target.checked)}
            className="size-4 shrink-0 rounded-[4px] border-input accent-airbanBlue"
          />
          <Label htmlFor="p-terms" className="text-xs text-gray-600 font-normal">
            I agree with Terms of Use and Privacy Policy
          </Label>
        </div>
      </div>
      {state.message && <p className="text-sm text-red-500" role="alert">{state.message}</p>}
      <SubmitButton className="w-full" disabled={!agreed} />
    </form>
  );
}
