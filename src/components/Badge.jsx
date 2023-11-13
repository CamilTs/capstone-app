import React from "react";
import { Badge as Badgeprime } from "primereact/badge";

export const Badge = ({ value, label, severity }) => {
  return (
    <div className="flex gap-1 flex-column align-items-center">
      <div>
        <Badgeprime value={value} severity={severity} />
      </div>
      <span>{label}</span>
    </div>
  );
};
