interface Props {
  initWith: string;
  endsWith: string;
}
export default function CreditCardDetails({ endsWith, initWith }: Props) {
  return (
    <>
      {initWith}&bull;&bull; &bull;&bull;&bull;&bull;&bull; {endsWith}
    </>
  );
}
