import "./styles.scss";

export function Card({
  cardTitle,
  cardImg,
  cardValue,
}: {
  cardTitle: string;
  cardImg: any;
  cardValue: number;
}) {
  const formatter = new Intl.NumberFormat("pt-br", {
    minimumFractionDigits: 2,
  });

  return (
    <div className="card">
      <div className="card-text-container">
        <div className="card-title">{cardTitle}</div>
        <div className="card-value">$ {formatter.format(cardValue)}</div>
      </div>
      <div className={`card-image ${cardTitle.toLowerCase()}`}>
        <img src={cardImg} alt={cardTitle} />
      </div>
    </div>
  );
}
