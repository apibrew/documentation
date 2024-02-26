package main

import "github.com/apibrew/apibrew/pkg/client"
import "github.com/apibrew/apibrew/pkg/model"

func main() {
    client := client.NewClient()

    // Create new resource.
    resource := &model.Resource{
        Name: "Person",
        Properties: []model.Property{
            {Name: "name", Type: "string", Required: true},
            {Name: "description", Type: "string"},
        },
    }

    createdResource, err := client.CreateResource(resource)

    // Get resource by name.
    resourceByName, err := client.GetResourceByName("default", "Person")

    // Update resource.
    resourceByName.Properties = append(resourceByName.Properties, model.Property{Name: "age", Type: "int32"})
    updatedResource, err := client.UpdateResource(resourceByName)

    // List resources.
    resources, err := client.ListResources()

    // Get resource by id.
    resourceById, err := client.GetResourceById(createdResource.Id)

    // Delete resource.
    err := client.DeleteResource(resource)

    // Apply resource.
    appliedResource, err := client.ApplyResource(resource)
}
