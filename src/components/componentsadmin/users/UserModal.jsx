import React from "react";

export const UserModal = ({ isOpen, onClose, onSubmit, userData, setUserData }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <dialog open className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          {userData?.id ? "Edit User" : "Add User"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
          <fieldset className="fieldset">
            <div>
              <legend className="fieldset-legend">Enter a Full Name</legend>
              <input
                type="text"
                name="name"
                value={userData.name || ""}
                onChange={handleChange}
                placeholder="Full Name"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <legend className="fieldset-legend">Enter User E-mail</legend>
              <input
                type="email"
                name="email"
                value={userData.email || ""}
                onChange={handleChange}
                placeholder="Email"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <legend className="fieldset-legend">Enter a Password</legend>
              <input
                type="password"
                name="password"
                value={userData.password || ""}
                onChange={handleChange}
                placeholder="Password"
                className="input input-bordered w-full"
                required={!userData.id}
              />
              <p className="label">{userData?.id ? "Optional" : ""}</p>
            </div>
          </fieldset>
          {/* Tambahkan field lain sesuai kebutuhan */}
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              {userData?.id ? "Update" : "Save"}
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <dialog open className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirm</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <button
            onClick={onConfirm}
            className="btn btn-error"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="btn"
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};
