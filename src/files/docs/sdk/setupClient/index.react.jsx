import {ClientImpl} from "@apibrew/client/impl/client-impl";
import {ClientProvider, LocalStorageTokenStorage, useClient} from "@apibrew/react";

// setup client
const client = new ClientImpl('<instance-url>:<httpPort>')

// setup token storage (we will use localStorage as token storage)
client.useTokenStorage(new LocalStorageTokenStorage())

// Setup client in root component.
export function App() {

  return <ClientProvider value={client}>>
    {/*...*/}
    {/*other codes*/}
    {/*...*/}
  </ClientProvider>;
}

// now in any component you can access to client through useClient hook.

export function Component1() {
  const client = useClient();

  // ... //
  return <div/>
}
