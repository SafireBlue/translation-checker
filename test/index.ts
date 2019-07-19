import {FindDiffSpacesFromSegments} from "../src/index";

// tslint:disable-next-line:max-line-length
// const res = FindNumbersFromSegment({FormatIndex: null, Props: null, Source: {Value: "test1", BeginOffSet: null}, Translation: {Value: "テスト2", BeginOffSet: null}});

// console.dir(res);

export const test = (async () => {
    // tslint:disable-next-line:max-line-length
    const res = await FindDiffSpacesFromSegments([{Source: {Value: "test1 "}, Translation: {Value: "テスト2"}},
                                              {Source: {Value: "test3 "}, Translation: {Value: " "}},
                                              {Source: {Value: "test 3"}, Translation: {Value: " "}}]);
    console.dir(res);
});
