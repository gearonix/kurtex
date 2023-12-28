
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export abstract class IQuery {
    abstract getAllChannels(): Nullable<Nullable<RtcChannel>[]> | Promise<Nullable<Nullable<RtcChannel>[]>>;
}

export class RtcChannel {
    test?: Nullable<string>;
}

type Nullable<T> = T | null;
