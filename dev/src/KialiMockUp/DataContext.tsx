export const dataContext = {
    "Overview": {
        "health": {
            "namespaceAppHealth": {
                "bookinfo": {
                    "details": {
                        "workloadStatuses": [
                            {
                                "name": "details-v1",
                                "desiredReplicas": 1,
                                "currentReplicas": 1,
                                "availableReplicas": 1,
                                "syncedProxies": -1
                            }
                        ],
                        "requests": {
                            "inbound": {},
                            "outbound": {},
                            "healthAnnotations": {}
                        }
                    },
                    "productpage": {
                        "workloadStatuses": [
                            {
                                "name": "productpage-v1",
                                "desiredReplicas": 1,
                                "currentReplicas": 1,
                                "availableReplicas": 1,
                                "syncedProxies": -1
                            }
                        ],
                        "requests": {
                            "inbound": {},
                            "outbound": {},
                            "healthAnnotations": {}
                        }
                    },
                    "ratings": {
                        "workloadStatuses": [
                            {
                                "name": "ratings-v1",
                                "desiredReplicas": 1,
                                "currentReplicas": 1,
                                "availableReplicas": 1,
                                "syncedProxies": -1
                            }
                        ],
                        "requests": {
                            "inbound": {},
                            "outbound": {},
                            "healthAnnotations": {}
                        }
                    },
                    "reviews": {
                        "workloadStatuses": [
                            {
                                "name": "reviews-v1",
                                "desiredReplicas": 1,
                                "currentReplicas": 1,
                                "availableReplicas": 1,
                                "syncedProxies": -1
                            },
                            {
                                "name": "reviews-v2",
                                "desiredReplicas": 1,
                                "currentReplicas": 1,
                                "availableReplicas": 1,
                                "syncedProxies": -1
                            },
                            {
                                "name": "reviews-v3",
                                "desiredReplicas": 1,
                                "currentReplicas": 1,
                                "availableReplicas": 1,
                                "syncedProxies": -1
                            }
                        ],
                        "requests": {
                            "inbound": {},
                            "outbound": {},
                            "healthAnnotations": {}
                        }
                    }
                },
                "default": {},
                "hostpath-provisioner": {
                    "csi-hostpathplugin": {
                        "workloadStatuses": [
                            {
                                "name": "csi-hostpathplugin",
                                "desiredReplicas": 1,
                                "currentReplicas": 1,
                                "availableReplicas": 1,
                                "syncedProxies": -1
                            }
                        ],
                        "requests": {
                            "inbound": {},
                            "outbound": {},
                            "healthAnnotations": {}
                        }
                    }
                },
                "istio-cni": {
                    "istio-cni": {
                        "workloadStatuses": [
                            {
                                "name": "istio-cni-node",
                                "desiredReplicas": 1,
                                "currentReplicas": 1,
                                "availableReplicas": 1,
                                "syncedProxies": -1
                            }
                        ],
                        "requests": {
                            "inbound": {},
                            "outbound": {},
                            "healthAnnotations": {}
                        }
                    }
                },
                "istio-system": {
                    "grafana": {
                        "workloadStatuses": [
                            {
                                "name": "grafana",
                                "desiredReplicas": 1,
                                "currentReplicas": 1,
                                "availableReplicas": 1,
                                "syncedProxies": -1
                            }
                        ],
                        "requests": {
                            "inbound": {},
                            "outbound": {},
                            "healthAnnotations": {}
                        }
                    },
                    "istio-ingressgateway": {
                        "workloadStatuses": [
                            {
                                "name": "istio-ingressgateway",
                                "desiredReplicas": 1,
                                "currentReplicas": 1,
                                "availableReplicas": 0,
                                "syncedProxies": -1
                            }
                        ],
                        "requests": {
                            "inbound": {},
                            "outbound": {},
                            "healthAnnotations": {}
                        }
                    },
                    "istiod": {
                        "workloadStatuses": [
                            {
                                "name": "istiod-default-v1-26-2",
                                "desiredReplicas": 1,
                                "currentReplicas": 1,
                                "availableReplicas": 1,
                                "syncedProxies": -1
                            }
                        ],
                        "requests": {
                            "inbound": {},
                            "outbound": {},
                            "healthAnnotations": {}
                        }
                    },
                    "kiali": {
                        "workloadStatuses": [
                            {
                                "name": "kiali",
                                "desiredReplicas": 1,
                                "currentReplicas": 1,
                                "availableReplicas": 1,
                                "syncedProxies": -1
                            }
                        ],
                        "requests": {
                            "inbound": {},
                            "outbound": {},
                            "healthAnnotations": {}
                        }
                    },
                    "prometheus": {
                        "workloadStatuses": [
                            {
                                "name": "prometheus",
                                "desiredReplicas": 1,
                                "currentReplicas": 1,
                                "availableReplicas": 1,
                                "syncedProxies": -1
                            }
                        ],
                        "requests": {
                            "inbound": {},
                            "outbound": {},
                            "healthAnnotations": {}
                        }
                    }
                },
                "ossmconsole": {
                    "ossmconsole": {
                        "workloadStatuses": [
                            {
                                "name": "ossmconsole",
                                "desiredReplicas": 1,
                                "currentReplicas": 1,
                                "availableReplicas": 1,
                                "syncedProxies": -1
                            }
                        ],
                        "requests": {
                            "inbound": {},
                            "outbound": {},
                            "healthAnnotations": {}
                        }
                    }
                },
                "tempo": {
                    "minio": {
                        "workloadStatuses": [
                            {
                                "name": "minio",
                                "desiredReplicas": 1,
                                "currentReplicas": 1,
                                "availableReplicas": 1,
                                "syncedProxies": -1
                            }
                        ],
                        "requests": {
                            "inbound": {},
                            "outbound": {},
                            "healthAnnotations": {}
                        }
                    },
                    "tempo": {
                        "workloadStatuses": [
                            {
                                "name": "tempo-tempo-compactor",
                                "desiredReplicas": 1,
                                "currentReplicas": 1,
                                "availableReplicas": 1,
                                "syncedProxies": -1
                            },
                            {
                                "name": "tempo-tempo-distributor",
                                "desiredReplicas": 1,
                                "currentReplicas": 1,
                                "availableReplicas": 1,
                                "syncedProxies": -1
                            },
                            {
                                "name": "tempo-tempo-ingester",
                                "desiredReplicas": 1,
                                "currentReplicas": 1,
                                "availableReplicas": 1,
                                "syncedProxies": -1
                            },
                            {
                                "name": "tempo-tempo-querier",
                                "desiredReplicas": 1,
                                "currentReplicas": 1,
                                "availableReplicas": 1,
                                "syncedProxies": -1
                            },
                            {
                                "name": "tempo-tempo-query-frontend",
                                "desiredReplicas": 1,
                                "currentReplicas": 1,
                                "availableReplicas": 1,
                                "syncedProxies": -1
                            }
                        ],
                        "requests": {
                            "inbound": {},
                            "outbound": {},
                            "healthAnnotations": {}
                        }
                    }
                }
            }
        },
        "status": [
            {
                "cluster": "Kubernetes",
                "name": "istiod-default-v1-26-2",
                "status": "Healthy",
                "is_core": true
            },
            {
                "cluster": "Kubernetes",
                "name": "istio-ingressgateway",
                "status": "Unhealthy",
                "is_core": false
            },
            {
                "cluster": "Kubernetes",
                "name": "custom dashboards",
                "status": "Healthy",
                "is_core": false
            },
            {
                "cluster": "Kubernetes",
                "name": "prometheus",
                "status": "Healthy",
                "is_core": true
            },
            {
                "cluster": "Kubernetes",
                "name": "tracing",
                "status": "Healthy",
                "is_core": false
            },
            {
                "cluster": "Kubernetes",
                "name": "grafana",
                "status": "Healthy",
                "is_core": false
            }
        ],
        "controlplanes": [
            {
                "cluster": {
                    "apiEndpoint": "https://10.217.4.1:443",
                    "isKialiHome": true,
                    "kialiInstances": [
                        {
                            "namespace": "istio-system",
                            "operatorResource": "",
                            "serviceName": "kiali",
                            "url": "",
                            "version": "94ce9d8fc55eee6109459157d1a7ff835a7bd4a207ef2f7f26de6447efd2XXX"
                        }
                    ],
                    "name": "Kubernetes",
                    "secretName": "",
                    "accessible": true
                },
                "config": {
                    "certificates": [
                        {
                            "dnsNames": null,
                            "configMapName": "istio-ca-root-cert",
                            "issuer": "O=cluster.local",
                            "notBefore": "2025-08-25T07:21:04Z",
                            "notAfter": "2035-08-23T07:21:04Z",
                            "error": "",
                            "accessible": true,
                            "cluster": ""
                        }
                    ],
                    "effectiveConfig": {
                        "configMap": {
                            "mesh": {
                                "accessLogFile": "/dev/stdout",
                                "defaultConfig": {
                                    "discoveryAddress": "istiod-default-v1-26-2.istio-system.svc:15012",
                                    "tracing": {
                                        "zipkin": {
                                            "address": "tempo-tempo-distributor.tempo:9411"
                                        }
                                    }
                                },
                                "trustDomain": "cluster.local",
                                "rootNamespace": "istio-system",
                                "enablePrometheusMerge": true,
                                "extensionProviders": [
                                    {
                                        "name": "otel",
                                        "envoyOtelAls": {
                                            "service": "opentelemetry-collector.observability.svc.cluster.local",
                                            "port": 4317
                                        }
                                    },
                                    {
                                        "name": "skywalking",
                                        "skywalking": {
                                            "service": "tracing.istio-system.svc.cluster.local",
                                            "port": 11800
                                        }
                                    },
                                    {
                                        "name": "otel-tracing",
                                        "opentelemetry": {
                                            "service": "opentelemetry-collector.observability.svc.cluster.local",
                                            "port": 4317
                                        }
                                    },
                                    {
                                        "name": "jaeger",
                                        "opentelemetry": {
                                            "service": "jaeger-collector.istio-system.svc.cluster.local",
                                            "port": 4317
                                        }
                                    }
                                ],
                                "defaultProviders": {
                                    "metrics": [
                                        "prometheus"
                                    ]
                                }
                            },
                            "meshNetworks": {}
                        }
                    },
                    "standardConfig": {
                        "cluster": "Kubernetes",
                        "configMap": {
                            "mesh": {
                                "accessLogFile": "/dev/stdout",
                                "defaultConfig": {
                                    "discoveryAddress": "istiod-default-v1-26-2.istio-system.svc:15012",
                                    "tracing": {
                                        "zipkin": {
                                            "address": "tempo-tempo-distributor.tempo:9411"
                                        }
                                    }
                                },
                                "trustDomain": "cluster.local",
                                "rootNamespace": "istio-system",
                                "enablePrometheusMerge": true,
                                "extensionProviders": [
                                    {
                                        "name": "otel",
                                        "envoyOtelAls": {
                                            "service": "opentelemetry-collector.observability.svc.cluster.local",
                                            "port": 4317
                                        }
                                    },
                                    {
                                        "name": "skywalking",
                                        "skywalking": {
                                            "service": "tracing.istio-system.svc.cluster.local",
                                            "port": 11800
                                        }
                                    },
                                    {
                                        "name": "otel-tracing",
                                        "opentelemetry": {
                                            "service": "opentelemetry-collector.observability.svc.cluster.local",
                                            "port": 4317
                                        }
                                    },
                                    {
                                        "name": "jaeger",
                                        "opentelemetry": {
                                            "service": "jaeger-collector.istio-system.svc.cluster.local",
                                            "port": 4317
                                        }
                                    }
                                ],
                                "defaultProviders": {
                                    "metrics": [
                                        "prometheus"
                                    ]
                                }
                            },
                            "meshNetworks": {}
                        },
                        "name": "istio-default-v1-26-2",
                        "namespace": "istio-system"
                    }
                },
                "externalControlPlane": false,
                "id": "Kubernetes",
                "istiodName": "istiod-default-v1-26-2",
                "istiodNamespace": "istio-system",
                "managedClusters": [
                    {
                        "apiEndpoint": "https://10.217.4.1:443",
                        "isKialiHome": true,
                        "kialiInstances": [
                            {
                                "namespace": "istio-system",
                                "operatorResource": "",
                                "serviceName": "kiali",
                                "url": "",
                                "version": "94ce9d8fc55eee6109459157d1a7ff835a7bd4a207ef2f7f26de6447efd2XXX"
                            }
                        ],
                        "name": "Kubernetes",
                        "secretName": "",
                        "accessible": true
                    }
                ],
                "managesExternal": false,
                "managedNamespaces": null,
                "resources": {
                    "requests": {
                        "cpu": "10m",
                        "memory": "100Mi"
                    }
                },
                "revision": "default-v1-26-2",
                "status": "Healthy",
                "thresholds": {
                    "memory": 0,
                    "cpu": 0
                },
                "version": {
                    "name": "Istio",
                    "version": "1.26.2",
                    "tempoConfig": {}
                }
            }
        ]
    },
    "Graph": {
        "timestamp": 1756113643,
        "duration": 60,
        "graphType": "versionedApp",
        "elements": {
          "nodes": [
            {
              "data": {
                "id": "ee30ec3824c952c6a97c245cb381968595af81dfb3951299315770d4dc205841",
                "nodeType": "box",
                "cluster": "Kubernetes",
                "namespace": "bookinfo",
                "app": "details",
                "healthData": {
                  "workloadStatuses": [
                    {
                      "name": "details-v1",
                      "desiredReplicas": 1,
                      "currentReplicas": 1,
                      "availableReplicas": 1,
                      "syncedProxies": -1
                    }
                  ],
                  "requests": {
                    "inbound": {},
                    "outbound": {},
                    "healthAnnotations": {}
                  }
                },
                "isBox": "app",
                "isOutOfMesh": true
              }
            },
            {
              "data": {
                "id": "15e753d164d02320b78b4db88c02828eb2802fc425916fe849f97a464c25df80",
                "nodeType": "box",
                "cluster": "Kubernetes",
                "namespace": "bookinfo",
                "app": "productpage",
                "healthData": {
                  "workloadStatuses": [
                    {
                      "name": "productpage-v1",
                      "desiredReplicas": 1,
                      "currentReplicas": 1,
                      "availableReplicas": 1,
                      "syncedProxies": -1
                    }
                  ],
                  "requests": {
                    "inbound": {},
                    "outbound": {},
                    "healthAnnotations": {}
                  }
                },
                "isBox": "app",
                "isOutOfMesh": true
              }
            },
            {
              "data": {
                "id": "b7a3aed047b45436340c6f1207e95cb39c88368d012458b6ce9a04a52f72f20f",
                "nodeType": "box",
                "cluster": "Kubernetes",
                "namespace": "bookinfo",
                "app": "ratings",
                "healthData": {
                  "workloadStatuses": [
                    {
                      "name": "ratings-v1",
                      "desiredReplicas": 1,
                      "currentReplicas": 1,
                      "availableReplicas": 1,
                      "syncedProxies": -1
                    }
                  ],
                  "requests": {
                    "inbound": {},
                    "outbound": {},
                    "healthAnnotations": {}
                  }
                },
                "isBox": "app",
                "isOutOfMesh": true
              }
            },
            {
              "data": {
                "id": "a7f0ea966626a632f524c63ca4d794ed666f3415f3544b989474d27aad08c694",
                "nodeType": "box",
                "cluster": "Kubernetes",
                "namespace": "bookinfo",
                "app": "reviews",
                "healthData": {
                  "workloadStatuses": [
                    {
                      "name": "reviews-v1",
                      "desiredReplicas": 1,
                      "currentReplicas": 1,
                      "availableReplicas": 1,
                      "syncedProxies": -1
                    },
                    {
                      "name": "reviews-v2",
                      "desiredReplicas": 1,
                      "currentReplicas": 1,
                      "availableReplicas": 1,
                      "syncedProxies": -1
                    },
                    {
                      "name": "reviews-v3",
                      "desiredReplicas": 1,
                      "currentReplicas": 1,
                      "availableReplicas": 1,
                      "syncedProxies": -1
                    }
                  ],
                  "requests": {
                    "inbound": {},
                    "outbound": {},
                    "healthAnnotations": {}
                  }
                },
                "isBox": "app",
                "isOutOfMesh": true
              }
            },
            {
              "data": {
                "id": "bf3790a7d4ebc316387250389da94818b402ecc9e7cfe6b39f89c40d5e7370b8",
                "parent": "ee30ec3824c952c6a97c245cb381968595af81dfb3951299315770d4dc205841",
                "nodeType": "service",
                "cluster": "Kubernetes",
                "namespace": "bookinfo",
                "app": "details",
                "service": "details",
                "healthData": {
                  "requests": {
                    "inbound": {},
                    "outbound": {},
                    "healthAnnotations": {}
                  }
                },
                "isIdle": true
              }
            },
            {
              "data": {
                "id": "e73d17c7ce69b6449aa320b78d088e1679f604d5ef299d5c7e4816193c90223d",
                "parent": "ee30ec3824c952c6a97c245cb381968595af81dfb3951299315770d4dc205841",
                "nodeType": "app",
                "cluster": "Kubernetes",
                "namespace": "bookinfo",
                "workload": "details-v1",
                "app": "details",
                "version": "v1",
                "healthData": {
                  "workloadStatuses": [],
                  "requests": {
                    "inbound": {},
                    "outbound": {},
                    "healthAnnotations": {}
                  }
                },
                "isIdle": true,
                "isOutOfMesh": true
              }
            },
            {
              "data": {
                "id": "67b0759a08c2dad027cefe1e1d7dfa26c04ed16e5d99ce76e0fb76dfb6ea29e7",
                "parent": "15e753d164d02320b78b4db88c02828eb2802fc425916fe849f97a464c25df80",
                "nodeType": "service",
                "cluster": "Kubernetes",
                "namespace": "bookinfo",
                "app": "productpage",
                "service": "productpage",
                "healthData": {
                  "requests": {
                    "inbound": {},
                    "outbound": {},
                    "healthAnnotations": {}
                  }
                },
                "hasRequestRouting": true,
                "hasVS": {
                  "hostnames": [
                    "*"
                  ]
                },
                "isIdle": true
              }
            },
            {
              "data": {
                "id": "efcc2ed361215b3c82e67fd0d0cb09899b9ee1e18dee32e8e828b487a7cb9343",
                "parent": "15e753d164d02320b78b4db88c02828eb2802fc425916fe849f97a464c25df80",
                "nodeType": "app",
                "cluster": "Kubernetes",
                "namespace": "bookinfo",
                "workload": "productpage-v1",
                "app": "productpage",
                "version": "v1",
                "healthData": {
                  "workloadStatuses": [],
                  "requests": {
                    "inbound": {},
                    "outbound": {},
                    "healthAnnotations": {}
                  }
                },
                "isIdle": true,
                "isOutOfMesh": true
              }
            },
            {
              "data": {
                "id": "82d72a9fde4cd0cd9da011281f8564a9c795864018e37dcf801a65a419ff3413",
                "parent": "b7a3aed047b45436340c6f1207e95cb39c88368d012458b6ce9a04a52f72f20f",
                "nodeType": "service",
                "cluster": "Kubernetes",
                "namespace": "bookinfo",
                "app": "ratings",
                "service": "ratings",
                "healthData": {
                  "requests": {
                    "inbound": {},
                    "outbound": {},
                    "healthAnnotations": {}
                  }
                },
                "isIdle": true
              }
            },
            {
              "data": {
                "id": "055acd1ee48a90ba90aa90df8a0d789664810dc5036eaebc0bf19a19e0834abe",
                "parent": "b7a3aed047b45436340c6f1207e95cb39c88368d012458b6ce9a04a52f72f20f",
                "nodeType": "app",
                "cluster": "Kubernetes",
                "namespace": "bookinfo",
                "workload": "ratings-v1",
                "app": "ratings",
                "version": "v1",
                "healthData": {
                  "workloadStatuses": [],
                  "requests": {
                    "inbound": {},
                    "outbound": {},
                    "healthAnnotations": {}
                  }
                },
                "isIdle": true,
                "isOutOfMesh": true
              }
            },
            {
              "data": {
                "id": "bc40873761174888869f91912758eaa77cbd8ff835000d16dcde347442b17a10",
                "parent": "a7f0ea966626a632f524c63ca4d794ed666f3415f3544b989474d27aad08c694",
                "nodeType": "service",
                "cluster": "Kubernetes",
                "namespace": "bookinfo",
                "app": "reviews",
                "service": "reviews",
                "healthData": {
                  "requests": {
                    "inbound": {},
                    "outbound": {},
                    "healthAnnotations": {}
                  }
                },
                "isIdle": true
              }
            },
            {
              "data": {
                "id": "9a60fd88bb986e9cc15ba01934a9e967727c84861bec05158b59a85d04300c57",
                "parent": "a7f0ea966626a632f524c63ca4d794ed666f3415f3544b989474d27aad08c694",
                "nodeType": "app",
                "cluster": "Kubernetes",
                "namespace": "bookinfo",
                "workload": "reviews-v1",
                "app": "reviews",
                "version": "v1",
                "healthData": {
                  "workloadStatuses": [],
                  "requests": {
                    "inbound": {},
                    "outbound": {},
                    "healthAnnotations": {}
                  }
                },
                "isIdle": true,
                "isOutOfMesh": true
              }
            },
            {
              "data": {
                "id": "f891bcc76364f5421f0b36378f076a925fa460f7408d4cd36e17e68cc2fcd162",
                "parent": "a7f0ea966626a632f524c63ca4d794ed666f3415f3544b989474d27aad08c694",
                "nodeType": "app",
                "cluster": "Kubernetes",
                "namespace": "bookinfo",
                "workload": "reviews-v2",
                "app": "reviews",
                "version": "v2",
                "healthData": {
                  "workloadStatuses": [],
                  "requests": {
                    "inbound": {},
                    "outbound": {},
                    "healthAnnotations": {}
                  }
                },
                "isIdle": true,
                "isOutOfMesh": true
              }
            },
            {
              "data": {
                "id": "e31fea265aa898ba3a63d30e31913960a2a45fa3f589b8a2fcf2ff0747a46bc6",
                "parent": "a7f0ea966626a632f524c63ca4d794ed666f3415f3544b989474d27aad08c694",
                "nodeType": "app",
                "cluster": "Kubernetes",
                "namespace": "bookinfo",
                "workload": "reviews-v3",
                "app": "reviews",
                "version": "v3",
                "healthData": {
                  "workloadStatuses": [],
                  "requests": {
                    "inbound": {},
                    "outbound": {},
                    "healthAnnotations": {}
                  }
                },
                "isIdle": true,
                "isOutOfMesh": true
              }
            }
          ],
          "edges": []
        }
      }
};
   