import { expect } from "chai";
// @ts-ignore
import GithubFormatters from "../../../../../../src/ts/github/formatters";

const dummyPing = require("../../../../../../data/dummy-ping")


describe("GitHub Webhook ping formatter", function () {
   it("Should always return a stated phrase", function () {
       expect(GithubFormatters.ping(dummyPing)).to.equal('Ping request from repository');
   });
});
