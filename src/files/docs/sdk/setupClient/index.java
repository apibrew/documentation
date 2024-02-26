import io.apibrew.client.Client;

public class Application {

    public static void main(String[] args) {
        // Use one of following methods to create client

        // Option 1. Create client from default config (from apbr config file)
        Client client = Client.newClient();

        // Option 2. By Apbr URL (you need to authenticate separately)
        Client client = Client.newClient("https://apbr.io");

        // Option 3. By separate profile
        Client client = Client.newClientByServerName("my-profile");

        // Option 4. Inline config
        Config.Server server = new Config.Server();
        server.setHost("localhost");
        server.setPort(9009);
        server.setHttpPort(9009);
        server.setInsecure(true);
        Config.Authentication authentication = new Config.Authentication();
        // Either username/password or token can be used for authentication.
        authentication.setUsername("admin");
        authentication.setPassword("admin");
        authentication.setToken("admin");

        server.setAuthentication(authentication);

        Client client = Client.newClientByServerConfig(server);
    }
}
