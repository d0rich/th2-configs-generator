import {H3Event} from "h3";
import {useTh2InfraVersion} from "./versions";
import {setYamlResponse} from "./yamlWorker";

export async function configureConfigResponse({ event }: H3Event) {
    const version = await useTh2InfraVersion(event)
    setYamlResponse(event)
    return { version }
}