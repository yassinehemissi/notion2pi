
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Formula
 * 
 */
export type Formula = $Result.DefaultSelection<Prisma.$FormulaPayload>
/**
 * Model FormulaChunk
 * 
 */
export type FormulaChunk = $Result.DefaultSelection<Prisma.$FormulaChunkPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Formulas
 * const formulas = await prisma.formula.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Formulas
   * const formulas = await prisma.formula.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.formula`: Exposes CRUD operations for the **Formula** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Formulas
    * const formulas = await prisma.formula.findMany()
    * ```
    */
  get formula(): Prisma.FormulaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.formulaChunk`: Exposes CRUD operations for the **FormulaChunk** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FormulaChunks
    * const formulaChunks = await prisma.formulaChunk.findMany()
    * ```
    */
  get formulaChunk(): Prisma.FormulaChunkDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Formula: 'Formula',
    FormulaChunk: 'FormulaChunk'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "formula" | "formulaChunk"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Formula: {
        payload: Prisma.$FormulaPayload<ExtArgs>
        fields: Prisma.FormulaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FormulaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FormulaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaPayload>
          }
          findFirst: {
            args: Prisma.FormulaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FormulaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaPayload>
          }
          findMany: {
            args: Prisma.FormulaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaPayload>[]
          }
          create: {
            args: Prisma.FormulaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaPayload>
          }
          createMany: {
            args: Prisma.FormulaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FormulaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaPayload>[]
          }
          delete: {
            args: Prisma.FormulaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaPayload>
          }
          update: {
            args: Prisma.FormulaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaPayload>
          }
          deleteMany: {
            args: Prisma.FormulaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FormulaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FormulaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaPayload>[]
          }
          upsert: {
            args: Prisma.FormulaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaPayload>
          }
          aggregate: {
            args: Prisma.FormulaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFormula>
          }
          groupBy: {
            args: Prisma.FormulaGroupByArgs<ExtArgs>
            result: $Utils.Optional<FormulaGroupByOutputType>[]
          }
          count: {
            args: Prisma.FormulaCountArgs<ExtArgs>
            result: $Utils.Optional<FormulaCountAggregateOutputType> | number
          }
        }
      }
      FormulaChunk: {
        payload: Prisma.$FormulaChunkPayload<ExtArgs>
        fields: Prisma.FormulaChunkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FormulaChunkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaChunkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FormulaChunkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaChunkPayload>
          }
          findFirst: {
            args: Prisma.FormulaChunkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaChunkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FormulaChunkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaChunkPayload>
          }
          findMany: {
            args: Prisma.FormulaChunkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaChunkPayload>[]
          }
          create: {
            args: Prisma.FormulaChunkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaChunkPayload>
          }
          createMany: {
            args: Prisma.FormulaChunkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FormulaChunkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaChunkPayload>[]
          }
          delete: {
            args: Prisma.FormulaChunkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaChunkPayload>
          }
          update: {
            args: Prisma.FormulaChunkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaChunkPayload>
          }
          deleteMany: {
            args: Prisma.FormulaChunkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FormulaChunkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FormulaChunkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaChunkPayload>[]
          }
          upsert: {
            args: Prisma.FormulaChunkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormulaChunkPayload>
          }
          aggregate: {
            args: Prisma.FormulaChunkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFormulaChunk>
          }
          groupBy: {
            args: Prisma.FormulaChunkGroupByArgs<ExtArgs>
            result: $Utils.Optional<FormulaChunkGroupByOutputType>[]
          }
          count: {
            args: Prisma.FormulaChunkCountArgs<ExtArgs>
            result: $Utils.Optional<FormulaChunkCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    formula?: FormulaOmit
    formulaChunk?: FormulaChunkOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type FormulaCountOutputType
   */

  export type FormulaCountOutputType = {
    chunks: number
  }

  export type FormulaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chunks?: boolean | FormulaCountOutputTypeCountChunksArgs
  }

  // Custom InputTypes
  /**
   * FormulaCountOutputType without action
   */
  export type FormulaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormulaCountOutputType
     */
    select?: FormulaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FormulaCountOutputType without action
   */
  export type FormulaCountOutputTypeCountChunksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormulaChunkWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Formula
   */

  export type AggregateFormula = {
    _count: FormulaCountAggregateOutputType | null
    _avg: FormulaAvgAggregateOutputType | null
    _sum: FormulaSumAggregateOutputType | null
    _min: FormulaMinAggregateOutputType | null
    _max: FormulaMaxAggregateOutputType | null
  }

  export type FormulaAvgAggregateOutputType = {
    id: number | null
  }

  export type FormulaSumAggregateOutputType = {
    id: number | null
  }

  export type FormulaMinAggregateOutputType = {
    id: number | null
    slug: string | null
    formulaName: string | null
    latex: string | null
    category: string | null
    fullFormulaSevenVector: string | null
    operators: string | null
    babyDefinition: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FormulaMaxAggregateOutputType = {
    id: number | null
    slug: string | null
    formulaName: string | null
    latex: string | null
    category: string | null
    fullFormulaSevenVector: string | null
    operators: string | null
    babyDefinition: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FormulaCountAggregateOutputType = {
    id: number
    slug: number
    formulaName: number
    latex: number
    category: number
    fullFormulaSevenVector: number
    operators: number
    babyDefinition: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FormulaAvgAggregateInputType = {
    id?: true
  }

  export type FormulaSumAggregateInputType = {
    id?: true
  }

  export type FormulaMinAggregateInputType = {
    id?: true
    slug?: true
    formulaName?: true
    latex?: true
    category?: true
    fullFormulaSevenVector?: true
    operators?: true
    babyDefinition?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FormulaMaxAggregateInputType = {
    id?: true
    slug?: true
    formulaName?: true
    latex?: true
    category?: true
    fullFormulaSevenVector?: true
    operators?: true
    babyDefinition?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FormulaCountAggregateInputType = {
    id?: true
    slug?: true
    formulaName?: true
    latex?: true
    category?: true
    fullFormulaSevenVector?: true
    operators?: true
    babyDefinition?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FormulaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Formula to aggregate.
     */
    where?: FormulaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Formulas to fetch.
     */
    orderBy?: FormulaOrderByWithRelationInput | FormulaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FormulaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Formulas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Formulas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Formulas
    **/
    _count?: true | FormulaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FormulaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FormulaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FormulaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FormulaMaxAggregateInputType
  }

  export type GetFormulaAggregateType<T extends FormulaAggregateArgs> = {
        [P in keyof T & keyof AggregateFormula]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFormula[P]>
      : GetScalarType<T[P], AggregateFormula[P]>
  }




  export type FormulaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormulaWhereInput
    orderBy?: FormulaOrderByWithAggregationInput | FormulaOrderByWithAggregationInput[]
    by: FormulaScalarFieldEnum[] | FormulaScalarFieldEnum
    having?: FormulaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FormulaCountAggregateInputType | true
    _avg?: FormulaAvgAggregateInputType
    _sum?: FormulaSumAggregateInputType
    _min?: FormulaMinAggregateInputType
    _max?: FormulaMaxAggregateInputType
  }

  export type FormulaGroupByOutputType = {
    id: number
    slug: string
    formulaName: string
    latex: string
    category: string
    fullFormulaSevenVector: string
    operators: string
    babyDefinition: string | null
    createdAt: Date
    updatedAt: Date
    _count: FormulaCountAggregateOutputType | null
    _avg: FormulaAvgAggregateOutputType | null
    _sum: FormulaSumAggregateOutputType | null
    _min: FormulaMinAggregateOutputType | null
    _max: FormulaMaxAggregateOutputType | null
  }

  type GetFormulaGroupByPayload<T extends FormulaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FormulaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FormulaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FormulaGroupByOutputType[P]>
            : GetScalarType<T[P], FormulaGroupByOutputType[P]>
        }
      >
    >


  export type FormulaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    formulaName?: boolean
    latex?: boolean
    category?: boolean
    fullFormulaSevenVector?: boolean
    operators?: boolean
    babyDefinition?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    chunks?: boolean | Formula$chunksArgs<ExtArgs>
    _count?: boolean | FormulaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["formula"]>

  export type FormulaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    formulaName?: boolean
    latex?: boolean
    category?: boolean
    fullFormulaSevenVector?: boolean
    operators?: boolean
    babyDefinition?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["formula"]>

  export type FormulaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    formulaName?: boolean
    latex?: boolean
    category?: boolean
    fullFormulaSevenVector?: boolean
    operators?: boolean
    babyDefinition?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["formula"]>

  export type FormulaSelectScalar = {
    id?: boolean
    slug?: boolean
    formulaName?: boolean
    latex?: boolean
    category?: boolean
    fullFormulaSevenVector?: boolean
    operators?: boolean
    babyDefinition?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FormulaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "formulaName" | "latex" | "category" | "fullFormulaSevenVector" | "operators" | "babyDefinition" | "createdAt" | "updatedAt", ExtArgs["result"]["formula"]>
  export type FormulaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chunks?: boolean | Formula$chunksArgs<ExtArgs>
    _count?: boolean | FormulaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FormulaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type FormulaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FormulaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Formula"
    objects: {
      chunks: Prisma.$FormulaChunkPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      slug: string
      formulaName: string
      latex: string
      category: string
      fullFormulaSevenVector: string
      operators: string
      babyDefinition: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["formula"]>
    composites: {}
  }

  type FormulaGetPayload<S extends boolean | null | undefined | FormulaDefaultArgs> = $Result.GetResult<Prisma.$FormulaPayload, S>

  type FormulaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FormulaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FormulaCountAggregateInputType | true
    }

  export interface FormulaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Formula'], meta: { name: 'Formula' } }
    /**
     * Find zero or one Formula that matches the filter.
     * @param {FormulaFindUniqueArgs} args - Arguments to find a Formula
     * @example
     * // Get one Formula
     * const formula = await prisma.formula.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FormulaFindUniqueArgs>(args: SelectSubset<T, FormulaFindUniqueArgs<ExtArgs>>): Prisma__FormulaClient<$Result.GetResult<Prisma.$FormulaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Formula that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FormulaFindUniqueOrThrowArgs} args - Arguments to find a Formula
     * @example
     * // Get one Formula
     * const formula = await prisma.formula.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FormulaFindUniqueOrThrowArgs>(args: SelectSubset<T, FormulaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FormulaClient<$Result.GetResult<Prisma.$FormulaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Formula that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormulaFindFirstArgs} args - Arguments to find a Formula
     * @example
     * // Get one Formula
     * const formula = await prisma.formula.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FormulaFindFirstArgs>(args?: SelectSubset<T, FormulaFindFirstArgs<ExtArgs>>): Prisma__FormulaClient<$Result.GetResult<Prisma.$FormulaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Formula that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormulaFindFirstOrThrowArgs} args - Arguments to find a Formula
     * @example
     * // Get one Formula
     * const formula = await prisma.formula.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FormulaFindFirstOrThrowArgs>(args?: SelectSubset<T, FormulaFindFirstOrThrowArgs<ExtArgs>>): Prisma__FormulaClient<$Result.GetResult<Prisma.$FormulaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Formulas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormulaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Formulas
     * const formulas = await prisma.formula.findMany()
     * 
     * // Get first 10 Formulas
     * const formulas = await prisma.formula.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const formulaWithIdOnly = await prisma.formula.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FormulaFindManyArgs>(args?: SelectSubset<T, FormulaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormulaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Formula.
     * @param {FormulaCreateArgs} args - Arguments to create a Formula.
     * @example
     * // Create one Formula
     * const Formula = await prisma.formula.create({
     *   data: {
     *     // ... data to create a Formula
     *   }
     * })
     * 
     */
    create<T extends FormulaCreateArgs>(args: SelectSubset<T, FormulaCreateArgs<ExtArgs>>): Prisma__FormulaClient<$Result.GetResult<Prisma.$FormulaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Formulas.
     * @param {FormulaCreateManyArgs} args - Arguments to create many Formulas.
     * @example
     * // Create many Formulas
     * const formula = await prisma.formula.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FormulaCreateManyArgs>(args?: SelectSubset<T, FormulaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Formulas and returns the data saved in the database.
     * @param {FormulaCreateManyAndReturnArgs} args - Arguments to create many Formulas.
     * @example
     * // Create many Formulas
     * const formula = await prisma.formula.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Formulas and only return the `id`
     * const formulaWithIdOnly = await prisma.formula.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FormulaCreateManyAndReturnArgs>(args?: SelectSubset<T, FormulaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormulaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Formula.
     * @param {FormulaDeleteArgs} args - Arguments to delete one Formula.
     * @example
     * // Delete one Formula
     * const Formula = await prisma.formula.delete({
     *   where: {
     *     // ... filter to delete one Formula
     *   }
     * })
     * 
     */
    delete<T extends FormulaDeleteArgs>(args: SelectSubset<T, FormulaDeleteArgs<ExtArgs>>): Prisma__FormulaClient<$Result.GetResult<Prisma.$FormulaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Formula.
     * @param {FormulaUpdateArgs} args - Arguments to update one Formula.
     * @example
     * // Update one Formula
     * const formula = await prisma.formula.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FormulaUpdateArgs>(args: SelectSubset<T, FormulaUpdateArgs<ExtArgs>>): Prisma__FormulaClient<$Result.GetResult<Prisma.$FormulaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Formulas.
     * @param {FormulaDeleteManyArgs} args - Arguments to filter Formulas to delete.
     * @example
     * // Delete a few Formulas
     * const { count } = await prisma.formula.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FormulaDeleteManyArgs>(args?: SelectSubset<T, FormulaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Formulas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormulaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Formulas
     * const formula = await prisma.formula.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FormulaUpdateManyArgs>(args: SelectSubset<T, FormulaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Formulas and returns the data updated in the database.
     * @param {FormulaUpdateManyAndReturnArgs} args - Arguments to update many Formulas.
     * @example
     * // Update many Formulas
     * const formula = await prisma.formula.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Formulas and only return the `id`
     * const formulaWithIdOnly = await prisma.formula.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FormulaUpdateManyAndReturnArgs>(args: SelectSubset<T, FormulaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormulaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Formula.
     * @param {FormulaUpsertArgs} args - Arguments to update or create a Formula.
     * @example
     * // Update or create a Formula
     * const formula = await prisma.formula.upsert({
     *   create: {
     *     // ... data to create a Formula
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Formula we want to update
     *   }
     * })
     */
    upsert<T extends FormulaUpsertArgs>(args: SelectSubset<T, FormulaUpsertArgs<ExtArgs>>): Prisma__FormulaClient<$Result.GetResult<Prisma.$FormulaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Formulas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormulaCountArgs} args - Arguments to filter Formulas to count.
     * @example
     * // Count the number of Formulas
     * const count = await prisma.formula.count({
     *   where: {
     *     // ... the filter for the Formulas we want to count
     *   }
     * })
    **/
    count<T extends FormulaCountArgs>(
      args?: Subset<T, FormulaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FormulaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Formula.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormulaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FormulaAggregateArgs>(args: Subset<T, FormulaAggregateArgs>): Prisma.PrismaPromise<GetFormulaAggregateType<T>>

    /**
     * Group by Formula.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormulaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FormulaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FormulaGroupByArgs['orderBy'] }
        : { orderBy?: FormulaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FormulaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFormulaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Formula model
   */
  readonly fields: FormulaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Formula.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FormulaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chunks<T extends Formula$chunksArgs<ExtArgs> = {}>(args?: Subset<T, Formula$chunksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormulaChunkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Formula model
   */
  interface FormulaFieldRefs {
    readonly id: FieldRef<"Formula", 'Int'>
    readonly slug: FieldRef<"Formula", 'String'>
    readonly formulaName: FieldRef<"Formula", 'String'>
    readonly latex: FieldRef<"Formula", 'String'>
    readonly category: FieldRef<"Formula", 'String'>
    readonly fullFormulaSevenVector: FieldRef<"Formula", 'String'>
    readonly operators: FieldRef<"Formula", 'String'>
    readonly babyDefinition: FieldRef<"Formula", 'String'>
    readonly createdAt: FieldRef<"Formula", 'DateTime'>
    readonly updatedAt: FieldRef<"Formula", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Formula findUnique
   */
  export type FormulaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formula
     */
    select?: FormulaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formula
     */
    omit?: FormulaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaInclude<ExtArgs> | null
    /**
     * Filter, which Formula to fetch.
     */
    where: FormulaWhereUniqueInput
  }

  /**
   * Formula findUniqueOrThrow
   */
  export type FormulaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formula
     */
    select?: FormulaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formula
     */
    omit?: FormulaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaInclude<ExtArgs> | null
    /**
     * Filter, which Formula to fetch.
     */
    where: FormulaWhereUniqueInput
  }

  /**
   * Formula findFirst
   */
  export type FormulaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formula
     */
    select?: FormulaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formula
     */
    omit?: FormulaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaInclude<ExtArgs> | null
    /**
     * Filter, which Formula to fetch.
     */
    where?: FormulaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Formulas to fetch.
     */
    orderBy?: FormulaOrderByWithRelationInput | FormulaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Formulas.
     */
    cursor?: FormulaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Formulas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Formulas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Formulas.
     */
    distinct?: FormulaScalarFieldEnum | FormulaScalarFieldEnum[]
  }

  /**
   * Formula findFirstOrThrow
   */
  export type FormulaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formula
     */
    select?: FormulaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formula
     */
    omit?: FormulaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaInclude<ExtArgs> | null
    /**
     * Filter, which Formula to fetch.
     */
    where?: FormulaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Formulas to fetch.
     */
    orderBy?: FormulaOrderByWithRelationInput | FormulaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Formulas.
     */
    cursor?: FormulaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Formulas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Formulas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Formulas.
     */
    distinct?: FormulaScalarFieldEnum | FormulaScalarFieldEnum[]
  }

  /**
   * Formula findMany
   */
  export type FormulaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formula
     */
    select?: FormulaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formula
     */
    omit?: FormulaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaInclude<ExtArgs> | null
    /**
     * Filter, which Formulas to fetch.
     */
    where?: FormulaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Formulas to fetch.
     */
    orderBy?: FormulaOrderByWithRelationInput | FormulaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Formulas.
     */
    cursor?: FormulaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Formulas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Formulas.
     */
    skip?: number
    distinct?: FormulaScalarFieldEnum | FormulaScalarFieldEnum[]
  }

  /**
   * Formula create
   */
  export type FormulaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formula
     */
    select?: FormulaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formula
     */
    omit?: FormulaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaInclude<ExtArgs> | null
    /**
     * The data needed to create a Formula.
     */
    data: XOR<FormulaCreateInput, FormulaUncheckedCreateInput>
  }

  /**
   * Formula createMany
   */
  export type FormulaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Formulas.
     */
    data: FormulaCreateManyInput | FormulaCreateManyInput[]
  }

  /**
   * Formula createManyAndReturn
   */
  export type FormulaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formula
     */
    select?: FormulaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Formula
     */
    omit?: FormulaOmit<ExtArgs> | null
    /**
     * The data used to create many Formulas.
     */
    data: FormulaCreateManyInput | FormulaCreateManyInput[]
  }

  /**
   * Formula update
   */
  export type FormulaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formula
     */
    select?: FormulaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formula
     */
    omit?: FormulaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaInclude<ExtArgs> | null
    /**
     * The data needed to update a Formula.
     */
    data: XOR<FormulaUpdateInput, FormulaUncheckedUpdateInput>
    /**
     * Choose, which Formula to update.
     */
    where: FormulaWhereUniqueInput
  }

  /**
   * Formula updateMany
   */
  export type FormulaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Formulas.
     */
    data: XOR<FormulaUpdateManyMutationInput, FormulaUncheckedUpdateManyInput>
    /**
     * Filter which Formulas to update
     */
    where?: FormulaWhereInput
    /**
     * Limit how many Formulas to update.
     */
    limit?: number
  }

  /**
   * Formula updateManyAndReturn
   */
  export type FormulaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formula
     */
    select?: FormulaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Formula
     */
    omit?: FormulaOmit<ExtArgs> | null
    /**
     * The data used to update Formulas.
     */
    data: XOR<FormulaUpdateManyMutationInput, FormulaUncheckedUpdateManyInput>
    /**
     * Filter which Formulas to update
     */
    where?: FormulaWhereInput
    /**
     * Limit how many Formulas to update.
     */
    limit?: number
  }

  /**
   * Formula upsert
   */
  export type FormulaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formula
     */
    select?: FormulaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formula
     */
    omit?: FormulaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaInclude<ExtArgs> | null
    /**
     * The filter to search for the Formula to update in case it exists.
     */
    where: FormulaWhereUniqueInput
    /**
     * In case the Formula found by the `where` argument doesn't exist, create a new Formula with this data.
     */
    create: XOR<FormulaCreateInput, FormulaUncheckedCreateInput>
    /**
     * In case the Formula was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FormulaUpdateInput, FormulaUncheckedUpdateInput>
  }

  /**
   * Formula delete
   */
  export type FormulaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formula
     */
    select?: FormulaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formula
     */
    omit?: FormulaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaInclude<ExtArgs> | null
    /**
     * Filter which Formula to delete.
     */
    where: FormulaWhereUniqueInput
  }

  /**
   * Formula deleteMany
   */
  export type FormulaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Formulas to delete
     */
    where?: FormulaWhereInput
    /**
     * Limit how many Formulas to delete.
     */
    limit?: number
  }

  /**
   * Formula.chunks
   */
  export type Formula$chunksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormulaChunk
     */
    select?: FormulaChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormulaChunk
     */
    omit?: FormulaChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaChunkInclude<ExtArgs> | null
    where?: FormulaChunkWhereInput
    orderBy?: FormulaChunkOrderByWithRelationInput | FormulaChunkOrderByWithRelationInput[]
    cursor?: FormulaChunkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FormulaChunkScalarFieldEnum | FormulaChunkScalarFieldEnum[]
  }

  /**
   * Formula without action
   */
  export type FormulaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Formula
     */
    select?: FormulaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Formula
     */
    omit?: FormulaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaInclude<ExtArgs> | null
  }


  /**
   * Model FormulaChunk
   */

  export type AggregateFormulaChunk = {
    _count: FormulaChunkCountAggregateOutputType | null
    _avg: FormulaChunkAvgAggregateOutputType | null
    _sum: FormulaChunkSumAggregateOutputType | null
    _min: FormulaChunkMinAggregateOutputType | null
    _max: FormulaChunkMaxAggregateOutputType | null
  }

  export type FormulaChunkAvgAggregateOutputType = {
    id: number | null
    formulaId: number | null
    chunkOrder: number | null
  }

  export type FormulaChunkSumAggregateOutputType = {
    id: number | null
    formulaId: number | null
    chunkOrder: number | null
  }

  export type FormulaChunkMinAggregateOutputType = {
    id: number | null
    formulaId: number | null
    chunkOrder: number | null
    chunk: string | null
    displayName: string | null
    sevenVector: string | null
    babyDefinition: string | null
  }

  export type FormulaChunkMaxAggregateOutputType = {
    id: number | null
    formulaId: number | null
    chunkOrder: number | null
    chunk: string | null
    displayName: string | null
    sevenVector: string | null
    babyDefinition: string | null
  }

  export type FormulaChunkCountAggregateOutputType = {
    id: number
    formulaId: number
    chunkOrder: number
    chunk: number
    displayName: number
    sevenVector: number
    babyDefinition: number
    _all: number
  }


  export type FormulaChunkAvgAggregateInputType = {
    id?: true
    formulaId?: true
    chunkOrder?: true
  }

  export type FormulaChunkSumAggregateInputType = {
    id?: true
    formulaId?: true
    chunkOrder?: true
  }

  export type FormulaChunkMinAggregateInputType = {
    id?: true
    formulaId?: true
    chunkOrder?: true
    chunk?: true
    displayName?: true
    sevenVector?: true
    babyDefinition?: true
  }

  export type FormulaChunkMaxAggregateInputType = {
    id?: true
    formulaId?: true
    chunkOrder?: true
    chunk?: true
    displayName?: true
    sevenVector?: true
    babyDefinition?: true
  }

  export type FormulaChunkCountAggregateInputType = {
    id?: true
    formulaId?: true
    chunkOrder?: true
    chunk?: true
    displayName?: true
    sevenVector?: true
    babyDefinition?: true
    _all?: true
  }

  export type FormulaChunkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FormulaChunk to aggregate.
     */
    where?: FormulaChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormulaChunks to fetch.
     */
    orderBy?: FormulaChunkOrderByWithRelationInput | FormulaChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FormulaChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormulaChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormulaChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FormulaChunks
    **/
    _count?: true | FormulaChunkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FormulaChunkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FormulaChunkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FormulaChunkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FormulaChunkMaxAggregateInputType
  }

  export type GetFormulaChunkAggregateType<T extends FormulaChunkAggregateArgs> = {
        [P in keyof T & keyof AggregateFormulaChunk]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFormulaChunk[P]>
      : GetScalarType<T[P], AggregateFormulaChunk[P]>
  }




  export type FormulaChunkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormulaChunkWhereInput
    orderBy?: FormulaChunkOrderByWithAggregationInput | FormulaChunkOrderByWithAggregationInput[]
    by: FormulaChunkScalarFieldEnum[] | FormulaChunkScalarFieldEnum
    having?: FormulaChunkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FormulaChunkCountAggregateInputType | true
    _avg?: FormulaChunkAvgAggregateInputType
    _sum?: FormulaChunkSumAggregateInputType
    _min?: FormulaChunkMinAggregateInputType
    _max?: FormulaChunkMaxAggregateInputType
  }

  export type FormulaChunkGroupByOutputType = {
    id: number
    formulaId: number
    chunkOrder: number
    chunk: string
    displayName: string
    sevenVector: string
    babyDefinition: string | null
    _count: FormulaChunkCountAggregateOutputType | null
    _avg: FormulaChunkAvgAggregateOutputType | null
    _sum: FormulaChunkSumAggregateOutputType | null
    _min: FormulaChunkMinAggregateOutputType | null
    _max: FormulaChunkMaxAggregateOutputType | null
  }

  type GetFormulaChunkGroupByPayload<T extends FormulaChunkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FormulaChunkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FormulaChunkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FormulaChunkGroupByOutputType[P]>
            : GetScalarType<T[P], FormulaChunkGroupByOutputType[P]>
        }
      >
    >


  export type FormulaChunkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    formulaId?: boolean
    chunkOrder?: boolean
    chunk?: boolean
    displayName?: boolean
    sevenVector?: boolean
    babyDefinition?: boolean
    formula?: boolean | FormulaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["formulaChunk"]>

  export type FormulaChunkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    formulaId?: boolean
    chunkOrder?: boolean
    chunk?: boolean
    displayName?: boolean
    sevenVector?: boolean
    babyDefinition?: boolean
    formula?: boolean | FormulaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["formulaChunk"]>

  export type FormulaChunkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    formulaId?: boolean
    chunkOrder?: boolean
    chunk?: boolean
    displayName?: boolean
    sevenVector?: boolean
    babyDefinition?: boolean
    formula?: boolean | FormulaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["formulaChunk"]>

  export type FormulaChunkSelectScalar = {
    id?: boolean
    formulaId?: boolean
    chunkOrder?: boolean
    chunk?: boolean
    displayName?: boolean
    sevenVector?: boolean
    babyDefinition?: boolean
  }

  export type FormulaChunkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "formulaId" | "chunkOrder" | "chunk" | "displayName" | "sevenVector" | "babyDefinition", ExtArgs["result"]["formulaChunk"]>
  export type FormulaChunkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    formula?: boolean | FormulaDefaultArgs<ExtArgs>
  }
  export type FormulaChunkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    formula?: boolean | FormulaDefaultArgs<ExtArgs>
  }
  export type FormulaChunkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    formula?: boolean | FormulaDefaultArgs<ExtArgs>
  }

  export type $FormulaChunkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FormulaChunk"
    objects: {
      formula: Prisma.$FormulaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      formulaId: number
      chunkOrder: number
      chunk: string
      displayName: string
      sevenVector: string
      babyDefinition: string | null
    }, ExtArgs["result"]["formulaChunk"]>
    composites: {}
  }

  type FormulaChunkGetPayload<S extends boolean | null | undefined | FormulaChunkDefaultArgs> = $Result.GetResult<Prisma.$FormulaChunkPayload, S>

  type FormulaChunkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FormulaChunkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FormulaChunkCountAggregateInputType | true
    }

  export interface FormulaChunkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FormulaChunk'], meta: { name: 'FormulaChunk' } }
    /**
     * Find zero or one FormulaChunk that matches the filter.
     * @param {FormulaChunkFindUniqueArgs} args - Arguments to find a FormulaChunk
     * @example
     * // Get one FormulaChunk
     * const formulaChunk = await prisma.formulaChunk.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FormulaChunkFindUniqueArgs>(args: SelectSubset<T, FormulaChunkFindUniqueArgs<ExtArgs>>): Prisma__FormulaChunkClient<$Result.GetResult<Prisma.$FormulaChunkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FormulaChunk that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FormulaChunkFindUniqueOrThrowArgs} args - Arguments to find a FormulaChunk
     * @example
     * // Get one FormulaChunk
     * const formulaChunk = await prisma.formulaChunk.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FormulaChunkFindUniqueOrThrowArgs>(args: SelectSubset<T, FormulaChunkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FormulaChunkClient<$Result.GetResult<Prisma.$FormulaChunkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FormulaChunk that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormulaChunkFindFirstArgs} args - Arguments to find a FormulaChunk
     * @example
     * // Get one FormulaChunk
     * const formulaChunk = await prisma.formulaChunk.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FormulaChunkFindFirstArgs>(args?: SelectSubset<T, FormulaChunkFindFirstArgs<ExtArgs>>): Prisma__FormulaChunkClient<$Result.GetResult<Prisma.$FormulaChunkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FormulaChunk that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormulaChunkFindFirstOrThrowArgs} args - Arguments to find a FormulaChunk
     * @example
     * // Get one FormulaChunk
     * const formulaChunk = await prisma.formulaChunk.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FormulaChunkFindFirstOrThrowArgs>(args?: SelectSubset<T, FormulaChunkFindFirstOrThrowArgs<ExtArgs>>): Prisma__FormulaChunkClient<$Result.GetResult<Prisma.$FormulaChunkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FormulaChunks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormulaChunkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FormulaChunks
     * const formulaChunks = await prisma.formulaChunk.findMany()
     * 
     * // Get first 10 FormulaChunks
     * const formulaChunks = await prisma.formulaChunk.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const formulaChunkWithIdOnly = await prisma.formulaChunk.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FormulaChunkFindManyArgs>(args?: SelectSubset<T, FormulaChunkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormulaChunkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FormulaChunk.
     * @param {FormulaChunkCreateArgs} args - Arguments to create a FormulaChunk.
     * @example
     * // Create one FormulaChunk
     * const FormulaChunk = await prisma.formulaChunk.create({
     *   data: {
     *     // ... data to create a FormulaChunk
     *   }
     * })
     * 
     */
    create<T extends FormulaChunkCreateArgs>(args: SelectSubset<T, FormulaChunkCreateArgs<ExtArgs>>): Prisma__FormulaChunkClient<$Result.GetResult<Prisma.$FormulaChunkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FormulaChunks.
     * @param {FormulaChunkCreateManyArgs} args - Arguments to create many FormulaChunks.
     * @example
     * // Create many FormulaChunks
     * const formulaChunk = await prisma.formulaChunk.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FormulaChunkCreateManyArgs>(args?: SelectSubset<T, FormulaChunkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FormulaChunks and returns the data saved in the database.
     * @param {FormulaChunkCreateManyAndReturnArgs} args - Arguments to create many FormulaChunks.
     * @example
     * // Create many FormulaChunks
     * const formulaChunk = await prisma.formulaChunk.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FormulaChunks and only return the `id`
     * const formulaChunkWithIdOnly = await prisma.formulaChunk.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FormulaChunkCreateManyAndReturnArgs>(args?: SelectSubset<T, FormulaChunkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormulaChunkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FormulaChunk.
     * @param {FormulaChunkDeleteArgs} args - Arguments to delete one FormulaChunk.
     * @example
     * // Delete one FormulaChunk
     * const FormulaChunk = await prisma.formulaChunk.delete({
     *   where: {
     *     // ... filter to delete one FormulaChunk
     *   }
     * })
     * 
     */
    delete<T extends FormulaChunkDeleteArgs>(args: SelectSubset<T, FormulaChunkDeleteArgs<ExtArgs>>): Prisma__FormulaChunkClient<$Result.GetResult<Prisma.$FormulaChunkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FormulaChunk.
     * @param {FormulaChunkUpdateArgs} args - Arguments to update one FormulaChunk.
     * @example
     * // Update one FormulaChunk
     * const formulaChunk = await prisma.formulaChunk.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FormulaChunkUpdateArgs>(args: SelectSubset<T, FormulaChunkUpdateArgs<ExtArgs>>): Prisma__FormulaChunkClient<$Result.GetResult<Prisma.$FormulaChunkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FormulaChunks.
     * @param {FormulaChunkDeleteManyArgs} args - Arguments to filter FormulaChunks to delete.
     * @example
     * // Delete a few FormulaChunks
     * const { count } = await prisma.formulaChunk.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FormulaChunkDeleteManyArgs>(args?: SelectSubset<T, FormulaChunkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FormulaChunks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormulaChunkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FormulaChunks
     * const formulaChunk = await prisma.formulaChunk.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FormulaChunkUpdateManyArgs>(args: SelectSubset<T, FormulaChunkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FormulaChunks and returns the data updated in the database.
     * @param {FormulaChunkUpdateManyAndReturnArgs} args - Arguments to update many FormulaChunks.
     * @example
     * // Update many FormulaChunks
     * const formulaChunk = await prisma.formulaChunk.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FormulaChunks and only return the `id`
     * const formulaChunkWithIdOnly = await prisma.formulaChunk.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FormulaChunkUpdateManyAndReturnArgs>(args: SelectSubset<T, FormulaChunkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormulaChunkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FormulaChunk.
     * @param {FormulaChunkUpsertArgs} args - Arguments to update or create a FormulaChunk.
     * @example
     * // Update or create a FormulaChunk
     * const formulaChunk = await prisma.formulaChunk.upsert({
     *   create: {
     *     // ... data to create a FormulaChunk
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FormulaChunk we want to update
     *   }
     * })
     */
    upsert<T extends FormulaChunkUpsertArgs>(args: SelectSubset<T, FormulaChunkUpsertArgs<ExtArgs>>): Prisma__FormulaChunkClient<$Result.GetResult<Prisma.$FormulaChunkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FormulaChunks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormulaChunkCountArgs} args - Arguments to filter FormulaChunks to count.
     * @example
     * // Count the number of FormulaChunks
     * const count = await prisma.formulaChunk.count({
     *   where: {
     *     // ... the filter for the FormulaChunks we want to count
     *   }
     * })
    **/
    count<T extends FormulaChunkCountArgs>(
      args?: Subset<T, FormulaChunkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FormulaChunkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FormulaChunk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormulaChunkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FormulaChunkAggregateArgs>(args: Subset<T, FormulaChunkAggregateArgs>): Prisma.PrismaPromise<GetFormulaChunkAggregateType<T>>

    /**
     * Group by FormulaChunk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormulaChunkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FormulaChunkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FormulaChunkGroupByArgs['orderBy'] }
        : { orderBy?: FormulaChunkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FormulaChunkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFormulaChunkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FormulaChunk model
   */
  readonly fields: FormulaChunkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FormulaChunk.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FormulaChunkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    formula<T extends FormulaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FormulaDefaultArgs<ExtArgs>>): Prisma__FormulaClient<$Result.GetResult<Prisma.$FormulaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FormulaChunk model
   */
  interface FormulaChunkFieldRefs {
    readonly id: FieldRef<"FormulaChunk", 'Int'>
    readonly formulaId: FieldRef<"FormulaChunk", 'Int'>
    readonly chunkOrder: FieldRef<"FormulaChunk", 'Int'>
    readonly chunk: FieldRef<"FormulaChunk", 'String'>
    readonly displayName: FieldRef<"FormulaChunk", 'String'>
    readonly sevenVector: FieldRef<"FormulaChunk", 'String'>
    readonly babyDefinition: FieldRef<"FormulaChunk", 'String'>
  }
    

  // Custom InputTypes
  /**
   * FormulaChunk findUnique
   */
  export type FormulaChunkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormulaChunk
     */
    select?: FormulaChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormulaChunk
     */
    omit?: FormulaChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaChunkInclude<ExtArgs> | null
    /**
     * Filter, which FormulaChunk to fetch.
     */
    where: FormulaChunkWhereUniqueInput
  }

  /**
   * FormulaChunk findUniqueOrThrow
   */
  export type FormulaChunkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormulaChunk
     */
    select?: FormulaChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormulaChunk
     */
    omit?: FormulaChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaChunkInclude<ExtArgs> | null
    /**
     * Filter, which FormulaChunk to fetch.
     */
    where: FormulaChunkWhereUniqueInput
  }

  /**
   * FormulaChunk findFirst
   */
  export type FormulaChunkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormulaChunk
     */
    select?: FormulaChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormulaChunk
     */
    omit?: FormulaChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaChunkInclude<ExtArgs> | null
    /**
     * Filter, which FormulaChunk to fetch.
     */
    where?: FormulaChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormulaChunks to fetch.
     */
    orderBy?: FormulaChunkOrderByWithRelationInput | FormulaChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FormulaChunks.
     */
    cursor?: FormulaChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormulaChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormulaChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FormulaChunks.
     */
    distinct?: FormulaChunkScalarFieldEnum | FormulaChunkScalarFieldEnum[]
  }

  /**
   * FormulaChunk findFirstOrThrow
   */
  export type FormulaChunkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormulaChunk
     */
    select?: FormulaChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormulaChunk
     */
    omit?: FormulaChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaChunkInclude<ExtArgs> | null
    /**
     * Filter, which FormulaChunk to fetch.
     */
    where?: FormulaChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormulaChunks to fetch.
     */
    orderBy?: FormulaChunkOrderByWithRelationInput | FormulaChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FormulaChunks.
     */
    cursor?: FormulaChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormulaChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormulaChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FormulaChunks.
     */
    distinct?: FormulaChunkScalarFieldEnum | FormulaChunkScalarFieldEnum[]
  }

  /**
   * FormulaChunk findMany
   */
  export type FormulaChunkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormulaChunk
     */
    select?: FormulaChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormulaChunk
     */
    omit?: FormulaChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaChunkInclude<ExtArgs> | null
    /**
     * Filter, which FormulaChunks to fetch.
     */
    where?: FormulaChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormulaChunks to fetch.
     */
    orderBy?: FormulaChunkOrderByWithRelationInput | FormulaChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FormulaChunks.
     */
    cursor?: FormulaChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormulaChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormulaChunks.
     */
    skip?: number
    distinct?: FormulaChunkScalarFieldEnum | FormulaChunkScalarFieldEnum[]
  }

  /**
   * FormulaChunk create
   */
  export type FormulaChunkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormulaChunk
     */
    select?: FormulaChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormulaChunk
     */
    omit?: FormulaChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaChunkInclude<ExtArgs> | null
    /**
     * The data needed to create a FormulaChunk.
     */
    data: XOR<FormulaChunkCreateInput, FormulaChunkUncheckedCreateInput>
  }

  /**
   * FormulaChunk createMany
   */
  export type FormulaChunkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FormulaChunks.
     */
    data: FormulaChunkCreateManyInput | FormulaChunkCreateManyInput[]
  }

  /**
   * FormulaChunk createManyAndReturn
   */
  export type FormulaChunkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormulaChunk
     */
    select?: FormulaChunkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FormulaChunk
     */
    omit?: FormulaChunkOmit<ExtArgs> | null
    /**
     * The data used to create many FormulaChunks.
     */
    data: FormulaChunkCreateManyInput | FormulaChunkCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaChunkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FormulaChunk update
   */
  export type FormulaChunkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormulaChunk
     */
    select?: FormulaChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormulaChunk
     */
    omit?: FormulaChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaChunkInclude<ExtArgs> | null
    /**
     * The data needed to update a FormulaChunk.
     */
    data: XOR<FormulaChunkUpdateInput, FormulaChunkUncheckedUpdateInput>
    /**
     * Choose, which FormulaChunk to update.
     */
    where: FormulaChunkWhereUniqueInput
  }

  /**
   * FormulaChunk updateMany
   */
  export type FormulaChunkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FormulaChunks.
     */
    data: XOR<FormulaChunkUpdateManyMutationInput, FormulaChunkUncheckedUpdateManyInput>
    /**
     * Filter which FormulaChunks to update
     */
    where?: FormulaChunkWhereInput
    /**
     * Limit how many FormulaChunks to update.
     */
    limit?: number
  }

  /**
   * FormulaChunk updateManyAndReturn
   */
  export type FormulaChunkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormulaChunk
     */
    select?: FormulaChunkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FormulaChunk
     */
    omit?: FormulaChunkOmit<ExtArgs> | null
    /**
     * The data used to update FormulaChunks.
     */
    data: XOR<FormulaChunkUpdateManyMutationInput, FormulaChunkUncheckedUpdateManyInput>
    /**
     * Filter which FormulaChunks to update
     */
    where?: FormulaChunkWhereInput
    /**
     * Limit how many FormulaChunks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaChunkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FormulaChunk upsert
   */
  export type FormulaChunkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormulaChunk
     */
    select?: FormulaChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormulaChunk
     */
    omit?: FormulaChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaChunkInclude<ExtArgs> | null
    /**
     * The filter to search for the FormulaChunk to update in case it exists.
     */
    where: FormulaChunkWhereUniqueInput
    /**
     * In case the FormulaChunk found by the `where` argument doesn't exist, create a new FormulaChunk with this data.
     */
    create: XOR<FormulaChunkCreateInput, FormulaChunkUncheckedCreateInput>
    /**
     * In case the FormulaChunk was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FormulaChunkUpdateInput, FormulaChunkUncheckedUpdateInput>
  }

  /**
   * FormulaChunk delete
   */
  export type FormulaChunkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormulaChunk
     */
    select?: FormulaChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormulaChunk
     */
    omit?: FormulaChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaChunkInclude<ExtArgs> | null
    /**
     * Filter which FormulaChunk to delete.
     */
    where: FormulaChunkWhereUniqueInput
  }

  /**
   * FormulaChunk deleteMany
   */
  export type FormulaChunkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FormulaChunks to delete
     */
    where?: FormulaChunkWhereInput
    /**
     * Limit how many FormulaChunks to delete.
     */
    limit?: number
  }

  /**
   * FormulaChunk without action
   */
  export type FormulaChunkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormulaChunk
     */
    select?: FormulaChunkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormulaChunk
     */
    omit?: FormulaChunkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormulaChunkInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const FormulaScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    formulaName: 'formulaName',
    latex: 'latex',
    category: 'category',
    fullFormulaSevenVector: 'fullFormulaSevenVector',
    operators: 'operators',
    babyDefinition: 'babyDefinition',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FormulaScalarFieldEnum = (typeof FormulaScalarFieldEnum)[keyof typeof FormulaScalarFieldEnum]


  export const FormulaChunkScalarFieldEnum: {
    id: 'id',
    formulaId: 'formulaId',
    chunkOrder: 'chunkOrder',
    chunk: 'chunk',
    displayName: 'displayName',
    sevenVector: 'sevenVector',
    babyDefinition: 'babyDefinition'
  };

  export type FormulaChunkScalarFieldEnum = (typeof FormulaChunkScalarFieldEnum)[keyof typeof FormulaChunkScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type FormulaWhereInput = {
    AND?: FormulaWhereInput | FormulaWhereInput[]
    OR?: FormulaWhereInput[]
    NOT?: FormulaWhereInput | FormulaWhereInput[]
    id?: IntFilter<"Formula"> | number
    slug?: StringFilter<"Formula"> | string
    formulaName?: StringFilter<"Formula"> | string
    latex?: StringFilter<"Formula"> | string
    category?: StringFilter<"Formula"> | string
    fullFormulaSevenVector?: StringFilter<"Formula"> | string
    operators?: StringFilter<"Formula"> | string
    babyDefinition?: StringNullableFilter<"Formula"> | string | null
    createdAt?: DateTimeFilter<"Formula"> | Date | string
    updatedAt?: DateTimeFilter<"Formula"> | Date | string
    chunks?: FormulaChunkListRelationFilter
  }

  export type FormulaOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    formulaName?: SortOrder
    latex?: SortOrder
    category?: SortOrder
    fullFormulaSevenVector?: SortOrder
    operators?: SortOrder
    babyDefinition?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    chunks?: FormulaChunkOrderByRelationAggregateInput
  }

  export type FormulaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    AND?: FormulaWhereInput | FormulaWhereInput[]
    OR?: FormulaWhereInput[]
    NOT?: FormulaWhereInput | FormulaWhereInput[]
    formulaName?: StringFilter<"Formula"> | string
    latex?: StringFilter<"Formula"> | string
    category?: StringFilter<"Formula"> | string
    fullFormulaSevenVector?: StringFilter<"Formula"> | string
    operators?: StringFilter<"Formula"> | string
    babyDefinition?: StringNullableFilter<"Formula"> | string | null
    createdAt?: DateTimeFilter<"Formula"> | Date | string
    updatedAt?: DateTimeFilter<"Formula"> | Date | string
    chunks?: FormulaChunkListRelationFilter
  }, "id" | "slug">

  export type FormulaOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    formulaName?: SortOrder
    latex?: SortOrder
    category?: SortOrder
    fullFormulaSevenVector?: SortOrder
    operators?: SortOrder
    babyDefinition?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FormulaCountOrderByAggregateInput
    _avg?: FormulaAvgOrderByAggregateInput
    _max?: FormulaMaxOrderByAggregateInput
    _min?: FormulaMinOrderByAggregateInput
    _sum?: FormulaSumOrderByAggregateInput
  }

  export type FormulaScalarWhereWithAggregatesInput = {
    AND?: FormulaScalarWhereWithAggregatesInput | FormulaScalarWhereWithAggregatesInput[]
    OR?: FormulaScalarWhereWithAggregatesInput[]
    NOT?: FormulaScalarWhereWithAggregatesInput | FormulaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Formula"> | number
    slug?: StringWithAggregatesFilter<"Formula"> | string
    formulaName?: StringWithAggregatesFilter<"Formula"> | string
    latex?: StringWithAggregatesFilter<"Formula"> | string
    category?: StringWithAggregatesFilter<"Formula"> | string
    fullFormulaSevenVector?: StringWithAggregatesFilter<"Formula"> | string
    operators?: StringWithAggregatesFilter<"Formula"> | string
    babyDefinition?: StringNullableWithAggregatesFilter<"Formula"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Formula"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Formula"> | Date | string
  }

  export type FormulaChunkWhereInput = {
    AND?: FormulaChunkWhereInput | FormulaChunkWhereInput[]
    OR?: FormulaChunkWhereInput[]
    NOT?: FormulaChunkWhereInput | FormulaChunkWhereInput[]
    id?: IntFilter<"FormulaChunk"> | number
    formulaId?: IntFilter<"FormulaChunk"> | number
    chunkOrder?: IntFilter<"FormulaChunk"> | number
    chunk?: StringFilter<"FormulaChunk"> | string
    displayName?: StringFilter<"FormulaChunk"> | string
    sevenVector?: StringFilter<"FormulaChunk"> | string
    babyDefinition?: StringNullableFilter<"FormulaChunk"> | string | null
    formula?: XOR<FormulaScalarRelationFilter, FormulaWhereInput>
  }

  export type FormulaChunkOrderByWithRelationInput = {
    id?: SortOrder
    formulaId?: SortOrder
    chunkOrder?: SortOrder
    chunk?: SortOrder
    displayName?: SortOrder
    sevenVector?: SortOrder
    babyDefinition?: SortOrderInput | SortOrder
    formula?: FormulaOrderByWithRelationInput
  }

  export type FormulaChunkWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FormulaChunkWhereInput | FormulaChunkWhereInput[]
    OR?: FormulaChunkWhereInput[]
    NOT?: FormulaChunkWhereInput | FormulaChunkWhereInput[]
    formulaId?: IntFilter<"FormulaChunk"> | number
    chunkOrder?: IntFilter<"FormulaChunk"> | number
    chunk?: StringFilter<"FormulaChunk"> | string
    displayName?: StringFilter<"FormulaChunk"> | string
    sevenVector?: StringFilter<"FormulaChunk"> | string
    babyDefinition?: StringNullableFilter<"FormulaChunk"> | string | null
    formula?: XOR<FormulaScalarRelationFilter, FormulaWhereInput>
  }, "id">

  export type FormulaChunkOrderByWithAggregationInput = {
    id?: SortOrder
    formulaId?: SortOrder
    chunkOrder?: SortOrder
    chunk?: SortOrder
    displayName?: SortOrder
    sevenVector?: SortOrder
    babyDefinition?: SortOrderInput | SortOrder
    _count?: FormulaChunkCountOrderByAggregateInput
    _avg?: FormulaChunkAvgOrderByAggregateInput
    _max?: FormulaChunkMaxOrderByAggregateInput
    _min?: FormulaChunkMinOrderByAggregateInput
    _sum?: FormulaChunkSumOrderByAggregateInput
  }

  export type FormulaChunkScalarWhereWithAggregatesInput = {
    AND?: FormulaChunkScalarWhereWithAggregatesInput | FormulaChunkScalarWhereWithAggregatesInput[]
    OR?: FormulaChunkScalarWhereWithAggregatesInput[]
    NOT?: FormulaChunkScalarWhereWithAggregatesInput | FormulaChunkScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FormulaChunk"> | number
    formulaId?: IntWithAggregatesFilter<"FormulaChunk"> | number
    chunkOrder?: IntWithAggregatesFilter<"FormulaChunk"> | number
    chunk?: StringWithAggregatesFilter<"FormulaChunk"> | string
    displayName?: StringWithAggregatesFilter<"FormulaChunk"> | string
    sevenVector?: StringWithAggregatesFilter<"FormulaChunk"> | string
    babyDefinition?: StringNullableWithAggregatesFilter<"FormulaChunk"> | string | null
  }

  export type FormulaCreateInput = {
    slug: string
    formulaName: string
    latex: string
    category: string
    fullFormulaSevenVector: string
    operators: string
    babyDefinition?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    chunks?: FormulaChunkCreateNestedManyWithoutFormulaInput
  }

  export type FormulaUncheckedCreateInput = {
    id?: number
    slug: string
    formulaName: string
    latex: string
    category: string
    fullFormulaSevenVector: string
    operators: string
    babyDefinition?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    chunks?: FormulaChunkUncheckedCreateNestedManyWithoutFormulaInput
  }

  export type FormulaUpdateInput = {
    slug?: StringFieldUpdateOperationsInput | string
    formulaName?: StringFieldUpdateOperationsInput | string
    latex?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    fullFormulaSevenVector?: StringFieldUpdateOperationsInput | string
    operators?: StringFieldUpdateOperationsInput | string
    babyDefinition?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chunks?: FormulaChunkUpdateManyWithoutFormulaNestedInput
  }

  export type FormulaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    formulaName?: StringFieldUpdateOperationsInput | string
    latex?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    fullFormulaSevenVector?: StringFieldUpdateOperationsInput | string
    operators?: StringFieldUpdateOperationsInput | string
    babyDefinition?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chunks?: FormulaChunkUncheckedUpdateManyWithoutFormulaNestedInput
  }

  export type FormulaCreateManyInput = {
    id?: number
    slug: string
    formulaName: string
    latex: string
    category: string
    fullFormulaSevenVector: string
    operators: string
    babyDefinition?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FormulaUpdateManyMutationInput = {
    slug?: StringFieldUpdateOperationsInput | string
    formulaName?: StringFieldUpdateOperationsInput | string
    latex?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    fullFormulaSevenVector?: StringFieldUpdateOperationsInput | string
    operators?: StringFieldUpdateOperationsInput | string
    babyDefinition?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormulaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    formulaName?: StringFieldUpdateOperationsInput | string
    latex?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    fullFormulaSevenVector?: StringFieldUpdateOperationsInput | string
    operators?: StringFieldUpdateOperationsInput | string
    babyDefinition?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormulaChunkCreateInput = {
    chunkOrder: number
    chunk: string
    displayName: string
    sevenVector: string
    babyDefinition?: string | null
    formula: FormulaCreateNestedOneWithoutChunksInput
  }

  export type FormulaChunkUncheckedCreateInput = {
    id?: number
    formulaId: number
    chunkOrder: number
    chunk: string
    displayName: string
    sevenVector: string
    babyDefinition?: string | null
  }

  export type FormulaChunkUpdateInput = {
    chunkOrder?: IntFieldUpdateOperationsInput | number
    chunk?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    sevenVector?: StringFieldUpdateOperationsInput | string
    babyDefinition?: NullableStringFieldUpdateOperationsInput | string | null
    formula?: FormulaUpdateOneRequiredWithoutChunksNestedInput
  }

  export type FormulaChunkUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    formulaId?: IntFieldUpdateOperationsInput | number
    chunkOrder?: IntFieldUpdateOperationsInput | number
    chunk?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    sevenVector?: StringFieldUpdateOperationsInput | string
    babyDefinition?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FormulaChunkCreateManyInput = {
    id?: number
    formulaId: number
    chunkOrder: number
    chunk: string
    displayName: string
    sevenVector: string
    babyDefinition?: string | null
  }

  export type FormulaChunkUpdateManyMutationInput = {
    chunkOrder?: IntFieldUpdateOperationsInput | number
    chunk?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    sevenVector?: StringFieldUpdateOperationsInput | string
    babyDefinition?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FormulaChunkUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    formulaId?: IntFieldUpdateOperationsInput | number
    chunkOrder?: IntFieldUpdateOperationsInput | number
    chunk?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    sevenVector?: StringFieldUpdateOperationsInput | string
    babyDefinition?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FormulaChunkListRelationFilter = {
    every?: FormulaChunkWhereInput
    some?: FormulaChunkWhereInput
    none?: FormulaChunkWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type FormulaChunkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FormulaCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    formulaName?: SortOrder
    latex?: SortOrder
    category?: SortOrder
    fullFormulaSevenVector?: SortOrder
    operators?: SortOrder
    babyDefinition?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FormulaAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FormulaMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    formulaName?: SortOrder
    latex?: SortOrder
    category?: SortOrder
    fullFormulaSevenVector?: SortOrder
    operators?: SortOrder
    babyDefinition?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FormulaMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    formulaName?: SortOrder
    latex?: SortOrder
    category?: SortOrder
    fullFormulaSevenVector?: SortOrder
    operators?: SortOrder
    babyDefinition?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FormulaSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FormulaScalarRelationFilter = {
    is?: FormulaWhereInput
    isNot?: FormulaWhereInput
  }

  export type FormulaChunkCountOrderByAggregateInput = {
    id?: SortOrder
    formulaId?: SortOrder
    chunkOrder?: SortOrder
    chunk?: SortOrder
    displayName?: SortOrder
    sevenVector?: SortOrder
    babyDefinition?: SortOrder
  }

  export type FormulaChunkAvgOrderByAggregateInput = {
    id?: SortOrder
    formulaId?: SortOrder
    chunkOrder?: SortOrder
  }

  export type FormulaChunkMaxOrderByAggregateInput = {
    id?: SortOrder
    formulaId?: SortOrder
    chunkOrder?: SortOrder
    chunk?: SortOrder
    displayName?: SortOrder
    sevenVector?: SortOrder
    babyDefinition?: SortOrder
  }

  export type FormulaChunkMinOrderByAggregateInput = {
    id?: SortOrder
    formulaId?: SortOrder
    chunkOrder?: SortOrder
    chunk?: SortOrder
    displayName?: SortOrder
    sevenVector?: SortOrder
    babyDefinition?: SortOrder
  }

  export type FormulaChunkSumOrderByAggregateInput = {
    id?: SortOrder
    formulaId?: SortOrder
    chunkOrder?: SortOrder
  }

  export type FormulaChunkCreateNestedManyWithoutFormulaInput = {
    create?: XOR<FormulaChunkCreateWithoutFormulaInput, FormulaChunkUncheckedCreateWithoutFormulaInput> | FormulaChunkCreateWithoutFormulaInput[] | FormulaChunkUncheckedCreateWithoutFormulaInput[]
    connectOrCreate?: FormulaChunkCreateOrConnectWithoutFormulaInput | FormulaChunkCreateOrConnectWithoutFormulaInput[]
    createMany?: FormulaChunkCreateManyFormulaInputEnvelope
    connect?: FormulaChunkWhereUniqueInput | FormulaChunkWhereUniqueInput[]
  }

  export type FormulaChunkUncheckedCreateNestedManyWithoutFormulaInput = {
    create?: XOR<FormulaChunkCreateWithoutFormulaInput, FormulaChunkUncheckedCreateWithoutFormulaInput> | FormulaChunkCreateWithoutFormulaInput[] | FormulaChunkUncheckedCreateWithoutFormulaInput[]
    connectOrCreate?: FormulaChunkCreateOrConnectWithoutFormulaInput | FormulaChunkCreateOrConnectWithoutFormulaInput[]
    createMany?: FormulaChunkCreateManyFormulaInputEnvelope
    connect?: FormulaChunkWhereUniqueInput | FormulaChunkWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FormulaChunkUpdateManyWithoutFormulaNestedInput = {
    create?: XOR<FormulaChunkCreateWithoutFormulaInput, FormulaChunkUncheckedCreateWithoutFormulaInput> | FormulaChunkCreateWithoutFormulaInput[] | FormulaChunkUncheckedCreateWithoutFormulaInput[]
    connectOrCreate?: FormulaChunkCreateOrConnectWithoutFormulaInput | FormulaChunkCreateOrConnectWithoutFormulaInput[]
    upsert?: FormulaChunkUpsertWithWhereUniqueWithoutFormulaInput | FormulaChunkUpsertWithWhereUniqueWithoutFormulaInput[]
    createMany?: FormulaChunkCreateManyFormulaInputEnvelope
    set?: FormulaChunkWhereUniqueInput | FormulaChunkWhereUniqueInput[]
    disconnect?: FormulaChunkWhereUniqueInput | FormulaChunkWhereUniqueInput[]
    delete?: FormulaChunkWhereUniqueInput | FormulaChunkWhereUniqueInput[]
    connect?: FormulaChunkWhereUniqueInput | FormulaChunkWhereUniqueInput[]
    update?: FormulaChunkUpdateWithWhereUniqueWithoutFormulaInput | FormulaChunkUpdateWithWhereUniqueWithoutFormulaInput[]
    updateMany?: FormulaChunkUpdateManyWithWhereWithoutFormulaInput | FormulaChunkUpdateManyWithWhereWithoutFormulaInput[]
    deleteMany?: FormulaChunkScalarWhereInput | FormulaChunkScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FormulaChunkUncheckedUpdateManyWithoutFormulaNestedInput = {
    create?: XOR<FormulaChunkCreateWithoutFormulaInput, FormulaChunkUncheckedCreateWithoutFormulaInput> | FormulaChunkCreateWithoutFormulaInput[] | FormulaChunkUncheckedCreateWithoutFormulaInput[]
    connectOrCreate?: FormulaChunkCreateOrConnectWithoutFormulaInput | FormulaChunkCreateOrConnectWithoutFormulaInput[]
    upsert?: FormulaChunkUpsertWithWhereUniqueWithoutFormulaInput | FormulaChunkUpsertWithWhereUniqueWithoutFormulaInput[]
    createMany?: FormulaChunkCreateManyFormulaInputEnvelope
    set?: FormulaChunkWhereUniqueInput | FormulaChunkWhereUniqueInput[]
    disconnect?: FormulaChunkWhereUniqueInput | FormulaChunkWhereUniqueInput[]
    delete?: FormulaChunkWhereUniqueInput | FormulaChunkWhereUniqueInput[]
    connect?: FormulaChunkWhereUniqueInput | FormulaChunkWhereUniqueInput[]
    update?: FormulaChunkUpdateWithWhereUniqueWithoutFormulaInput | FormulaChunkUpdateWithWhereUniqueWithoutFormulaInput[]
    updateMany?: FormulaChunkUpdateManyWithWhereWithoutFormulaInput | FormulaChunkUpdateManyWithWhereWithoutFormulaInput[]
    deleteMany?: FormulaChunkScalarWhereInput | FormulaChunkScalarWhereInput[]
  }

  export type FormulaCreateNestedOneWithoutChunksInput = {
    create?: XOR<FormulaCreateWithoutChunksInput, FormulaUncheckedCreateWithoutChunksInput>
    connectOrCreate?: FormulaCreateOrConnectWithoutChunksInput
    connect?: FormulaWhereUniqueInput
  }

  export type FormulaUpdateOneRequiredWithoutChunksNestedInput = {
    create?: XOR<FormulaCreateWithoutChunksInput, FormulaUncheckedCreateWithoutChunksInput>
    connectOrCreate?: FormulaCreateOrConnectWithoutChunksInput
    upsert?: FormulaUpsertWithoutChunksInput
    connect?: FormulaWhereUniqueInput
    update?: XOR<XOR<FormulaUpdateToOneWithWhereWithoutChunksInput, FormulaUpdateWithoutChunksInput>, FormulaUncheckedUpdateWithoutChunksInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FormulaChunkCreateWithoutFormulaInput = {
    chunkOrder: number
    chunk: string
    displayName: string
    sevenVector: string
    babyDefinition?: string | null
  }

  export type FormulaChunkUncheckedCreateWithoutFormulaInput = {
    id?: number
    chunkOrder: number
    chunk: string
    displayName: string
    sevenVector: string
    babyDefinition?: string | null
  }

  export type FormulaChunkCreateOrConnectWithoutFormulaInput = {
    where: FormulaChunkWhereUniqueInput
    create: XOR<FormulaChunkCreateWithoutFormulaInput, FormulaChunkUncheckedCreateWithoutFormulaInput>
  }

  export type FormulaChunkCreateManyFormulaInputEnvelope = {
    data: FormulaChunkCreateManyFormulaInput | FormulaChunkCreateManyFormulaInput[]
  }

  export type FormulaChunkUpsertWithWhereUniqueWithoutFormulaInput = {
    where: FormulaChunkWhereUniqueInput
    update: XOR<FormulaChunkUpdateWithoutFormulaInput, FormulaChunkUncheckedUpdateWithoutFormulaInput>
    create: XOR<FormulaChunkCreateWithoutFormulaInput, FormulaChunkUncheckedCreateWithoutFormulaInput>
  }

  export type FormulaChunkUpdateWithWhereUniqueWithoutFormulaInput = {
    where: FormulaChunkWhereUniqueInput
    data: XOR<FormulaChunkUpdateWithoutFormulaInput, FormulaChunkUncheckedUpdateWithoutFormulaInput>
  }

  export type FormulaChunkUpdateManyWithWhereWithoutFormulaInput = {
    where: FormulaChunkScalarWhereInput
    data: XOR<FormulaChunkUpdateManyMutationInput, FormulaChunkUncheckedUpdateManyWithoutFormulaInput>
  }

  export type FormulaChunkScalarWhereInput = {
    AND?: FormulaChunkScalarWhereInput | FormulaChunkScalarWhereInput[]
    OR?: FormulaChunkScalarWhereInput[]
    NOT?: FormulaChunkScalarWhereInput | FormulaChunkScalarWhereInput[]
    id?: IntFilter<"FormulaChunk"> | number
    formulaId?: IntFilter<"FormulaChunk"> | number
    chunkOrder?: IntFilter<"FormulaChunk"> | number
    chunk?: StringFilter<"FormulaChunk"> | string
    displayName?: StringFilter<"FormulaChunk"> | string
    sevenVector?: StringFilter<"FormulaChunk"> | string
    babyDefinition?: StringNullableFilter<"FormulaChunk"> | string | null
  }

  export type FormulaCreateWithoutChunksInput = {
    slug: string
    formulaName: string
    latex: string
    category: string
    fullFormulaSevenVector: string
    operators: string
    babyDefinition?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FormulaUncheckedCreateWithoutChunksInput = {
    id?: number
    slug: string
    formulaName: string
    latex: string
    category: string
    fullFormulaSevenVector: string
    operators: string
    babyDefinition?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FormulaCreateOrConnectWithoutChunksInput = {
    where: FormulaWhereUniqueInput
    create: XOR<FormulaCreateWithoutChunksInput, FormulaUncheckedCreateWithoutChunksInput>
  }

  export type FormulaUpsertWithoutChunksInput = {
    update: XOR<FormulaUpdateWithoutChunksInput, FormulaUncheckedUpdateWithoutChunksInput>
    create: XOR<FormulaCreateWithoutChunksInput, FormulaUncheckedCreateWithoutChunksInput>
    where?: FormulaWhereInput
  }

  export type FormulaUpdateToOneWithWhereWithoutChunksInput = {
    where?: FormulaWhereInput
    data: XOR<FormulaUpdateWithoutChunksInput, FormulaUncheckedUpdateWithoutChunksInput>
  }

  export type FormulaUpdateWithoutChunksInput = {
    slug?: StringFieldUpdateOperationsInput | string
    formulaName?: StringFieldUpdateOperationsInput | string
    latex?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    fullFormulaSevenVector?: StringFieldUpdateOperationsInput | string
    operators?: StringFieldUpdateOperationsInput | string
    babyDefinition?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormulaUncheckedUpdateWithoutChunksInput = {
    id?: IntFieldUpdateOperationsInput | number
    slug?: StringFieldUpdateOperationsInput | string
    formulaName?: StringFieldUpdateOperationsInput | string
    latex?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    fullFormulaSevenVector?: StringFieldUpdateOperationsInput | string
    operators?: StringFieldUpdateOperationsInput | string
    babyDefinition?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormulaChunkCreateManyFormulaInput = {
    id?: number
    chunkOrder: number
    chunk: string
    displayName: string
    sevenVector: string
    babyDefinition?: string | null
  }

  export type FormulaChunkUpdateWithoutFormulaInput = {
    chunkOrder?: IntFieldUpdateOperationsInput | number
    chunk?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    sevenVector?: StringFieldUpdateOperationsInput | string
    babyDefinition?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FormulaChunkUncheckedUpdateWithoutFormulaInput = {
    id?: IntFieldUpdateOperationsInput | number
    chunkOrder?: IntFieldUpdateOperationsInput | number
    chunk?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    sevenVector?: StringFieldUpdateOperationsInput | string
    babyDefinition?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FormulaChunkUncheckedUpdateManyWithoutFormulaInput = {
    id?: IntFieldUpdateOperationsInput | number
    chunkOrder?: IntFieldUpdateOperationsInput | number
    chunk?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    sevenVector?: StringFieldUpdateOperationsInput | string
    babyDefinition?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}