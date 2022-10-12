import {
  Datagrid,
  List,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  EmailField,
} from 'react-admin';

function UserList() {
  return (
    <List>
      <Datagrid rowClick='edit'>
        <TextField source='username' />
        <EmailField source='email' />
      </Datagrid>
    </List>
  );
}

function UserEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source='username' />
        <TextInput source='email' />
      </SimpleForm>
    </Edit>
  );
}

export { UserList, UserEdit };
