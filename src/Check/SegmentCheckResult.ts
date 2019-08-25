import { ISegment } from "localization-format";
import { TextCheckResult } from "text-checker";
import CheckResult from "./CheckResult";

export default class extends CheckResult {
    public Segment!: ISegment;
    public Source!: TextCheckResult[];
    public Translation!: TextCheckResult[];
    public constructor(name: string, seg: ISegment) {
        super();
        this.Name = name;
        this.Segment = seg;
    }
}
