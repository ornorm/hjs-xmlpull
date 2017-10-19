/** @babel */
import {XmlPullParserPool} from './lib/pool';
import * as utilities from './lib/utilities';
import {
    FEATURE_PROCESS_NAMESPACES,
    FEATURE_REPORT_NAMESPACE_ATTRIBUTES,
    FEATURE_PROCESS_DOCDECL,
    FEATURE_VALIDATION,
    START_DOCUMENT,
    END_DOCUMENT,
    START_TAG,
    END_TAG,
    TEXT,
    CDSECT,
    ENTITY_REF,
    IGNORABLE_WHITESPACE,
    PROCESSING_INSTRUCTION,
    COMMENT,
    DOCDECL,
    TYPES,
    NO_NAMESPACE,
    XmlPullParser,
    XmlSerializer,
    XmlPullParserFactory} from './lib/v1';

export {
    XmlPullParserPool,

    utilities,

    FEATURE_PROCESS_NAMESPACES,
    FEATURE_REPORT_NAMESPACE_ATTRIBUTES,
    FEATURE_PROCESS_DOCDECL,
    FEATURE_VALIDATION,
    START_DOCUMENT,
    END_DOCUMENT,
    START_TAG,
    END_TAG,
    TEXT,
    CDSECT,
    ENTITY_REF,
    IGNORABLE_WHITESPACE,
    PROCESSING_INSTRUCTION,
    COMMENT,
    DOCDECL,
    TYPES,
    NO_NAMESPACE,
    XmlPullParser,
    XmlSerializer,
    XmlPullParserFactory
}