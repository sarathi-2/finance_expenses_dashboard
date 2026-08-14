import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Globe,
  DollarSign,
  Bell,
  Moon,
  Sun,
  Save,
  RotateCcw,
} from "lucide-react";

import "./SettingsCard.css";

function SettingsCard() {
  const [formData, setFormData] = useState({
    name: "Sarathi",
    email: "sarathi@example.com",
    phone: "+91 98765 43210",
    language: "English",
    currency: "INR (₹)",
    theme: "Light",
    notifications: true,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(
      "fintrackSettings",
      JSON.stringify(formData)
    );

    // Send changes to other components
    window.dispatchEvent(
      new Event("fintrackSettingsUpdated")
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const handleReset = () => {
    const defaultData = {
      name: "Sarathi",
      email: "sarathi@example.com",
      phone: "+91 98765 43210",
      language: "English",
      currency: "INR (₹)",
      theme: "Light",
      notifications: true,
    };

    setFormData(defaultData);

    localStorage.setItem(
      "fintrackSettings",
      JSON.stringify(defaultData)
    );

    setSaved(false);
  };

  return (
    <div className="settings-card">

      {/* PROFILE */}

      <div className="settings-section">

        <div className="settings-card-header">
          <div>
            <h2>Profile Information</h2>

            <p>
              Update your personal account information.
            </p>
          </div>

          <div className="settings-section-icon">
            <User size={20} />
          </div>
        </div>

        <div className="settings-form">

          <div className="settings-field">
            <label>Full Name</label>

            <div className="settings-input">
              <User size={17} />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="settings-field">
            <label>Email Address</label>

            <div className="settings-input">
              <Mail size={17} />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="settings-field">
            <label>Phone Number</label>

            <div className="settings-input">
              <Phone size={17} />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="settings-field">
            <label>Account Type</label>

            <input
              className="disabled-input"
              value="Personal Account"
              disabled
              readOnly
            />
          </div>

        </div>
      </div>


      {/* GENERAL PREFERENCES */}

      <div className="settings-section">

        <div className="settings-card-header">
          <div>
            <h2>General Preferences</h2>

            <p>
              Customize how your finance dashboard works.
            </p>
          </div>
        </div>

        <div className="settings-form">

          {/* LANGUAGE */}

          <div className="settings-field">

            <label>Language</label>

            <div className="settings-input">
              <Globe size={17} />

              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
              >
                <option>English</option>
                <option>Tamil</option>
                <option>Hindi</option>
              </select>
            </div>

          </div>


          {/* CURRENCY */}

          <div className="settings-field">

            <label>Currency</label>

            <div className="settings-input">
              <DollarSign size={17} />

              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
              >
                <option>INR (₹)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
              </select>
            </div>

          </div>


          {/* THEME */}

          <div className="settings-field">

            <label>Theme</label>

            <div className="settings-input">
              {formData.theme === "Light" ? (
                <Sun size={17} />
              ) : (
                <Moon size={17} />
              )}

              <select
                name="theme"
                value={formData.theme}
                onChange={handleChange}
              >
                <option>Light</option>
                <option>Dark</option>
              </select>
            </div>

          </div>


          {/* NOTIFICATIONS */}

          <div className="settings-field">

            <label>Notifications</label>

            <div className="notification-option">

              <div className="notification-info">

                <Bell size={18} />

                <div>
                  <strong>
                    Expense Notifications
                  </strong>

                  <span>
                    Receive notifications for your expenses.
                  </span>
                </div>

              </div>

              <label className="switch">

                <input
                  type="checkbox"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleChange}
                />

                <span className="slider"></span>

              </label>

            </div>

          </div>

        </div>
      </div>


      {/* ACTIONS */}

      <div className="settings-actions">

        {saved && (
          <div className="save-message">
            ✓ Changes saved successfully
          </div>
        )}

        <button
          type="button"
          className="reset-button"
          onClick={handleReset}
        >
          <RotateCcw size={17} />
          Reset
        </button>

        <button
          type="button"
          className="save-button"
          onClick={handleSave}
        >
          <Save size={17} />
          Save Changes
        </button>

      </div>

    </div>
  );
}

export default SettingsCard;