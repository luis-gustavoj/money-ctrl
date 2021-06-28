import "./styles.scss";

export function Card({
  cardTitle,
  cardImg,
}: {
  cardTitle: string;
  cardImg: any;
}) {
  return (
    <div className="card">
      <div className="card-text-container">
        <div className="card-title">{cardTitle}</div>
        <div className="card-value">$ 0.00</div>
      </div>
      <div className={`card-image ${cardTitle.toLowerCase()}`}>
        <img src={cardImg} alt={cardTitle} />
      </div>
    </div>
  );
}
