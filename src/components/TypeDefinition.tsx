import {Property, Schema} from "@apibrew/client/model";
import {sortedProperties} from "@apibrew/client/util/property";

export interface TypeDefinitionProps {
    schema: Schema
}

export function PropertyDefinition(props: { property: Property }) {
    if (props.property.type === 'ENUM') {
        return 'enum: ' + props.property.enumValues.join(' | ')
    } if (props.property.type === 'STRUCT') {
        return <a
            href={`/fundamentals/schema#${props.property.reference}-${props.property.typeRef}`}>{props.property.typeRef}</a>
    } else if (props.property.type === 'MAP') {
        return <>map&lt;<PropertyDefinition property={props.property.item}/>&gt;</>
    } else if (props.property.type === 'LIST') {
        return <><PropertyDefinition property={props.property.item}/>[]</>
    } else if (props.property.type === 'REFERENCE') {
        return <>
            <a href={`/fundamentals/schema#${props.property.reference}`}>{props.property.reference}</a>
        </>
    } else {
        return <>{props.property.type.toLowerCase()}</>
    }
}

export function TypeDefinition(props: TypeDefinitionProps) {
    const properties = sortedProperties(props.schema.properties)

    return (
        <>
            <ul>
                {properties.map(property => {
                    const prop = props.schema.properties[property]

                    return <li key={property}>
                        <strong>{property}</strong>
                        &nbsp;
                        <span>-</span>
                        &nbsp;
                        <span><PropertyDefinition property={props.schema.properties[property]}/></span>
                        &nbsp;
                        <span>{prop.description}</span>
                    </li>
                })}
            </ul>
        </>
    )
}