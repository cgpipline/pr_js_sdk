let querystring = require('querystring');
import request, {CurlError} from 'sync-request-curl';

const panel_url: string = 'localhost:3000'

/**
 * Check if premiere is running and if the pymiere CEP panel is active
 */
export function check_premiere_is_alive(): any {

    try {
        const res = request(
            'GET',
            panel_url,
            {
                headers: {
                    'Connection': 'Keep-Alive',
                    'Content-Type': 'application/json',
                    'timeout': '5000'
                }
            }
        );

        if (res.statusCode === 200) {
            try {
                // 尝试解析JSON，如果失败则回退到原始字符串
                return JSON.parse(res.body.toString());
            } catch (parseError) {
                return res.body.toString();
            }
        }
    } catch (error) {
        if (error instanceof CurlError) {
            throw new Error('ERROR:' + error.message)
        } else {
            throw new Error('ERROR:Premiere is not alive')
        }
    }
}

/**
 * Send some ExtendScript code to premiere and wait for the returning value
 * @param code (str) plain text ExtendScript code
 * @param decode_json (bool) decode response using json if possible
 * @param file_path (str) path to a jsx file to execute
 */
export function eval_script(code: string, decode_json: boolean = true, file_path: string = ''): any {
    if (code != null) {
        code = code.replace("\\", "\\\\");
    }
    let json_param;
    json_param = {"to_eval": "try{" + code + "}catch(e){e.error=true;ExtendJSON.stringify(e)}"};

    try {
        const res = request(
            'POST',
            panel_url,
            {
                headers: {
                    'Connection': 'Keep-Alive',
                    'Content-Type': 'application/json',
                    'timeout': '5000'
                },
                json: json_param
            }
        );

        if (res.statusCode === 200) {
            if (decode_json) {
                try {
                    // 尝试解析JSON，如果失败则回退到原始字符串
                    return JSON.parse(res.body.toString());
                } catch (parseError) {
                    return res.body.toString();
                }
            } else {
                return res.body.toString();
            }
        }
    } catch (error) {
        if (error instanceof CurlError) {
            throw new Error('ERROR:' + error.message)
        } else {
            throw new Error('ERROR:Premiere is not alive')
        }
    }
}

/**
 * Eval the line as ExtendScript code, if the code return an object, it will be properly stored with an id for
 * pymiere to handle it and returned as a representation with the id
 * @param line
 * @param as_kwargs
 */
export function eval_script_returning_object(line: string, as_kwargs: boolean = false): any {
    if (!line.endsWith(";")) {
        line += ";";
    }
    let script: string = `var tmp = ${line}`;

    script += `if(typeof tmp === 'object' && tmp !== null){var newPymiereId = $._pymiere.generateId();$._pymiere[newPymiereId] = tmp;tmp = ExtendJSON.stringify({'isObject': true, 'objectType': tmp.reflect.name, 'pymiereId': newPymiereId}, internal_variables_replacer, 0, 1);}tmp`;

    try {
        const res = eval_script(script, true);
        if (as_kwargs && typeof res === 'object' && res['isObject']) {
            return res['pymiereId'];
        }
        return res;
    } catch (e: any) {
        console.error('Error:', e.message);
    }
}

/**
 * Do something on the current object in extendscript, could be to query or set a property or exec a function
 * @param premiere_id
 * @param extend_property (str) code part after object needed to be execute (ex: get property name second => 'second',
 *         set property index => 'index = 12', execute a method 'getColor()'
 * @param dot_notation dot_notation: (bool) by default the dot is includin between the object query and the property, if we
 *         want to for example use the bracket notation for a collection we don't want the point in between
 */
export function eval_on_this_object(premiere_id: string, extend_property: string, dot_notation: boolean = true): any {
    let dot_str = dot_notation ? '.' : '';
    let line: string = `$._pymiere['${premiere_id}']${dot_str}${extend_property};`
    let result: string = eval_script_returning_object(line, true)

    if (result == "undefined") {
        throw new Error('ERROR:Project object not found.')
    }

    return result;
}

/**
 * 销毁对象
 * @param premiere_id
 * @param object_name
 */
export function eval_script_destroy_object(premiere_id: string, object_name: string = ''): void {
    let script: string = `delete $._pymiere['${premiere_id}'];var index=$._pymiere.generatedIds.indexOf('${premiere_id}');if(index!==-1){{$._pymiere.generatedIds.splice(index,1)}}`;
    let res: string = eval_script(script);
    console.log(`----销毁${object_name}对象----:${res}`);
}

/**
 * For functions args and property setter : format the given arg using quote for string, object query for object
 * @param obj (any) arg to format
 */
export function format_object_to_es(obj: any): any {
    if (typeof obj === 'string') {
        return `"${obj}"`;
    } else if (typeof obj === 'boolean') {
        return obj.toString().toLowerCase();
    } else if (typeof obj === 'object') {
        if (obj._premiere_id) {
            return `$._pymiere['${obj._premiere_id}']`;
        } else {
            // 检查obj是否是一个对象（不是null，不是数组，不是原始类型）
            const keyValuePairs = Object.entries(obj).map(([k, v]) => {
                return `${format_object_to_es(k)}: ${format_object_to_es(v)}`;
            });
            return `{${keyValuePairs.join(',')}}`; // 对象使用花括号表示
        }
    } else if (Array.isArray(obj)) {
        return `[${format_list_to_es_array(obj)}]`; // 注意数组使用方括号表示
    } else if (obj === null) {
        return 'null';
    } else {
        return obj.toString();
    }
}

/**
 * 把数组转换成es标准数组字符串
 * @param list
 */
function format_list_to_es_array(list: any[]): string {
    // 使用 map 方法将列表中的每个元素转换为 ES 格式
    const esFormattedItems = list.map(item => format_object_to_es(item));
    // 使用 join 方法将转换后的元素连接成一个字符串，元素之间用逗号分隔
    const joinedString = esFormattedItems.join(', ');
    // 构建最终的 JSON 数组字符串，注意数组使用方括号 []
    return `[${joinedString}]`;
}
