import { TransferState, inject, makeStateKey } from "@angular/core";

export const useAsyncTransferState = async <T>(
    name: string,
    fn: () => T
) => {
    const state = inject(TransferState);
    const key = makeStateKey<T>(name);
    const cache = state.get(key, null);
    if (cache) {
        return cache;
    }
    const data = await fn() as T;
    state.set(key, data);
    return data;
};