import React from "react";

function Reactions({ reactions }) {
  return (
    <>
      <div className="d-inline-flex p-2">
        {reactions.map((reaction, index) => {
          return (
            <span key={index}>
              <p>
                {reaction.symbol}
                <span>{reaction.count}</span>
              </p>
            </span>
          );
        })}
      </div>
    </>
  );
}

export default Reactions;
