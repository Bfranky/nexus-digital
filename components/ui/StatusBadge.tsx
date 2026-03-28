import type { BusinessStatus } from "@/types";
import { STATUS_META } from "@/lib/utils";

export default function StatusBadge({ status }: { status: BusinessStatus }) {
  const meta = STATUS_META[status];
  // Parse the color string into individual style properties
  const styles: Record<string, string> = {};
  meta.color.split(";").filter(Boolean).forEach(part => {
    const [k, v] = part.split(":").map(s => s.trim());
    if (k && v) styles[k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = v;
  });
  return (
    <span className="badge" style={styles}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: meta.dot, display: "inline-block" }} />
      {meta.label}
    </span>
  );
}
