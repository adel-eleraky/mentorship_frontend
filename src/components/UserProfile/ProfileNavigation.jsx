import React from "react";

const ProfileNavigation = ({ activeSection, setActiveSection }) => {
  const sections = [
    { id: "personal", label: "Personal Information" },
    { id: "sessions", label: "Sessions" },
    { id: "changePassword", label: "change password" },
  ];

  return (
    <ul className="nav nav-tabs mb-4">
      {sections.map((section) => (
        <li className="nav-item" key={section.id}>
          <button
            className={`nav-link ${
              activeSection === section.id ? "active" : ""
            }`}
            onClick={() => setActiveSection(section.id)}
          >
            {section.label}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ProfileNavigation;
