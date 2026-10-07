// Layout primitive system. Pure layout — no business logic, no data
// fetching, no app-specific styling. See ./README.md for the full guide.
//
// All of these are plain function components (no client-only hooks, no
// browser APIs), so they render fine from Server Components. Add "use
// client" only in the file that actually needs interactivity (e.g. a
// parent that toggles Sidebar's `collapsed` state), not in these files.

export { AspectRatio, type AspectRatioProps } from "./AspectRatio";
export { Center, type CenterProps } from "./Center";
export { Cluster, type ClusterProps } from "./Cluster";
export { Grid, type GridColumns, type GridProps } from "./Grid";
export { Inline, type InlineProps } from "./Inline";
export { ScrollArea, type ScrollAreaProps } from "./ScrollArea";
export { Sidebar, type SidebarProps } from "./Sidebar";
export { Spacer, type SpacerProps } from "./Spacer";
export { Split, type SplitProps } from "./Split";
export { Stack, type StackProps } from "./Stack";
export type { Align, Justify, Space } from "./tokens";
