import React from 'react';
import buildGraphQLProvider from 'ra-data-graphql-simple';
import { Admin, ListGuesser, EditGuesser, Resource } from 'react-admin';
import { MessageList, MessageEdit, MessageCreate } from './components/messages';
import { UserList, UserEdit } from './components/users';

function App() {
  const [dataProvider, setDataProvider] = React.useState(null);
  React.useEffect(() => {
    buildGraphQLProvider({
      clientOptions: { uri: 'http://localhost:4000' },
    }).then((graphQlDataProvider) =>
      setDataProvider(() => graphQlDataProvider),
    );
  }, []);

  if (!dataProvider) {
    return <div>Loading </div>;
  }

  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name='Message'
        list={MessageList}
        edit={EditGuesser}
      />
      <Resource
        name='User'
        list={UserList}
        edit={EditGuesser}
      />
    </Admin>
  );
}

export default App;
