interface Props {
  initWith: string;
  endsWith: string;
}
export default function CardDetails({ endsWith, initWith }: Props) {
  return (
    <>
      {initWith}&bull;&bull; &bull;&bull;&bull;&bull;&bull; {endsWith}
    </>
  );
}
