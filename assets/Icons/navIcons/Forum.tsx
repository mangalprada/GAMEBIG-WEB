type Props = {
  size: number;
};

export default function Icon({ size }: Props) {
  return (
    <div>
      <svg height={size} width={size} viewBox="0 0 24 24" fill="#666">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M20 6h-1v8c0 .55-.45 1-1 1H6v1c0 1.1.9 2 2 2h10l4 4V8c0-1.1-.9-2-2-2zm-3 5V4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v13l4-4h9c1.1 0 2-.9 2-2z" />
      </svg>
    </div>
  );
}
