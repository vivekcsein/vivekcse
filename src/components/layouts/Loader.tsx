/** biome-ignore-all lint/a11y/useSemanticElements: <> */
const Loader = () => {
  return (
    <div
      className="w-full flex flex-col items-center gap-6 pt-16 pb-16"
      role="status"
      aria-label="Loading"
    >
      <div className="w-9/10 md:w-3/5 max-w-2xl flex flex-col gap-4">
        <div className="skeleton" style={{ height: "2rem", width: "60%" }} />
        <div className="skeleton" style={{ height: "1rem", width: "90%" }} />
        <div className="skeleton" style={{ height: "1rem", width: "80%" }} />

        <div
          className="skeleton"
          style={{ height: "10rem", width: "100%", marginTop: "1rem" }}
        />

        <div className="flex gap-4">
          <div className="skeleton" style={{ height: "8rem", width: "100%" }} />
          <div className="skeleton" style={{ height: "8rem", width: "100%" }} />
        </div>
      </div>
    </div>
  );
};

export default Loader;
