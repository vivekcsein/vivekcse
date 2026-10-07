"use client";
import "./model-slot.css";
interface ModelSlotProps {
  /** The key this slot is reserved for in models.config.ts once a .glb exists. */
  reservedFor: string;
  className?: string;
  /** Label shown only in dev to identify the empty slot. Hidden in production. */
  label?: string;
}

/**
 * Reserves layout space for a 3D model that hasn't been delivered yet.
 * Renders NOTHING visual in production except the correctly-sized,
 * responsive boundary box — no placeholder image/icon/emoji standing in
 * for the real asset. Swap the child region for
 * `<ClientModelViewer modelKey={reservedFor} />` once the .glb is
 * registered in models.config.ts.
 */
const ModelSlot = ({ reservedFor, className = "", label }: ModelSlotProps) => {
  return (
    <div
      className={`model-slot ${className}`}
      data-model-slot={reservedFor}
      role="presentation"
    >
      {process.env.NODE_ENV !== "production" && (
        <span className="model-slot-label">{label ?? reservedFor}</span>
      )}
    </div>
  );
};

export default ModelSlot;
