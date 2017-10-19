/** @babel */
export const FEATURE_PROCESS_NAMESPACES = "http://xmlpull.org/v1/doc/features.html#process-namespaces";
export const FEATURE_REPORT_NAMESPACE_ATTRIBUTES = "http://xmlpull.org/v1/doc/features.html#report-namespace-prefixes";
export const FEATURE_PROCESS_DOCDECL = "http://xmlpull.org/v1/doc/features.html#process-docdecl";
export const FEATURE_VALIDATION = "http://xmlpull.org/v1/doc/features.html#validation";
export const START_DOCUMENT = 0;
export const END_DOCUMENT = 1;
export const START_TAG = 2;
export const END_TAG = 3;
export const TEXT = 4;
export const CDSECT = 5;
export const ENTITY_REF = 6;
export const IGNORABLE_WHITESPACE = 7;
export const PROCESSING_INSTRUCTION = 8;
export const COMMENT = 9;
export const DOCDECL = 10;
export const TYPES = ["START_DOCUMENT", "END_DOCUMENT", "START_TAG", "END_TAG", "TEXT", "CDSECT", "ENTITY_REF", "IGNORABLE_WHITESPACE", "PROCESSING_INSTRUCTION", "COMMENT", "DOCDECL"];
export const NO_NAMESPACE = "";

export class XmlPullParser {

    constructor() {

    }

    defineEntityReplacementText(entityName, replacementText) {
    }

    getAttributeCount() {
        return 0;
    }

    getAttributeName(index) {
        return null;
    }

    getAttributeNamespace(index) {
        return null;
    }

    getAttributePrefix(index) {
        return null;
    }

    getAttributeType(index) {
        return null;
    }

    getAttributeValue(index, name) {
        return null;
    }

    getColumnNumber() {
        return 0;
    }

    getDepth() {
        return 0;
    }

    getEventType() {
        return 0;
    }

    getFeature(name) {
        return false;
    }

    getInputEncoding() {
        return null;
    }

    getLineNumber() {
        return 0;
    }

    getName() {
        return null;
    }

    getNamespace(prefix) {
        return null;
    }

    getNamespaceCount(depth) {
        return 0;
    }

    getNamespacePrefix(pos) {
        return null;
    }

    getNamespaceUri(pos) {
        return null;
    }

    getPositionDescription() {
        return null;
    }

    getPrefix() {
        return null;
    }

    getProperty() {
        return null;
    }

    getText() {
        return null;
    }

    getTextCharacters(holderForStartAndLength) {
        return null;
    }

    isAttributeDefault(index) {
        return false;
    }

    isEmptyElementTag() {
        return false;
    }

    isWhitespace() {
        return false;
    }

    next() {
        return 0;
    }

    nextTag() {
        return null;
    }

    nextText() {
        return null;
    }

    nextToken() {
        return 0;
    }

    require(type, namespace, name) {
    }

    setFeature(name, state) {
    }

    setInput(input, inputEncoding) {
    }

    setProperty(name, value) {
    }
}

export class XmlSerializer {

    constructor() {

    }

    attribute(namespace, name, value) {

    }

    cdsect() {

    }

    check(close) {

    }

    comment(txt) {

    }

    docdecl(dd) {

    }

    endDocument() {

    }

    endTag(namespace, name) {

    }

    entityRef(name) {

    }

    flush() {

    }

    getDepth() {

    }

    getName() {

    }

    getNamespace() {

    }

    getFeature(name) {

    }

    getPrefix(namespace, create, includeDefault = false) {

    }

    getProperty(name) {

    }

    ignorableWhitespace(s) {

    }

    processingInstruction(pi) {

    }

    setFeature(name, value) {

    }

    setPrefix(prefix = "", namespace = "") {

    }

    setProperty(name, value) {

    }

    setOutput(writer) {

    }

    startDocument(encoding, standalone) {

    }

    startTag(namespace, name) {

    }

    text(txt, start, len) {

    }

    writeEscaped(s, quot) {

    }
}

let FACTORY = null;

export class XmlPullParserFactory {

    constructor() {
        this.features = {};
        this.parserClasses = [];
        this.serializerClasses = [];
    }

    static addParser(parserClass) {
        if (parserClass !== null) {
            let factory = XmlPullParserFactory.newInstance();
            factory.parserClasses.push(parserClass);
        }
        return parserClass;
    }

    static addSerializer(serializerClass) {
        if (serializerClass !== null) {
            let factory = XmlPullParserFactory.newInstance();
            factory.serializerClasses.push(serializerClass);
        }
    }

    getFeature(name) {
        let value = this.features[name];
        return value !== null ? value : false;
    }

    isNamespaceAware() {
        return this.getFeature(FEATURE_PROCESS_NAMESPACES);
    }

    isValidating() {
        return this.getFeature(FEATURE_VALIDATION);
    }

    static newInstance(classes) {
        if (FACTORY === null) {
            let pos = 0;
            let parserClasses = [];
            let serializerClasses = [];
            let instance = null, recognized = null;
            if (classes !== null) {
                try {
                    for (let cls of classes) {
                        instance = new cls();
                        if (instance instanceof XmlPullParser) {
                            parserClasses.push(cls);
                            recognized = true;
                        }
                        if (instance instanceof XmlSerializer) {
                            serializerClasses.push(cls);
                            recognized = true;
                        }
                        if (instance instanceof XmlPullParserFactory) {
                            if (FACTORY === null) {
                                FACTORY = instance;
                                FACTORY.parserClasses = parserClasses;
                                FACTORY.serializerClasses = serializerClasses;
                            }
                            recognized = true;
                        }
                    }
                } catch (e) {

                }
            }
            if (FACTORY === null) {
                FACTORY = new XmlPullParserFactory();
            }
            FACTORY.parserClasses = parserClasses;
            FACTORY.serializerClasses = serializerClasses;
        }
        return FACTORY;
    }

    newPullParser(options) {
        if (this.parserClasses === null) {
            throw new ReferenceError("XmlPullParserException Factory initialization was incomplete");
        }
        if (this.parserClasses.length === 0) {
            throw new ReferenceError("XmlPullParserException No valid parser classes found");
        }
        let issues = "";
        let len = this.parserClasses.length;
        while(len--) {
            try {
                let ppClass = this.parserClasses[len];
                let pp = new ppClass(options);
                for (var key in this.features) {
                    pp.setFeature(key, this.features[key]);
                }
                return pp;
            } catch(e) {
                issues += e.message + "; ";
            }
        }
        throw new EvalError("XmlPullParserException could not create parser: "+issues);
    }

    setFeature(name, state) {
        this.features[name] = state;
    }

    setNamespaceAware(awareness) {
        this.features[FEATURE_PROCESS_NAMESPACES] = awareness;
    }

    setValidating(validating) {
        this.features[FEATURE_VALIDATION] = validating;
    }

}
