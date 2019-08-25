import { ILocFormat, ISegment } from "localization-format";
import CheckResult from "./CheckResult";
import SegmentCheckResult from "./SegmentCheckResult";

export default class extends CheckResult {
    public LocFormat!: ILocFormat<ISegment>;
    public SegmentCheckResults!: SegmentCheckResult[];
    public constructor(name: string, lf: ILocFormat<ISegment>, segmentCheckResults: SegmentCheckResult[]) {
        super();
        this.Name = name;
        this.LocFormat = lf;
        this.SegmentCheckResults = segmentCheckResults;
    }
}
