import ResourcesJson from './resources.json'
import {Resource} from "@apibrew/client/model";

export const Resources: Resource[] = ResourcesJson as unknown as Resource[]