import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Button, Input } from "semantic-ui-react";

export default function Read() {
  const [APIData, setAPIData] = useState([]);
  const [editableItemId, setEditableItemId] = useState(null);
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [editedCheckbox, setEditedCheckbox] = useState(false);


  const getData = () => {
    axios
      .get(`https://655b65b8ab37729791a90a78.mockapi.io/postdata`)
      .then((response) => {
        setAPIData(response.data);
      });
  };

  useEffect(() => {
    getData(); // Fetch data on component mount
  }, []);



  const setData = (data) => {
    setEditableItemId(data.id);
    setEditedFirstName(data.firstName);
    setEditedLastName(data.lastName);
    setEditedCheckbox(data.checkbox);
  };

  const onUpdate = () => {
    axios
      .put(`https://655b65b8ab37729791a90a78.mockapi.io/postdata/${editableItemId}`, {
        firstName: editedFirstName,
        lastName: editedLastName,
        checkbox: editedCheckbox,
      })
      .then(() => {
        // After update, reset state and fetch data again
        setEditableItemId(null);
        setEditedFirstName("");
        setEditedLastName("");
        setEditedCheckbox(false);
        getData(); // Add this line to fetch updated data
      });
  };
  

  const onDelete = (id) => {
    axios
      .delete(`https://655b65b8ab37729791a90a78.mockapi.io/postdata/${id}`)
      .then(() => {

        getData();
      });
  };

  return (
    <div>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Checkbox Value</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => (
            <Table.Row key={data.id}>
              <Table.Cell>
                {editableItemId === data.id ? (
                  <Input
                    value={editedFirstName}
                    onChange={(e) => setEditedFirstName(e.target.value)}
                  />
                ) : (
                  data.firstName
                )}
              </Table.Cell>

              <Table.Cell>
                {editableItemId === data.id ? (
                  <Input
                    value={editedLastName}
                    onChange={(e) => setEditedLastName(e.target.value)}
                  />
                ) : (
                  data.lastName
                )}
              </Table.Cell>

              <Table.Cell>
                {editableItemId === data.id ? (
                  <Input
                    type="checkbox"
                    checked={editedCheckbox}
                    onChange={() => setEditedCheckbox(!editedCheckbox)}
                  />
                ) : data.checkbox ? (
                  "Checked"
                ) : (
                  "Unchecked"
                )}
              </Table.Cell>

              <Table.Cell>
                {editableItemId === data.id ? (
                  <Button onClick={onUpdate}>Save</Button>
                ) : (
                  <div>
                    <Button onClick={() => setData(data)}>Update</Button>
                    <Button onClick={() => onDelete(data.id)}>Delete</Button>
                  </div>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
