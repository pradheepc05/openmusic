import { ReactNode } from 'react';

interface Props {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export default function EmptyState({ title, description, icon, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-zinc-800 p-10 text-center">
      {icon && <div className="text-zinc-500">{icon}</div>}
      <h3 className="text-base font-semibold">{title}</h3>
      {description && (
        <p className="max-w-sm text-sm text-zinc-400">{description}</p>
      )}
      {action}
    </div>
  );
}