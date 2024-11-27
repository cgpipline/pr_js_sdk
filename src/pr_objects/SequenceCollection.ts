import {eval_script_destroy_object, eval_on_this_object} from "../utils/helper";
import {Collection} from "./Collection";
import {Sequence} from "./Sequence";

export class SequenceCollection extends Collection {
    public len: number = 0;
    protected _premiere_id: string = '';

    protected _seq_instances: { [index: string]: Sequence } = {};
    private data: { [key: number]: Sequence | any };

    [key: number]: () => Sequence;

    constructor(seq_premiere_id: string) {
        super();
        this.data = {};
        this._init(seq_premiere_id);
        return new Proxy(this, {
            get(target, prop: any): any {
                try {
                    if (!isNaN(Number(prop))) {
                        return target[prop]()
                    } else {
                        return target[prop]
                    }
                } catch (e) {
                    throw new Error(`ERROR:${prop}index not exist`)
                }
            }
        })
    }

    public _init(seq_premiere_id: string): void {
        this._premiere_id = seq_premiere_id;
        // 获取当前项目序列长度
        this.len = eval_on_this_object(this._premiere_id, 'numSequences')

        console.log(`----生成sequences对象----:${this._premiere_id}`);
        console.log(`----sequences长度----:` + this.len)
        if (this.len > 0) {
            // 初始化对象数组
            for (let key: number = 0; key < this.len; key++) {
                this[key] = (): Sequence => {
                    // 获取单个Sequence对象
                    if (this._seq_instances[key.toString()]) {
                        return this._seq_instances[key.toString()];
                    } else {
                        let instance_id: any = this.getItem(key, this._premiere_id, this.len);
                        let seq_instances_obj: Sequence = new Sequence(instance_id);
                        this._seq_instances[key.toString()] = seq_instances_obj;
                        console.log(`----获取单个sequence对象----:${instance_id}`);
                        return seq_instances_obj
                    }
                };
            }
        }
    }

    /**
     * 销毁对象
     */
    public dispose(): void {
        if (this._premiere_id) {
            eval_script_destroy_object(this._premiere_id, 'sequences');
            if (Object.keys(this._seq_instances).length) {
                for (const key in this._seq_instances) {
                    this._seq_instances[key].dispose();
                }
                this._seq_instances = {};
            }
        }
    }
}
