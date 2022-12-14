> This project is deprecated as logic is moved to [th2 CLI](https://github.com/d0rich/th2-cli)

# th2-configs-generator
API for generation config files for th2 installation.

- List available th2 versions: https://th2-configs-generator.onrender.com/versions
- Generate file: https://th2-configs-generator.onrender.com/{{VERSION}}/{{filename}} (eg https://th2-configs-generator.onrender.com/1-5-x/ingress.values)

The following page contains information about working with API routes in order to get templates for th2 configuration files. In order to better understand basic principles of working with API routes, we recommend to read about [query strings](https://en.wikipedia.org/wiki/Query_string).

<!--more-->

Here are provided configuration files that you can retrieve with config API. Some of these routes API calls can change some values in the configuration with provided query parameters. However, it is not always necessary as there is default values.

## How to use it

Path to the your configuration will be as following: `https://th2-configs-generator.onrender.com/<version>/<filename>`

- `version` - version of th2-infra you want to get configurations for
- `filename` - name of the configuration file you want to get

You can get list of supported versions of th2-infra in https://th2-configs-generator.onrender.com/versions.

If you need to customize final configuration, you can provide parameters by adding `?<parameters>` after the path. Possible parameters are listed for each configuration file.

- `pvs` - configuration for Kubernetes persistent volumes;
  - `node-name` defines the node name of your node running in Kubernetes cluster. This value can be retrieved with kubectl cluster-info command. The default value is `minikube`.
- `pvcs` - configuration for Kubernetes persistent volume claims;
- `helm-operator.values` - configuration for helm operator;
- `ingress.values` - configuration for Nginx ingress controller;
- `prometheus-operator.values` - Prometheus configuration;
  - `hosts` defines Grafana hostnames.
- `service.values` - main configuration for th2 infra components;
  - `repository` - defines the link to your th2-infra-schema repository. If you use SSH key for authentification, this link should be SSH link. In you want to use tokens, place HTTPS link there.
  - `token` - token, used for authentification on Git platform.
  - `platform` - platform, where you published your th2-infra-schema. Possible values: `github` (default), `gitlab`.
  - `host` - defines the hostname of your Kubernetes cluster. The default value is `127.0.0.1`.
  - `c-host` - defines the hostname of the Cassandra cluster. The default value is `127.0.0.1`.
  - `dc` - defines the datacenter of the Cassandra cluster. The default value is `datacenter1`. 
- `secrets` - basic credentials for services in your th2 cluster. We recommend to create this file on your machine and use your own version;
- `dashboard.values` - Kubernetes dashboard configuration;
  - `hosts` defines the Dashboard hostnames.
- `loki.values` - configuration for Loki.

## Examples

In order to make it more clear, here are examples of config with and without parameters.

Path to `ingress.values` with no parameters (doesn???t require parameters):


```
https://th2-configs-generator.onrender.com/1-5-x/ingress.values 
```

Output:

```yaml
imagePullSecrets:
controller:
  service:
    type: NodePort
    nodePorts:
      http: 30000
  # image:
  #   repository: k8s.gcr.io/ingress-nginx/controller
  #   tag: "v0.41.2"
  admissionWebhooks:
    enabled: false
# defaultBackend:
#   image:
#     repository: defaultbackend-amd64
#     tag: "1.5"
```

Path to `service.values` with no parameters (requires parameters):

```
https://th2-configs-generator.onrender.com/1-5-x/service.values 
```

Output:

```yaml
infraMgr:
  git:
    repository: undefined

rabbitmq:
  prometheus:
    operator:
      enabled: false
  persistentVolume:
    enabled: true
    storageClass: local-storage
    size: 10Gi
    
externalRabbitMQHost:
  host: 127.0.0.1

cassandra:
  internal: false
  host: 127.0.0.1
  cluster:
    datacenter: datacenter1
```

Path to `service.values` file with specified parameters:

```
https://th2-configs-generator.onrender.com/1-5-x/service.values?repository=git@github.com:ExampleUser/th2-infra-schema.git&host=111.111.1.1&c-host=222.222.2.2&dc=my_dc
```

Output:

```yaml
infraMgr:
  git:
    repository: git@github.com:ExampleUser/th2-infra-schema.git

rabbitmq:
  prometheus:
    operator:
      enabled: false
  persistentVolume:
    enabled: true
    storageClass: local-storage
    size: 10Gi
    
externalRabbitMQHost:
  host: 111.111.1.1

cassandra:
  internal: false
  host: 222.222.2.2
  cluster:
    datacenter: my_dc
```
