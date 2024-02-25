import React, {useMemo} from "react";
import {Resources} from "../resources";
import {TypeDefinition} from "./TypeDefinition";

export interface ResourceDefinitionProps {
    namespace: string
    resourceName: string
}

const excludedTypes = [
    'AuditData'
]

export function ResourceDefinition(props: ResourceDefinitionProps) {
    const resource = useMemo(() => Resources.find(resource => resource.namespace.name === props.namespace && resource.name === props.resourceName), [props.namespace, props.resourceName])

    const types = useMemo(() => {
        return (resource?.types || []).filter(type => excludedTypes.indexOf(type.name) === -1)
    }, [resource])

    return (
        <>
            <h3 id={`${props.namespace}/${props.resourceName}`}>Resource: {props.namespace}/{props.resourceName} definition</h3>

            <TypeDefinition schema={resource}/>

            {types.length > 0 && <>
                <h4>Sub Types:</h4>
                {types.map(type => {
                    return <>
                        <h5>{type.name}:</h5>
                        <TypeDefinition key={type.name} schema={type}/>
                    </>
                })}
            </>}
        </>
    )
}