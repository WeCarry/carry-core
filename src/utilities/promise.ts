export async function delay(interval: number): Promise<void> {
	return new Promise<void>(resolve => {
		setInterval(resolve, interval);
	});
}

export function any<T>(values: readonly (T | PromiseLike<T>)[]): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const errors: any[] = [];
    let len: any = values.map((p: any, i: number) => {
      return Promise.resolve(p).then(resolve, (e) => {
        return ((errors[i] = e), --len) || reject(errors);
      });
    }).length;
  });
}

export type AllSettledResult<T> = {
  status: 'fulfilled',
  value: T
} | {
  status: 'rejected',
  reason: any
}

export function allSettled<T>(values: readonly (T | PromiseLike<T>)[]): Promise<AllSettledResult<T>[]>;
export function allSettled<T1, T2>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]): Promise<[AllSettledResult<T1>, AllSettledResult<T2>]>;
export function allSettled<T1, T2, T3>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>]): Promise<[AllSettledResult<T1>, AllSettledResult<T2>, AllSettledResult<T3>]>;
export function allSettled<T1, T2, T3, T4>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>]): Promise<[AllSettledResult<T1>, AllSettledResult<T2>, AllSettledResult<T3>, AllSettledResult<T4>]>;
export function allSettled<T1, T2, T3, T4, T5>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>]): Promise<[AllSettledResult<T1>, AllSettledResult<T2>, AllSettledResult<T3>, AllSettledResult<T4>, AllSettledResult<T5>]>;
export function allSettled<T1, T2, T3, T4, T5, T6>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>]): Promise<[AllSettledResult<T1>, AllSettledResult<T2>, AllSettledResult<T3>, AllSettledResult<T4>, AllSettledResult<T5>, AllSettledResult<T6>]>;
export function allSettled<T1, T2, T3, T4, T5, T6, T7>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>]): Promise<[AllSettledResult<T1>, AllSettledResult<T2>, AllSettledResult<T3>, AllSettledResult<T4>, AllSettledResult<T5>, AllSettledResult<T6>, AllSettledResult<T7>]>;
export function allSettled<T1, T2, T3, T4, T5, T6, T7, T8>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>]): Promise<[AllSettledResult<T1>, AllSettledResult<T2>, AllSettledResult<T3>, AllSettledResult<T4>, AllSettledResult<T5>, AllSettledResult<T6>, AllSettledResult<T7>, AllSettledResult<T8>]>;
export function allSettled<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>]): Promise<[AllSettledResult<T1>, AllSettledResult<T2>, AllSettledResult<T3>, AllSettledResult<T4>, AllSettledResult<T5>, AllSettledResult<T6>, AllSettledResult<T7>, AllSettledResult<T8>, AllSettledResult<T9>]>;
export function allSettled<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike <T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>, T10 | PromiseLike<T10>]): Promise<[AllSettledResult<T1>, AllSettledResult<T2>, AllSettledResult<T3>, AllSettledResult<T4>, AllSettledResult<T5>, AllSettledResult<T6>, AllSettledResult<T7>, AllSettledResult<T8>, AllSettledResult<T9>, AllSettledResult<T10>]>;
export function allSettled(values: any): any {
  return Promise.all(
    values.map((promise: Promise<any>, i: any) =>
      promise
        .then((value: any) => ({
          status: "fulfilled",
          value,
        }))
        .catch((reason: any) => ({
          status: "rejected",
          reason,
        }))
    )
  );
}
