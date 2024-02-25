import {Resources} from "@site/src/resources";
import {ResourceDefinition} from "@site/src/components/ResourceDefinition";

export function AllResources() {

    return <>
        {Resources.map((resource => <>
            <ResourceDefinition namespace={resource.namespace.name}
                                resourceName={resource.name}/>
        </>))}
    </>
}