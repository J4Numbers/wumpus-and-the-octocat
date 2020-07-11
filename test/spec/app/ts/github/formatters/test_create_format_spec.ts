import { expect } from "chai";
// @ts-ignore
import GithubFormatters from "../../../../../../src/ts/github/formatters";

const dummyCreate = require("../../../../../../data/dummy-create")


describe("GitHub Webhook create formatter", function () {
   it("Should always return a stated phrase", function () {
       expect(GithubFormatters.create(dummyCreate)).to.equal('New branch simple-tag created by Codertocat\n');
   });
});
