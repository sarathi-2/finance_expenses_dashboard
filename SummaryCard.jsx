import "./SummaryCard.css";

function SummaryCard({
  title,
  amount,
  icon,
  percentage,
  type,
  description = "vs last month",
}) {
  return (
    <div className={`summary-card ${type}`}>

      <div className="summary-top">

        <div className="summary-icon">
          {icon}
        </div>

        <span className="summary-percent">
          {percentage}
        </span>

      </div>

      <p className="summary-title">
        {title}
      </p>

      <h2>{amount}</h2>

      <div className="summary-bottom">
        <span>This month</span>
        <span>{description}</span>
      </div>

    </div>
  );
}

export default SummaryCard;