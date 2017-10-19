/** @babel */
import * as char from 'hjs-core/lib/char';
import { NO_NAMESPACE, PROCESSING_INSTRUCTION, END_TAG, START_TAG, TYPES, XmlPullParser,XmlSerializer } from "./v1";

export const XSI_NS = "http://www.w3.org/2001/XMLSchema-instance";

const isS = (ch) => {
    return (ch === char.SPACE || ch === char.NEWLINE || ch === char.CARRIAGE_RETURN || ch === char.TAB);
};

export const getAttributeValue = (pp, name) => {
    return pp.getAttributeValue(NO_NAMESPACE, name);
};

export const getPIData = (pp) => {
    let eventType;
    try {
        eventType = pp.getEventType();
    } catch(ex) {
        // should never happen ...
        throw new EvalError(
            "IllegalStateException could not determine parser state: "+ex+pp.getPositionDescription());
    }
    if( eventType != XmlPullParser.PROCESSING_INSTRUCTION ) {
        throw new SyntaxError(
            "IllegalStateException parser must be on processing instruction and not "
            +TYPES[ eventType ]+pp.getPositionDescription());
    }
    let PI = pp.getText();
    let pos = -1;
    for (let i = 0; i < PI.length(); i++) {
        if( isS(PI.charAt(i)) ) {
            pos = i;
        } else if(pos > 0) {
            return PI.substring(i);
        }
    }
    return "";
};

export const getPITarget = (pp) => {
    let eventType;
    try {
        eventType = pp.getEventType();
    } catch(ex) {
        // should never happen ...
        throw new EvalError(
            "XmlPullParserException could not determine parser state: "+ex+pp.getPositionDescription());
    }
    if( eventType !== PROCESSING_INSTRUCTION) {
        throw new SyntaxError(
            "IllegalStateException parser must be on processing instruction and not "
            + TYPES[ eventType ]+pp.getPositionDescription());
    }
    let PI = pp.getText();
    for (let i = 0; i < PI.length(); i++) {
        if( isS(PI.charCodeAt(i)) ) {
            // assert i > 0
            return PI.substring(0,i);
        }
    }
    return PI;
};

export const getRequiredAttributeValue = (pp, namespace, name) => {
    let value = pp.getAttributeValue(namespace, name);
    if (value === null) {
        throw new SyntaxError("XmlPullParserException required attribute "+name+" is not present");
    }
    return value;
};

export const matches = (pp, type, namespace, name) => {
    return type == pp.getEventType()
        && (namespace === null || namespace === pp.getNamespace())
        && (name === null || name === pp.getName ());
};

export const nextEndTag = (pp, namespace=null, name=null) => {
    if (namespace !== null && name !== null) {
        pp.nextTag();
        pp.require(END_TAG, namespace, name);
    } else {
        if(pp.nextTag() !== END_TAG) {
            throw new SyntaxError(
                "XmlPullParserException expected END_TAG and not"+pp.getPositionDescription());
        }
    }
};

export const nextStartTag = (pp, name=null, namespace=null) => {
    if (name !== null && namespace === null) {
        pp.nextTag();
        pp.require(START_TAG, null, name);
    } else if (name !== null && namespace !== null) {
        pp.nextTag();
        pp.require(START_TAG, namespace, name);
    } else {
        if (pp.nextTag() !== START_TAG) {
            throw new SyntaxError(
                "XmlPullParserException expected START_TAG and not " + pp.getPositionDescription());
        }
    }
};

export const nextText = (pp, namespace, name) => {
    if(name === null) {
        throw new ReferenceError("XmlPullParserException name for element can not be null");
    }
    pp.require(START_TAG, namespace, name);
    return pp.nextText();
};

export const skipSubTree = (pp) => {
    pp.require(START_TAG, null, null);
    let level = 1;
    while(level > 0) {
        let eventType = pp.next();
        if(eventType === END_TAG) {
            --level;
        } else if(eventType === START_TAG) {
            ++level;
        }
    }
};

export const writeSimpleElement = (serializer, namespace, elementName, elementText) => {
    if (elementName === null) {
        throw new SyntaxError("XmlPullParserException name for element can not be null");
    }
    serializer.startTag(namespace, elementName);
    if (elementText === null) {
        serializer.attribute(XSI_NS, "nil", "true");
    } else {
        serializer.text(elementText);
    }
    serializer.endTag(namespace, elementName);
};