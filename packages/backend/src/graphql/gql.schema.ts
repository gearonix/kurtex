
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export abstract class IQuery {
    abstract getAllChannels(): RtcChannel[] | Promise<RtcChannel[]>;
}

export class RtcChannel {
    id?: Nullable<string>;
    participants?: Nullable<Participant[]>;
}

export class Participant {
    accountId?: Nullable<string>;
    peerConnectionId: string;
}

type Nullable<T> = T | null;
