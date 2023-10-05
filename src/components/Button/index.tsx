import React from "react";
import "./button.css";
interface IButton {
  label: string | React.ReactElement;
  onClick?: () => void;
  styles?: React.CSSProperties;
  disabled?: boolean;
  isSelected?: boolean;
}

const CustomButton = (props: IButton) => {
  const { label, onClick, styles, disabled, isSelected } = props;

  return (
    <button
      onClick={onClick}
      style={{ ...styles }}
      disabled={disabled}
      className={
        isSelected
          ? "buttonLogInSolidSelected"
          : disabled
          ? "buttonLogInDesabled"
          : "buttonLogInSolid"
      }
    >
      {label}
    </button>
  );
};

export default CustomButton;
