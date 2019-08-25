import { ILocFormat, ISegment } from "localization-format";
import CheckResult from "./CheckResult";
import QADuplicateCheckResult from "./QA/QADuplicateCheckResult";
import SegmentCheckResult from "./SegmentCheckResult";

export default class extends CheckResult {
    public LocFormat!: ILocFormat<ISegment>;
    public SegmentCheckResults?: SegmentCheckResult[];
    public QADuplicateCheckResults?: QADuplicateCheckResult[];
    public constructor(name: string,
                       lf: ILocFormat<ISegment>,
                       checkResults: {
                            segmentCheckResults?: SegmentCheckResult[],
                            qaDuplicateCheckResults?: QADuplicateCheckResult[],
                       }) {
        super();
        this.Name = name;
        this.LocFormat = lf;
        this.SegmentCheckResults = checkResults.segmentCheckResults;
        this.QADuplicateCheckResults = checkResults.qaDuplicateCheckResults;
    }
}
