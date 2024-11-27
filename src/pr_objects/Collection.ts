import {eval_on_this_object} from "../utils/helper";

export class Collection {

    /**
     * 处理获取指定索引数据基类
     * @param index
     * @param id
     * @param len
     */
    getItem(index: number, id: string, len: number): any {
        // store given index
        let given_index: number = index;
        // for negative index, resolve the real index (not supported in ExtendScript)

        if (given_index < 0) {
            index = len + given_index
        }

        return eval_on_this_object(id,`[${index}]`, false);
    }
}
