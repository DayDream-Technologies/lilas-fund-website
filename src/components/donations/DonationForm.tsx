"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import Button from "../ui/Button";
import { DONATION_AMOUNTS } from "@/lib/constants";
import { getDonationCheckoutUrl, isSquareConfigured } from "@/lib/square";

interface DonationFormProps {
  fundName?: string;
  fundDescription?: string;
}

export default function DonationForm({
  fundName = "General Fund",
  fundDescription,
}: DonationFormProps) {
  const [amount, setAmount] = useState<number | null>(23);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");

  const effectiveAmount = amount ?? (parseInt(customAmount) || 0);
  const configured = isSquareConfigured();

  function handleDonate() {
    if (effectiveAmount <= 0) return;
    const url = getDonationCheckoutUrl(effectiveAmount, fundName);
    window.open(url, "_blank");
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      {fundDescription && (
        <p className="text-charcoal-light mb-6 leading-relaxed">{fundDescription}</p>
      )}

      <div className="mb-6">
        <label className="block text-sm font-semibold text-charcoal mb-3">Frequency</label>
        <div className="flex gap-3">
          {(["once", "monthly"] as const).map((freq) => (
            <button
              key={freq}
              onClick={() => setFrequency(freq)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                frequency === freq
                  ? "bg-rose-primary text-white shadow-md"
                  : "bg-cream text-charcoal hover:bg-cream-dark"
              }`}
            >
              {freq === "once" ? "One Time" : "Monthly"}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-charcoal mb-3">Amount</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
          {DONATION_AMOUNTS.map((preset) => (
            <button
              key={preset}
              onClick={() => {
                setAmount(preset);
                setCustomAmount("");
              }}
              className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                amount === preset
                  ? "bg-rose-primary text-white shadow-md"
                  : "bg-cream text-charcoal hover:bg-cream-dark"
              }`}
            >
              ${preset}
              {preset === 23 && (
                <span className="block text-xs font-normal opacity-80 mt-0.5">
                  Avg RMHC stay
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-light font-semibold">
            $
          </span>
          <input
            type="number"
            min="1"
            placeholder="Custom amount"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setAmount(null);
            }}
            className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-cream-dark bg-cream focus:border-rose-primary focus:outline-none transition-colors text-charcoal"
          />
        </div>
      </div>

      <Button
        onClick={handleDonate}
        size="lg"
        className="w-full"
        disabled={effectiveAmount <= 0}
      >
        <Heart className="w-5 h-5 mr-2" />
        Donate ${effectiveAmount > 0 ? effectiveAmount : ""}
        {frequency === "monthly" ? " Monthly" : ""}
      </Button>

      {!configured && (
        <p className="text-xs text-charcoal-light text-center mt-4">
          Square payments will be activated once configured. See SQUARE_MIGRATION.md for setup instructions.
        </p>
      )}
    </div>
  );
}
