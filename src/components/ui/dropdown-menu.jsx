import React from "react";

export const DropdownMenu = ({ children }) => {
  return <div className="dropdown-menu">{children}</div>;
};

export const DropdownMenuContent = ({ children }) => {
  return <div className="dropdown-menu-content">{children}</div>;
};

export const DropdownMenuItem = ({ onClick, className, children }) => {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
};

export const DropdownMenuSeparator = ({ className }) => {
  return <div className={className}></div>;
};

export const DropdownMenuTrigger = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export default DropdownMenu;
