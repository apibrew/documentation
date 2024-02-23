import SwaggerUI from "swagger-ui-react";
import React, {useEffect, useState} from "react";
import "swagger-ui-react/swagger-ui.css"
import {SwaggerApi} from "./swagger-api";

export interface SingleEndpointProps {
  fullPath?: string
  internalPath?: string
  operationId: string
  withoutOperations?: boolean
  withoutModels?: boolean
}

export function SingleEndpoint(props: SingleEndpointProps) {
  return <SwaggerApi {...props}
                     withoutModels={props.withoutModels}
                     withoutOperations={props.withoutOperations}
                     override={spec => {
                       return {
                         ...spec,
                         tags: undefined
                       }
                     }}
                     filterOperations={(operation) => {
                       return operation.operationId === props.operationId;
                     }}
                     withoutHeader={true}
  />
}

