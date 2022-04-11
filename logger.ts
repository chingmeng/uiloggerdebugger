import moment from 'moment';
import { Console } from './console';

const tags = [];
const showAll = true;

export const setEnvTag = (env: string) => {
    Console.getInstance().envName = env;
};

export const getEnv = () => Console.getInstance().envName;

export const rLog = (...args) => {
    _pdLog(' ', 'log', 1000, ...args);
};

/** Add additiona configuration with 'config' argument, note: config is { wordLimit } */
export const rBLog =
    (tag, config = null) =>
    (args) => {
        _pdLog('\n', tag, config, ...args);
    };

const _pdLog = (separator = ' ', tag, config, ...args) => {
    const characterLimitPerArg = config?.characterLimitPerArg ?? 15000; // default to print 1000 character per arg only

    const now = moment().format('yyyy-MM-DD HH:mm:ss.SSS');

    const buildText = () => {
        return args
        .map((e) => {
            let stringifyJSON = JSONStringify(e);
            stringifyJSON = stringifyJSON
                ? stringifyJSON.substring(0, characterLimitPerArg)
                : null;
            return typeof args === 'object' && args !== null ? stringifyJSON : e;
        })
        .join(separator);
    }

    __DEV__ &&
        (showAll || tags.filter((e) => tag.includes(e)).length > 0) &&
        console.debug(
            `
----${tag} (${now}) [[ ${Console.getInstance().envName} ]] ----
${args
    .map((e) => buildText())
    .join(separator)}
----END ${tag} (${now}) [[ ${Console.getInstance().envName} ]] ----`,
        );
 
    // send this off to Reactotron.
    // __DEV__ &&
    //     (showAll || tags.filter((e) => tag.includes(e)).length > 0) &&
    //     console.tron.display({
    //         name: tag,
    //         value: args,
    //     });

    if (__DEV__) {
        if (!showAll && !(tags.filter((e) => tag.includes(e)).length > 0)) {
            return;
        }

        const newTexts = args
        .map((e) => buildText())
        .join(separator);

        const now = moment().format('yyyy-MM-DD HH:mm:ss.SSS');
        Console.getInstance().add(tag, newTexts, now);
    }
};

const JSONStringify = (e: any) => {
    const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key, value) => {
          if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
              return;
            }
            seen.add(value);
          }
          return value;
        };
      };
    try {
        return JSON.stringify(e, getCircularReplacer(), 1);
    } catch (err) {
        return err.toString();
    }
};