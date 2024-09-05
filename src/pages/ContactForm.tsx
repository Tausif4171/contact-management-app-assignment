import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addContact, updateContact } from "../store/contactsSlice";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";

const ContactForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);

  const contact = contacts.find((contact) => contact.id === id) || null;

  const [firstName, setFirstName] = React.useState(contact?.firstName || "");
  const [lastName, setLastName] = React.useState(contact?.lastName || "");
  const [status, setStatus] = React.useState(contact?.status || "active");
  const [email, setEmail] = React.useState(contact?.email || "");
  const [phone, setPhone] = React.useState(contact?.phone || "");

  const location = useLocation();
  const path = location.pathname;

  let headerText;

  switch (true) {
    case path.startsWith("/add-contact"):
      headerText = "Create Contact";
      break;
    case path.startsWith("/edit-contact"):
      headerText = "Edit Contact";
      break;
  }

  useEffect(() => {
    if (contact) {
      setFirstName(contact.firstName);
      setLastName(contact.lastName);
      setStatus(contact.status || "active");
      setEmail(contact.email);
      setPhone(contact.phone);
    }
  }, [contact]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !phone) {
      alert("Please fill all fields");
      return;
    }

    const contactData = {
      id: id || uuidv4(),
      firstName,
      lastName,
      status,
      email,
      phone,
    };

    if (id) {
      dispatch(updateContact(contactData));
    } else {
      dispatch(addContact(contactData));
    }

    navigate("/");
  };

  return (
    <div className="mx-auto bg-gray-100 min-h-screen p-4 md:p-8">
      <h2 className="text-3xl font-semibold mb-6 text-center">{headerText}</h2>
      <form
        onSubmit={handleSubmit}
        className="pt-4 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
            placeholder="Enter first name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
            placeholder="Enter last name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
            placeholder="Enter phone number"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <div className="mt-1 flex gap-4">
            <label className="flex gap-[6px]">
              <input
                type="radio"
                name="status"
                value="active"
                checked={status === "active"}
                onChange={(e) => setStatus(e.target.value)}
              />
              Active
            </label>
            <label className="flex gap-[6px]">
              <input
                type="radio"
                name="status"
                value="inactive"
                checked={status === "inactive"}
                onChange={(e) => setStatus(e.target.value)}
              />
              Inactive
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-5 rounded-lg"
        >
          {id ? "Update Contact" : "Add Contact"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
