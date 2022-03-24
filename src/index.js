import React, { useState } from "react";
import ReactDOM from "react-dom";

const style = {
  table: {
    borderCollapse: "collapse",
    margin: "auto"
  },
  tableCell: {
    border: "1px solid gray",
    margin: 0,
    padding: "5px 10px",
    width: "max-content",
    minWidth: "150px"
  },
  form: {
    container: {
      padding: "20px",
      border: "1px solid #F0F8FF",
      borderRadius: "15px",
      width: "max-content",
      marginBottom: "40px",
      margin: "0 auto 15px"
    },
    inputs: {
      marginBottom: "5px",
      padding: "5px"
    },
    submitBtn: {
      marginTop: "10px",
      padding: "10px 15px",
      border: "none",
      backgroundColor: "lightseagreen",
      fontSize: "14px",
      borderRadius: "5px",
      cursor: "pointer"
    }
  }
};

function PhoneBookForm(props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      style={style.form.container}
    >
      <label>First name:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userFirstname"
        name="firstName"
        type="text"
        placeholder="Coder"
        value={props.contact.firstName}
        onChange={props.handleInput}
      />
      <br />
      <label>Last name:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userLastname"
        name="lastName"
        type="text"
        placeholder="byte"
        value={props.contact.lastName}
        onChange={props.handleInput}
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userPhone"
        name="phone"
        type="text"
        placeholder="8885559999"
        value={props.contact.phone}
        onChange={props.handleInput}
      />
      <br />
      <button
        style={style.form.submitBtn}
        className="submitButton"
        value="Add User"
        type="submit"
        onClick={() => {
          props.addContact(props.contact);
          props.setContact({ firstName: "", lastName: "", phone: "" });
        }}
      >
        Submit
      </button>
    </form>
  );
}

function InformationTable(props) {
  return (
    <table style={style.table} className="informationTable">
      <thead>
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead>
    </table>
  );
}

function TableVal(props) {
  return (
    <table style={style.table} className="informationTable">
      <thead>
        <tr>
          <th style={style.tableCell}>{props.first}</th>
          <th style={style.tableCell}>{props.last}</th>
          <th style={style.tableCell}>{props.phone}</th>
        </tr>
      </thead>
    </table>
  );
}
function Application(props) {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    phone: ""
  });
  function addContact(event) {
    setContacts((prevContacts) => [...prevContacts, event]);
  }
  function handleInput(event) {
    const { name, value } = event.target;
    setContact((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  return (
    <section>
      <PhoneBookForm
        contact={contact}
        handleInput={handleInput}
        addContact={addContact}
        setContact={setContact}
      />
      <InformationTable />
      {contacts
        .sort((a, b) => {
          let aName = a.lastName.toLowerCase();
          let bName = b.lastName.toLowerCase();
          if (aName < bName) return -1;
          if (aName > bName) return 1;
          return 0;
        })
        .map((contact, index) => (
          <TableVal
            key={index}
            first={contact.firstName}
            last={contact.lastName}
            phone={contact.phone}
          />
        ))}
    </section>
  );
}

ReactDOM.render(<Application />, document.getElementById("root"));
