const StatsBox = ({ title, value, icon, color = 'blue', subtitle }) => {
  return (
    <div className="stats-box">
      <div className="stats-box-header">
        <div className="stats-box-content">
          <h3 className="stats-box-title">
            {title}
          </h3>
          <div className="stats-box-value">
            {value}
          </div>
          {subtitle && (
            <div className="stats-box-subtitle">
              {subtitle}
            </div>
          )}
        </div>
        <div className={`stats-box-icon ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default StatsBox
