const BackgroundGridEffect = () => {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        fixed
        inset-0
        -z-10
        overflow-hidden
        bg-background
      "
    >
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(60%_45%_at_78%_8%,color-mix(in_oklch,var(--primary)_18%,transparent),transparent_60%),radial-gradient(50%_40%_at_8%_38%,color-mix(in_oklch,var(--primary)_10%,transparent),transparent_60%)]
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(color-mix(in_oklch,var(--primary)_14%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklch,var(--primary)_14%,transparent)_1px,transparent_1px)]
          bg-size-[56px_56px]
          mask-[linear-gradient(to_bottom,transparent,black_12%,black_55%,transparent_92%)]
        "
      />
    </div>
  );
};

export default BackgroundGridEffect;
