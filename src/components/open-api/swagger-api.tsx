import SwaggerUI from "swagger-ui-react";
import React, {useEffect, useState} from "react";
import "swagger-ui-react/swagger-ui.css"
import PropTypes from "prop-types";
import Im from "immutable"
import {OpenAPIV3_1} from "openapi-types";

export interface SwaggerApiProps {
  spec?: OpenAPIV3_1.Document
  fullPath?: string
  internalPath?: string
  withoutHeader?: boolean
  withoutModels?: boolean
  withoutOperations?: boolean
  override?: (spec: OpenAPIV3_1.Document) => OpenAPIV3_1.Document
  filterOperations?: (operation: OpenAPIV3_1.OperationObject) => any
}

const ContextObject = React.createContext<SwaggerApiProps>({} as SwaggerApiProps)

// Create the layout component
export default class OperationsLayout extends React.Component<any> {

  static contextType = ContextObject

  static propTypes = {
    specSelectors: PropTypes.object.isRequired,
    specActions: PropTypes.object.isRequired,
    oas3Actions: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired,
    oas3Selectors: PropTypes.func.isRequired,
    layoutSelectors: PropTypes.object.isRequired,
    layoutActions: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired,
    authSelectors: PropTypes.object.isRequired,
    getConfigs: PropTypes.func.isRequired,
    fn: PropTypes.func.isRequired
  }

  render() {
    const params = this.context as SwaggerApiProps

    let {
      specSelectors,
    } = this.props

    const taggedOps = specSelectors.taggedOperations()

    if (!params.withoutOperations && taggedOps.size === 0) {
      return <h3> No operations defined in spec!</h3>
    }

    return (
      <div>
        {taggedOps.map(this.renderOperationTag).toArray()}
        {!params.withoutOperations && taggedOps.size < 1 ?
          <h3> No operations defined in spec! </h3> : null}
      </div>
    )
  }

  renderOperationTag = (tagObj: any, tag: any) => {
    const {
      specSelectors,
      getComponent,
      oas3Selectors,
      layoutSelectors,
      layoutActions,
      getConfigs,
    } = this.props
    const validOperationMethods = specSelectors.validOperationMethods()
    const OperationContainer = getComponent("OperationContainer", true)
    const OperationTag = getComponent("OperationTag")
    const operations = tagObj.get("operations")
    return (
      <>
        {
          operations.map((op: any) => {
            const path = op.get("path")
            const method = op.get("method")
            const specPath = Im.List(["paths", path, method])

            if (validOperationMethods.indexOf(method) === -1) {
              return null
            }

            return (
              <OperationContainer
                key={`${path}-${method}`}
                specPath={specPath}
                op={op}
                path={path}
                method={method}
                tag={tag}/>
            )
          }).toArray()
        }
      </>
    )
  }

}

class CustomBaseLayout extends React.Component<any> {
  static propTypes = {
    errSelectors: PropTypes.object.isRequired,
    errActions: PropTypes.object.isRequired,
    specSelectors: PropTypes.object.isRequired,
    oas3Selectors: PropTypes.object.isRequired,
    oas3Actions: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired,
  }

  static contextType = ContextObject

  render() {
    const params = this.context as SwaggerApiProps

    const {errSelectors, specSelectors, getComponent} = this.props

    const SvgAssets = getComponent("SvgAssets")
    const InfoContainer = getComponent("InfoContainer", true)
    const VersionPragmaFilter = getComponent("VersionPragmaFilter")
    const Operations = getComponent("OperationsLayout", true)
    const Models = getComponent("Models", true)
    const Webhooks = getComponent("Webhooks", true)
    const Row = getComponent("Row")
    const Col = getComponent("Col")
    const Errors = getComponent("errors", true)

    const ServersContainer = getComponent("ServersContainer", true)
    const SchemesContainer = getComponent("SchemesContainer", true)
    const AuthorizeBtnContainer = getComponent("AuthorizeBtnContainer", true)
    const FilterContainer = getComponent("FilterContainer", true)
    const isSwagger2 = specSelectors.isSwagger2()
    const isOAS3 = specSelectors.isOAS3()
    const isOAS31 = specSelectors.isOAS31()

    const isSpecEmpty = !specSelectors.specStr()

    const loadingStatus = specSelectors.loadingStatus()

    let loadingMessage = null

    if (loadingStatus === "loading") {
      loadingMessage = (
        <div className="info">
          <div className="loading-container">
            <div className="loading"></div>
          </div>
        </div>
      )
    }

    if (loadingStatus === "failed") {
      loadingMessage = (
        <div className="info">
          <div className="loading-container">
            <h4 className="title">Failed to load API definition.</h4>
            <Errors/>
          </div>
        </div>
      )
    }

    if (loadingStatus === "failedConfig") {
      const lastErr = errSelectors.lastError()
      const lastErrMsg = lastErr ? lastErr.get("message") : ""
      loadingMessage = (
        <div className="info failed-config">
          <div className="loading-container">
            <h4 className="title">Failed to load remote configuration.</h4>
            <p>{lastErrMsg}</p>
          </div>
        </div>
      )
    }

    if (!loadingMessage && isSpecEmpty) {
      loadingMessage = <h4>No API definition provided.</h4>
    }

    if (loadingMessage) {
      return (
        <div className="swagger-ui">
          <div className="loading-container">{loadingMessage}</div>
        </div>
      )
    }

    const servers = specSelectors.servers()
    const schemes = specSelectors.schemes()

    const hasServers = servers && servers.size
    const hasSchemes = schemes && schemes.size
    const hasSecurityDefinitions = !!specSelectors.securityDefinitions()

    return (
      <div className="swagger-ui">
        <SvgAssets/>
        <VersionPragmaFilter
          isSwagger2={isSwagger2}
          isOAS3={isOAS3}
          alsoShow={<Errors/>}
        >
          <Errors/>
          {!params.withoutHeader && <Row className="information-container">
            <Col mobile={12}>
              <InfoContainer/>
            </Col>
          </Row>}

          {!params.withoutHeader && (hasServers || hasSchemes || hasSecurityDefinitions) ? (
            <div className="scheme-container">
              <Col className="schemes wrapper"
                   mobile={12}>
                {hasServers ? <ServersContainer/> : null}
                {hasSchemes ? <SchemesContainer/> : null}
                {hasSecurityDefinitions ? <AuthorizeBtnContainer/> : null}
              </Col>
            </div>
          ) : null}

          <FilterContainer/>

          <Row>
            <Col mobile={12}
                 desktop={12}>
              <Operations/>
            </Col>
          </Row>

          {isOAS31 && (
            <Row className="webhooks-container">
              <Col mobile={12}
                   desktop={12}>
                <Webhooks/>
              </Col>
            </Row>
          )}

          {!params.withoutModels && <Row>
            <Col mobile={12}
                 desktop={12}>
              <Models/>
            </Col>
          </Row>}
        </VersionPragmaFilter>
      </div>
    )
  }
}


function getUsedSchemaNames(schema: OpenAPIV3_1.SchemaObject): string[] {
  return [];
}

function cleanNotUsedSchemas(spec: OpenAPIV3_1.Document) {
  if (!spec.components?.schemas) {
    return;
  }

  let markedSchemaNames: string[] = [];

  for (let schemasKey in spec.components?.schemas) {
    const schema = spec.components?.schemas[schemasKey]

    markedSchemaNames = [
      ...markedSchemaNames, ...getUsedSchemaNames(schema)
    ]
  }

}

export function SwaggerApi(props: SwaggerApiProps) {
  const path = props.fullPath || ('/files/docs/openapi/' + props.internalPath || 'meta.json')

  const [spec, setSpec] = useState<OpenAPIV3_1.Document>(props.spec as any)

  useEffect(() => {
    if (props.fullPath || props.internalPath) {
      fetch(path)
        .then(res => res.json())
    }
  }, [path]);

  let updatedSpec = spec as OpenAPIV3_1.Document;

  if (props.override) {
    updatedSpec = props.override(updatedSpec)
  }

  let updatedPaths: any = {}

  if (props.filterOperations) {
    for (const key in updatedSpec.paths) {
      const pathItem = updatedSpec.paths[key] as any
      const updatedOperations = {} as any
      let operationFound = false;

      for (const operationKey in pathItem) {
        const operation = pathItem[operationKey]

        if (props.filterOperations(operation)) {
          updatedOperations[operationKey] = operation
          operationFound = true;
        }
      }

      if (operationFound) {
        updatedPaths[key] = updatedOperations
      }
    }
  }
  updatedSpec = {
    ...updatedSpec,
    paths: updatedPaths
  } as OpenAPIV3_1.Document

  cleanNotUsedSchemas(updatedSpec)

  const pluginConfig = {
    components: {
      CustomBaseLayout: CustomBaseLayout,
      OperationsLayout: OperationsLayout
    }
  }

  return <ContextObject.Provider value={props}>
    {spec && <SwaggerUI tryItOutEnabled={false}
                        persistAuthorization={true}
                        plugins={[() => pluginConfig]}
                        layout='CustomBaseLayout'
                        showExtensions={false}
                        displayOperationId={false}
                        spec={updatedSpec}/>}
  </ContextObject.Provider>
}
