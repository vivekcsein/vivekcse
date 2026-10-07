import type { ReactNode } from "react";

type ComponentPreviewProps = {
  name: string;
  tag: string;
  children: ReactNode;
  column?: boolean;
};

const ComponentPreview = ({
  name,
  tag,
  children,
  column,
}: ComponentPreviewProps) => (
  <div className="dev-preview">
    <div
      className={`dev-preview-stage${column ? " dev-preview-stage-column" : ""}`}
    >
      {children}
    </div>
    <div className="dev-preview-footer">
      <span className="dev-preview-name">{name}</span>
      <span className="dev-preview-tag">{tag}</span>
    </div>
  </div>
);

export default ComponentPreview;
