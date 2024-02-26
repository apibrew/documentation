import io.apibrew.client.Client;
import io.apibrew.client.model.Resource;

import java.util.ArrayList;
import java.util.List;

public class Application {

    public static void main(String[] args) {
        Client client = Client.newClient();

        // Create new resource.
        Resource resource = new Resource();
        resource.setName("Person");

        List<Resource.Property> properties = new ArrayList<>();
        properties.add(new Resource.Property().withName("name").withType(Resource.Type.STRING).withRequired(true));
        properties.add(new Resource.Property().withName("description").withType(Resource.Type.STRING));

        resource.setProperties(properties);

        Resource createdResource = client.CreateResource(resource);

        // Get resource by name.
        Resource resourceByName = client.GetResourceByName("default", "Person");

        // Update resource.
        resourceByName.getProperties().add(new Resource.Property().withName("age").withType(Resource.Type.INT32));

        Resource updatedResource = client.UpdateResource(resourceByName);

        // List resources.
        List<Resource> resources = client.listResources();

        // Get resource by id.
        Resource resourceById = client.GetResourceById(createdResource.getId());

        // Delete resource.
        client.DeleteResource(resource);

        // Apply resource.
        Resource appliedResource = client.ApplyResource(resource);
    }
}
