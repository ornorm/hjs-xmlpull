/** @babel */
import { XmlPullParserFactory } from "./v1";

export class XmlPullParserPool {

    constructor({ factory = XmlPullParserFactory.newInstance() } = {}) {
        if (factory === null) {
            throw new ReferenceError("IllegalArgumentException");
        }
        this.factory = factory;
        this.pool = [];
    }

    getPullParserFromPool() {
        let pp = null;
        if (this.pool.length > 0) {
            pp = this.pool.splice(this.pool.length - 1, this.pool.length);
        }
        if(pp === null) {
            pp = this.newParser();
        }
        return pp;
    }

    newParser() {
        return this.factory.newPullParser();
    }

    returnPullParserToPool(pp = null) {
        if(pp === null) {
            throw new ReferenceError("IllegalArgumentException");
        }
        this.pool.push(pp);
    }
}
