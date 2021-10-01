
const camelTransformer = (token, startIndex) => {
    let parsedName = [];
    for (let i = 2; i < token.path.length; i++) {
        let path = token.path[i];
        const item = i == 2 ? path.toLowerCase() : path.charAt(0).toUpperCase() + path.slice(1);
        parsedName.push(item)
    }
    return parsedName.join('');
}

module.exports = {
    source: ['core/tokens/**/*json'],
    transform: {
        camelTransform: {
            type: 'name',
            transformer: (token) => camelTransformer(token, 2)
        }
    },
    platforms: {
        js: {
            transformGroup: "js",
            buildPath: "packages/javascript/",
            files: [
                {
                    format: "javascript/es6",
                    destination: "universe/universe.js",
                    filter: {
                        attributes: {
                            category: 'color',
                            colorType: 'universe',
                        }
                    }
                },
                {
                    format: "typescript/es6-declarations",
                    destination: "universe/universe.d.ts",
                    filter: {
                        attributes: {
                            category: 'color',
                            colorType: 'universe',
                        }
                    }
                },
                {
                    format: "javascript/es6",
                    destination: "themes/consumer.js",
                    filter: {
                        attributes: {
                            category: 'color',
                            theme: 'consumer',
                        }
                    }
                },
                {
                    format: "typescript/es6-declarations",
                    destination: "themes/consumer.d.ts",
                    filter: {
                        attributes: {
                            category: 'color',
                            theme: 'consumer',
                        }
                    }
                },
            ],
            transforms: [
                "attribute/cti",
                "camelTransform",
                "color/hex",
                "size/rem"
            ]
        },
        iosSwift: {
            transformGroup: "ios-swift-separate",
            buildPath: "packages/ios-swift/",
            files: [
                {
                    destination: "universe/Universe.swift",
                    format: "ios-swift/class.swift",
                    className: "Universe",
                    filter: {
                        attributes: {
                            category: 'color',
                            colorType: 'universe',
                        }
                    },
                    
                },
                {
                    destination: "themes/Consumer.swift",
                    format: "ios-swift/class.swift",
                    className: "Consumer",
                    filter: {
                        attributes: {
                            category: 'color',
                            theme: 'consumer',
                        }
                    },
                    options: {

                        outputReferences: true
                    },
                },
            ],
            transforms: [
                "attribute/cti",
                "camelTransform",
                "color/hex",
                "size/rem"
            ]
        },
        android: {
            transformGroup: "android",
            buildPath: "packages/android/",
            files: [
                {
                    destination: "universe/universe.xml",
                    format: "android/colors",
                    filter: {
                        attributes: {
                            category: 'color',
                            colorType: 'universe',
                        }
                    }
                },
                {
                    destination: "themes/consumer.xml",
                    format: "android/resources",
                    options: {

                        outputReferences: true
                    },
                    filter: {
                        attributes: {
                            category: 'color',
                            theme: 'consumer',
                        }
                    }
                }
            ],
            transforms: [
                "attribute/cti",
                "camelTransform",
                "color/hex",
                "size/rem"
            ]
        },
    }
};