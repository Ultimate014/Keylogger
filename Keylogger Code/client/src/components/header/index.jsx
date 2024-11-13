import React from "react";
import "./header.scss";
import {
  ALargeSmall,
  FileLock,
  FilterIcon,
  Keyboard,
  TextCursor,
  Type,
} from "lucide-react";
import Button from "../ui/button";
import { data } from "../../utils";
import { usePreference } from "../../context/Preference";

const IconConfig = {
  size: 20,
  strokeWidth: 1.3,
};
const IconConfig2 = {
  size: 16,
  strokeWidth: 1.8,
};
const IconConfig3 = {
  size: 14,
  strokeWidth: 1.5,
};

export default function Header() {
  return (
    <div className="header">
      <div className="name">
        <FileLock {...IconConfig} />
        <span>Logger</span>
      </div>
      <div className="options">
        <HeaderTabs />
        {/* <Filter /> */}
      </div>
    </div>
  );
}

const Filter = () => {
  return (
    <div className="filter">
      <span data-title={"filter"}>
        <FilterIcon {...IconConfig2} />
      </span>
    </div>
  );
};

const HeaderTabs = () => {
  return (
    <div className="header-tabs">
      {data.indicators.map((data, i) => (
        <Tabs key={i} {...data} />
      ))}
    </div>
  );
};

const Tabs = ({ icon, title, type }) => {
  const { preferences, updateIndicator } = usePreference();
  const { indicator } = preferences;
  const Icon = icon;
  return (
    <span
      data-title={title}
      className={indicator === type ? "active" : ""}
      onClick={() => updateIndicator(type === indicator ? "" : type)}
    >
      <Icon {...IconConfig3} />
    </span>
  );
};
