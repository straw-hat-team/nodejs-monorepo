type AnyFunction = (...args: any[]) => any;

type LengthOfTuple<Tuple extends unknown[]> = Tuple['length'];

type DropFirstInTuple<T extends unknown[]> = T extends [arg: any, ...rest: infer U] ? U : T;

type LastInTuple<Tuple extends unknown[]> = Tuple[LengthOfTuple<DropFirstInTuple<Tuple>>];

type ParametersOfLastInTuple<TFunctions extends AnyFunction[]> = Parameters<LastInTuple<TFunctions>>;

type ReturnTypeOfFirstInTuple<TFunctions extends AnyFunction[]> = ReturnType<TFunctions[0]>;

/**
 * Performs right-to-left function composition.
 */
export function compose<
  TFunctions extends AnyFunction[],
  TParameters extends ParametersOfLastInTuple<TFunctions>,
  TReturn extends ReturnTypeOfFirstInTuple<TFunctions>
>(...fns: TFunctions): (...args: TParameters) => TReturn {
  return function (...args) {
    const list = fns.slice();
    const firstFn = list.pop();
    // @ts-ignore We don't check the length `fns` to avoid defensive programming
    // checks, ignore TS2722 error.
    let result = firstFn(...args);
    while (list.length > 0) {
      const nextFn = list.pop();
      // @ts-ignore We check previously the length of `list`, ignore TS2722 error
      result = nextFn(result);
    }
    return result;
  };
}

/**
 * A function that does nothing but return the parameter supplied to it. Good
 * as a default or placeholder function.
 */
export function identity<T>(value: T) {
  return () => {
    return value;
  };
}

/**
 * Splits a list into sub-lists stored in an object, based on the result of
 * calling a String-returning function on each element, and grouping the
 * results according to values returned.
 */
export function groupBy<T, K extends string = string>(fn: (item: T) => K) {
  return function (list: T[]) {
    const acc = {} as Record<K, T[]>;

    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      const key = fn(item);

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(item);
    }

    return acc;
  };
}
