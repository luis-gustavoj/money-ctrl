import "./styles.scss";

export function Card({
  cardTitle,
  cardImg,
  cardValue,
}: {
  cardTitle: string;
  cardImg: any;
  cardValue: number | undefined;
}) {
  return (
    <div className="card">
      <div className="card-text-container">
        <div className="card-title">{cardTitle}</div>
        <div className="card-value">$ {cardValue}</div>
      </div>
      <div className={`card-image ${cardTitle.toLowerCase()}`}>
        <img src={cardImg} alt={cardTitle} />
      </div>
    </div>
  );
}
