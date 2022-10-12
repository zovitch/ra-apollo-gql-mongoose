import {
  Datagrid,
  DateField,
  List,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  Create,
  ReferenceInput,
  SelectInput,
} from 'react-admin';

function MessageList() {
  return (
    <List>
      <Datagrid rowClick='edit'>
        <TextField source='text' />
        <DateField source='createdAt' />
        <TextField source='createdBy' />=
      </Datagrid>
    </List>
  );
}

function MessageEdit() {
  return (
    <Edit>
      <SimpleForm>
        {/* <TextInput source="id" /> */}
        <TextInput source='text' />
        <DateInput source='createdAt' />
        <TextInput source='createdBy' />
      </SimpleForm>
    </Edit>
  );
}

function MessageCreate() {
  return (
    <Create>
      <SimpleForm>
        {/* <TextInput source="id" /> */}
        <TextInput source='text' />
        <DateInput source='createdAt' />
        <ReferenceInput
          source='createdBy'
          reference='User'
        >
          <SelectInput optionText='username' />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
}

export { MessageList, MessageEdit, MessageCreate };
