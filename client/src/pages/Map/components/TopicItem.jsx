import React from "react";

const TopicItem = ({
  data,
  label,
  topicText,
  icon,
  layer,
  activeLayer,
  onChangeLayer,
  onChangeRank,
}) => {
  return (
    <div>
      {data && (
        <div className="topic-item">
          <div
            className={`topic-icon ${layer === activeLayer ? "active" : ""}`}
            onClick={() => {
              onChangeLayer(layer);
              onChangeRank(layer);
            }}
          >
            <img src={icon} alt={"icon-" + { topicText }} />
          </div>
          <div className="topic-text">
            {topicText}
            <br />
            <strong>
              {data === 0 ? "0" : data} {label}
            </strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicItem;
